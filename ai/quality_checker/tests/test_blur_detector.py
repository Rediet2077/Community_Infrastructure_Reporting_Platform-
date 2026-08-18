# test_blur_detector.py
# Tests for blur_detector.py
# Run: python -m pytest tests/ -v

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

import numpy as np
from PIL import Image
from blur_detector import compute_blur_score, is_blurry


def make_sharp_image():
    """Create a sharp synthetic image with clear edges."""
    arr = np.zeros((100, 100, 3), dtype=np.uint8)
    arr[40:60, 40:60] = 255  # white square on black = sharp edge
    return Image.fromarray(arr)


def make_blurry_image():
    """Create a uniformly grey image (no edges = blurry)."""
    arr = np.full((100, 100, 3), 128, dtype=np.uint8)
    return Image.fromarray(arr)


def test_sharp_image_has_high_score():
    img   = make_sharp_image()
    score = compute_blur_score(img)
    assert score > 80.0, f"Sharp image should score > 80, got {score}"


def test_blurry_image_has_low_score():
    img   = make_blurry_image()
    score = compute_blur_score(img)
    assert score < 80.0, f"Blurry image should score < 80, got {score}"


def test_sharp_image_not_flagged():
    img    = make_sharp_image()
    result = is_blurry(img)
    assert result["is_blurry"] is False


def test_blurry_image_is_flagged():
    img    = make_blurry_image()
    result = is_blurry(img)
    assert result["is_blurry"] is True


def test_result_has_required_keys():
    img    = make_sharp_image()
    result = is_blurry(img)
    assert "is_blurry"  in result
    assert "blur_score" in result
    assert "threshold"  in result
    assert "message"    in result


def test_score_is_non_negative():
    img   = make_sharp_image()
    score = compute_blur_score(img)
    assert score >= 0.0
