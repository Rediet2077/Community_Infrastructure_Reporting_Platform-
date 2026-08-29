# text_similarity.py
# Compares two report texts and returns how similar they are.
# Owner: AI Developer 1
#
# Now uses the multilingual encoder — works across:
#   English, Amharic, Afaan Oromo, Tigrinya
#
# Example same language:
#   Report A: "Large pothole near DBU gate"
#   Report B: "Big road hole close to university entrance"
#   Result:    0.88
#
# Example cross language:
#   Report A (English): "Large pothole near DBU gate"
#   Report B (Amharic): "ትልቅ ጉድጓድ ቡና ሰርቪስ አካባቢ"
#   Result:    0.82

import sys
from pathlib import Path

# Use the multilingual encoder
sys.path.insert(0, str(
    Path(__file__).resolve().parent.parent.parent / "multilingual" / "src"
))

from multilingual_encoder import compare_multilingual


def compute_text_similarity(text_a: str, text_b: str) -> float:
    """
    Compares two texts and returns similarity score.
    Works across English, Amharic, Afaan Oromo, and Tigrinya.

    Score range: 0.0 to 1.0
      1.0 = identical meaning
      0.0 = completely different

    Args:
        text_a: title + description of report A (any language)
        text_b: title + description of report B (any language)

    Returns:
        float: similarity score between 0.0 and 1.0
    """
    if not text_a or not text_b:
        return 0.0

    result = compare_multilingual(text_a, text_b)
    return result["similarity_score"]


if __name__ == "__main__":
    print("Testing multilingual text similarity...\n")

    pairs = [
        (
            "Large pothole near DBU gate",
            "Big road hole close to university entrance",
            "English vs English — same meaning"
        ),
        (
            "Large pothole near DBU gate",
            "ትልቅ ጉድጓድ ቡና ሰርቪስ አካባቢ",
            "English vs Amharic — same meaning"
        ),
        (
            "Garbage pile near the market",
            "Suphaa gabaa bira jiru",
            "English vs Afaan Oromo — same meaning"
        ),
        (
            "Broken streetlight on Bole road",
            "Water pipe leaking near the school",
            "English vs English — different meaning"
        ),
    ]

    for text_a, text_b, description in pairs:
        score = compute_text_similarity(text_a, text_b)
        print(f"  A: {text_a}")
        print(f"  B: {text_b}")
        print(f"  Score: {score:.2f}  ({description})")
        print()
