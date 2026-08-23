# test_quality_checker.py
# Tests for quality_checker.py
# Run: python -m pytest tests/ -v

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent / "src"))
sys.path.insert(0, str(Path(__file__).parent.parent.parent / "image_classification" / "src"))

import numpy as np
from PIL import Image
from quality_checker import check_image_quality, PASS, FAIL, WARNING


def make_sharp_image():
    arr = np.zeros((100, 100, 3), dtype=np.uint8)
    arr[40:60, 40:60] = 255
    return Image.fromarray(arr)


def make_blurry_image():
    arr = np.full((100, 100, 3), 128, dtype=np.uint8)
    return Image.fromarray(arr)


def test_blurry_image_fails():
    img    = make_blurry_image()
    result = check_image_quality(img)
    assert result["status"] == FAIL
    assert "blurry" in result["message"].lower()


def test_result_has_required_keys():
    img    = make_blurry_image()
    result = check_image_quality(img)
    assert "status"  in result
    assert "message" in result
    assert "checks"  in result


def test_checks_has_blur_and_relevance():
    img    = make_blurry_image()
    result = check_image_quality(img)
    assert "blur"      in result["checks"]
    assert "relevance" in result["checks"]


def test_status_is_valid_value():
    img    = make_blurry_image()
    result = check_image_quality(img)
    assert result["status"] in (PASS, WARNING, FAIL)
