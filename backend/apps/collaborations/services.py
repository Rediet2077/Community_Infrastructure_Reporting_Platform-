from django.core.exceptions import ValidationError

from .models import Collaboration


def create_collaboration_request(requesting_dept, target_dept, task, requested_by, reason):
    if requesting_dept == target_dept:
        raise ValidationError("Requesting and target departments cannot be the same.")

    return Collaboration.objects.create(
        primary_department=requesting_dept,
        supporting_department=target_dept,
        report=task.report,
        requested_by=requested_by,
        reason=reason,
        status=Collaboration.Status.REQUESTED,
    )


def respond_to_collaboration(request_id, reviewer_user, approved: bool, response_notes=""):
    try:
        collaboration = Collaboration.objects.get(id=request_id)
    except Collaboration.DoesNotExist:
        raise ValidationError("Collaboration request not found.")

    if collaboration.status != Collaboration.Status.REQUESTED:
        raise ValidationError("This collaboration request has already been processed.")

    collaboration.status = (
        Collaboration.Status.ACCEPTED
        if approved
        else Collaboration.Status.REJECTED
    )
    collaboration.response_note = response_notes
    collaboration.save(update_fields=['status', 'response_note', 'updated_at'])
    return collaboration
