# test_text_similarity.py
# Tests for text_similarity.py
# Run: python -m pytest tests/ -v

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from text_similarity import compute_text_similarity


def test_identical_texts_return_1():
    """Same text should return score close to 1.0"""
    score = compute_text_similarity(
        "Pothole on main road",
        "Pothole on main road"
    )
    assert score >= 0.99, f"Expected ~1.0, got {score}"


def test_similar_meaning_returns_high_score():
    """Different words but same meaning should score high"""
    score = compute_text_similarity(
        "Large pothole near DBU gate",
        "Big road hole close to university entrance"
    )
    assert score >= 0.60, f"Expected >= 0.60, got {score}"


def test_completely_different_returns_low_score():
    """Completely different topics should score low"""
    score = compute_text_similarity(
        "Broken streetlight on Bole road",
        "Garbage pile near the market"
    )
    assert score <= 0.50, f"Expected <= 0.50, got {score}"


def test_empty_text_returns_zero():
    """Empty text should return 0.0"""
    score = compute_text_similarity("", "Some text")
    assert score == 0.0, f"Expected 0.0, got {score}"


def test_score_is_between_0_and_1():
    """Score must always be between 0 and 1"""
    score = compute_text_similarity(
        "Water leaking from pipe near school",
        "Burst pipe causing flooding on the street"
    )
    assert 0.0 <= score <= 1.0, f"Score out of range: {score}"
