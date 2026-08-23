"""
CIRP — Image Classification Dataset Downloader
================================================
Owner: AI Developer 1

Run this script in your terminal:
    cd C:\\Users\\Usuario\\Desktop\\CIRP
    python ai/image_classification/download_datasets.py

It will download all remaining categories and copy images into the
correct train/validation/test folders.
"""

import shutil
import subprocess
import sys
import random
import time
from pathlib import Path

BASE_DIR    = Path(__file__).resolve().parent
DATASET_DIR = BASE_DIR / "dataset"
RAW_DIR     = BASE_DIR / "datasets" / "raw"

CATEGORIES = [
    "road_damage", "water_leakage", "garbage",
    "drainage", "streetlight", "public_facility", "other",
]
SPLITS = ["train", "validation", "test"]

# ── All verified slugs with real image content ────────────────────────────────
# Format: (slug, category, max_images)
# Ordered smallest → largest so fast ones finish first
ALL_DATASETS = [
    # ── Streetlight (2.5 MB) ──────────────────────────────────────────────
    ("notitltd/demo-street-light-detection-5-crop-images-and-data", "streetlight",    300),

    # ── Road Damage (already has images — small extras) ───────────────────
    ("chitholian/annotated-potholes-dataset",   "road_damage",       300),   # 46 MB

    # ── Garbage (small extra set, 50MB) ───────────────────────────────────
    ("quangtheng/garbage-classification-6-classes-775class", "garbage", 300), # 50 MB

    # ── Water Leakage / Cracks (3MB) ─────────────────────────────────────
    ("bandisr/post-earthquake-asphalt-crack-classification", "water_leakage", 300),  # 3 MB

    # ── Drainage (needs manual — no small image dataset found) ───────────
    # ── Public Facility (needs manual) ───────────────────────────────────
    # ── Other (reuse crack images) ────────────────────────────────────────
    ("bandisr/post-earthquake-asphalt-crack-classification", "other",        150),
]

TARGET_PER_CATEGORY = 300   # minimum images we want in train/


def check_credentials():
    t = Path.home() / ".kaggle" / "access_token"
    j = Path.home() / ".kaggle" / "kaggle.json"
    if t.exists() or j.exists():
        print("[OK] Kaggle credentials found.")
        return
    print("[ERROR] No Kaggle credentials.")
    print(r'Run: "YOUR_TOKEN" | Out-File "$env:USERPROFILE\.kaggle\access_token" -Encoding ascii -NoNewline')
    sys.exit(1)


def create_dirs():
    for split in SPLITS:
        for cat in CATEGORIES:
            (DATASET_DIR / split / cat).mkdir(parents=True, exist_ok=True)
    RAW_DIR.mkdir(parents=True, exist_ok=True)


def current_count(category):
    p = DATASET_DIR / "train" / category
    return len([f for f in p.iterdir() if f.is_file() and f.suffix.lower() in {".jpg",".jpeg",".png"}]) if p.exists() else 0


def download_dataset(slug, dest_dir, timeout_sec=300, retries=2):
    dest_dir = Path(dest_dir)
    dest_dir.mkdir(parents=True, exist_ok=True)

    for attempt in range(1, retries + 1):
        print(f"  Attempt {attempt}: downloading {slug} ...")
        try:
            result = subprocess.run(
                [sys.executable, "-m", "kaggle", "datasets", "download",
                 "-d", slug, "-p", str(dest_dir), "--unzip"],
                timeout=timeout_sec,
                text=True,
                encoding="utf-8",
                errors="replace",
            )
            if result.returncode == 0:
                print("  [OK] Download complete.")
                return True
            print(f"  [FAIL] Return code {result.returncode}")
        except subprocess.TimeoutExpired:
            print(f"  [TIMEOUT] Timed out after {timeout_sec}s.")
            if attempt < retries:
                print("  Retrying in 5 seconds...")
                time.sleep(5)
    return False


