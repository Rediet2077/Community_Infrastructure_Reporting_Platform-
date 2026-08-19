from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Task, TaskExtension
from .serializers import TaskSerializer, TaskExtensionSerializer
from .services import request_deadline_extension, mark_task_completed
from common.permissions import IsTaskDepartmentAdmin

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated, IsTaskDepartmentAdmin]

    def get_queryset(self):
        user = self.request.user
        # System admins see all tasks
        if user.role == 'SYSTEM_ADMIN':
            return Task.objects.all()
        # Department admins see tasks for their assigned department
        if hasattr(user, 'managed_department'):
            return Task.objects.filter(department=user.managed_department)
        # Citizens see tasks for reports they submitted
        return Task.objects.filter(report__citizen=user)

    @action(detail=True, methods=['post'], url_path='request-extension')
    def request_extension(self, request, pk=None):
        """
        Endpoint for department admins to request a deadline extension.
        """
        task = self.get_object()
        serializer = TaskExtensionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        extension = request_deadline_extension(
            task_id=task.id,
            user=request.user,
            requested_deadline=serializer.validated_data['requested_deadline'],
            reason=serializer.validated_data['reason'],
            supporting_url=serializer.validated_data.get('supporting_url')
        )
        return Response(TaskExtensionSerializer(extension).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'], url_path='complete')
    def complete_task(self, request, pk=None):
        """
        Endpoint to mark a task as completed (pending verification).
        """
        task = self.get_object()
        completion_notes = request.data.get('completion_notes', '')
        updated_task = mark_task_completed(task.id, completion_notes)
        return Response(TaskSerializer(updated_task).data, status=status.HTTP_200_OK)