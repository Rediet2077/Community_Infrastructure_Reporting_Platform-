# router.py
# FastAPI endpoint for duplicate detection.
# Owner: AI Developer 1
#
# Django calls this when a new report is submitted:
#   POST /ai/detect-duplicate/
#
# Django sends new report + one existing report.
# This API returns whether they are likely the same problem.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "src"))

from fastapi import APIRouter, HTTPException
from schemas import DuplicateCheckRequest, DuplicateCheckResponse
from classifier import detect_duplicate

router = APIRouter()


@router.post(
    "/detect-duplicate/",
    response_model=DuplicateCheckResponse,
    summary="Check if two reports are duplicates",
    description="""
    Compares a new report against one existing report.
    Returns whether they are likely describing the same infrastructure problem.

    Django calls this for each existing report near the new report location.

    Example response:
    {
        "is_duplicate": true,
        "similarity_score": 0.92,
        "similar_report_id": 1024,
        "breakdown": { ... }
    }
    """,
)
async def detect_duplicate_endpoint(request: DuplicateCheckRequest):
    """
    POST /ai/detect-duplicate/

    Called by Django when a new report is submitted.
    Compares the new report against one nearby existing report.
    Returns duplicate decision.
    """
    try:
        result = detect_duplicate(
            # New report
            new_title=request.title,
            new_description=request.description,
            new_category=request.category,
            new_lat=request.latitude,
            new_lon=request.longitude,
            new_image=None,  # images compared via URL in full version

            # Existing report
            existing_title=request.existing_title,
            existing_description=request.existing_description,
            existing_category=request.existing_category,
            existing_lat=request.existing_latitude,
            existing_lon=request.existing_longitude,
            existing_image=None,

            existing_report_id=request.existing_report_id,
        )

        return DuplicateCheckResponse(
            is_duplicate=result["is_duplicate"],
            similarity_score=result["similarity_score"],
            similar_report_id=result["similar_report_id"],
            breakdown=result["breakdown"],
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Duplicate detection failed: {str(e)}",
        )


@router.get("/health/", summary="Check duplicate detection service")
async def health():
    return {"status": "ok", "service": "duplicate_detection"}
