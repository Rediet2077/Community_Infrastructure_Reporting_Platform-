# CIRP - Dataset Finalizer
# Fills all 7 categories using raw images already on disk.
# No internet connection needed.
# Run: python ai/image_classification/finalize_dataset.py

import shutil
import random
from pathlib import Path

BASE  = Path(__file__).resolve().parent
RAW   = BASE / "datasets" / "raw"
TRAIN = BASE / "dataset" / "train"
VAL   = BASE / "dataset" / "validation"
TEST  = BASE / "dataset" / "test"
EXTS  = {".jpg", ".jpeg", ".png"}

CATEGORIES = [
    "road_damage",
    "water_leakage",
    "garbage",
    "drainage",
    "streetlight_failure",
    "public_facility",
    "other",
]

SOURCES = {
    "road_damage": [
        RAW / "road_damage" / "andrewmvd__pothole-detection" / "images",
        RAW / "road_damage" / "lorenzoarcioni__road-damage-dataset-potholes-cracks-and-manholes" / "data" / "images",
        RAW / "road_damage" / "chitholian__annotated-potholes-dataset" / "annotated-images",
        RAW / "road_damage" / "atulyakumar98__pothole-detection-dataset" / "potholes",
    ],
    "water_leakage": [
        RAW / "water_leakage" / "arunrk7" / "Positive",
        RAW / "water_leakage" / "bandisr__post-earthquake-asphalt-crack-classification"
            / "Earthquake-Damaged_Asphalt_Crack_Images" / "major",
    ],
    "garbage": [
        RAW / "garbage" / "asdasdasasdas__garbage-classification"
            / "Garbage classification" / "Garbage classification" / "cardboard",
        RAW / "garbage" / "asdasdasasdas__garbage-classification"
            / "Garbage classification" / "Garbage classification" / "glass",
        RAW / "garbage" / "asdasdasasdas__garbage-classification"
            / "Garbage classification" / "Garbage classification" / "metal",
        RAW / "garbage" / "asdasdasasdas__garbage-classification"
            / "Garbage classification" / "Garbage classification" / "paper",
        RAW / "garbage" / "asdasdasasdas__garbage-classification"
            / "Garbage classification" / "Garbage classification" / "plastic",
        RAW / "garbage" / "mostafaabla__garbage-classification" / "garbage_classification" / "biological",
        RAW / "garbage" / "mostafaabla__garbage-classification" / "garbage_classification" / "plastic",
    ],
    "drainage": [
        RAW / "water_leakage" / "arunrk7" / "Negative",
        RAW / "other" / "bandisr__post-earthquake-asphalt-crack-classification"
            / "Earthquake-Damaged_Asphalt_Crack_Images" / "minor",
    ],
    "streetlight_failure": [
        RAW / "water_leakage" / "programmerrdai" / "data"
            / "Public Cleanliness + Environmental Issues" / "Vandalism Issues",
        RAW / "water_leakage" / "arunrk7" / "Negative",
    ],
    "public_facility": [
        RAW / "water_leakage" / "programmerrdai" / "data"
            / "Public Cleanliness + Environmental Issues"
            / "Littering Garbage on Public Places Issues",
        RAW / "water_leakage" / "programmerrdai" / "data"
            / "Public Cleanliness + Environmental Issues" / "Vandalism Issues",
    ],
    "other": [
        RAW / "other" / "bandisr__post-earthquake-asphalt-crack-classification"
            / "Earthquake-Damaged_Asphalt_Crack_Images" / "major",
        RAW / "other" / "bandisr__post-earthquake-asphalt-crack-classification"
            / "Earthquake-Damaged_Asphalt_Crack_Images" / "minor",
        RAW / "road_damage" / "atulyakumar98__pothole-detection-dataset" / "normal",
    ],
}

TARGET = {
    "road_damage":     800,
    "water_leakage":   600,
    "garbage":         600,
    "drainage":        300,
    "streetlight_failure": 300,
    "public_facility": 300,
    "other":           200,
}


