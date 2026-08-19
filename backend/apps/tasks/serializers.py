from rest_framework import serializers
from .models import Task, TaskExtension

class TaskExtensionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskExtension
        fields = '__all__'
        read_only_fields = ('status', 'reviewed_by', 'reviewed_at', 'review_note', 'original_deadline')

class TaskSerializer(serializers.ModelSerializer):
    extensions = TaskExtensionSerializer(many=True, read_only=True)
    department_name = serializers.ReadOnlyField(source='department.name')

    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ('task_number', 'status', 'progress_percent', 'accepted_at', 'started_at', 'completed_at', 'verified_at')