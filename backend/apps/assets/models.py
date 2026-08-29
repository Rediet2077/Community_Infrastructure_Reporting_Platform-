import uuid
from django.db import models
from django.conf import settings

class AssetType(models.Model):
    """
    Defines the types of infrastructure (e.g., Street Light, Water Pipe).
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=50, unique=True)
    description = models.TextField(null=True, blank=True)
    
    # Flags whether this asset type strictly requires a physical location
    requires_location = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Asset(models.Model):
    class Status(models.TextChoices):
        ACTIVE = 'ACTIVE', 'Active'
        UNDER_MAINTENANCE = 'UNDER_MAINTENANCE', 'Under Maintenance'
        DAMAGED = 'DAMAGED', 'Damaged'
        INACTIVE = 'INACTIVE', 'Inactive'
        DECOMMISSIONED = 'DECOMMISSIONED', 'Decommissioned'

    class Condition(models.TextChoices):
        EXCELLENT = 'EXCELLENT', 'Excellent'
        GOOD = 'GOOD', 'Good'
        FAIR = 'FAIR', 'Fair'
        POOR = 'POOR', 'Poor'
        CRITICAL = 'CRITICAL', 'Critical'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset_code = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    
    # Foreign Keys
    asset_type = models.ForeignKey('assets.AssetType', on_delete=models.PROTECT, related_name='assets')
    department = models.ForeignKey('departments.Department', on_delete=models.CASCADE, related_name='assets')
    location = models.ForeignKey('locations.Location', on_delete=models.PROTECT, related_name='assets')
    registered_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='registered_assets')
    
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ACTIVE)
    condition = models.CharField(max_length=20, choices=Condition.choices)
    installation_date = models.DateField(null=True, blank=True)
    
    # PostgreSQL JSONB for flexible attributes
    extra_data = models.JSONField(default=dict, null=True, blank=True) 
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.asset_code} - {self.name}"