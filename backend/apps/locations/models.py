import uuid
from django.contrib.gis.db import models

class Location(models.Model):
    class Source(models.TextChoices):
        GPS = 'GPS', 'GPS'
        MAP = 'MAP', 'Map'
        MANUAL = 'MANUAL', 'Manual'
        ASSET = 'ASSET', 'Asset'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # PostGIS PointField replaces separate decimal latitude/longitude
    # SRID 4326 is the standard WGS84 coordinate system used by GPS and Leaflet
    geom = models.PointField(srid=4326, geography=True)
    
    address = models.TextField(null=True, blank=True)
    landmark = models.CharField(max_length=255, null=True, blank=True)
    
    accuracy_meters = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    source = models.CharField(max_length=10, choices=Source.choices)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def latitude(self):
        """Helper property to easily extract latitude for JSON serializers."""
        return self.geom.y if self.geom else None

    @property
    def longitude(self):
        """Helper property to easily extract longitude for JSON serializers."""
        return self.geom.x if self.geom else None

    def __str__(self):
        return f"Location {self.id} ({self.latitude}, {self.longitude})"