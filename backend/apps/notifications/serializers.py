from rest_framework import serializers
from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    user_email = serializers.ReadOnlyField(source='user.email')

    class Meta:
        model = Notification
        fields = [
            'id',
            'user',
            'user_email',
            'type',
            'title',
            'message',
            'entity_type',
            'entity_id',
            'is_read',
            'created_at',
            'read_at',
        ]
        read_only_fields = [
            'id', 'user', 'user_email', 'type', 'title',
            'message', 'entity_type', 'entity_id', 'created_at',
        ]