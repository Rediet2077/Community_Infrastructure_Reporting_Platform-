# auto_fill.py
# Main auto-fill function — combines image classification + title + description generation.
# Owner: AI Developer 1
#
# When citizen uploads photo:
#   1. Image classification → category + confidence
#   2. Title generator      → suggested title in citizen's language
#   3. Description generator → suggested description in citizen's language
#
# Returns everything the Flutter app needs to pre-fill the form.

import sys
from pathlib import Path

sys.path.insert(0, str(
    Path(__file__).resolve().parent.parent.parent / "image_classification" / "src"
))

from PIL import Image
from predict import predict_image_from_pil
from title_generator import generate_title
from description_generator import generate_description


def auto_fill_report(image: Image.Image, language: str = "en") -> dict:
    """
    Analyzes an image and returns pre-filled report fields.

    Args:
        image:    PIL Image uploaded by citizen
        language: citizen's preferred language ("en"/"am"/"or"/"ti")

    Returns:
        {
            "category":    "road_damage",
            "confidence":  0.94,
            "title":       "Road Damage Detected",
            "description": "Road surface damage has been identified...",
            "all_scores":  { "road_damage": 0.94, ... },
            "language":    "en"
        }

    Example (English citizen, pothole photo):
        {
            "category":    "road_damage",
            "confidence":  0.94,
            "title":       "Road Damage Detected",
            "description": "Road surface damage has been identified in this area...",
        }

    Example (Amharic citizen, garbage photo):
        {
            "category":    "garbage",
            "confidence":  0.88,
            "title":       "የቆሻሻ ችግር ሪፖርት ተደርጓል",
            "description": "በዚህ አካባቢ ቆሻሻ መከማቸት ሪፖርት ተደርጓል...",
        }
    """
    # Step 1 — Classify image
    classification = predict_image_from_pil(image)
    category   = classification["category"]
    confidence = classification["confidence"]
    all_scores = classification["all_scores"]

    # Step 2 — Generate title
    title = generate_title(category, confidence, language)

    # Step 3 — Generate description
    description = generate_description(category, language)

    return {
        "category":    category,
        "confidence":  confidence,
        "title":       title,
        "description": description,
        "all_scores":  all_scores,
        "language":    language,
    }


if __name__ == "__main__":
    print("Testing auto fill...\n")

    base     = Path(__file__).resolve().parent.parent.parent
    test_dir = base / "image_classification" / "dataset" / "test" / "road_damage"
    images   = list(test_dir.glob("*.jpg"))

    if images:
        img = Image.open(images[0])

        for lang in ["en", "am", "or", "ti"]:
            result = auto_fill_report(img, language=lang)
            print(f"  Language   : {lang}")
            print(f"  Category   : {result['category']} ({result['confidence']*100:.0f}%)")
            print(f"  Title      : {result['title']}")
            print(f"  Description: {result['description'][:60]}...")
            print()
    else:
        print("No test images found.")
