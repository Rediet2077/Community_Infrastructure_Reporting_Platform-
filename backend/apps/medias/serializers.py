from rest_framework import serializers
from .models import Media

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ['id', 'entity_type', 'entity_id', 'file_type', 'file_url', 'uploaded_by', 'created_at']
        read_only_fields = ['id', 'uploaded_by', 'created_at']
