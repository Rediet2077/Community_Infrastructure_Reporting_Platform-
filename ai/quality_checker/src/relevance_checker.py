# relevance_checker.py
# Checks if an image is relevant to infrastructure problems.
# Owner: AI Developer 1
#
# Simple idea:
#   Uses the trained image classification model.
#   If the model gives a very low confidence for ALL categories,
#   the image is probably not infrastructure-related.
#
# Example:
#   Selfie photo     → all scores very low → NOT relevant
#   Food photo       → all scores very low → NOT relevant
#   Pothole photo    → road_damage = 94%   → RELEVANT

import sys
from pathlib import Path

sys.path.insert(0, str(
    Path(__file__).resolve().parent.parent.parent / "image_classification" / "src"
))

from predict import predict_image_from_pil
from PIL import Image

# If best score is below this, image is not infrastructure-related
RELEVANCE_THRESHOLD = 0.30


def check_relevance(image: Image.Image) -> dict:
    """
    Checks if the image shows an infrastructure problem.

    Args:
        image: PIL Image

    Returns:
        {
            "is_relevant":    True/False,
            "best_category":  "road_damage",
            "confidence":     0.94,
            "message":        "Valid infrastructure photo."
        }
    """
    result       = predict_image_from_pil(image)
    confidence   = result["confidence"]
    category     = result["category"]
    is_relevant  = confidence >= RELEVANCE_THRESHOLD

    if is_relevant:
        message = f"Valid infrastructure photo. Detected: {category}."
    else:
        message = (
            "This photo does not appear to show an infrastructure problem. "
            "Please upload a photo of the actual problem."
        )

    return {
        "is_relevant":  is_relevant,
        "best_category": category,
        "confidence":   confidence,
        "threshold":    RELEVANCE_THRESHOLD,
        "message":      message,
    }


if __name__ == "__main__":
    print("Testing relevance checker...\n")

    base     = Path(__file__).resolve().parent.parent.parent
    test_dir = base / "image_classification" / "dataset" / "test" / "road_damage"
    images   = list(test_dir.glob("*.jpg"))

    if images:
        img    = Image.open(images[0])
        result = check_relevance(img)
        print(f"  Image       : {images[0].name}")
        print(f"  Is relevant : {result['is_relevant']}")
        print(f"  Category    : {result['best_category']}")
        print(f"  Confidence  : {result['confidence']}")
        print(f"  Message     : {result['message']}")
    else:
        print("No test images found.")
