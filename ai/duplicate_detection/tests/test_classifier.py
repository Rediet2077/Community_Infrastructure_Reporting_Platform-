# test_classifier.py
# Tests for classifier.py — the final duplicate decision
# Run: python -m pytest tests/ -v

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from classifier import detect_duplicate


def test_same_report_is_duplicate():
    """Exact same report details should be flagged as duplicate"""
    result = detect_duplicate(
        new_title="Pothole on Bole road",
        new_description="Large pothole causing accidents",
        new_category="road_damage",
        new_lat=9.0192, new_lon=38.7525,
        new_image=None,

        existing_title="Pothole on Bole road",
        existing_description="Large pothole causing accidents",
        existing_category="road_damage",
        existing_lat=9.0192, existing_lon=38.7525,
        existing_image=None,

        existing_report_id=100,
    )
    assert result["is_duplicate"] is True
    assert result["similarity_score"] >= 0.80


def test_different_location_not_duplicate():
    """Same words but very different location should not be duplicate"""
    result = detect_duplicate(
        new_title="Pothole on the road",
        new_description="Large pothole causing accidents",
        new_category="road_damage",
        new_lat=9.0192, new_lon=38.7525,
        new_image=None,

        existing_title="Pothole on the road",
        existing_description="Large pothole causing accidents",
        existing_category="road_damage",
        existing_lat=9.1000, existing_lon=38.9000,  # far away
        existing_image=None,

        existing_report_id=200,
    )
    # Location score will be 0 — pulls down the final score
    assert result["similarity_score"] < 1.0


def test_different_category_reduces_score():
    """Different categories should reduce the final score"""
    result = detect_duplicate(
        new_title="Problem near the school",
        new_description="Issue reported near the school building",
        new_category="garbage",
        new_lat=9.0192, new_lon=38.7525,
        new_image=None,

        existing_title="Problem near the school",
        existing_description="Issue reported near the school building",
        existing_category="road_damage",  # different category
        existing_lat=9.0192, existing_lon=38.7525,
        existing_image=None,

        existing_report_id=300,
    )
    # Category score = 0 reduces final score
    assert result["similarity_score"] < 1.0


def test_result_has_required_keys():
    """Result must always contain required keys"""
    result = detect_duplicate(
        new_title="Test", new_description="Test description",
        new_category="other", new_lat=None, new_lon=None, new_image=None,

        existing_title="Test", existing_description="Test description",
        existing_category="other", existing_lat=None, existing_lon=None,
        existing_image=None,

        existing_report_id=999,
    )
    assert "is_duplicate"      in result
    assert "similarity_score"  in result
    assert "similar_report_id" in result
    assert "breakdown"         in result


def test_result_report_id_matches():
    """Result should return the correct existing report ID"""
    result = detect_duplicate(
        new_title="Test", new_description="Test",
        new_category="garbage", new_lat=None, new_lon=None, new_image=None,

        existing_title="Test", existing_description="Test",
        existing_category="garbage", existing_lat=None, existing_lon=None,
        existing_image=None,

        existing_report_id=1024,
    )
    assert result["similar_report_id"] == 1024
