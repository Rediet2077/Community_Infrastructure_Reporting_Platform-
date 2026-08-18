# ai/api/routes/auto_fill.py
# Smart auto-fill route for the unified AI service.
# Owner: AI Developer 1

import io
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent / "auto_fill" / "src"))
sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent / "image_classification" / "src"))

from fastapi import APIRouter, File, UploadFile, Form, HTTPException
from pydantic import BaseModel
from typing import Dict
from PIL import Image
from auto_fill import auto_fill_report

router = APIRouter(tags=["Smart Auto-Fill"])

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/jpg"}
ALLOWED_LANGS = {"en", "am", "or", "ti"}


class AutoFillResponse(BaseModel):
    category:    str
    confidence:  float
    title:       str
    description: str
    all_scores:  Dict[str, float]
    language:    str


@router.post("/auto-fill/", response_model=AutoFillResponse,
             summary="Auto-fill report fields from photo")
async def auto_fill(
    file:     UploadFile = File(...),
    language: str        = Form("en"),
):
    """
    POST /ai/auto-fill/

    Send a photo + language preference.
    Get back pre-filled title, description, and category.
    The citizen can edit before submitting.
    """
    if language not in ALLOWED_LANGS:
        language = "en"

    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="Invalid file type.")

    contents = await file.read()
    try:
        image = Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Cannot read image.")

    try:
        result = auto_fill_report(image, language=language)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return AutoFillResponse(**result)
