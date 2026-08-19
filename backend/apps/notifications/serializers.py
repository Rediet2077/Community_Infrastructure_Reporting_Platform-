from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Notification

User = get_user_model()


class NotificationSerializer(serializers.ModelSerializer):
    # Flexible field mappings for client app support
    recipient_email = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = [
            'id',
            'user' if hasattr(Notification, 'user') else 'recipient',
            'recipient_email',
            'type' if hasattr(Notification, 'type') else 'notification_type',
            'title',
            'message',
            'entity_type',
            'entity_id',
            'is_read',
            'created_at',
            'read_at',
        ]
        # Only 'is_read' and 'read_at' can be updated by the API client
        read_only_fields = [
            'id',
            'user' if hasattr(Notification, 'user') else 'recipient',
            'type' if hasattr(Notification, 'type') else 'notification_type',
            'title',
            'message',
            'entity_type',
            'entity_id',
            'created_at',
        ]

    def get_recipient_email(self, obj):
        target_user = getattr(obj, 'user', None) or getattr(obj, 'recipient', None)
        return target_user.email if target_user else None