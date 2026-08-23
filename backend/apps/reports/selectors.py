from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D
from apps.reports.models import Report

def get_nearby_reports(latitude: float, longitude: float, radius_meters: int = 5000):
    """
    Fetches all active infrastructure reports within a given radius using PostGIS.
    """
    user_location = Point(longitude, latitude, srid=4326)
    
    # Exclude resolved/closed/merged reports from the map view[cite: 1]
    excluded_statuses = [
        Report.Status.RESOLVED, 
        Report.Status.CLOSED, 
        Report.Status.MERGED
    ]

    # PostGIS spatial filter: location__geom__distance_lte
    return Report.objects.filter(
        location__geom__distance_lte=(user_location, D(m=radius_meters))
    ).exclude(
        status__in=excluded_statuses
    ).select_related('category', 'asset')