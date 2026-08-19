from rest_framework import serializers
from .models import Department

class DepartmentSerializer(serializers.ModelSerializer):
    admin_email = serializers.ReadOnlyField(source='admin_user.email')

    class Meta:
        model = Department
        fields = '__all__'