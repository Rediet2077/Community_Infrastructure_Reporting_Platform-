from django.core.exceptions import ValidationError
from django.utils import timezone
from .models import Dispute


def resolve_dispute(dispute_id, reviewed_by_user, resolution_notes, new_status=Dispute.Status.ACCEPTED):
    """
    Updates the resolution status of a dispute with official review notes.
    """
    try:
        dispute = Dispute.objects.get(id=dispute_id)
    except Dispute.DoesNotExist:
        raise ValidationError("Dispute not found.")

    if dispute.status in [Dispute.Status.ACCEPTED, Dispute.Status.REJECTED]:
        raise ValidationError("This dispute has already been resolved.")

    if new_status not in [Dispute.Status.ACCEPTED, Dispute.Status.REJECTED]:
        raise ValidationError("Status must be ACCEPTED or REJECTED.")

    dispute.status = new_status
    dispute.review_note = resolution_notes
    dispute.reviewed_by = reviewed_by_user
    dispute.reviewed_at = timezone.now()
    dispute.save(update_fields=['status', 'review_note', 'reviewed_by', 'reviewed_at'])

    return dispute
