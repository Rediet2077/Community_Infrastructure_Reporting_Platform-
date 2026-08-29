# test_location_similarity.py
# Tests for location_similarity.py
# Run: python -m pytest tests/ -v

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from location_similarity import compute_location_similarity, haversine_distance


def test_same_point_returns_1():
    """Exact same GPS point should return 1.0"""
    score = compute_location_similarity(
        9.0192, 38.7525,
        9.0192, 38.7525
    )
    assert score == 1.0, f"Expected 1.0, got {score}"


def test_close_points_return_high_score():
    """Points ~30 meters apart should score high"""
    score = compute_location_similarity(
        9.0192, 38.7525,
        9.0194, 38.7527
    )
    assert score >= 0.60, f"Expected >= 0.60, got {score}"


def test_far_points_return_zero():
    """Points more than 100m apart should return 0.0"""
    score = compute_location_similarity(
        9.0192, 38.7525,
        9.0500, 38.8000
    )
    assert score == 0.0, f"Expected 0.0, got {score}"


def test_none_coordinates_return_zero():
    """Missing GPS should return 0.0"""
    score = compute_location_similarity(None, None, 9.0192, 38.7525)
    assert score == 0.0, f"Expected 0.0, got {score}"


def test_haversine_distance_same_point():
    """Distance between same point should be 0"""
    dist = haversine_distance(9.0192, 38.7525, 9.0192, 38.7525)
    assert dist < 0.01, f"Expected ~0, got {dist}"


def test_score_between_0_and_1():
    """Score must always be between 0 and 1"""
    score = compute_location_similarity(
        9.0192, 38.7525,
        9.0195, 38.7528
    )
    assert 0.0 <= score <= 1.0, f"Score out of range: {score}"
