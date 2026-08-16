# ai/api/routes/duplicate.py
# Duplicate detection route for the unified AI service.
# Owner: AI Developer 1
#
# Django calls: POST /ai/detect-duplicate/
# Sends: new report + one existing report
# Returns: { is_duplicate, similarity_score, similar_report_id }

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent / "duplicate_detection" / "src"))

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any

from classifier import detect_duplicate

router = APIRouter(tags=["Duplicate Detection"])


class DuplicateRequest(BaseModel):
    """What Django sends."""
    # New report
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


class DuplicateResponse(BaseModel):
    """What the AI returns to Django."""
    is_duplicate:      bool
    similarity_score:  float
    similar_report_id: int
    breakdown:         Dict[str, Any]


@router.post(
    "/detect-duplicate/",
    response_model=DuplicateResponse,
    summary="Detect duplicate infrastructure reports",
)
async def detect_duplicate_endpoint(request: DuplicateRequest):
    """
    POST /ai/detect-duplicate/

    Compare a new report against one existing report.
    Returns whether they describe the same infrastructure problem.

    Example response:
    {
        "is_duplicate":      true,
        "similarity_score":  0.92,
        "similar_report_id": 1024,
        "breakdown": {
            "text":     {"score": 0.88},
            "location": {"score": 0.95},
            "category": {"score": 1.00},
            "image":    {"score": null}
        }
    }

    Important: The officer always makes the final decision.
    This is a recommendation only.
    """
    try:
        result = detect_duplicate(
            new_title=request.title,
            new_description=request.description,
            new_category=request.category,
            new_lat=request.latitude,
            new_lon=request.longitude,
            new_image=None,

            existing_title=request.existing_title,
            existing_description=request.existing_description,
            existing_category=request.existing_category,
            existing_lat=request.existing_latitude,
            existing_lon=request.existing_longitude,
            existing_image=None,

            existing_report_id=request.existing_report_id,
        )

        return DuplicateResponse(
            is_duplicate=result["is_duplicate"],
            similarity_score=result["similarity_score"],
            similar_report_id=result["similar_report_id"],
            breakdown=result["breakdown"],
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Duplicate detection failed: {str(e)}"
        )
