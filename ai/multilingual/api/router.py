# router.py
# Multilingual text API endpoints.
# Owner: AI Developer 1

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "src"))

from fastapi import APIRouter, HTTPException
from schemas import (
    MultilingualCompareRequest, MultilingualCompareResponse,
    DetectLanguageRequest, DetectLanguageResponse,
)
from multilingual_encoder import compare_multilingual
from language_detector import detect_language, get_language_name

router = APIRouter(tags=["Multilingual"])


@router.post(
    "/compare-multilingual/",
    response_model=MultilingualCompareResponse,
    summary="Compare two texts in any language",
)
async def compare_texts(request: MultilingualCompareRequest):
    """
    POST /ai/compare-multilingual/

    Compare two report texts that may be in different languages.
    Used by duplicate detection to improve cross-language matching.

    Example:
        text_a = "Large pothole near DBU gate"   (English)
        text_b = "ትልቅ ጉድጓድ ቡና ሰርቪስ አካባቢ"       (Amharic)
        result: similarity_score = 0.82, cross_language = true
    """
    try:
        result = compare_multilingual(request.text_a, request.text_b)
        return MultilingualCompareResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post(
    "/detect-language/",
    response_model=DetectLanguageResponse,
    summary="Detect language of text",
)
async def detect_lang(request: DetectLanguageRequest):
    """
    POST /ai/detect-language/

    Detects which language a report is written in.
    Returns: en | am | or | ti
    """
    lang = detect_language(request.text)
    return DetectLanguageResponse(
        language=lang,
        language_name=get_language_name(lang),
    )
