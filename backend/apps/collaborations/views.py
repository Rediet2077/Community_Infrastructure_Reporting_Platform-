from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Collaboration
from .serializers import CollaborationSerializer
from .services import create_collaboration_request, respond_to_collaboration


class CollaborationViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing inter-departmental collaboration requests.
    """
    queryset = Collaboration.objects.select_related(
        'primary_department', 'supporting_department', 'report', 'requested_by'
    ).all()
    serializer_class = CollaborationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        user_role = getattr(user, 'role', None)

        # System admins see all requests
        if user.is_staff or user_role in ['SYSTEM_ADMIN', 'ADMIN']:
            return self.queryset

        # Department managers see requests where their department is requester or target
        user_dept = getattr(user, 'managed_department', None) or getattr(user, 'department', None)
        if user_dept:
            return self.queryset.filter(
                primary_department=user_dept
            ) | self.queryset.filter(
                supporting_department=user_dept
            )

        return self.queryset.none()

    @action(detail=True, methods=['post'], url_path='respond')
    def respond(self, request, pk=None):
        """
        POST /api/collaborations/{id}/respond/
        Accept or reject a collaboration request.
        Body: {"approved": true, "notes": "We can assist with excavators."}
        """
        approved = request.data.get('approved')
        notes = request.data.get('notes', '')

        if approved is None:
            return Response(
                {"error": "'approved' (boolean) field is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            collab = respond_to_collaboration(
                request_id=pk,
                reviewer_user=request.user,
                approved=approved,
                response_notes=notes,
            )
            serializer = self.get_serializer(collab)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)