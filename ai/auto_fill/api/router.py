# router.py
# Smart auto-fill API endpoint.
# Owner: AI Developer 1
#
# Flutter calls this after citizen picks a photo:
#   POST /ai/auto-fill/
#   Send: image file + language preference
#   Get back: pre-filled title, description, category

import io
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "src"))
sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent / "image_classification" / "src"))

from fastapi import APIRouter, File, UploadFile, Form, HTTPException
from PIL import Image
from schemas import AutoFillResponse
from auto_fill import auto_fill_report

router = APIRouter(tags=["Smart Auto-Fill"])

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/jpg"}
ALLOWED_LANGS = {"en", "am", "or", "ti"}


@router.post(
    "/auto-fill/",
    response_model=AutoFillResponse,
    summary="Auto-fill report fields from photo",
)
async def auto_fill(
    file:     UploadFile = File(...,   description="Photo uploaded by citizen"),
    language: str        = Form("en",  description="Language code: en/am/or/ti"),
):
    """
    POST /ai/auto-fill/

    Flutter uploads a photo and gets pre-filled form fields back.
    The citizen can edit or correct any field before submitting.

    Example response (English, road damage photo):
    {
        "category":    "road_damage",
        "confidence":  0.94,
        "title":       "Road Damage Detected",
        "description": "Road surface damage has been identified...",
        "language":    "en"
    }

    Example response (Amharic, garbage photo):
    {
        "category":    "garbage",
        "confidence":  0.88,
        "title":       "የቆሻሻ ችግር ሪፖርት ተደርጓል",
        "description": "በዚህ አካባቢ ቆሻሻ መከማቸት ሪፖርት ተደርጓል...",
        "language":    "am"
    }
    """

    # Validate language
    if language not in ALLOWED_LANGS:
        language = "en"

    # Validate file type
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="Invalid file type. Use JPEG or PNG.")

    # Read file
    contents = await file.read()

    # Open image
    try:
        image = Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Cannot read image.")

    # Run auto-fill
    try:
        result = auto_fill_report(image, language=language)
    except FileNotFoundError:
        raise HTTPException(
            status_code=503,
            detail="Model not ready. Run: python src/train.py first."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return AutoFillResponse(**result)
