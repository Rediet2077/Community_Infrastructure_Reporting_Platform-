from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Dispute, DisputeComment

User = get_user_model()


class DisputeUserSerializer(serializers.ModelSerializer):
    """Nested serializer for displaying submitter and reviewer info."""
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class DisputeCommentSerializer(serializers.ModelSerializer):
    """Serializer for dispute discussion comments and evidence notes."""
    author_detail = DisputeUserSerializer(source='author', read_only=True)

    class Meta:
        model = DisputeComment
        fields = ['id', 'dispute', 'author', 'author_detail', 'comment', 'created_at']
        read_only_fields = ['id', 'author', 'created_at']


class DisputeSerializer(serializers.ModelSerializer):
    # Convenience read-only email fields
    submitted_by_email = serializers.ReadOnlyField(source='submitted_by.email', default=None)
    raised_by_email = serializers.ReadOnlyField(source='raised_by.email', default=None)

    # Detailed user representations
    submitted_by_detail = DisputeUserSerializer(source='submitted_by', read_only=True)
    raised_by_detail = DisputeUserSerializer(source='raised_by', read_only=True)
    reviewed_by_detail = DisputeUserSerializer(source='reviewed_by', read_only=True)

    # Nested comment thread for API responses
    comments = DisputeCommentSerializer(many=True, read_only=True)

    class Meta:
        model = Dispute
        fields = [
            'id',
            'report',
            'task',
            'department',
            'title',
            'reason',
            'description',
            'status',
            'submitted_by',
            'submitted_by_email',
            'submitted_by_detail',
            'raised_by',
            'raised_by_email',
            'raised_by_detail',
            'reviewed_by',
            'reviewed_by_detail',
            'review_note',
            'resolution_notes',
            'comments',
            'created_at',
            'updated_at',
            'reviewed_at',
        ]
        read_only_fields = [
            'id',
            'status',
            'reviewed_by',
            'review_note',
            'resolution_notes',
            'created_at',
            'updated_at',
            'reviewed_at',
        ]