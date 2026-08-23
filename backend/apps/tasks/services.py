from django.utils import timezone
from django.db import transaction
from rest_framework.exceptions import PermissionDenied, ValidationError
from utils.enums import TaskStatus, TaskExtensionStatus, ReportStatus
from apps.tasks.models import Task, TaskExtension
from apps.reports.models import Report


def _get_department(user):
    """Helper to resolve the department managed by this user."""
    dept = getattr(user, 'managed_department', None)
    if dept is None:
        raise PermissionDenied("Only department admins can perform this action.")
    return dept


@transaction.atomic
def accept_report_and_create_task(user, report_id: str, deadline, title: str, description: str = "") -> Task:
    """
    Department admin accepts a citizen report, creating an actionable task with a deadline.
    Transitions: Report SUBMITTED/UNDER_REVIEW -> ACCEPTED, new Task created in ACCEPTED state.
    """
    import uuid

    department = _get_department(user)
    report = Report.objects.select_for_update().get(id=report_id)

    if report.asset_id is None:
        raise ValidationError("Cannot create a task for a report without an asset.")

    # Validate report state
    valid_states = [ReportStatus.SUBMITTED, ReportStatus.UNDER_REVIEW, ReportStatus.REOPENED]
    if report.status not in valid_states:
        raise ValidationError(f"Cannot accept a report in '{report.status}' status.")

    if deadline <= timezone.now():
        raise ValidationError("The deadline must be in the future.")

    task_number = f"TSK-{uuid.uuid4().hex[:8].upper()}"

    task = Task.objects.create(
        task_number=task_number,
        report=report,
        asset=report.asset,
        department=department,
        title=title,
        description=description,
        priority=report.priority,
        status=TaskStatus.ACCEPTED,
        original_deadline=deadline,
        current_deadline=deadline,
        accepted_at=timezone.now(),
    )

    report.status = ReportStatus.ACCEPTED
    report.save(update_fields=['status', 'updated_at'])

    # Notify citizen
    try:
        from apps.notifications.services import create_notification
        create_notification(
            user=report.citizen,
            title="Your report has been accepted",
            message=f"Report '{report.title}' has been accepted by {department.name}. Work is scheduled to begin.",
            notification_type="REPORT_ACCEPTED",
            entity_type="REPORT",
            entity_id=report.id,
        )
    except Exception:
        pass  # Notifications are non-critical

    return task


@transaction.atomic
def request_task_extension(user, task_id: str, requested_deadline, reason: str, supporting_url: str = None) -> TaskExtension:
    """
    Creates an auditable extension request for a task that cannot meet its deadline.
    """
    department = _get_department(user)
    task = Task.objects.select_for_update().get(id=task_id)

    if task.department_id != department.pk:
        raise PermissionDenied("You can only request extensions for your department's tasks.")

    terminal_states = [TaskStatus.COMPLETED_PENDING_VERIFICATION, TaskStatus.VERIFIED, TaskStatus.CANCELLED]
    if task.status in terminal_states:
        raise ValidationError("Cannot extend a completed or cancelled task.")

    if requested_deadline <= task.current_deadline:
        raise ValidationError("Requested deadline must be later than the current deadline.")

    extension = TaskExtension.objects.create(
        task=task,
        requested_by=user,
        original_deadline=task.current_deadline,
        requested_deadline=requested_deadline,
        reason=reason,
        supporting_url=supporting_url,
        status=TaskExtensionStatus.PENDING,
    )

    return extension


@transaction.atomic
def mark_task_completed(user, task_id: str, completion_notes: str = "") -> Task:
    """
    Marks a task as completed pending citizen verification.
    Transitions: Task IN_PROGRESS/ACCEPTED/REOPENED -> COMPLETED_PENDING_VERIFICATION
                 Report -> PENDING_VERIFICATION
    """
    department = _get_department(user)
    task = Task.objects.select_for_update().select_related('report__citizen', 'department').get(id=task_id)

    if task.department_id != department.pk:
        raise PermissionDenied("Cannot complete tasks outside your department.")

    valid_states = [TaskStatus.ACCEPTED, TaskStatus.IN_PROGRESS, TaskStatus.REOPENED]
    if task.status not in valid_states:
        raise ValidationError(f"Task cannot be completed from state '{task.status}'.")

    task.status = TaskStatus.COMPLETED_PENDING_VERIFICATION
    task.progress_percent = 100
    task.completed_at = timezone.now()
    if completion_notes:
        task.completion_notes = completion_notes
    task.save()

    # Update the linked report
    report = task.report
    report.status = ReportStatus.PENDING_VERIFICATION
    report.save(update_fields=['status', 'updated_at'])

    # Notify citizen for verification
    try:
        from apps.notifications.services import create_notification
        create_notification(
            user=report.citizen,
            title="Work completed – your verification needed",
            message=f"The maintenance work for '{report.title}' is complete. Please verify and confirm the fix.",
            notification_type="TASK_COMPLETED",
            entity_type="TASK",
            entity_id=task.id,
        )
    except Exception:
        pass

    return task


