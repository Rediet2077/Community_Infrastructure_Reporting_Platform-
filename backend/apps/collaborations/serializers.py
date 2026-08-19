from rest_framework import serializers
from .models import Collaboration

class CollaborationSerializer(serializers.ModelSerializer):
    primary_department_name = serializers.ReadOnlyField(source='primary_department.name')
    supporting_department_name = serializers.ReadOnlyField(source='supporting_department.name')

    class Meta:
        model = Collaboration
        fields = '__all__'
        read_only_fields = ('status', 'response_note')