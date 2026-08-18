# schemas.py
from pydantic import BaseModel
from typing import Dict, Any


class QualityCheckResponse(BaseModel):
    """
    Result of checking an uploaded photo.

    status:
      pass    → photo is clear and relevant, citizen can submit
      warning → photo accepted but low confidence
      fail    → photo is blurry or not infrastructure-related

    Example:
    {
        "status":  "pass",
        "message": "Photo looks good. Detected: road_damage (94% confidence).",
        "checks": {
            "blur":      { "is_blurry": false, "blur_score": 145.2 },
            "relevance": { "is_relevant": true, "confidence": 0.94 }
        }
    }
    """
    status:  str
    message: str
    checks:  Dict[str, Any]
