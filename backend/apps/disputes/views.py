from rest_framework import viewsets, permissions
from .models import Dispute
from .serializers import DisputeSerializer

class DisputeViewSet(viewsets.ModelViewSet):
    queryset = Dispute.objects.all()
    serializer_class = DisputeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'SYSTEM_ADMIN':
            return Dispute.objects.all()
        if hasattr(user, 'managed_department'):
            return Dispute.objects.filter(report__tasks__department=user.managed_department).distinct()
        return Dispute.objects.filter(submitted_by=user)
