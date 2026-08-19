from rest_framework import serializers
from .models import Collaboration

class CollaborationSerializer(serializers.ModelSerializer):
    primary_department_name = serializers.ReadOnlyField(source='primary_department.name')
    supporting_department_name = serializers.ReadOnlyField(source='supporting_department.name')

    class Meta:
        model = Collaboration
        fields = [
            'id', 'report', 'primary_department', 'primary_department_name',
            'supporting_department', 'supporting_department_name',
            'requested_by', 'reason', 'status', 'response_note',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'status', 'response_note', 'created_at', 'updated_at']