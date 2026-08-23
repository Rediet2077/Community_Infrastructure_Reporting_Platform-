# schemas.py
# Defines input and output format for the duplicate detection API.
# Owner: AI Developer 1

from pydantic import BaseModel
from typing import Optional, Dict, Any


class DuplicateCheckRequest(BaseModel):
    """
    What Django sends to the AI service.

    Example:
    {
        "report_id":   2050,
        "title":       "Large pothole near DBU gate",
        "description": "Deep hole causing accidents",
        "category":    "road_damage",
        "latitude":    9.0192,
        "longitude":   38.7525,

        "existing_report_id":          1024,
        "existing_title":              "Big road hole near university",
        "existing_description":        "Dangerous pothole near main gate",
        "existing_category":           "road_damage",
        "existing_latitude":           9.0194,
        "existing_longitude":          38.7527
    }
    """
    # New report fields
    report_id:   int
    title:       str
    description: str
    category:    str
    latitude:    Optional[float] = None
    longitude:   Optional[float] = None

    # Existing report to compare against
    existing_report_id:   int
    existing_title:       str
    existing_description: str
    existing_category:    str
    existing_latitude:    Optional[float] = None
    existing_longitude:   Optional[float] = None


class DuplicateCheckResponse(BaseModel):
    """
    What the AI service returns to Django.

    Example:
    {
        "is_duplicate":      true,
        "similarity_score":  0.92,
        "similar_report_id": 1024,
        "breakdown": {
            "text":     {"score": 0.88, "weight": 0.35, "contribution": 0.308},
            "location": {"score": 0.95, "weight": 0.30, "contribution": 0.285},
            "image":    {"score": null},
            "category": {"score": 1.00, "weight": 0.10, "contribution": 0.100}
        }
    }
    """
    is_duplicate:      bool
    similarity_score:  float
    similar_report_id: int
    breakdown:         Dict[str, Any]


class ErrorResponse(BaseModel):
    detail: str
