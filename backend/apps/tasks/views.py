from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from utils.permissions import IsAdminOrDepartmentAdmin
from utils.responses import success_response

from .models import Task, TaskExtension
from .serializers import TaskSerializer, TaskExtensionSerializer
from .permissions import IsDepartmentAdmin
from .services import (
    accept_report_and_create_task,
    approve_or_reject_extension,
    mark_task_completed,
    reopen_task,
    request_task_extension,
    verify_task_completion,
)


class TaskViewSet(viewsets.ModelViewSet):
    """
    Full lifecycle management of infrastructure maintenance tasks.
    """
    queryset = Task.objects.select_related(
        'department', 'report', 'assigned_contractor', 'asset'
    ).prefetch_related('extensions').order_by('-created_at')
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'priority', 'department']
    search_fields = ['task_number', 'title']
    ordering_fields = ['created_at', 'current_deadline', 'priority']

    @staticmethod
    def _parse_boolean(value):
        if isinstance(value, bool):
            return value
        if isinstance(value, str) and value.lower() in {'true', 'false'}:
            return value.lower() == 'true'
        return None

    def get_queryset(self):
        user = self.request.user
        user_role = getattr(user, 'role', None)

        if user.is_staff or user_role == 'SYSTEM_ADMIN':
            return self.queryset

        if user_role == 'DEPARTMENT_ADMIN':
            dept = getattr(user, 'managed_department', None)
            if dept:
                return self.queryset.filter(department=dept)

        # Citizens see tasks related to their reports
        return self.queryset.filter(report__citizen=user)

    @action(detail=False, methods=['post'], url_path='accept-report', permission_classes=[IsAuthenticated, IsDepartmentAdmin])
    def accept_report(self, request):
        """
        POST /api/v1/tasks/accept-report/
        Department admin accepts a report and creates a maintenance task.
        Body: {"report_id": "uuid", "deadline": "ISO-8601", "title": "Fix pothole", "description": "..."}
        """
        report_id = request.data.get('report_id')
        deadline = request.data.get('deadline')
        title = request.data.get('title')
        description = request.data.get('description', '')

        if not all([report_id, deadline, title]):
            return Response(
                {"error": "'report_id', 'deadline', and 'title' are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            from django.utils.dateparse import parse_datetime
            parsed_deadline = parse_datetime(deadline)
            if not parsed_deadline:
                raise ValueError("Invalid datetime format.")

            task = accept_report_and_create_task(
                user=request.user,
                report_id=report_id,
                deadline=parsed_deadline,
                title=title,
                description=description,
            )
            serializer = self.get_serializer(task)
            return success_response(
                data=serializer.data,
                message="Report accepted. Task created successfully.",
                status_code=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='mark-completed', permission_classes=[IsAuthenticated, IsDepartmentAdmin])
    def mark_completed(self, request, pk=None):
        """
        POST /api/v1/tasks/<id>/mark-completed/
        Department admin marks a task as completed, awaiting citizen verification.
        Body: {"completion_notes": "Pothole filled and road resurfaced."}
        """
        completion_notes = request.data.get('completion_notes', '')
        try:
            task = mark_task_completed(
                user=request.user,
                task_id=pk,
                completion_notes=completion_notes,
            )
            serializer = self.get_serializer(task)
            return success_response(data=serializer.data, message="Task marked as completed. Awaiting citizen verification.")
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='verify', permission_classes=[IsAuthenticated])
    def verify(self, request, pk=None):
        """
        POST /api/v1/tasks/<id>/verify/
        Citizen verifies completion of a task.
        Body: {"accepted": true, "notes": "Looks good!"}
        """
        accepted = self._parse_boolean(request.data.get('accepted'))
        notes = request.data.get('notes', '')

        if accepted is None:
            return Response({"error": "'accepted' (boolean) is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            task = verify_task_completion(
                user=request.user,
                task_id=pk,
                accepted=accepted,
                notes=notes,
            )
            serializer = self.get_serializer(task)
            return success_response(data=serializer.data, message="Task verification recorded.")
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='request-extension', permission_classes=[IsAuthenticated, IsDepartmentAdmin])
    def request_extension(self, request, pk=None):
        """
        POST /api/v1/tasks/<id>/request-extension/
        Department admin requests a deadline extension.
        Body: {"requested_deadline": "ISO-8601", "reason": "...", "supporting_url": "..."}
        """
        requested_deadline = request.data.get('requested_deadline')
        reason = request.data.get('reason', '')
        supporting_url = request.data.get('supporting_url')

        if not requested_deadline or not reason:
            return Response(
                {"error": "'requested_deadline' and 'reason' are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            from django.utils.dateparse import parse_datetime
            parsed = parse_datetime(requested_deadline)
            if not parsed:
                raise ValueError("Invalid datetime format.")

            extension = request_task_extension(
                user=request.user,
                task_id=pk,
                requested_deadline=parsed,
                reason=reason,
                supporting_url=supporting_url,
            )
            serializer = TaskExtensionSerializer(extension)
            return success_response(data=serializer.data, message="Extension request submitted.", status_code=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='process-extension', permission_classes=[IsAuthenticated, IsAdminOrDepartmentAdmin])
    def process_extension(self, request):
        """
        POST /api/v1/tasks/process-extension/
        Admin approves or rejects a deadline extension.
        Body: {"extension_id": "uuid", "approved": true, "review_notes": "Granted due to supply delays."}
        """
        extension_id = request.data.get('extension_id')
        approved = self._parse_boolean(request.data.get('approved'))
        review_notes = request.data.get('review_notes', '')

        if extension_id is None or approved is None:
            return Response(
                {"error": "'extension_id' and 'approved' (boolean) are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            extension = approve_or_reject_extension(
                extension_id=extension_id,
                reviewed_by_user=request.user,
                approved=approved,
                review_notes=review_notes,
            )
            serializer = TaskExtensionSerializer(extension)
            return success_response(data=serializer.data, message="Extension request processed.")
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='reopen', permission_classes=[IsAuthenticated, IsAdminOrDepartmentAdmin])
    def reopen(self, request, pk=None):
        """
        POST /api/v1/tasks/<id>/reopen/
        Admin reopens a task that was incorrectly completed.
        Body: {"reason": "..."}
        """
        reason = request.data.get('reason', '')
        try:
            task = reopen_task(task_id=pk, user=request.user, reason=reason)
            serializer = self.get_serializer(task)
            return success_response(data=serializer.data, message="Task reopened.")
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)