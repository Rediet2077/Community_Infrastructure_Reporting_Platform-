# ai/api/routes/classify.py
# Image classification route for the unified AI service.
# Owner: AI Developer 1
#
# Django calls: POST /ai/classify-image/
# Sends: an image file
# Returns: { category, confidence, all_scores }

import io
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent / "image_classification" / "src"))

from fastapi import APIRouter, File, UploadFile, HTTPException
from pydantic import BaseModel
from typing import Dict
from PIL import Image

from predict import predict_image_from_pil

router = APIRouter(tags=["Image Classification"])

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/jpg"}
MAX_SIZE_BYTES = 10 * 1024 * 1024  # 10MB


class ClassifyResponse(BaseModel):
    category:   str
    confidence: float
    all_scores: Dict[str, float]


@router.post(
    "/classify-image/",
    response_model=ClassifyResponse,
    summary="Classify infrastructure image",
)
async def classify_image(
    file: UploadFile = File(..., description="Infrastructure photo")
):
    """
    POST /ai/classify-image/

    Upload a photo. Returns the predicted infrastructure category.

    Example response:
    {
        "category":   "road_damage",
        "confidence": 0.94,
        "all_scores": {
            "road_damage": 0.94,
            "garbage":     0.03,
            ...
        }
    }
    """

    # Validate type
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed: JPEG, PNG"
        )

    # Read file
    contents = await file.read()

    # Validate size
    if len(contents) > MAX_SIZE_BYTES:
        raise HTTPException(
            status_code=400,
            detail="File too large. Max 10MB."
        )

    # Open image
    try:
        image = Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Cannot read image. Upload a valid JPEG or PNG."
        )

    # Run model
    try:
        result = predict_image_from_pil(image)
    except FileNotFoundError:
        raise HTTPException(
            status_code=503,
            detail="Model not found. Run: python src/train.py first."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return ClassifyResponse(
        category=result["category"],
        confidence=result["confidence"],
        all_scores=result["all_scores"],
    )


@router.get("/health/", tags=["Health"])
async def health():
    return {"status": "ok", "service": "image_classification"}
