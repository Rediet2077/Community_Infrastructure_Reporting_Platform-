# test_language_detector.py
# Tests for language_detector.py
# Run: python -m pytest tests/ -v

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from language_detector import detect_language, get_language_name


def test_english_detected():
    assert detect_language("Large pothole near DBU gate") == "en"


def test_amharic_detected():
    assert detect_language("ትልቅ ጉድጓድ በቡና ሰርቪስ አካባቢ") == "am"


def test_afaan_oromo_detected():
    assert detect_language("Daandii irratti riqicha guddaa") == "or"


def test_tigrinya_detected():
    assert detect_language("ጉድጓድ ዓቢ ኣብ መንገዲ") == "ti"


def test_empty_returns_unknown():
    assert detect_language("") == "unknown"


def test_language_name_english():
    assert get_language_name("en") == "English"


def test_language_name_amharic():
    assert get_language_name("am") == "Amharic"


def test_language_name_oromo():
    assert get_language_name("or") == "Afaan Oromo"


def test_language_name_tigrinya():
    assert get_language_name("ti") == "Tigrinya"
