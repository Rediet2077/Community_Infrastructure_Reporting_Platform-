from rest_framework import serializers
from .models import AuditLog


class AuditLogSerializer(serializers.ModelSerializer):
    """
    Read-only serializer for displaying audit trail records to System Admins.
    """
    actor_email = serializers.EmailField(source='user.email', read_only=True, default=None)
    actor_name = serializers.SerializerMethodField()

    class Meta:
        model = AuditLog
        fields = [
            'id',
            'actor_email',
            'actor_name',
            'action',
            'entity_type',
            'entity_id',
            'old_values',
            'new_values',
            'reason',
            'ip_address',
            'user_agent',
            'created_at',
        ]
        read_only_fields = fields

    def get_actor_name(self, obj):
        if obj.user:
            return f"{obj.user.first_name} {obj.user.last_name}".strip()
        return "System"