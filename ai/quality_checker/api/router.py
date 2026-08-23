# router.py
# Report quality check API endpoint.
# Owner: AI Developer 1
#
# Flutter calls this BEFORE submitting a report:
#   POST /ai/check-quality/
#   Send: image file
#   Get back: pass / warning / fail + message

import io
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "src"))

from fastapi import APIRouter, File, UploadFile, HTTPException
from PIL import Image
from schemas import QualityCheckResponse
from quality_checker import check_image_quality

router = APIRouter(tags=["Quality Checker"])

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/jpg"}
MAX_SIZE      = 10 * 1024 * 1024  # 10MB


@router.post(
    "/check-quality/",
    response_model=QualityCheckResponse,
    summary="Check if uploaded photo is valid",
)
async def check_quality(
    file: UploadFile = File(..., description="Photo uploaded by citizen")
):
    """
    POST /ai/check-quality/

    Called by Flutter before submitting a report.
    Checks if the photo is clear and shows an infrastructure problem.

    Response status values:
      pass    → good photo, citizen can submit
      warning → accepted but low confidence
      fail    → bad photo, citizen should retake

    Example response:
    {
        "status":  "pass",
        "message": "Photo looks good. Detected: road_damage (94%).",
        "checks":  { "blur": {...}, "relevance": {...} }
    }
    """

    # Validate type
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="Invalid file type. Use JPEG or PNG.")

    # Read file
    contents = await file.read()

    # Validate size
    if len(contents) > MAX_SIZE:
        raise HTTPException(status_code=400, detail="File too large. Max 10MB.")

    # Open image
    try:
        image = Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Cannot read image file.")

    # Run quality checks
    try:
        result = check_image_quality(image)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return QualityCheckResponse(
        status=result["status"],
        message=result["message"],
        checks=result["checks"],
    )
