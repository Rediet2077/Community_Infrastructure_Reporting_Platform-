from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Dispute
from .serializers import DisputeSerializer
from .services import resolve_dispute


class DisputeViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing department tasks and operational disputes.
    """
    queryset = Dispute.objects.select_related(
        'submitted_by', 'report', 'reviewed_by'
    ).all()
    serializer_class = DisputeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        user_role = getattr(user, 'role', None)

        # System admins see all disputes
        if user.is_staff or user_role in ['SYSTEM_ADMIN', 'ADMIN']:
            return self.queryset

        # Citizens see disputes they personally submitted.
        return self.queryset.filter(submitted_by=user)

    def perform_create(self, serializer):
        serializer.save(submitted_by=self.request.user)

    @action(detail=True, methods=['post'], url_path='resolve')
    def resolve(self, request, pk=None):
        """
        POST /api/disputes/{id}/resolve/
        Resolves or closes an open dispute.
        Body: {"resolution_notes": "Issue reviewed and scope updated.", "status": "ACCEPTED"}
        """
        resolution_notes = request.data.get('resolution_notes', '')
        new_status = request.data.get('status', Dispute.Status.ACCEPTED)

        if not resolution_notes:
            return Response(
                {"error": "'resolution_notes' field is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            dispute = resolve_dispute(
                dispute_id=pk,
                reviewed_by_user=request.user,
                resolution_notes=resolution_notes,
                new_status=new_status,
            )
            serializer = self.get_serializer(dispute)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

