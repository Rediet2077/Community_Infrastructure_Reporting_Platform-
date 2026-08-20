from django.db import transaction
from django.contrib.gis.geos import Point
from apps.assets.models import Asset, AssetType
from apps.locations.models import Location
from apps.departments.models import Department
from rest_framework.exceptions import NotFound, ValidationError

@transaction.atomic
def register_infrastructure_asset(user, validated_data: dict) -> Asset:
    """
    Core business logic for registering a physical infrastructure asset.
    """
    # 1. Enforce Role Accountability
    # Ensure the user actually manages a department
    try:
        department = user.managed_department
    except Department.DoesNotExist:
        raise ValidationError("Only users assigned to a department can register assets.")

    # 2. Extract Nested Data
    location_data = validated_data.pop('location')
    asset_type_id = validated_data.pop('asset_type_id')

    try:
        asset_type = AssetType.objects.get(id=asset_type_id)
    except AssetType.DoesNotExist:
        raise NotFound("The specified Asset Type does not exist.")

    # 3. Handle Spatial Location Creation (PostGIS)
    # Convert incoming latitude/longitude into a WGS84 Point
    geom_point = Point(
        float(location_data['longitude']), 
        float(location_data['latitude']), 
        srid=4326
    )
    
    location = Location.objects.create(
        geom=geom_point,
        address=location_data.get('address'),
        landmark=location_data.get('landmark'),
        source=Location.Source.ASSET  # Tagged explicitly as an asset source[cite: 1]
    )

    # 4. Create the Asset Entity
    asset = Asset.objects.create(
        department=department,
        registered_by=user,
        location=location,
        asset_type=asset_type,
        **validated_data
    )

    return asset