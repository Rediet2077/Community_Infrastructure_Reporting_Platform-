from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Department

User = get_user_model()


class DepartmentAdminSerializer(serializers.ModelSerializer):
    """Nested serializer for the department admin user."""
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'full_name', 'phone_number']

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip()


class DepartmentSerializer(serializers.ModelSerializer):
    admin_email = serializers.ReadOnlyField(source='admin_user.email', default=None)
    admin_detail = DepartmentAdminSerializer(source='admin_user', read_only=True)
    total_tasks_count = serializers.SerializerMethodField()
    active_assets_count = serializers.SerializerMethodField()

    class Meta:
        model = Department
        fields = [
            'id',
            'name',
            'code',
            'description',
            'admin_user',
            'admin_email',
            'admin_detail',
            'phone',
            'email',
            'address',
            'is_active',
            'total_tasks_count',
            'active_assets_count',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_total_tasks_count(self, obj):
        return obj.tasks.count() if hasattr(obj, 'tasks') else 0

    def get_active_assets_count(self, obj):
        return obj.assets.filter(status='ACTIVE').count() if hasattr(obj, 'assets') else 0