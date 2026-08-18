# test_category_similarity.py
# Tests for category_similarity.py
# Run: python -m pytest tests/ -v

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from category_similarity import compute_category_similarity


def test_same_category_returns_1():
    """Same category should return 1.0"""
    score = compute_category_similarity("road_damage", "road_damage")
    assert score == 1.0, f"Expected 1.0, got {score}"


def test_related_categories_return_partial_score():
    """Related categories should return between 0 and 1"""
    score = compute_category_similarity("drainage", "water_leakage")
    assert 0.0 < score < 1.0, f"Expected partial score, got {score}"


def test_different_categories_return_zero():
    """Unrelated categories should return 0.0"""
    score = compute_category_similarity("road_damage", "garbage")
    assert score == 0.0, f"Expected 0.0, got {score}"


def test_empty_category_returns_zero():
    """Empty category should return 0.0"""
    score = compute_category_similarity("", "road_damage")
    assert score == 0.0, f"Expected 0.0, got {score}"


def test_all_categories_return_valid_score():
    """All category combinations should return score between 0 and 1"""
    categories = [
        "road_damage", "water_leakage", "garbage",
        "drainage", "streetlight_failure", "public_facility", "other"
    ]
    for cat_a in categories:
        for cat_b in categories:
            score = compute_category_similarity(cat_a, cat_b)
            assert 0.0 <= score <= 1.0, f"Invalid score {score} for {cat_a} vs {cat_b}"
