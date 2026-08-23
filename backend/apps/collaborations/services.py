from django.db import transaction
from rest_framework.exceptions import PermissionDenied, ValidationError
from utils.enums import CollaborationStatus
from .models import Collaboration


def _get_department(user):
    department = getattr(user, 'managed_department', None)
    if department is None:
        raise PermissionDenied("Only department admins can manage collaboration requests.")
    return department


@transaction.atomic
def create_collaboration_request(user, report_id: str, supporting_department_id: str, reason: str) -> Collaboration:
    from apps.reports.models import Report
    from apps.departments.models import Department

    primary_department = _get_department(user)
    try:
        report = Report.objects.get(id=report_id)
    except Report.DoesNotExist:
        raise ValidationError("Report not found.")

    try:
        supporting_department = Department.objects.get(id=supporting_department_id)
    except Department.DoesNotExist:
        raise ValidationError("The target department does not exist.")

    if primary_department.pk == supporting_department.pk:
        raise ValidationError("Cannot request collaboration with your own department.")

    if Collaboration.objects.filter(
        report=report,
        primary_department=primary_department,
        supporting_department=supporting_department,
        status__in=[CollaborationStatus.REQUESTED, CollaborationStatus.ACCEPTED],
    ).exists():
        raise ValidationError("A collaboration request for this report and department already exists.")

    collaboration = Collaboration.objects.create(
        primary_department=primary_department,
        supporting_department=supporting_department,
        report=report,
        requested_by=user,
        reason=reason,
        status=CollaborationStatus.REQUESTED,
    )

    supporting_admin = supporting_department.admin_user
    if supporting_admin:
        from apps.notifications.services import create_notification
        create_notification(
            user=supporting_admin,
            title=f"Collaboration Request from {primary_department.name}",
            message=f"{primary_department.name} requested collaboration on report '{report.report_number}'. Reason: {reason}",
            notification_type="COLLABORATION_REQUESTED",
            entity_type="COLLABORATION",
            entity_id=collaboration.id,
        )

    return collaboration


@transaction.atomic
def respond_to_collaboration(request_id: str, reviewer_user, approved: bool, response_notes: str = "") -> Collaboration:
    try:
        collaboration = Collaboration.objects.select_for_update().select_related(
            'primary_department__admin_user', 'supporting_department', 'report'
        ).get(id=request_id)
    except Collaboration.DoesNotExist:
        raise ValidationError("Collaboration request not found.")

    reviewer_department = getattr(reviewer_user, 'managed_department', None)
    if reviewer_department and collaboration.supporting_department_id != reviewer_department.pk:
        raise PermissionDenied("You can only respond to collaboration requests directed at your department.")

    if collaboration.status != CollaborationStatus.REQUESTED:
        raise ValidationError("This collaboration request has already been processed.")

    collaboration.status = (
        CollaborationStatus.ACCEPTED
        if approved
        else CollaborationStatus.REJECTED
    )
    collaboration.response_note = response_notes
    collaboration.save(update_fields=['status', 'response_note', 'updated_at'])

    requester = collaboration.primary_department.admin_user
    if requester:
        from apps.notifications.services import create_notification
        action = "accepted" if approved else "rejected"
        create_notification(
            user=requester,
            title=f"Collaboration {action}",
            message=f"Your collaboration request for report '{collaboration.report.report_number}' was {action}. Notes: {response_notes}",
            notification_type="COLLABORATION_RESPONDED",
            entity_type="COLLABORATION",
            entity_id=collaboration.id,
        )

    return collaboration
