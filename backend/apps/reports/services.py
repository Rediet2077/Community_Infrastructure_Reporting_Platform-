from django.db import transaction
from django.contrib.gis.geos import Point
from apps.reports.models import Report
from apps.locations.models import Location
from apps.categories.models import Category
from apps.assets.models import Asset
from apps.medias.services import attach_evidence
from rest_framework.exceptions import NotFound
import uuid

@transaction.atomic
def submit_citizen_report(user, validated_data: dict) -> Report:
    """
    Core business logic for citizens submitting infrastructure issues[cite: 1].
    """
    location_data = validated_data.pop('location')
    category_id = validated_data.pop('category_id')
    asset_id = validated_data.pop('asset_id', None)
    evidence_data = validated_data.pop('evidence', [])

    # 1. Resolve Category
    try:
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist:
        raise NotFound("The specified category does not exist.")

    # 2. Resolve Asset (if provided)
    asset = None
    if asset_id:
        asset = Asset.objects.get(id=asset_id)

    # 3. Handle Spatial Location Creation
    geom_point = Point(
        float(location_data['longitude']), 
        float(location_data['latitude']), 
        srid=4326
    )
    
    report_location = Location.objects.create(
        geom=geom_point,
        address=location_data.get('address'),
        source=Location.Source.GPS # Defaulting to GPS for citizen mobile app
    )

    # 4. Generate unique report number
    report_number = f"REP-{uuid.uuid4().hex[:8].upper()}"

    # 5. Create the Report Entity
    report = Report.objects.create(
        report_number=report_number,
        citizen=user,
        asset=asset,
        category=category,
        location=report_location,
        status=Report.Status.SUBMITTED,
        **validated_data
    )

    # 6. Link Media Evidence
    if evidence_data:
        attach_evidence(
            user=user,
            entity_type='REPORT',
            entity_id=report.id,
            media_data=evidence_data
        )

    return report