from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Dispute

User = get_user_model()


class DisputeUserSerializer(serializers.ModelSerializer):
    """Nested serializer for displaying submitter and reviewer info."""
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class DisputeSerializer(serializers.ModelSerializer):
    # Convenience read-only email fields
    submitted_by_email = serializers.ReadOnlyField(source='submitted_by.email', default=None)

    # Detailed user representations
    submitted_by_detail = DisputeUserSerializer(source='submitted_by', read_only=True)
    reviewed_by_detail = DisputeUserSerializer(source='reviewed_by', read_only=True)

    class Meta:
        model = Dispute
        fields = [
            'id',
            'report',
            'reason',
            'status',
            'submitted_by',
            'submitted_by_email',
            'submitted_by_detail',
            'reviewed_by',
            'reviewed_by_detail',
            'review_note',
            'created_at',
            'reviewed_at',
        ]
        read_only_fields = [
            'id',
            'status',
            'reviewed_by',
            'review_note',
            'created_at',
            'reviewed_at',
        ]