from django.db import models


class UserRole(models.TextChoices):
    CITIZEN = 'CITIZEN', 'Citizen'
    DEPARTMENT_ADMIN = 'DEPARTMENT_ADMIN', 'Department Admin'
    SYSTEM_ADMIN = 'SYSTEM_ADMIN', 'System Admin'


class ReportPriority(models.TextChoices):
    LOW = 'LOW', 'Low'
    MEDIUM = 'MEDIUM', 'Medium'
    HIGH = 'HIGH', 'High'
    CRITICAL = 'CRITICAL', 'Critical'


class ReportStatus(models.TextChoices):
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


class TaskPriority(models.TextChoices):
    LOW = 'LOW', 'Low'
    MEDIUM = 'MEDIUM', 'Medium'
    HIGH = 'HIGH', 'High'
    CRITICAL = 'CRITICAL', 'Critical'


class TaskStatus(models.TextChoices):
    PENDING = 'PENDING', 'Pending'
    ACCEPTED = 'ACCEPTED', 'Accepted'
    IN_PROGRESS = 'IN_PROGRESS', 'In Progress'
    COMPLETED_PENDING_VERIFICATION = 'COMPLETED_PENDING_VERIFICATION', 'Completed Pending Verification'
    VERIFIED = 'VERIFIED', 'Verified'
    REJECTED = 'REJECTED', 'Rejected'
    REOPENED = 'REOPENED', 'Reopened'
    CANCELLED = 'CANCELLED', 'Cancelled'


class TaskExtensionStatus(models.TextChoices):
    PENDING = 'PENDING', 'Pending'
    APPROVED = 'APPROVED', 'Approved'
    REJECTED = 'REJECTED', 'Rejected'


class DisputeStatus(models.TextChoices):
    OPEN = 'OPEN', 'Open'
    UNDER_REVIEW = 'UNDER_REVIEW', 'Under Review'
    ACCEPTED = 'ACCEPTED', 'Accepted'
    REJECTED = 'REJECTED', 'Rejected'


class CollaborationStatus(models.TextChoices):
    REQUESTED = 'REQUESTED', 'Requested'
    ACCEPTED = 'ACCEPTED', 'Accepted'
    REJECTED = 'REJECTED', 'Rejected'
    COMPLETED = 'COMPLETED', 'Completed'


class MediaEntityType(models.TextChoices):
    REPORT = 'REPORT', 'Report'
    TASK = 'TASK', 'Task'
    DISPUTE = 'DISPUTE', 'Dispute'
    ASSET = 'ASSET', 'Asset'


class MediaType(models.TextChoices):
    IMAGE = 'IMAGE', 'Image'
    VIDEO = 'VIDEO', 'Video'
    AUDIO = 'AUDIO', 'Audio'
    DOCUMENT = 'DOCUMENT', 'Document'


class LocationSource(models.TextChoices):
    GPS = 'GPS', 'GPS'
    MAP = 'MAP', 'Map'
    MANUAL = 'MANUAL', 'Manual'
    ASSET = 'ASSET', 'Asset'


class AssetStatus(models.TextChoices):
    ACTIVE = 'ACTIVE', 'Active'
    UNDER_MAINTENANCE = 'UNDER_MAINTENANCE', 'Under Maintenance'
    DAMAGED = 'DAMAGED', 'Damaged'
    INACTIVE = 'INACTIVE', 'Inactive'
    DECOMMISSIONED = 'DECOMMISSIONED', 'Decommissioned'


class AssetCondition(models.TextChoices):
    EXCELLENT = 'EXCELLENT', 'Excellent'
    GOOD = 'GOOD', 'Good'
    FAIR = 'FAIR', 'Fair'
    POOR = 'POOR', 'Poor'
    CRITICAL = 'CRITICAL', 'Critical'