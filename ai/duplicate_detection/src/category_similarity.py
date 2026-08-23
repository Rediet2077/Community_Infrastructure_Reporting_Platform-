# category_similarity.py
# Compares two report categories and returns similarity score.
# Owner: AI Developer 1
#
# Simple idea:
#   Same category    → 1.0  (road_damage vs road_damage)
#   Related category → 0.5  (drainage vs water_leakage — both are water related)
#   Different        → 0.0  (road_damage vs garbage)

# Categories that are related to each other
# If two reports have related categories, they could still be duplicates
RELATED_CATEGORIES = {
    ("drainage",      "water_leakage"):   0.5,
    ("water_leakage", "drainage"):        0.5,
    ("road_damage",   "public_facility"): 0.3,
    ("public_facility","road_damage"):    0.3,
}


def compute_category_similarity(category_a: str, category_b: str) -> float:
    """
    Compares two infrastructure categories.

    Score:
      1.0  → same category
      0.3–0.5 → related categories
      0.0  → different categories

    Args:
        category_a: category of report A  e.g. "road_damage"
        category_b: category of report B  e.g. "road_damage"

    Returns:
        float: similarity score 0.0 to 1.0
    """
    if not category_a or not category_b:
        return 0.0

    category_a = category_a.lower().strip()
    category_b = category_b.lower().strip()

    # Exact match
    if category_a == category_b:
        return 1.0

    # Related categories
    pair = (category_a, category_b)
    if pair in RELATED_CATEGORIES:
        return RELATED_CATEGORIES[pair]

    # Different categories
    return 0.0


if __name__ == "__main__":
    print("Testing category similarity...\n")

    cases = [
        ("road_damage",   "road_damage",    "Same → 1.0"),
        ("drainage",      "water_leakage",  "Related → 0.5"),
        ("road_damage",   "garbage",        "Different → 0.0"),
        ("streetlight_failure", "garbage",  "Different → 0.0"),
        ("road_damage",   "public_facility","Slightly related → 0.3"),
    ]

    for a, b, description in cases:
        score = compute_category_similarity(a, b)
        print(f"  {a} vs {b}")
        print(f"  Score: {score:.1f}  ({description})")
        print()
