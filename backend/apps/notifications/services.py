from django.utils import timezone
from rest_framework.exceptions import ValidationError
from .models import Notification


def create_notification(user, title: str, message: str, notification_type: str = "GENERAL",
                         entity_type: str = None, entity_id=None) -> Notification:
    """
    Central helper to create a Notification record for a given user.
    All callers in the platform use this consistent signature.
    """
    if not user or not title or not message:
        raise ValidationError("User, title, and message are required to create a notification.")

    return Notification.objects.create(
        user=user,
        type=notification_type,
        title=title,
        message=message,
        entity_type=entity_type,
        entity_id=entity_id,
    )


def mark_notification_as_read(notification_id, user) -> Notification:
    """
    Marks a single notification as read for the requesting user.
    """
    try:
        notification = Notification.objects.get(id=notification_id, user=user)
    except Notification.DoesNotExist:
        raise ValidationError("Notification not found or access denied.")

    if not notification.is_read:
        notification.is_read = True
        notification.read_at = timezone.now()
        notification.save(update_fields=['is_read', 'read_at'])

    return notification


def mark_all_notifications_as_read(user) -> int:
    """
    Marks all unread notifications for a user as read. Returns count of updated records.
    """
    now = timezone.now()
    updated_count = Notification.objects.filter(user=user, is_read=False).update(
        is_read=True,
        read_at=now
    )
    return updated_count