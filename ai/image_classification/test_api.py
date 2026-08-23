# test_api.py
# Quick test to verify predict_image_from_pil works correctly.
# Run: python test_api.py

import sys
from pathlib import Path
from PIL import Image

sys.path.insert(0, str(Path(__file__).parent / "src"))

from predict import predict_image_from_pil

# Pick one real test image from each category
test_dir = Path(__file__).parent / "dataset" / "test"

print("=" * 50)
print("  Testing predict_image_from_pil")
print("=" * 50)

categories = [
    "road_damage",
    "garbage",
    "water_leakage",
    "drainage",
    "streetlight_failure",
    "public_facility",
    "other",
]

for cat in categories:
    cat_dir = test_dir / cat
    if not cat_dir.exists():
        print(f"  {cat}: folder not found")
        continue

    images = list(cat_dir.glob("*.jpg")) + list(cat_dir.glob("*.png"))
    if not images:
        print(f"  {cat}: no images found")
        continue

    img    = Image.open(images[0]).convert("RGB")
    result = predict_image_from_pil(img)

    correct = "CORRECT" if result["category"] == cat else f"WRONG (got {result['category']})"
    print(f"  {cat:<24} → {result['category']:<24} {result['confidence']*100:.0f}%  {correct}")

print()
print("Test complete.")
