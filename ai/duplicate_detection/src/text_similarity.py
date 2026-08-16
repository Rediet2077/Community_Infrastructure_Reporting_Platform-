# text_similarity.py
# Compares two report texts and returns how similar they are.
# Owner: AI Developer 1
#
# Simple idea:
#   Report A: "Large pothole near DBU gate"
#   Report B: "Big road hole close to university entrance"
#   Result:    0.88  (very similar meaning)
#
# Uses sentence-transformers which understands meaning, not just words.
# So "pothole" and "road hole" will score high even though different words.

from sentence_transformers import SentenceTransformer, util

# Load model once — this model understands multiple languages
# including English and some Amharic/Afaan Oromo text
MODEL_NAME = "paraphrase-multilingual-MiniLM-L12-v2"

_model = None


def _get_model():
    """Load model once and reuse."""
    global _model
    if _model is None:
        print(f"Loading text model: {MODEL_NAME}")
        _model = SentenceTransformer(MODEL_NAME)
    return _model


def compute_text_similarity(text_a: str, text_b: str) -> float:
    """
    Compares two texts and returns similarity score.

    Score range: 0.0 to 1.0
      1.0 = identical meaning
      0.0 = completely different

    Example:
      text_a = "Large pothole near DBU gate"
      text_b = "Big road hole close to university entrance"
      result = 0.88

    Args:
        text_a: title + description of report A
        text_b: title + description of report B

    Returns:
        float: similarity score between 0.0 and 1.0
    """
    if not text_a or not text_b:
        return 0.0

    model = _get_model()

    # Convert texts to vectors (numbers that represent meaning)
    embedding_a = model.encode(text_a, convert_to_tensor=True)
    embedding_b = model.encode(text_b, convert_to_tensor=True)

    # Cosine similarity — measures angle between two vectors
    # Similar meanings → small angle → high score
    score = util.cos_sim(embedding_a, embedding_b).item()

    # Clamp between 0 and 1
    return max(0.0, min(1.0, float(score)))


if __name__ == "__main__":
    # Test
    print("Testing text similarity...\n")

    pairs = [
        (
            "Large pothole near DBU gate",
            "Big road hole close to university entrance",
            "Should be HIGH (same meaning, different words)"
        ),
        (
            "Broken streetlight on Bole road",
            "Water pipe leaking near the school",
            "Should be LOW (completely different)"
        ),
        (
            "Garbage pile near the market",
            "Waste accumulation close to the market area",
            "Should be HIGH (very similar)"
        ),
        (
            "Pothole on main road",
            "Pothole on main road",
            "Should be 1.0 (identical)"
        ),
    ]

    for text_a, text_b, description in pairs:
        score = compute_text_similarity(text_a, text_b)
        print(f"  A: {text_a}")
        print(f"  B: {text_b}")
        print(f"  Score: {score:.2f}  ({description})")
        print()
