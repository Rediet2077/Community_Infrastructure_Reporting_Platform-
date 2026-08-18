import uuid
from django.db import models
from django.conf import settings

class Media(models.Model):
    class EntityType(models.TextChoices):
        REPORT = 'REPORT', 'Report'
        TASK = 'TASK', 'Task'
        DISPUTE = 'DISPUTE', 'Dispute'
        ASSET = 'ASSET', 'Asset'

    class FileType(models.TextChoices):
        IMAGE = 'IMAGE', 'Image'
        VIDEO = 'VIDEO', 'Video'
        AUDIO = 'AUDIO', 'Audio'
        DOCUMENT = 'DOCUMENT', 'Document'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    entity_type = models.CharField(max_length=20, choices=EntityType.choices)
    entity_id = models.UUIDField()
    
    file_type = models.CharField(max_length=20, choices=FileType.choices)
    file_url = models.TextField()
    
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.file_type} for {self.entity_type} {self.entity_id}"