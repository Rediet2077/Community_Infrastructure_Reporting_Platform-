from rest_framework import serializers
from .models import Dispute

class DisputeSerializer(serializers.ModelSerializer):
    submitted_by_name = serializers.ReadOnlyField(source='submitted_by.get_full_name')

    class Meta:
        model = Dispute
        fields = '__all__'
        read_only_fields = ('status', 'reviewed_by', 'review_note', 'reviewed_at')