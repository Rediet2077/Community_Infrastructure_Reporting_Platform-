# blur_detector.py
# Checks if an image is too blurry to be useful.
# Owner: AI Developer 1
#
# Simple idea:
#   Sharp photo  → high variance of edges → PASS
#   Blurry photo → low variance of edges  → FAIL
#
# Uses Laplacian variance method — fast and reliable.

import cv2
import numpy as np
from PIL import Image

# Threshold — images below this are considered blurry
BLUR_THRESHOLD = 80.0


def compute_blur_score(image: Image.Image) -> float:
    """
    Computes a sharpness score for the image.

    Higher score = sharper image
    Lower score  = blurrier image

    Args:
        image: PIL Image

    Returns:
        float: sharpness score (higher is better)
    """
    # Convert PIL to OpenCV format
    img_array = np.array(image.convert("L"))  # grayscale

    # Laplacian variance — measures edge sharpness
    laplacian = cv2.Laplacian(img_array, cv2.CV_64F)
    score = float(laplacian.var())

    return round(score, 2)


def is_blurry(image: Image.Image, threshold: float = BLUR_THRESHOLD) -> dict:
    """
    Checks if an image is too blurry.

    Args:
        image: PIL Image
        threshold: blur threshold (default 80.0)

    Returns:
        {
            "is_blurry": True/False,
            "blur_score": 45.2,
            "threshold": 80.0,
            "message": "Photo is too blurry. Please retake."
        }
    """
    score = compute_blur_score(image)
    blurry = score < threshold

    if blurry:
        message = "Photo is too blurry. Please retake a clearer photo."
    else:
        message = "Photo sharpness is acceptable."

    return {
        "is_blurry":  blurry,
        "blur_score": score,
        "threshold":  threshold,
        "message":    message,
    }


if __name__ == "__main__":
    print("Testing blur detector...\n")
    import sys
    from pathlib import Path

    # Test with a real image from the dataset
    base = Path(__file__).resolve().parent.parent.parent
    test_dir = base / "image_classification" / "dataset" / "test" / "road_damage"
    images   = list(test_dir.glob("*.jpg"))

    if images:
        img    = Image.open(images[0])
        result = is_blurry(img)
        print(f"  Image     : {images[0].name}")
        print(f"  Blur score: {result['blur_score']}")
        print(f"  Is blurry : {result['is_blurry']}")
        print(f"  Message   : {result['message']}")
    else:
        print("No test images found.")
