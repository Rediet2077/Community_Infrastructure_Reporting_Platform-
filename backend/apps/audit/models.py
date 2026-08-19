import uuid
from django.db import models
from django.conf import settings


class AuditLog(models.Model):
    """
    Immutable system-wide audit log recording user actions, state transitions,
    and security events.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='audit_logs',
        help_text="The user/actor who performed the action. Null if system-generated."
    )

    action = models.CharField(
        max_length=100,
        help_text="Action performed, e.g., 'USER_REGISTERED', 'ROLE_UPDATED', 'REPORT_STATUS_CHANGED'."
    )
    entity_type = models.CharField(
        max_length=50,
        help_text="Target model/entity, e.g., 'User', 'Report', 'Task'."
    )
    entity_id = models.UUIDField(
        null=True,
        blank=True,
        help_text="UUID of the affected entity."
    )

    old_values = models.JSONField(
        null=True,
        blank=True,
        help_text="Snapshot of data before mutation."
    )
    new_values = models.JSONField(
        null=True,
        blank=True,
        help_text="Snapshot of data after mutation."
    )
    reason = models.TextField(
        null=True,
        blank=True,
        help_text="Optional reason or description for the action."
    )

    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        db_table = 'audit_logs'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['entity_type', 'entity_id']),
            models.Index(fields=['action']),
            models.Index(fields=['created_at']),
        ]

    def __str__(self):
        actor = self.user.email if self.user else "System"
        return f"[{self.created_at.strftime('%Y-%m-%d %H:%M:%S')}] {actor} - {self.action} on {self.entity_type} ({self.entity_id})"