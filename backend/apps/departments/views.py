from django.contrib.auth import get_user_model
from rest_framework import status, viewsets, filters
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from utils.permissions import IsSystemAdmin, IsAdminOrDepartmentAdmin
from utils.responses import success_response
from utils.audit import record_audit_log
from apps.users.serializers import UserSerializer

from .models import Department
from .serializers import DepartmentSerializer

User = get_user_model()


class DepartmentViewSet(viewsets.ModelViewSet):
    """
    CRUD endpoints for managing infrastructure departments.
    - System Admins: Full CRUD
    - Department Admins: Read-only
    - Others: No access
    """
    queryset = Department.objects.select_related('admin_user').prefetch_related('tasks', 'assets').order_by('name')
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated, IsAdminOrDepartmentAdmin]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['is_active']
    search_fields = ['name', 'code', 'email']
    ordering_fields = ['name', 'created_at']

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy', 'assign_admin']:
            return [IsSystemAdmin()]
        return [IsAuthenticated(), IsAdminOrDepartmentAdmin()]

    def perform_create(self, serializer):
        dept = serializer.save()
        record_audit_log(
            action="DEPARTMENT_CREATED",
            entity_type="Department",
            entity_id=dept.id,
            actor=self.request.user,
            request=self.request,
            new_values={"name": dept.name, "code": dept.code},
        )

    @action(detail=True, methods=['post'], url_path='assign-admin')
    def assign_admin(self, request, pk=None):
        """
        POST /api/v1/departments/<id>/assign-admin/
        Assign a user as the department administrator.
        Body: {"user_id": "uuid"}
        """
        department = self.get_object()
        user_id = request.data.get('user_id')

        if not user_id:
            return Response({"error": "'user_id' is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        old_admin = department.admin_user
        department.admin_user = user
        department.save(update_fields=['admin_user', 'updated_at'])

        record_audit_log(
            action="DEPARTMENT_ADMIN_ASSIGNED",
            entity_type="Department",
            entity_id=department.id,
            actor=request.user,
            request=request,
            old_values={"admin_user": str(old_admin.id) if old_admin else None},
            new_values={"admin_user": str(user.id), "email": user.email},
        )

        return success_response(
            data=DepartmentSerializer(department).data,
            message=f"'{user.email}' assigned as admin of {department.name}."
        )

    @action(detail=True, methods=['get'], url_path='overview')
    def department_overview(self, request, pk=None):
        """
        GET /api/v1/departments/<id>/overview/
        Returns task statistics for the department dashboard.
        """
        department = self.get_object()
        tasks = department.tasks.all()

        data = {
            "department_id": str(department.id),
            "department_name": department.name,
            "is_active": department.is_active,
            "total_tasks": tasks.count(),
            "pending_tasks": tasks.filter(status='PENDING').count(),
            "accepted_tasks": tasks.filter(status='ACCEPTED').count(),
            "in_progress_tasks": tasks.filter(status='IN_PROGRESS').count(),
            "completed_pending_verification": tasks.filter(status='COMPLETED_PENDING_VERIFICATION').count(),
            "verified_tasks": tasks.filter(status='VERIFIED').count(),
            "reopened_tasks": tasks.filter(status='REOPENED').count(),
            "total_assets": department.assets.count(),
            "active_assets": department.assets.filter(status='ACTIVE').count(),
        }
        return success_response(data=data, message="Department overview retrieved.")