from django.core.exceptions import ValidationError
from .models import Notification


def create_notification(recipient, title, message, notification_type='GENERAL', related_object_id=None):
    """
    Creates a new notification record for a given user.
    """
    if not recipient or not title or not message:
        raise ValidationError("Recipient, title, and message are required to create a notification.")

    notification = Notification.objects.create(
        recipient=recipient,
        title=title,
        message=message,
        notification_type=notification_type,
        related_object_id=related_object_id,
    )
    return notification


def mark_notification_as_read(notification_id, user):
    """
    Marks a single notification as read for the requesting user.
    """
    try:
        notification = Notification.objects.get(id=notification_id, recipient=user)
    except Notification.DoesNotExist:
        raise ValidationError("Notification not found or access denied.")

    notification.is_read = True
    notification.save()
    return notification


def mark_all_notifications_as_read(user):
    """
    Marks all unread notifications for a user as read.
    """
    updated_count = Notification.objects.filter(recipient=user, is_read=False).update(is_read=True)
    return updated_count