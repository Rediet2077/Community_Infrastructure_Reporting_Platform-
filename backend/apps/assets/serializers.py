from apps.locations.models import Location
from rest_framework import serializers
from .models import Asset, AssetType

class AssetLocationInputSerializer(serializers.Serializer):
    """Validates the incoming GPS coordinates for the asset."""
    latitude = serializers.DecimalField(max_digits=10, decimal_places=7, required=True)
    longitude = serializers.DecimalField(max_digits=10, decimal_places=7, required=True)
    address = serializers.CharField(required=False, allow_blank=True)
    landmark = serializers.CharField(required=False, allow_blank=True)

class AssetRegistrationSerializer(serializers.ModelSerializer):
    """Validates the core asset data submitted by the Department Admin."""
    location = AssetLocationInputSerializer(write_only=True)
    asset_type_id = serializers.UUIDField(required=True)
    
    class Meta:
        model = Asset
        fields = [
            'asset_code', 'name', 'description', 'asset_type_id', 
            'condition', 'status', 'installation_date', 'extra_data', 
            'location'
        ]

    def validate_asset_code(self, value):
        if Asset.objects.filter(asset_code=value).exists():
            raise serializers.ValidationError("An asset with this code already exists.")
        return value
    
    def create(self, validated_data):
        # 1. Extract nested location data
        location_data = validated_data.pop('location')
        
        # 2. Extract asset_type_id and fetch instance
        asset_type_id = validated_data.pop('asset_type_id')
        asset_type = AssetType.objects.get(id=asset_type_id)
        
        # 3. Create the Location record (or PostGIS Point)
        # from apps.locations.models import Location
        location = Location.objects.create(
            latitude=location_data['latitude'],
            longitude=location_data['longitude'],
            address=location_data.get('address', ''),
            landmark=location_data.get('landmark', ''),
            source=Location.Source.ASSET
        )
        
        # 4. Create and return the Asset
        asset = Asset.objects.create(
            location=location,
            asset_type=asset_type,
            **validated_data
        )
        return asset