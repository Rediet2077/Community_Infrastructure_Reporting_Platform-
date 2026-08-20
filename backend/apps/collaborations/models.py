import uuid
from django.db import models
from django.conf import settings
from utils.enums import CollaborationStatus

class Collaboration(models.Model):
    Status = CollaborationStatus

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    report = models.ForeignKey('reports.Report', on_delete=models.CASCADE, related_name='collaborations')
    
    primary_department = models.ForeignKey('departments.Department', on_delete=models.CASCADE, related_name='primary_collaborations')
    supporting_department = models.ForeignKey('departments.Department', on_delete=models.CASCADE, related_name='supporting_collaborations')
    
    requested_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=CollaborationStatus.choices, default=CollaborationStatus.REQUESTED)
    response_note = models.TextField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)