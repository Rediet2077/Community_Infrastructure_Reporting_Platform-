# scorer.py
# Combines all similarity scores into one final score.
# Owner: AI Developer 1
#
# Simple idea:
#   text_score     = 0.88   (descriptions are very similar)
#   location_score = 0.95   (GPS points are 20m apart)
#   category_score = 1.00   (same category)
#   image_score    = 0.91   (photos look similar)
#
#   final_score = weighted average = 0.92
#
# Weights reflect how important each component is:
#   Text     35% — most important (describes the problem)
#   Location 30% — second most (same location = same problem)
#   Image    25% — third (visual confirmation)
#   Category 10% — least (could be different even if same place)

from typing import Optional

# ── Weights for each component ─────────────────────────────
WEIGHTS = {
    "text":     0.35,
    "location": 0.30,
    "image":    0.25,
    "category": 0.10,
}


def compute_final_score(
    text_score:     float,
    location_score: float,
    category_score: float,
    image_score:    Optional[float] = None,
) -> float:
    """
    Combines all component scores into one final similarity score.

    If image_score is None (no image uploaded), redistributes
    the image weight equally among other components.

    Args:
        text_score:     0.0–1.0 from text_similarity.py
        location_score: 0.0–1.0 from location_similarity.py
        category_score: 0.0–1.0 from category_similarity.py
        image_score:    0.0–1.0 from image_similarity.py (optional)

    Returns:
        float: final combined score 0.0 to 1.0
    """

    if image_score is not None:
        # All 4 components available
        score = (
            text_score     * WEIGHTS["text"]     +
            location_score * WEIGHTS["location"] +
            image_score    * WEIGHTS["image"]    +
            category_score * WEIGHTS["category"]
        )
    else:
        # No image — redistribute image weight to other 3
        total_weight = (
            WEIGHTS["text"] +
            WEIGHTS["location"] +
            WEIGHTS["category"]
        )
        score = (
            text_score     * (WEIGHTS["text"]     / total_weight) +
            location_score * (WEIGHTS["location"] / total_weight) +
            category_score * (WEIGHTS["category"] / total_weight)
        )

    return round(max(0.0, min(1.0, float(score))), 4)


def get_score_breakdown(
    text_score:     float,
    location_score: float,
    category_score: float,
    image_score:    Optional[float] = None,
) -> dict:
    """
    Returns the final score with a breakdown of each component.
    Useful for debugging and explaining AI decisions.

    Example return:
    {
        "final_score": 0.92,
        "breakdown": {
            "text":     {"score": 0.88, "weight": 0.35, "contribution": 0.308},
            "location": {"score": 0.95, "weight": 0.30, "contribution": 0.285},
            "image":    {"score": 0.91, "weight": 0.25, "contribution": 0.228},
            "category": {"score": 1.00, "weight": 0.10, "contribution": 0.100},
        }
    }
    """
    final_score = compute_final_score(
        text_score, location_score, category_score, image_score
    )

    breakdown = {
        "text": {
            "score":        round(text_score, 4),
            "weight":       WEIGHTS["text"],
            "contribution": round(text_score * WEIGHTS["text"], 4),
        },
        "location": {
            "score":        round(location_score, 4),
            "weight":       WEIGHTS["location"],
            "contribution": round(location_score * WEIGHTS["location"], 4),
        },
        "category": {
            "score":        round(category_score, 4),
            "weight":       WEIGHTS["category"],
            "contribution": round(category_score * WEIGHTS["category"], 4),
        },
    }

    if image_score is not None:
        breakdown["image"] = {
            "score":        round(image_score, 4),
            "weight":       WEIGHTS["image"],
            "contribution": round(image_score * WEIGHTS["image"], 4),
        }
    else:
        breakdown["image"] = {
            "score":   None,
            "weight":  WEIGHTS["image"],
            "contribution": 0,
            "note": "No image provided — weight redistributed"
        }

    return {
        "final_score": final_score,
        "breakdown":   breakdown,
    }


if __name__ == "__main__":
    print("Testing scorer...\n")

    # High similarity case
    result = get_score_breakdown(
        text_score=0.88,
        location_score=0.95,
        category_score=1.00,
        image_score=0.91,
    )
    print(f"High similarity case:")
    print(f"  Final score: {result['final_score']}")
    for k, v in result["breakdown"].items():
        print(f"  {k:<10} score={v['score']}  contribution={v['contribution']}")

    print()

    # Low similarity case
    result2 = get_score_breakdown(
        text_score=0.10,
        location_score=0.00,
        category_score=0.00,
        image_score=0.15,
    )
    print(f"Low similarity case:")
    print(f"  Final score: {result2['final_score']}")
