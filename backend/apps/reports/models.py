import uuid
from django.db import models
from django.conf import settings

class Report(models.Model):
    class Priority(models.TextChoices):
        LOW = 'LOW', 'Low'
        MEDIUM = 'MEDIUM', 'Medium'
        HIGH = 'HIGH', 'High'
        CRITICAL = 'CRITICAL', 'Critical'

    class Status(models.TextChoices):
        SUBMITTED = 'SUBMITTED', 'Submitted'
        UNDER_REVIEW = 'UNDER_REVIEW', 'Under Review'
        ACCEPTED = 'ACCEPTED', 'Accepted'
        ASSIGNED = 'ASSIGNED', 'Assigned'
        IN_PROGRESS = 'IN_PROGRESS', 'In Progress'
        PENDING_VERIFICATION = 'PENDING_VERIFICATION', 'Pending Verification'
        RESOLVED = 'RESOLVED', 'Resolved'
        REJECTED = 'REJECTED', 'Rejected'
        DISPUTED = 'DISPUTED', 'Disputed'
        REOPENED = 'REOPENED', 'Reopened'
        MERGED = 'MERGED', 'Merged'
        CLOSED = 'CLOSED', 'Closed'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    report_number = models.CharField(max_length=50, unique=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    
    # Foreign Keys
    citizen = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reports')
    # asset = models.ForeignKey('assets.Asset', on_delete=models.SET_NULL, null=True, blank=True, related_name='reports')  # Disabled
    category = models.ForeignKey('categories.Category', on_delete=models.PROTECT, related_name='reports')
    # location = models.ForeignKey('locations.Location', on_delete=models.PROTECT, related_name='reports')  # Disabled
    
    # Location as coordinates instead of GIS
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    
    priority = models.CharField(max_length=20, choices=Priority.choices, default=Priority.MEDIUM)
    status = models.CharField(max_length=30, choices=Status.choices, default=Status.SUBMITTED)
    
    # Workflow & Assignments
    assigned_department = models.ForeignKey('departments.Department', on_delete=models.SET_NULL, null=True, blank=True, related_name='reports')
    assigned_officer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_reports')
    
    # AI Microservice Metadata
    ai_category = models.CharField(max_length=100, null=True, blank=True)
    ai_confidence = models.FloatField(null=True, blank=True)
    is_duplicate = models.BooleanField(default=False)
    duplicate_similarity = models.FloatField(null=True, blank=True)
    possible_duplicate_of = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='duplicates')
    
    # Feedback & Completion Verification
    admin_feedback = models.TextField(null=True, blank=True)
    completion_notes = models.TextField(null=True, blank=True)
    resolved_at = models.DateTimeField(null=True, blank=True)
    # Deletion Scope & Soft Delete Visibility
    is_deleted_by_admin = models.BooleanField(default=False)
    is_deleted_by_citizen = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.report_number} - {self.title}"