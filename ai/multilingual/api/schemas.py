# schemas.py
# Input/output format for the multilingual API.

from pydantic import BaseModel
from typing import Optional


class MultilingualCompareRequest(BaseModel):
    """
    Compare two texts in any supported language.
    """
    text_a: str
    text_b: str


class MultilingualCompareResponse(BaseModel):
    """
    Result of comparing two multilingual texts.
    """
    similarity_score: float
    language_a:       str
    language_b:       str
    language_a_name:  str
    language_b_name:  str
    cross_language:   bool


class DetectLanguageRequest(BaseModel):
    text: str


class DetectLanguageResponse(BaseModel):
    language:      str
    language_name: str
