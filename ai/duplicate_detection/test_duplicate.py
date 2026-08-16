# test_duplicate.py
# Tests the full duplicate detection pipeline.
# Run: python test_duplicate.py

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent / "src"))

from classifier import detect_duplicate

print("=" * 55)
print("  CIRP - Duplicate Detection Test")
print("=" * 55)

cases = [
    {
        "label": "CASE 1 - Should be DUPLICATE (same pothole)",
        "new": {
            "title": "Large pothole near DBU gate",
            "description": "Deep hole causing accidents on the road",
            "category": "road_damage",
            "lat": 9.0192, "lon": 38.7525,
        },
        "existing": {
            "id": 1024,
            "title": "Big road hole close to university entrance",
            "description": "Dangerous pothole near the main gate",
            "category": "road_damage",
            "lat": 9.0194, "lon": 38.7527,
        },
    },
    {
        "label": "CASE 2 - Should NOT be duplicate (different place)",
        "new": {
            "title": "Broken streetlight on Bole road",
            "description": "Streetlight not working since last week",
            "category": "streetlight_failure",
            "lat": 9.0192, "lon": 38.7525,
        },
        "existing": {
            "id": 1000,
            "title": "Garbage pile near the school",
            "description": "Waste not collected for 2 weeks",
            "category": "garbage",
            "lat": 9.0500, "lon": 38.8000,
        },
    },
    {
        "label": "CASE 3 - Should be DUPLICATE (same garbage, different words)",
        "new": {
            "title": "Waste piled up near Merkato market",
            "description": "Garbage not collected for days, bad smell",
            "category": "garbage",
            "lat": 9.0192, "lon": 38.7525,
        },
        "existing": {
            "id": 2000,
            "title": "Trash accumulation close to Merkato",
            "description": "Uncollected rubbish near the market area",
            "category": "garbage",
            "lat": 9.0193, "lon": 38.7526,
        },
    },
]

for case in cases:
    print(f"\n{case['label']}")
    print("-" * 55)

    n = case["new"]
    e = case["existing"]

    result = detect_duplicate(
        new_title=n["title"],
        new_description=n["description"],
        new_category=n["category"],
        new_lat=n["lat"], new_lon=n["lon"],
        new_image=None,

        existing_title=e["title"],
        existing_description=e["description"],
        existing_category=e["category"],
        existing_lat=e["lat"], existing_lon=e["lon"],
        existing_image=None,

        existing_report_id=e["id"],
    )

    print(f"  is_duplicate    : {result['is_duplicate']}")
    print(f"  similarity_score: {result['similarity_score']}")
    print(f"  similar_report  : #{result['similar_report_id']}")
    print(f"  Breakdown:")
    for k, v in result["breakdown"].items():
        score = v.get("score", "N/A")
        print(f"    {k:<10}: {score}")

print("\n" + "=" * 55)
print("  Test complete.")
print("=" * 55)
