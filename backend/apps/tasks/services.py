from django.db import transaction
from django.utils import timezone
from apps.reports.models import Report
from apps.tasks.models import Task, TaskExtension
from rest_framework.exceptions import PermissionDenied, ValidationError

@transaction.atomic
def accept_report_and_create_task(user, report_id: str, deadline, title: str, description: str = "") -> Task:
    """
    Department accepts a citizen report, creating an actionable task with a deadline.
    """
    # 1. Enforce Role & Ownership
    try:
        department = user.managed_department
    except AttributeError:
        raise PermissionDenied("Only department admins can accept tasks.")

    report = Report.objects.select_for_update().get(id=report_id)

    # 2. Validate State
    if report.status not in [Report.Status.SUBMITTED, Report.Status.UNDER_REVIEW]:
        raise ValidationError(f"Cannot accept a report currently in {report.status} status.")
    
    if deadline <= timezone.now():
        raise ValidationError("The deadline must be in the future.")

    # 3. Create the Task
    # Assuming task_number generation logic is similar to report_number
    import uuid
    task_number = f"TSK-{uuid.uuid4().hex[:8].upper()}"

    task = Task.objects.create(
        task_number=task_number,
        report=report,
        asset=report.asset,
        department=department,
        title=title,
        description=description,
        priority=report.priority,
        status=Task.Status.ACCEPTED,
        original_deadline=deadline,
        current_deadline=deadline,
        accepted_at=timezone.now()
    )

    # 4. Update the Report Status
    report.status = Report.Status.ACCEPTED
    report.save(update_fields=['status', 'updated_at'])

    return task


@transaction.atomic
def request_task_extension(user, task_id: str, requested_deadline, reason: str, supporting_url: str = None) -> TaskExtension:
    """
    Creates an auditable extension request for a task that cannot meet its deadline.
    """
    try:
        department = user.managed_department
    except AttributeError:
        raise PermissionDenied("Only department admins can request extensions.")

    task = Task.objects.get(id=task_id)

    if task.department != department:
        raise PermissionDenied("You can only request extensions for your department's tasks.")

    if task.status in [Task.Status.COMPLETED_PENDING_VERIFICATION, Task.Status.VERIFIED, Task.Status.CANCELLED]:
        raise ValidationError("Cannot extend a completed or cancelled task.")

    if requested_deadline <= task.current_deadline:
        raise ValidationError("Requested deadline must be later than the current deadline.")

    # Create the extension request
    extension = TaskExtension.objects.create(
        task=task,
        requested_by=user,
        original_deadline=task.current_deadline,
        requested_deadline=requested_deadline,
        reason=reason,
        supporting_url=supporting_url,
        status=TaskExtension.Status.PENDING
    )

    return extension

@transaction.atomic
def mark_task_completed(user, task_id: str, completion_notes: str) -> Task:
    """
    Marks a task as completed pending verification, avoiding auto-closure[cite: 1].
    """
    try:
        department = user.managed_department
    except AttributeError:
        raise PermissionDenied("Only department admins can complete tasks.")

    task = Task.objects.select_for_update().get(id=task_id)

    if task.department != department:
        raise PermissionDenied("Cannot complete tasks outside your department.")

    if task.status not in [Task.Status.ACCEPTED, Task.Status.IN_PROGRESS, Task.Status.REOPENED]:
        raise ValidationError("Task is not in a valid state to be completed.")

    # Update Task
    task.status = Task.Status.COMPLETED_PENDING_VERIFICATION
    task.progress_percent = 100
    task.completed_at = timezone.now()
    task.completion_notes = completion_notes
    task.save()

    # Update linked Report
    report = task.report
    report.status = Report.Status.PENDING_VERIFICATION
    report.save(update_fields=['status', 'updated_at'])

    # TODO: Trigger notification to the Citizen that the work is ready for verification

    return task