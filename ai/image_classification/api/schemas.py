# schemas.py
# Defines the input and output format for the API.
# Owner: AI Developer 1

from pydantic import BaseModel
from typing import Dict


class ClassificationResponse(BaseModel):
    """
    What the API returns after classifying an image.

    Example:
    {
        "category":   "road_damage",
        "confidence": 0.94,
        "all_scores": {
            "road_damage":        0.94,
            "garbage":            0.03,
            "water_leakage":      0.01,
            "drainage":           0.01,
            "streetlight_failure":0.00,
            "public_facility":    0.00,
            "other":              0.01
        }
    }
    """
    category:   str
    confidence: float
    all_scores: Dict[str, float]


class ErrorResponse(BaseModel):
    """What the API returns when something goes wrong."""
    detail: str
