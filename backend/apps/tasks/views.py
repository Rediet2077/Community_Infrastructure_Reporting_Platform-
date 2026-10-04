from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Task, TaskExtension
from .serializers import TaskSerializer, TaskExtensionSerializer
from .permissions import IsDepartmentAdmin, IsTaskDepartmentAdmin
from .services import (
    approve_or_reject_extension,
    mark_task_completed,
    reopen_task,
    request_task_extension,
)


class TaskViewSet(viewsets.ModelViewSet):
    """
    API ViewSet for managing infrastructure tasks, handling completions,
    and processing deadline extensions.
    """
    queryset = Task.objects.select_related('department', 'report', 'assigned_contractor').all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, IsDepartmentAdmin, IsTaskDepartmentAdmin]

    def get_queryset(self):
        """
        Filters tasks based on user roles and department ownership.
        """
        user = self.request.user
        user_role = getattr(user, 'role', None)

        # System admins see all tasks
        if user.is_staff or user_role in ['SYSTEM_ADMIN', 'ADMIN']:
            return self.queryset

        # Contractors only see tasks assigned to them
        if user_role == 'CONTRACTOR':
            return self.queryset.filter(assigned_contractor=user)

        # Department admins see tasks for their specific department
        user_dept = getattr(user, 'managed_department', None) or getattr(user, 'department', None)
        if user_dept:
            return self.queryset.filter(department=user_dept)

        return self.queryset.none()

    @action(detail=True, methods=['post'], url_path='request-extension')
    def request_extension(self, request, pk=None):
        """
        POST /api/tasks/{id}/request-extension/
        Endpoint to submit a deadline extension request.
        """
        requested_deadline = request.data.get('requested_deadline')
        reason = request.data.get('reason', '')
        supporting_url = request.data.get('supporting_url', None)

        if not requested_deadline or not reason:
            return Response(
                {"error": "Both 'requested_deadline' and 'reason' are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            extension = request_task_extension(
                user=request.user,
                task_id=pk,
                requested_deadline=requested_deadline,
                reason=reason,
                supporting_url=supporting_url
            )
            serializer = TaskExtensionSerializer(extension)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='mark-completed')
    def mark_completed(self, request, pk=None):
        """
        POST /api/tasks/{id}/mark-completed/
        Endpoint to mark a task completed and trigger citizen notification.
        """
        completion_notes = request.data.get('completion_notes', '')

        try:
            task = mark_task_completed(
                user=request.user,
                task_id=pk,
                completion_notes=completion_notes,
            )
            serializer = self.get_serializer(task)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    @action(detail=True, methods=['post'], url_path='reopen')
    def reopen(self, request, pk=None):
        """
        POST /api/tasks/{id}/reopen/
        Reopens a task that failed verification.
        """
        reason = request.data.get('reason', '')
        try:
            task = reopen_task(task_id=pk, reason=reason)
            serializer = self.get_serializer(task)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='process-extension')
    def process_extension(self, request):
        """
        POST /api/tasks/process-extension/
        Approves or rejects an extension request.
        Body: {"extension_id": 1, "approved": true, "review_notes": "Granted"}
        """
        extension_id = request.data.get('extension_id')
        approved = request.data.get('approved')
        review_notes = request.data.get('review_notes', '')

        if extension_id is None or approved is None:
            return Response(
                {"error": "'extension_id' and 'approved' (boolean) are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            extension = approve_or_reject_extension(extension_id, approved, review_notes)
            serializer = TaskExtensionSerializer(extension)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)