from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from utils.permissions import IsSystemAdmin
from utils.responses import success_response
from utils.pagination import StandardResultsSetPagination
from .models import AuditLog
from .serializers import AuditLogSerializer


class AuditLogListView(generics.ListAPIView):
    """
    System Admin only: Query, filter, and inspect immutable audit trail logs
    with standard pagination support.
    """
    serializer_class = AuditLogSerializer
    permission_classes = [IsSystemAdmin]
    pagination_class = StandardResultsSetPagination
    queryset = AuditLog.objects.select_related('user').all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['action', 'entity_type', 'user__email']
    search_fields = ['action', 'entity_type', 'reason', 'user__email', 'user__first_name', 'user__last_name']
    ordering_fields = ['created_at', 'action', 'entity_type']


class AuditLogDetailView(generics.RetrieveAPIView):
    """
    System Admin only: View detailed snapshot of a single audit log entry.
    """
    serializer_class = AuditLogSerializer
    permission_classes = [IsSystemAdmin]
    queryset = AuditLog.objects.select_related('user').all()
    lookup_field = 'id'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return success_response(
            data=serializer.data,
            message="Audit log details retrieved successfully."
        )