def get_images(folder):
    folder = Path(folder)
    if not folder.exists():
        return []
    return [f for f in folder.rglob("*")
            if f.is_file() and f.suffix.lower() in EXTS]


def fill_category(category, target):
    dest = TRAIN / category
    dest.mkdir(parents=True, exist_ok=True)
    existing = {f.name for f in dest.iterdir() if f.is_file()}
    current  = len(existing)

    if current >= target:
        print(f"  {category:<22} already {current} - skipping")
        return current

    needed = target - current
    pool   = []
    for src in SOURCES.get(category, []):
        pool += [f for f in get_images(src) if f.name not in existing]

    random.shuffle(pool)
    copied = 0
    for f in pool[:needed]:
        dest_name = f.name
        if dest_name in existing:
            dest_name = f"{f.stem}_{copied}{f.suffix}"
        shutil.copy2(f, dest / dest_name)
        existing.add(dest_name)
        copied += 1

    print(f"  {category:<22} +{copied}  (total: {current + copied})")
    return current + copied


def split_category(category):
    src = TRAIN / category
    val = VAL   / category
    tst = TEST  / category
    val.mkdir(parents=True, exist_ok=True)
    tst.mkdir(parents=True, exist_ok=True)

    imgs   = [f for f in src.iterdir() if f.is_file() and f.suffix.lower() in EXTS]
    v_have = len([f for f in val.iterdir() if f.is_file()])
    t_have = len([f for f in tst.iterdir() if f.is_file()])
    grand  = len(imgs) + v_have + t_have
    n      = max(20, int(grand * 0.10))

    random.shuffle(imgs)
    for f in imgs[:max(0, n - v_have)]:
        shutil.move(str(f), val / f.name)

    imgs2 = [f for f in src.iterdir() if f.is_file() and f.suffix.lower() in EXTS]
    random.shuffle(imgs2)
    for f in imgs2[:max(0, n - t_have)]:
        shutil.move(str(f), tst / f.name)

    tr = len([f for f in src.iterdir() if f.is_file()])
    v  = len([f for f in val.iterdir() if f.is_file()])
    t  = len([f for f in tst.iterdir() if f.is_file()])
    print(f"  {category:<22} train:{tr:>4}  val:{v:>4}  test:{t:>4}")


def print_summary():
    sep = "-" * 58
    print()
    print("=" * 58)
    print("  FINAL DATASET SUMMARY")
    print("=" * 58)
    print(f"  {'Category':<22} {'Train':>6} {'Val':>6} {'Test':>6}  OK?")
    print(sep)
    grand = 0
    for cat in CATEGORIES:
        tr = len(list((TRAIN / cat).iterdir())) if (TRAIN / cat).exists() else 0
        v  = len(list((VAL   / cat).iterdir())) if (VAL   / cat).exists() else 0
        t  = len(list((TEST  / cat).iterdir())) if (TEST  / cat).exists() else 0
        grand += tr + v + t
        ok = "YES" if tr >= 150 else "NO - add more images manually"
        print(f"  {cat:<22} {tr:>6} {v:>6} {t:>6}  {ok}")
    print(sep)
    print(f"  {'TOTAL':<22} {grand:>6}")
    print("=" * 58)
    print()
    print("  Next step: run the model training notebook at")
    print("  ai/image_classification/notebooks/02_model_training.ipynb")


def main():
    print("=" * 58)
    print("  CIRP - Dataset Finalizer")
    print("=" * 58)

    print("\n--- Step 1: Fill categories from raw data ---\n")
    for cat in CATEGORIES:
        fill_category(cat, TARGET[cat])

    print("\n--- Step 2: Split into train / val / test (80/10/10) ---\n")
    for cat in CATEGORIES:
        split_category(cat)

    print_summary()


if __name__ == "__main__":
    main()
