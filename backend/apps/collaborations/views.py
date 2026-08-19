from rest_framework import viewsets, permissions
from .models import Collaboration
from .serializers import CollaborationSerializer

class CollaborationViewSet(viewsets.ModelViewSet):
    queryset = Collaboration.objects.all()
    serializer_class = CollaborationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'SYSTEM_ADMIN':
            return Collaboration.objects.all()
        if hasattr(user, 'managed_department'):
            dept = user.managed_department
            return Collaboration.objects.filter(
                primary_department=dept
            ) | Collaboration.objects.filter(
                supporting_department=dept
            )
        return Collaboration.objects.none()

