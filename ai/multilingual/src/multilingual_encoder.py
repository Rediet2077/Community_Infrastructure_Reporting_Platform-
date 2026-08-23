# multilingual_encoder.py
# Encodes report text into vectors for cross-language comparison.
# Works across English, Amharic, Afaan Oromo, and Tigrinya.
# Owner: AI Developer 1
#
# Simple idea:
#   Report A (Amharic): "ትልቅ ጉድጓድ በቡና ሰርቪስ አካባቢ"
#   Report B (English): "Large pothole near the coffee shop"
#   Both get converted to vectors → compared → score: 0.85
#
# Uses paraphrase-multilingual-MiniLM-L12-v2 which supports
# 50+ languages including Amharic, Afaan Oromo, and Tigrinya.

from sentence_transformers import SentenceTransformer, util
from language_detector import detect_language, get_language_name

MODEL_NAME = "paraphrase-multilingual-MiniLM-L12-v2"

_model = None


def _get_model():
    """Load model once and reuse."""
    global _model
    if _model is None:
        print(f"Loading multilingual model: {MODEL_NAME}")
        _model = SentenceTransformer(MODEL_NAME)
    return _model


def encode_text(text: str):
    """
    Converts text to a vector (list of numbers).
    Works for any of the 4 supported languages.

    Args:
        text: report title or description in any language

    Returns:
        tensor: vector representation of the text
    """
    model = _get_model()
    return model.encode(text, convert_to_tensor=True)


def compare_multilingual(text_a: str, text_b: str) -> dict:
    """
    Compares two texts that may be in different languages.
    Returns similarity score with language information.

    Example:
        text_a = "Large pothole near DBU gate"  (English)
        text_b = "ትልቅ ጉድጓድ ቡና ሰርቪስ አካባቢ"    (Amharic)
        result = {
            "similarity_score": 0.82,
            "language_a": "en",
            "language_b": "am",
            "cross_language": True
        }

    Args:
        text_a: text from report A (any language)
        text_b: text from report B (any language)

    Returns:
        dict with similarity_score and language info
    """
    if not text_a or not text_b:
        return {
            "similarity_score": 0.0,
            "language_a": "unknown",
            "language_b": "unknown",
            "cross_language": False,
        }

    lang_a = detect_language(text_a)
    lang_b = detect_language(text_b)

    model = _get_model()
    vec_a = model.encode(text_a, convert_to_tensor=True)
    vec_b = model.encode(text_b, convert_to_tensor=True)

    score = util.cos_sim(vec_a, vec_b).item()
    score = round(max(0.0, min(1.0, float(score))), 4)

    return {
        "similarity_score": score,
        "language_a":       lang_a,
        "language_b":       lang_b,
        "language_a_name":  get_language_name(lang_a),
        "language_b_name":  get_language_name(lang_b),
        "cross_language":   lang_a != lang_b,
    }


if __name__ == "__main__":
    print("Testing multilingual encoder...\n")

    pairs = [
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
            "Water pipe leaking near school",
            "English vs English — different meaning"
        ),
        (
            "ትልቅ ጉድጓድ",
            "ጉድጓድ ዓቢ",
            "Amharic vs Tigrinya — similar meaning"
        ),
    ]

    for text_a, text_b, description in pairs:
        result = compare_multilingual(text_a, text_b)
        print(f"  A ({result['language_a_name']}): {text_a}")
        print(f"  B ({result['language_b_name']}): {text_b}")
        print(f"  Score        : {result['similarity_score']}")
        print(f"  Cross-language: {result['cross_language']}")
        print(f"  Description  : {description}")
        print()
