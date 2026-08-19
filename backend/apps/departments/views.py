from django.contrib.auth import get_user_model
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.users.serializers import UserSerializer

from .models import Department
from .permissions import IsDepartmentAdmin
from .serializers import DepartmentSerializer

User = get_user_model()


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.select_related('admin_user').all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated, IsDepartmentAdmin]

    @action(detail=True, methods=['get'], url_path='staff')
    def list_staff(self, request, pk=None):
        """List the user currently assigned as the department administrator."""
        department = self.get_object()
        staff_users = User.objects.filter(pk=department.admin_user_id)
        serializer = UserSerializer(staff_users, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], url_path='assign-staff')
    def assign_staff(self, request, pk=None):
        """Assign a user as the department administrator."""
        department = self.get_object()
        user_id = request.data.get('user_id')

        if not user_id:
            return Response(
                {"error": "'user_id' is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        department.admin_user = user
        department.save(update_fields=['admin_user', 'updated_at'])
        return Response({"message": f"User '{user.email}' assigned to {department.name} successfully."})

    @action(detail=True, methods=['get'], url_path='overview')
    def department_overview(self, request, pk=None):
        """Return task statistics for the department dashboard."""
        department = self.get_object()
        tasks = department.tasks

        data = {
            "department_id": department.id,
            "department_name": department.name,
            "total_tasks": tasks.count(),
            "pending_tasks": tasks.filter(status='PENDING').count(),
            "in_progress_tasks": tasks.filter(status='IN_PROGRESS').count(),
            "completed_tasks": tasks.filter(status='COMPLETED_PENDING_VERIFICATION').count(),
        }
        return Response(data, status=status.HTTP_200_OK)