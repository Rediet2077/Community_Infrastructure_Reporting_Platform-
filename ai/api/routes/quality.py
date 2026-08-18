# ai/api/routes/quality.py
# Report quality check route for the unified AI service.
# Owner: AI Developer 1

import io
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent / "quality_checker" / "src"))
sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent / "image_classification" / "src"))

from fastapi import APIRouter, File, UploadFile, HTTPException
from pydantic import BaseModel
from typing import Dict, Any
from PIL import Image
from quality_checker import check_image_quality

router = APIRouter(tags=["Quality Checker"])

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/jpg"}


class QualityResponse(BaseModel):
    status:  str
    message: str
    checks:  Dict[str, Any]


@router.post(
    "/check-quality/",
    response_model=QualityResponse,
    summary="Check if uploaded photo is valid",
)
async def check_quality(
    file: UploadFile = File(..., description="Photo to check")
):
    """
    POST /ai/check-quality/

    Called by Flutter before submitting a report.
    Returns pass / warning / fail with a user-friendly message.

    Response:
    {
        "status":  "pass",
        "message": "Photo looks good. Detected: road_damage (94%).",
        "checks":  { "blur": {...}, "relevance": {...} }
    }
    """
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="Invalid file type.")

    contents = await file.read()
    try:
        image = Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Cannot read image.")

    try:
        result = check_image_quality(image)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return QualityResponse(
        status=result["status"],
        message=result["message"],
        checks=result["checks"],
    )
