import uuid
from django.db import models
from django.conf import settings

class Notification(models.Model):
    class EntityType(models.TextChoices):
        REPORT = 'REPORT', 'Report'
        TASK = 'TASK', 'Task'
        DISPUTE = 'DISPUTE', 'Dispute'
        COLLABORATION = 'COLLABORATION', 'Collaboration'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    
    type = models.CharField(max_length=50) # System-defined strings (e.g., 'DEADLINE_WARNING')
    title = models.CharField(max_length=255)
    message = models.TextField()
    
    entity_type = models.CharField(max_length=20, choices=EntityType.choices, null=True, blank=True)
    entity_id = models.UUIDField(null=True, blank=True)
    
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    read_at = models.DateTimeField(null=True, blank=True)