def copy_images(src_dir, dest_dir, max_images=400):
    src_dir  = Path(src_dir)
    dest_dir = Path(dest_dir)
    exts     = {".jpg", ".jpeg", ".png"}
    existing = {f.name for f in dest_dir.iterdir() if f.is_file()}
    all_imgs = [
        p for p in src_dir.rglob("*")
        if p.is_file() and p.suffix.lower() in exts and p.name not in existing
    ]
    random.shuffle(all_imgs)
    count = 0
    for img in all_imgs[:max_images]:
        try:
            shutil.copy2(img, dest_dir / img.name)
            existing.add(img.name)
            count += 1
        except Exception:
            pass
    if count:
        print(f"  Copied {count} images → train/{dest_dir.name}/")
    return count


def split_category(category):
    train = DATASET_DIR / "train"      / category
    val   = DATASET_DIR / "validation" / category
    test  = DATASET_DIR / "test"       / category

    imgs  = [f for f in train.iterdir() if f.is_file() and f.suffix.lower() in {".jpg",".jpeg",".png"}]
    total = len(imgs)
    if total == 0:
        return

    # Skip if already split
    val_count  = len(list(val.iterdir()))
    test_count = len(list(test.iterdir()))
    if val_count > 0 or test_count > 0:
        return

    n = max(1, int(total * 0.10))
    random.shuffle(imgs)
    for f in imgs[:n]:
        shutil.move(str(f), val / f.name)
    for f in imgs[n:2*n]:
        shutil.move(str(f), test / f.name)

    remaining = len([f for f in train.iterdir() if f.is_file()])
    print(f"  {category:<22} {remaining:>4} train | {n:>3} val | {n:>3} test")


def print_summary():
    print()
    print("=" * 55)
    print("  FINAL DATASET SUMMARY")
    print("=" * 55)
    for split in SPLITS:
        print(f"\n  {split.upper()}/")
        for cat in CATEGORIES:
            p = DATASET_DIR / split / cat
            n = len([f for f in p.iterdir() if f.is_file()]) if p.exists() else 0
            bar    = "█" * min(n // 30, 20)
            status = "✓" if n >= 100 else ("~" if n > 0 else "✗ needs images")
            print(f"    {status}  {cat:<22} {n:>5}  {bar}")
    print()


def main():
    print("=" * 55)
    print("  CIRP — Image Classification Dataset Downloader")
    print("=" * 55)

    check_credentials()
    create_dirs()

    # ── Download each dataset ──────────────────────────────────────────────
    print("\n--- Downloading datasets ---\n")

    for slug, category, max_imgs in ALL_DATASETS:
        current = current_count(category)
        if current >= TARGET_PER_CATEGORY:
            print(f"[SKIP] {category} already has {current} images (target: {TARGET_PER_CATEGORY}).")
            continue

        print(f"\n[{category.upper()}] {slug}")
        raw_dir = RAW_DIR / category / slug.replace("/", "__")

        # Skip if already downloaded
        img_count = len([p for p in raw_dir.rglob("*")
                         if p.is_file() and p.suffix.lower() in {".jpg",".jpeg",".png"}])
        if img_count > 0:
            print(f"  Already downloaded ({img_count} raw images). Copying...")
        else:
            ok = download_dataset(slug, raw_dir, timeout_sec=360)
            if not ok:
                print(f"  [SKIP] Could not download. Add images manually to:")
                print(f"         dataset/train/{category}/")
                continue

        copy_images(raw_dir, DATASET_DIR / "train" / category, max_imgs)

    # ── Split into train / val / test ─────────────────────────────────────
    print("\n--- Splitting into train / validation / test (80/10/10) ---\n")
    for cat in CATEGORIES:
        split_category(cat)

    # ── Summary ───────────────────────────────────────────────────────────
    print_summary()

    # ── Manual instructions for still-missing categories ──────────────────
    missing = [(c, current_count(c)) for c in CATEGORIES if current_count(c) < 100]
    if missing:
        print("  Categories still needing images:")
        for cat, n in missing:
            print(f"    {cat}: {n} images")
        print()
        print("  Manual download options:")
        print("  1. Roboflow Universe  : https://universe.roboflow.com")
        print("     Search 'drainage blockage', 'public facility damage', etc.")
        print("     Download as JPG format → put in dataset/train/<category>/")
        print()
        print("  2. Google Images:")
        print("     Search the category → right-click → Save image")
        print("     Put saved images in dataset/train/<category>/")
        print()
        print("  3. Kaggle search:")
        print("     python -m kaggle datasets list -s \"drainage images\"")

    print("\n[DONE]")


if __name__ == "__main__":
    main()
