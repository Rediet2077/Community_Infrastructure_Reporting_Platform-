from django.core.exceptions import ValidationError
from .models import Dispute, DisputeComment


def raise_dispute(raised_by, department, title, description, task=None):
    """
    Creates and logs a new dispute under a department or task.
    """
    if not title or not description:
        raise ValidationError("Both 'title' and 'description' are required to raise a dispute.")

    dispute = Dispute.objects.create(
        raised_by=raised_by,
        department=department,
        task=task,
        title=title,
        description=description,
        status=Dispute.Status.OPEN,
    )
    return dispute


def resolve_dispute(dispute_id, resolved_by_user, resolution_notes, new_status='RESOLVED'):
    """
    Updates the resolution status of a dispute with official review notes.
    """
    try:
        dispute = Dispute.objects.get(id=dispute_id)
    except Dispute.DoesNotExist:
        raise ValidationError("Dispute not found.")

    if dispute.status in [Dispute.Status.RESOLVED, Dispute.Status.CLOSED]:
        raise ValidationError("This dispute is already closed or resolved.")

    dispute.status = new_status
    dispute.resolution_notes = resolution_notes
    dispute.resolved_by = resolved_by_user
    dispute.save()

    return dispute


def add_dispute_comment(dispute_id, author_user, comment_text):
    """
    Appends a discussion or evidence note to an active dispute thread.
    """
    try:
        dispute = Dispute.objects.get(id=dispute_id)
    except Dispute.DoesNotExist:
        raise ValidationError("Dispute not found.")

    if not comment_text:
        raise ValidationError("Comment text cannot be empty.")

    comment = DisputeComment.objects.create(
        dispute=dispute,
        author=author_user,
        comment=comment_text,
    )
    return comment