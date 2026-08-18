# test_description_generator.py
# Run: python -m pytest tests/ -v

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from description_generator import generate_description


def test_english_description():
    desc = generate_description("road_damage", "en")
    assert len(desc) > 20
    assert isinstance(desc, str)


def test_amharic_description():
    desc = generate_description("road_damage", "am")
    assert len(desc) > 10


def test_oromo_description():
    desc = generate_description("garbage", "or")
    assert len(desc) > 10


def test_tigrinya_description():
    desc = generate_description("drainage", "ti")
    assert len(desc) > 10


def test_unknown_category_returns_other():
    desc = generate_description("unknown", "en")
    assert len(desc) > 0


def test_all_categories_all_languages():
    categories = [
        "road_damage", "water_leakage", "garbage",
        "drainage", "streetlight_failure", "public_facility", "other"
    ]
    languages = ["en", "am", "or", "ti"]
    for cat in categories:
        for lang in languages:
            desc = generate_description(cat, lang)
            assert len(desc) > 0, f"Empty description for {cat}/{lang}"
