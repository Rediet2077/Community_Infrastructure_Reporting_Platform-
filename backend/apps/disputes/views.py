from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from utils.permissions import IsAdminOrDepartmentAdmin, IsSystemAdmin
from utils.responses import success_response
from utils.audit import record_audit_log

from .models import Dispute
from .serializers import DisputeSerializer
from .services import open_dispute, resolve_dispute


class DisputeViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing citizen disputes on reports.
    - Citizens: can create disputes and view their own
    - System Admins: can list all, resolve/close disputes
    """
    queryset = Dispute.objects.select_related(
        'submitted_by', 'report', 'reviewed_by'
    ).order_by('-created_at')
    serializer_class = DisputeSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['status', 'report']
    ordering_fields = ['created_at']

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.role in ['SYSTEM_ADMIN']:
            return self.queryset
        return self.queryset.filter(submitted_by=user)

    def create(self, request, *args, **kwargs):
        """POST /api/v1/disputes/ - Citizen opens a dispute."""
        report_id = request.data.get('report')
        reason = request.data.get('reason')

        if not report_id or not reason:
            return Response(
                {"error": "'report' and 'reason' are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            dispute = open_dispute(
                user=request.user,
                report_id=report_id,
                reason=reason,
            )
            record_audit_log(
                action="DISPUTE_OPENED",
                entity_type="Dispute",
                entity_id=dispute.id,
                actor=request.user,
                request=request,
                new_values={"report_id": str(report_id), "reason": reason},
            )
            serializer = self.get_serializer(dispute)
            return success_response(
                data=serializer.data,
                message="Dispute opened successfully.",
                status_code=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='resolve', permission_classes=[IsSystemAdmin])
    def resolve(self, request, pk=None):
        """
        POST /api/v1/disputes/<id>/resolve/
        System Admin resolves or rejects a dispute.
        Body: {"resolution_notes": "...", "status": "ACCEPTED" | "REJECTED"}
        """
        resolution_notes = request.data.get('resolution_notes', '')
        new_status = request.data.get('status')

        if not resolution_notes:
            return Response(
                {"error": "'resolution_notes' is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if not new_status:
            return Response(
                {"error": "'status' is required (ACCEPTED or REJECTED)."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            dispute = resolve_dispute(
                dispute_id=pk,
                reviewed_by_user=request.user,
                resolution_notes=resolution_notes,
                new_status=new_status,
            )
            record_audit_log(
                action="DISPUTE_RESOLVED",
                entity_type="Dispute",
                entity_id=dispute.id,
                actor=request.user,
                request=request,
                new_values={"status": new_status, "resolution_notes": resolution_notes},
            )
            serializer = self.get_serializer(dispute)
            return success_response(data=serializer.data, message=f"Dispute {new_status.lower()} successfully.")
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
