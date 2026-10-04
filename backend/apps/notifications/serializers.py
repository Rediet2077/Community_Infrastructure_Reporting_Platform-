from rest_framework import serializers


class NotificationSerializer(serializers.Serializer):
    """
    Placeholder serializer for notifications
    """
    id = serializers.UUIDField()
    title = serializers.CharField()
    message = serializers.CharField()
    is_read = serializers.BooleanField()
    created_at = serializers.DateTimeField()
