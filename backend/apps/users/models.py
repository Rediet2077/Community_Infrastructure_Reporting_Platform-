import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserManager(BaseUserManager):
    """
    Custom manager required for AbstractBaseUser to handle user creation and 
    terminal commands like 'createsuperuser'.
    """
    def create_user(self, email, phone_number, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, phone_number=phone_number, **extra_fields)
        user.set_password(password) # Hashes the password securely
        user.save(using=self._db)
        return user

    def create_superuser(self, email, phone_number, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'SYSTEM_ADMIN')
        return self.create_user(email, phone_number, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    Core User model matching the CIRP database schema.
    """
    class Role(models.TextChoices):
        CITIZEN = 'CITIZEN', 'Citizen'
        DEPARTMENT_ADMIN = 'DEPARTMENT_ADMIN', 'Department Admin'
        SYSTEM_ADMIN = 'SYSTEM_ADMIN', 'System Admin'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=30, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    
    # role ENUM
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.CITIZEN)
    
    preferred_language = models.CharField(max_length=20, default='en-us')
    profile_image_url = models.TextField(null=True, blank=True)
    
    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Required by Django Admin/PermissionsMixin
    is_staff = models.BooleanField(default=False) 

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['phone_number', 'first_name', 'last_name']

    objects = UserManager()

    def __str__(self):
        return f"{self.email} ({self.get_role_display()})"