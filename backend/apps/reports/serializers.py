from rest_framework import serializers
from .models import Report
from apps.locations.serializers import LocationInputSerializer # Assumes similar to AssetLocationInputSerializer
from apps.assets.models import Asset

class MediaInputSerializer(serializers.Serializer):
    file_type = serializers.ChoiceField(choices=['IMAGE', 'VIDEO', 'AUDIO', 'DOCUMENT'])
    file_url = serializers.URLField()

class ReportSubmissionSerializer(serializers.Serializer):
    """Validates the data submitted by the Citizen app."""
    title = serializers.CharField(max_length=255)
    description = serializers.CharField()
    category_id = serializers.UUIDField()
    
    # Asset ID is optional for citizens[cite: 1]
    asset_id = serializers.UUIDField(required=False, allow_null=True)
    
    location = LocationInputSerializer(write_only=True)
    evidence = MediaInputSerializer(many=True, required=False)

    def validate_asset_id(self, value):
        if value and not Asset.objects.filter(id=value).exists():
            raise serializers.ValidationError("The provided asset ID does not exist.")
        return value