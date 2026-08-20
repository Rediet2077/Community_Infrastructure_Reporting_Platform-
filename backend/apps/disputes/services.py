from django.utils import timezone
from django.db import transaction
from rest_framework.exceptions import PermissionDenied, ValidationError
from utils.enums import DisputeStatus, ReportStatus
from .models import Dispute


@transaction.atomic
def open_dispute(user, report_id: str, reason: str) -> Dispute:
    """
    A citizen opens a dispute on a resolved or rejected report.
    The report status transitions to DISPUTED.
    """
    from apps.reports.models import Report

    try:
        report = Report.objects.select_for_update().get(id=report_id)
    except Report.DoesNotExist:
        raise ValidationError("Report not found.")

    # Only the citizen who submitted the report can dispute it
    if report.citizen_id != user.pk:
        raise PermissionDenied("You can only dispute your own reports.")

    disputable_states = [ReportStatus.RESOLVED, ReportStatus.REJECTED, ReportStatus.PENDING_VERIFICATION]
    if report.status not in disputable_states:
        raise ValidationError(
            f"Cannot dispute a report in '{report.status}' state. "
            f"Reports can only be disputed when resolved, rejected, or pending verification."
        )

    # Check for existing open dispute
    if Dispute.objects.filter(report=report, status__in=[DisputeStatus.OPEN, DisputeStatus.UNDER_REVIEW]).exists():
        raise ValidationError("A dispute for this report is already open and under review.")

    dispute = Dispute.objects.create(
        report=report,
        submitted_by=user,
        reason=reason,
        status=DisputeStatus.OPEN,
    )

    report.status = ReportStatus.DISPUTED
    report.save(update_fields=['status', 'updated_at'])

    # Notify admins
    try:
        from apps.notifications.services import create_notification
        from django.contrib.auth import get_user_model
        User = get_user_model()
        admins = User.objects.filter(role='SYSTEM_ADMIN', is_active=True)
        for admin in admins:
            create_notification(
                user=admin,
                title=f"New Dispute Opened: {report.report_number}",
                message=f"Citizen {user.email} has disputed report '{report.title}'. Reason: {reason}",
                notification_type="DISPUTE_OPENED",
                entity_type="DISPUTE",
                entity_id=dispute.id,
            )
    except Exception:
        pass

    return dispute


@transaction.atomic
def resolve_dispute(dispute_id: str, reviewed_by_user, resolution_notes: str, new_status: str) -> Dispute:
    """
    System admin resolves or closes a dispute, updating its status and optionally
    reverting the report status if the dispute is accepted.
    """
    valid_resolution_statuses = [DisputeStatus.ACCEPTED, DisputeStatus.REJECTED]
    if new_status not in valid_resolution_statuses:
        raise ValidationError(
            f"Invalid resolution status '{new_status}'. Must be one of {valid_resolution_statuses}."
        )

    try:
        dispute = Dispute.objects.select_for_update().select_related('report', 'submitted_by').get(id=dispute_id)
    except Dispute.DoesNotExist:
        raise ValidationError("Dispute not found.")

    if dispute.status not in [DisputeStatus.OPEN, DisputeStatus.UNDER_REVIEW]:
        raise ValidationError("This dispute has already been resolved.")

    dispute.status = new_status
    dispute.reviewed_by = reviewed_by_user
    dispute.review_note = resolution_notes
    dispute.reviewed_at = timezone.now()
    dispute.save()

    # Update the report status based on the resolution
    report = dispute.report
    if new_status == DisputeStatus.ACCEPTED:
        # Dispute accepted = report goes back for re-processing
        report.status = ReportStatus.UNDER_REVIEW
    else:
        # Dispute rejected = report goes back to resolved
        report.status = ReportStatus.RESOLVED
    report.save(update_fields=['status', 'updated_at'])

    # Notify the citizen who raised the dispute
    try:
        from apps.notifications.services import create_notification
        action = "accepted" if new_status == DisputeStatus.ACCEPTED else "rejected"
        create_notification(
            user=dispute.submitted_by,
            title=f"Your dispute has been {action}",
            message=f"Your dispute for report '{report.title}' was {action}. Notes: {resolution_notes}",
            notification_type="DISPUTE_RESOLVED",
            entity_type="DISPUTE",
            entity_id=dispute.id,
        )
    except Exception:
        pass

    return dispute
