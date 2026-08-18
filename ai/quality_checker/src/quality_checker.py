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
      1. Is the image too blurry?
      2. Is the image relevant to infrastructure?

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

    FAIL (blurry):
        { "status": "fail", "message": "Photo is too blurry. Please retake." }

    FAIL (not relevant):
        { "status": "fail", "message": "This does not look like infrastructure." }

    WARNING (low confidence):
        { "status": "warning", "message": "Photo accepted but unclear category." }
    """

    # ── Check 1: Blur ─────────────────────────────────────
    blur_result = is_blurry(image)

    # ── Check 2: Relevance ────────────────────────────────
    relevance_result = check_relevance(image)

    # ── Decision ──────────────────────────────────────────
    if blur_result["is_blurry"]:
        status  = FAIL
        message = blur_result["message"]

    elif not relevance_result["is_relevant"]:
        status  = FAIL
        message = relevance_result["message"]

    elif relevance_result["confidence"] < 0.50:
        status  = WARNING
        message = (
            f"Photo accepted. Category suggestion: {relevance_result['best_category']} "
            f"({relevance_result['confidence']*100:.0f}% confidence). "
            "You can correct this if needed."
        )

    else:
        status  = PASS
        message = (
            f"Photo looks good. "
            f"Detected: {relevance_result['best_category']} "
            f"({relevance_result['confidence']*100:.0f}% confidence)."
        )

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