@transaction.atomic
def reopen_task(task_id: str, user=None, reason: str = "") -> Task:
    """
    Reopens a task when citizen verification fails or work is found incomplete.
    Transitions: COMPLETED_PENDING_VERIFICATION -> REOPENED
    """
    task = Task.objects.select_for_update().select_related('assigned_contractor', 'report').get(id=task_id)

    if user is not None and not user.is_staff and getattr(user, 'role', None) != 'SYSTEM_ADMIN':
        user_department = getattr(user, 'managed_department', None)
        if user_department != task.department and task.report.citizen_id != user.pk:
            raise PermissionDenied("You cannot reopen a task outside your department or report.")

    if task.status != TaskStatus.COMPLETED_PENDING_VERIFICATION:
        raise ValidationError("Only tasks pending verification can be reopened.")

    task.status = TaskStatus.REOPENED
    task.progress_percent = 50
    task.completed_at = None
    task.save()

    # Notify assigned contractor if present
    try:
        from apps.notifications.services import create_notification
        recipient = task.assigned_contractor or (task.department.admin_user if task.department else None)
        if recipient:
            create_notification(
                user=recipient,
                title=f"Task Reopened: {task.title}",
                message=f"Task '{task.title}' was reopened. Reason: {reason or 'Citizen verification failed.'}",
                notification_type="TASK_REOPENED",
                entity_type="TASK",
                entity_id=task.id,
            )
    except Exception:
        pass

    return task


@transaction.atomic
def approve_or_reject_extension(extension_id: str, reviewed_by_user, approved: bool, review_notes: str = "") -> TaskExtension:
    """
    Approves or rejects a task deadline extension request.
    """
    try:
        extension = TaskExtension.objects.select_for_update().select_related('task', 'requested_by').get(id=extension_id)
    except TaskExtension.DoesNotExist:
        raise ValidationError("Extension request not found.")

    if extension.status != TaskExtensionStatus.PENDING:
        raise ValidationError("This extension request has already been processed.")

    if not reviewed_by_user.is_staff and getattr(reviewed_by_user, 'role', None) != 'SYSTEM_ADMIN':
        reviewer_department = getattr(reviewed_by_user, 'managed_department', None)
        if reviewer_department is None or extension.task.department_id != reviewer_department.pk:
            raise PermissionDenied("You can only review extensions for your department's tasks.")

    if approved:
        extension.status = TaskExtensionStatus.APPROVED
        # Update the task's current deadline
        extension.task.current_deadline = extension.requested_deadline
        extension.task.save(update_fields=['current_deadline', 'updated_at'])
    else:
        extension.status = TaskExtensionStatus.REJECTED

    extension.reviewed_by = reviewed_by_user
    extension.review_note = review_notes
    extension.reviewed_at = timezone.now()
    extension.save()

    # Notify the person who requested the extension
    try:
        from apps.notifications.services import create_notification
        action_word = "approved" if approved else "rejected"
        create_notification(
            user=extension.requested_by,
            title=f"Extension request {action_word}",
            message=f"Your deadline extension request for task '{extension.task.title}' was {action_word}. {review_notes}",
            notification_type="EXTENSION_REVIEWED",
            entity_type="TASK",
            entity_id=extension.task.id,
        )
    except Exception:
        pass

    return extension


@transaction.atomic
def verify_task_completion(user, task_id: str, accepted: bool, notes: str = "") -> Task:
    """
    Citizen verifies task completion.
    - If accepted: Task -> VERIFIED, Report -> RESOLVED
    - If rejected: Task -> REOPENED, Report stays PENDING_VERIFICATION
    """
    task = Task.objects.select_for_update().select_related('report').get(id=task_id)

    # Only the citizen who submitted the report or admin can verify
    if not user.is_staff and task.report.citizen_id != user.pk:
        raise PermissionDenied("Only the citizen who submitted this report can verify completion.")

    if task.status != TaskStatus.COMPLETED_PENDING_VERIFICATION:
        raise ValidationError("Task is not pending verification.")

    if accepted:
        task.status = TaskStatus.VERIFIED
        task.verified_at = timezone.now()
        task.save()

        task.report.status = ReportStatus.RESOLVED
        task.report.save(update_fields=['status', 'updated_at'])
    else:
        return reopen_task(task_id=task_id, user=user, reason=notes)

    return task