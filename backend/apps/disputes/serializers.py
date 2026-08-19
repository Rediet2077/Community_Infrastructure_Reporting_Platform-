from rest_framework import serializers
from .models import Dispute

class DisputeSerializer(serializers.ModelSerializer):
    submitted_by_email = serializers.ReadOnlyField(source='submitted_by.email')

    class Meta:
        model = Dispute
        fields = [
            'id', 'report', 'submitted_by', 'submitted_by_email',
            'reason', 'status', 'reviewed_by', 'review_note',
            'created_at', 'reviewed_at'
        ]
        read_only_fields = ['id', 'status', 'reviewed_by', 'review_note', 'created_at', 'reviewed_at']