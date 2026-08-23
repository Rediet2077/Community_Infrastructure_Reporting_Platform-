# test_title_generator.py
# Run: python -m pytest tests/ -v

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from title_generator import generate_title


def test_high_confidence_english():
    title = generate_title("road_damage", 0.94, "en")
    assert title == "Road Damage Detected"


def test_low_confidence_adds_possible():
    title = generate_title("road_damage", 0.40, "en")
    assert "Possible" in title


def test_amharic_title():
    title = generate_title("road_damage", 0.94, "am")
    assert len(title) > 0
    assert "Possible" not in title


def test_oromo_title():
    title = generate_title("garbage", 0.80, "or")
    assert len(title) > 0


def test_tigrinya_title():
    title = generate_title("water_leakage", 0.90, "ti")
    assert len(title) > 0


def test_unknown_category_falls_back_to_other():
    title = generate_title("unknown_category", 0.90, "en")
    assert len(title) > 0


def test_unknown_language_falls_back_to_english():
    title = generate_title("road_damage", 0.90, "fr")
    assert len(title) > 0


def test_all_categories_have_titles():
    categories = [
        "road_damage", "water_leakage", "garbage",
        "drainage", "streetlight_failure", "public_facility", "other"
    ]
    for cat in categories:
        title = generate_title(cat, 0.90, "en")
        assert len(title) > 0, f"No title for {cat}"
