# schemas.py
from pydantic import BaseModel
from typing import Dict


class AutoFillResponse(BaseModel):
    """
    Pre-filled report fields returned to Flutter.

    Example:
    {
        "category":    "road_damage",
        "confidence":  0.94,
        "title":       "Road Damage Detected",
        "description": "Road surface damage has been identified in this area...",
        "all_scores":  { "road_damage": 0.94, ... },
        "language":    "en"
    }

    The citizen can edit or correct any field before submitting.
    """
    category:    str
    confidence:  float
    title:       str
    description: str
    all_scores:  Dict[str, float]
    language:    str
