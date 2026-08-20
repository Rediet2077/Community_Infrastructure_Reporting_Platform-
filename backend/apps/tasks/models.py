import uuid
from django.db import models
from django.conf import settings
from utils.enums import TaskPriority, TaskStatus, TaskExtensionStatus

class Task(models.Model):

    Status = TaskStatus

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    task_number = models.CharField(max_length=50, unique=True)
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)

    report = models.ForeignKey('reports.Report', on_delete=models.CASCADE, related_name='tasks')
    asset = models.ForeignKey('assets.Asset', on_delete=models.CASCADE, related_name='tasks')
    department = models.ForeignKey('departments.Department', on_delete=models.CASCADE, related_name='tasks')
    assigned_contractor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assigned_tasks'
    )

    priority = models.CharField(max_length=20, choices=TaskPriority.choices, default=TaskPriority.MEDIUM)
    status = models.CharField(max_length=40, choices=TaskStatus.choices, default=TaskStatus.PENDING)
    progress_percent = models.IntegerField(default=0)
    
    original_deadline = models.DateTimeField()
    current_deadline = models.DateTimeField()
    
    accepted_at = models.DateTimeField(null=True, blank=True)
    started_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    verified_at = models.DateTimeField(null=True, blank=True)
    completion_notes = models.TextField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.task_number

class TaskExtension(models.Model):

    Status = TaskExtensionStatus

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='extensions')
    requested_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='requested_extensions')
    
    original_deadline = models.DateTimeField()
    requested_deadline = models.DateTimeField()
    reason = models.TextField()
    supporting_url = models.TextField(null=True, blank=True)
    
    status = models.CharField(max_length=20, choices=TaskExtensionStatus.choices, default=TaskExtensionStatus.PENDING)
    reviewed_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='reviewed_extensions')
    review_note = models.TextField(null=True, blank=True)
    
    requested_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(null=True, blank=True)