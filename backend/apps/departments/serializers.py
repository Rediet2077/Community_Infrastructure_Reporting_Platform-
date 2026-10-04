from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Department

User = get_user_model()


class DepartmentManagerSerializer(serializers.ModelSerializer):
    """Nested serializer for clean manager details."""
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class DepartmentSerializer(serializers.ModelSerializer):
    # Read-only convenience fields
    admin_email = serializers.ReadOnlyField(source='admin_user.email', default=None)
    manager_detail = DepartmentManagerSerializer(source='manager', read_only=True)
    
    # Computed metrics fields for dashboard overview
    total_tasks_count = serializers.SerializerMethodField()
    staff_count = serializers.SerializerMethodField()

    class Meta:
        model = Department
        fields = [
            'id',
            'name',
            'code',
            'description',
            'manager',
            'manager_detail',
            'admin_user',
            'admin_email',
            'staff_count',
            'total_tasks_count',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['created_at', 'updated_at']

    def get_total_tasks_count(self, obj):
        if hasattr(obj, 'tasks'):
            return obj.tasks.count()
        return 0

    def get_staff_count(self, obj):
        if hasattr(obj, 'staff_members'):
            return obj.staff_members.count()
        return 0