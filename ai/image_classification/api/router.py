# router.py
# FastAPI endpoint for image classification.
# Owner: AI Developer 1
#
# When a citizen uploads a photo in the CIRP app:
#   1. Django receives the photo
#   2. Django calls this API:  POST /ai/classify-image/
#   3. This API returns the predicted category + confidence
#   4. Django stores the result and shows it to the citizen

import sys
import io
from pathlib import Path

# Add src/ to path so we can import predict.py
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "src"))

from fastapi import APIRouter, File, UploadFile, HTTPException
from PIL import Image

from predict import predict_image_from_pil
from schemas import ClassificationResponse, ErrorResponse

# Create the router
router = APIRouter()

# ── Allowed image types ────────────────────────────────────
ALLOWED_TYPES = {"image/jpeg", "image/png", "image/jpg"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


@router.post(
    "/classify-image/",
    response_model=ClassificationResponse,
    summary="Classify infrastructure image",
    description="""
    Upload an image and get the predicted infrastructure problem category.

    Returns:
    - category: the predicted category name
    - confidence: how confident the model is (0.0 to 1.0)
    - all_scores: score for every category

    Example response:
    {
        "category": "road_damage",
        "confidence": 0.94,
        "all_scores": {
            "road_damage": 0.94,
            "garbage": 0.03,
            ...
        }
    }
    """,
)
async def classify_image(
    file: UploadFile = File(..., description="Infrastructure image to classify"),
):
    """
    POST /ai/classify-image/

    Called by Django when a citizen uploads a photo.
    Returns the predicted infrastructure category.
    """

    # ── Validate file type ─────────────────────────────────
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type: {file.content_type}. "
                   f"Allowed types: JPEG, PNG",
        )

    # ── Read file ──────────────────────────────────────────
    contents = await file.read()

    # ── Validate file size ─────────────────────────────────
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="File too large. Maximum size is 10MB.",
        )

    # ── Convert to PIL Image ───────────────────────────────
    try:
        image = Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Could not read image. Please upload a valid image file.",
        )

    # ── Run AI model ───────────────────────────────────────
    try:
        result = predict_image_from_pil(image)
    except FileNotFoundError:
        raise HTTPException(
            status_code=503,
            detail="Model not loaded. Train the model first: python src/train.py",
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}",
        )

    return ClassificationResponse(
        category=result["category"],
        confidence=result["confidence"],
        all_scores=result["all_scores"],
    )


@router.get(
    "/health/",
    summary="Check if AI service is running",
)
async def health_check():
    """
    GET /ai/health/
    Quick check to confirm the AI service is running.
    """
    return {"status": "ok", "service": "image_classification"}
