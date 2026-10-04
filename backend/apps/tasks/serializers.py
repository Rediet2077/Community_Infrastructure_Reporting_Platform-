from rest_framework import serializers
from .models import Task, TaskExtension

class TaskExtensionSerializer(serializers.ModelSerializer):
    requested_by_email = serializers.ReadOnlyField(source='requested_by.email')
    reviewed_by_email = serializers.ReadOnlyField(source='reviewed_by.email')

    class Meta:
        model = TaskExtension
        fields = [
            'id', 'task', 'requested_by', 'requested_by_email',
            'original_deadline', 'requested_deadline', 'reason',
            'supporting_url', 'status', 'reviewed_by', 'reviewed_by_email',
            'review_note', 'requested_at', 'reviewed_at'
        ]
        read_only_fields = [
            'id', 'task', 'requested_by', 'original_deadline', 
            'status', 'reviewed_by', 'review_note', 'requested_at', 'reviewed_at'
        ]


class TaskSerializer(serializers.ModelSerializer):
    department_name = serializers.ReadOnlyField(source='department.name')
    extensions = TaskExtensionSerializer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = [
            'id', 'task_number', 'report', 'asset', 'department',
            'department_name', 'title', 'description', 'priority', 
            'status', 'progress_percent', 'original_deadline', 
            'current_deadline', 'accepted_at', 'started_at', 
            'completed_at', 'verified_at', 'completion_notes', 
            'extensions', 'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'task_number', 'status', 'progress_percent', 
            'accepted_at', 'started_at', 'completed_at', 'verified_at', 
            'created_at', 'updated_at'
        ]