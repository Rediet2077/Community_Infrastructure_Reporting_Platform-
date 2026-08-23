# classifier.py
# Makes the final decision: is this report a duplicate or not?
# Owner: AI Developer 1
#
# Simple idea:
#   final_score >= 0.80 → is_duplicate = True
#   final_score <  0.80 → is_duplicate = False
#
# The officer always makes the FINAL human decision.
# This is just a recommendation.

from typing import Optional
from PIL import Image

from text_similarity     import compute_text_similarity
from location_similarity import compute_location_similarity
from category_similarity import compute_category_similarity
from image_similarity    import compute_image_similarity
from scorer              import compute_final_score, get_score_breakdown

# ── Threshold ──────────────────────────────────────────────
# Score above this → flagged as potential duplicate
DUPLICATE_THRESHOLD = 0.80


def detect_duplicate(
    # New report
    new_title:       str,
    new_description: str,
    new_category:    str,
    new_lat:         Optional[float],
    new_lon:         Optional[float],
    new_image:       Optional[Image.Image],

    # Existing report to compare against
    existing_title:       str,
    existing_description: str,
    existing_category:    str,
    existing_lat:         Optional[float],
    existing_lon:         Optional[float],
    existing_image:       Optional[Image.Image],

    existing_report_id:   int,
) -> dict:
    """
    Compares a new report against one existing report.
    Returns duplicate decision with full breakdown.

    Args:
        new_*:      fields of the newly submitted report
        existing_*: fields of one existing report from the database
        existing_report_id: database ID of the existing report

    Returns:
        {
            "is_duplicate":      True/False,
            "similarity_score":  0.92,
            "similar_report_id": 1024,
            "breakdown": { ... }
        }
    """

    # ── Step 1: Combine title + description for text comparison ──
    new_text      = f"{new_title} {new_description}".strip()
    existing_text = f"{existing_title} {existing_description}".strip()

    # ── Step 2: Compute each similarity ───────────────────────
    text_score = compute_text_similarity(new_text, existing_text)

    location_score = compute_location_similarity(
        new_lat, new_lon,
        existing_lat, existing_lon
    ) if all(v is not None for v in [new_lat, new_lon, existing_lat, existing_lon]) else 0.0

    category_score = compute_category_similarity(
        new_category, existing_category
    )

    image_score = compute_image_similarity(
        new_image, existing_image
    ) if new_image is not None and existing_image is not None else None

    # ── Step 3: Compute final score ───────────────────────────
    final_score = compute_final_score(
        text_score, location_score, category_score, image_score
    )

    # ── Step 4: Make decision ─────────────────────────────────
    is_duplicate = final_score >= DUPLICATE_THRESHOLD

    # ── Step 5: Return result ─────────────────────────────────
    breakdown = get_score_breakdown(
        text_score, location_score, category_score, image_score
    )

    return {
        "is_duplicate":      is_duplicate,
        "similarity_score":  final_score,
        "similar_report_id": existing_report_id,
        "breakdown":         breakdown["breakdown"],
    }


if __name__ == "__main__":
    print("Testing classifier...\n")

    # Case 1 — very likely duplicate
    result = detect_duplicate(
        new_title="Large pothole near DBU gate",
        new_description="Deep hole causing accidents on the road",
        new_category="road_damage",
        new_lat=9.0192, new_lon=38.7525,
        new_image=None,

        existing_title="Big road hole close to university entrance",
        existing_description="Dangerous pothole near the main gate",
        existing_category="road_damage",
        existing_lat=9.0194, existing_lon=38.7527,
        existing_image=None,

        existing_report_id=1024,
    )

    print("Case 1 — Likely duplicate:")
    print(f"  is_duplicate    : {result['is_duplicate']}")
    print(f"  similarity_score: {result['similarity_score']}")
    print(f"  similar_report  : #{result['similar_report_id']}")
    print()

    # Case 2 — not a duplicate
    result2 = detect_duplicate(
        new_title="Broken streetlight on Bole road",
        new_description="Streetlight not working since last week",
        new_category="streetlight_failure",
        new_lat=9.0192, new_lon=38.7525,
        new_image=None,

        existing_title="Garbage pile near the school",
        existing_description="Waste not collected for 2 weeks",
        existing_category="garbage",
        existing_lat=9.0500, existing_lon=38.8000,
        existing_image=None,

        existing_report_id=1000,
    )

    print("Case 2 — Not a duplicate:")
    print(f"  is_duplicate    : {result2['is_duplicate']}")
    print(f"  similarity_score: {result2['similarity_score']}")
