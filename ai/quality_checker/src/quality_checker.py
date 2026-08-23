# quality_checker.py
# Main quality checker — combines blur + relevance checks.
# Owner: AI Developer 1
#
# This is the main function the API calls.
#
# Returns one of three results:
#   PASS    → photo is clear and relevant
#   WARNING → photo passes but low confidence
#   FAIL    → photo is blurry OR not relevant

from PIL import Image
from blur_detector    import is_blurry
from relevance_checker import check_relevance

PASS    = "pass"
WARNING = "warning"
FAIL    = "fail"


def check_image_quality(image: Image.Image) -> dict:
    """
    Runs all quality checks on an uploaded image.

    Checks:
      1. Is the image VERY blurry? (only reject extremely blurry)
      2. Is the image relevant to infrastructure? (warning only)

    Args:
        image: PIL Image from citizen upload

    Returns:
        {
            "status":   "pass" / "warning" / "fail",
            "message":  "Human readable feedback",
            "checks": {
                "blur":      { "is_blurry": False, "blur_score": 120.5 },
                "relevance": { "is_relevant": True, "confidence": 0.94 }
            }
        }

    Example responses:

    PASS:
        { "status": "pass", "message": "Photo looks good." }

    FAIL (VERY blurry):
        { "status": "fail", "message": "Photo is too blurry. Please retake." }

    PASS (low relevance - but still accepted):
        { "status": "pass", "message": "Photo accepted." }
    """

    # ── Check 1: Blur (only fail if VERY blurry) ─────────
    blur_result = is_blurry(image)

    # ── Check 2: Relevance (warning only, don't fail) ────
    relevance_result = check_relevance(image)

    # ── Decision ──────────────────────────────────────────
    # ONLY FAIL if image is VERY blurry
    if blur_result["is_blurry"]:
        status  = FAIL
        message = blur_result["message"]

    # Otherwise PASS - let duplicate detection handle the rest
    else:
        status  = PASS
        if relevance_result["confidence"] >= 0.50:
            message = (
                f"Photo accepted. "
                f"Detected: {relevance_result['best_category']} "
                f"({relevance_result['confidence']*100:.0f}% confidence)."
            )
        else:
            message = "Photo accepted. Proceeding to duplicate check..."

    return {
        "status":  status,
        "message": message,
        "checks": {
            "blur":      blur_result,
            "relevance": relevance_result,
        },
    }


if __name__ == "__main__":
    print("Testing quality checker...\n")

    from pathlib import Path
    base     = Path(__file__).resolve().parent.parent.parent
    test_dir = base / "image_classification" / "dataset" / "test" / "road_damage"
    images   = list(test_dir.glob("*.jpg"))

    if images:
        img    = Image.open(images[0])
        result = check_image_quality(img)
        print(f"  Status  : {result['status'].upper()}")
        print(f"  Message : {result['message']}")
        print(f"  Blur    : {result['checks']['blur']['blur_score']}")
        print(f"  Relevant: {result['checks']['relevance']['is_relevant']}")
    else:
        print("No test images found.")
