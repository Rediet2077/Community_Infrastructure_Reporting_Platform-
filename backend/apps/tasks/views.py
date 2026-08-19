from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Task, TaskExtension
from .serializers import TaskSerializer, TaskExtensionSerializer
from .permissions import IsDepartmentManagerOrAdmin, IsAssignedContractorOrManager
from .services import request_deadline_extension, mark_task_completed


class TaskViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing, creating, and updating infrastructure tasks.
    """
    queryset = Task.objects.select_related('department', 'report', 'assigned_contractor').all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, IsDepartmentManagerOrAdmin, IsAssignedContractorOrManager]

    def get_queryset(self):
        user = self.request.user
        user_role = getattr(user, 'role', None)

        # Contractors only see tasks assigned to them
        if user_role == 'CONTRACTOR':
            return self.queryset.filter(assigned_contractor=user)
        
        return self.queryset

    @action(detail=True, methods=['post'], url_path='request-extension')
    def request_extension(self, request, pk=None):
        """
        POST /api/tasks/{id}/request-extension/
        Submits a deadline extension request.
        """
        requested_deadline = request.data.get('requested_deadline')
        reason = request.data.get('reason', '')
        supporting_url = request.data.get('supporting_url', None)

        if not requested_deadline or not reason:
            return Response(
                {"error": "Both 'requested_deadline' and 'reason' are required fields."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            extension = request_deadline_extension(
                task_id=pk,
                requested_by_user=request.user,
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
        Marks a task as completed and triggers citizen verification notification.
        """
        completion_notes = request.data.get('completion_notes', '')

        try:
            task = mark_task_completed(task_id=pk, completion_notes=completion_notes)
            serializer = self.get_serializer(task)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)