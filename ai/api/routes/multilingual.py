# ai/api/routes/multilingual.py
# Multilingual route for the unified AI service.
# Owner: AI Developer 1

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent / "multilingual" / "src"))

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from multilingual_encoder import compare_multilingual
from language_detector import detect_language, get_language_name

router = APIRouter(tags=["Multilingual"])


class CompareRequest(BaseModel):
    text_a: str
    text_b: str


class CompareResponse(BaseModel):
    similarity_score: float
    language_a:       str
    language_b:       str
    language_a_name:  str
    language_b_name:  str
    cross_language:   bool


class DetectRequest(BaseModel):
    text: str


class DetectResponse(BaseModel):
    language:      str
    language_name: str


@router.post("/compare-multilingual/", response_model=CompareResponse)
async def compare(request: CompareRequest):
    try:
        result = compare_multilingual(request.text_a, request.text_b)
        return CompareResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/detect-language/", response_model=DetectResponse)
async def detect(request: DetectRequest):
    lang = detect_language(request.text)
    return DetectResponse(language=lang, language_name=get_language_name(lang))
