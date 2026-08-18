import uuid
from django.db import models
from django.conf import settings

class Department(models.Model):
    """
    Responsible departments that manage infrastructure assets.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # admin_user_id UUID FK -> users.id UNIQUE[cite: 1]
    admin_user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.PROTECT, 
        related_name='managed_department'
    )
    
    name = models.CharField(max_length=150, unique=True)
    code = models.CharField(max_length=50, unique=True)
    description = models.TextField(null=True, blank=True)
    phone = models.CharField(max_length=30, null=True, blank=True)
    email = models.EmailField(max_length=255, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name