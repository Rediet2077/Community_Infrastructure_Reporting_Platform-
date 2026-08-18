# test_scorer.py
# Tests for scorer.py
# Run: python -m pytest tests/ -v

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from scorer import compute_final_score, get_score_breakdown


def test_high_scores_return_high_final():
    """All high component scores should give high final score"""
    score = compute_final_score(
        text_score=0.90,
        location_score=0.95,
        category_score=1.00,
        image_score=0.88,
    )
    assert score >= 0.80, f"Expected >= 0.80, got {score}"


def test_low_scores_return_low_final():
    """All low component scores should give low final score"""
    score = compute_final_score(
        text_score=0.10,
        location_score=0.00,
        category_score=0.00,
        image_score=0.10,
    )
    assert score <= 0.20, f"Expected <= 0.20, got {score}"


def test_no_image_still_works():
    """Should work without image score"""
    score = compute_final_score(
        text_score=0.85,
        location_score=0.90,
        category_score=1.00,
        image_score=None,
    )
    assert 0.0 <= score <= 1.0, f"Score out of range: {score}"


def test_score_always_between_0_and_1():
    """Final score must always be between 0 and 1"""
    score = compute_final_score(0.5, 0.5, 0.5, 0.5)
    assert 0.0 <= score <= 1.0, f"Score out of range: {score}"


def test_breakdown_has_all_keys():
    """Breakdown should contain text, location, category, image keys"""
    result = get_score_breakdown(0.8, 0.9, 1.0, 0.85)
    assert "text"     in result["breakdown"]
    assert "location" in result["breakdown"]
    assert "category" in result["breakdown"]
    assert "image"    in result["breakdown"]
    assert "final_score" in result


def test_breakdown_without_image():
    """Breakdown without image should still have image key with None score"""
    result = get_score_breakdown(0.8, 0.9, 1.0, None)
    assert result["breakdown"]["image"]["score"] is None
