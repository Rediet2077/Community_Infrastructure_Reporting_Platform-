# preprocess.py
# Prepares images for training and prediction.
# Owner: AI Developer 1

import torch
from torchvision import datasets, transforms
from torch.utils.data import DataLoader
from pathlib import Path

# ── Paths ──────────────────────────────────────────────────
BASE_DIR   = Path(__file__).resolve().parent.parent
TRAIN_DIR  = BASE_DIR / "dataset" / "train"
VAL_DIR    = BASE_DIR / "dataset" / "validation"
TEST_DIR   = BASE_DIR / "dataset" / "test"

# ── Settings ───────────────────────────────────────────────
IMAGE_SIZE  = 224    # EfficientNet-B0 expects 224x224
BATCH_SIZE  = 32     # how many images to process at once
NUM_WORKERS = 2      # parallel loading

# ── Mean and std from ImageNet (used because we use pretrained model) ──
IMAGENET_MEAN = [0.485, 0.456, 0.406]
IMAGENET_STD  = [0.229, 0.224, 0.225]

# ── Transforms ─────────────────────────────────────────────
# Training: add random flips and rotations so model learns better
train_transform = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.RandomHorizontalFlip(),          # randomly mirror image
    transforms.RandomRotation(15),              # randomly rotate up to 15 degrees
    transforms.ColorJitter(
        brightness=0.2, contrast=0.2,
        saturation=0.2
    ),                                          # slightly change brightness/contrast
    transforms.ToTensor(),                      # convert image to numbers
    transforms.Normalize(
        mean=IMAGENET_MEAN,
        std=IMAGENET_STD
    ),
])

# Validation and Test: no augmentation, just resize and normalize
val_test_transform = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=IMAGENET_MEAN,
        std=IMAGENET_STD
    ),
])


def get_dataloaders():
    """
    Loads images from dataset/train, dataset/validation, dataset/test.
    Returns three DataLoaders and the class names (category list).

    Usage:
        train_loader, val_loader, test_loader, class_names = get_dataloaders()
    """

    train_dataset = datasets.ImageFolder(
        root=str(TRAIN_DIR),
        transform=train_transform
    )

    val_dataset = datasets.ImageFolder(
        root=str(VAL_DIR),
        transform=val_test_transform
    )

    test_dataset = datasets.ImageFolder(
        root=str(TEST_DIR),
        transform=val_test_transform
    )

    train_loader = DataLoader(
        train_dataset,
        batch_size=BATCH_SIZE,
        shuffle=True,
        num_workers=NUM_WORKERS
    )

    val_loader = DataLoader(
        val_dataset,
        batch_size=BATCH_SIZE,
        shuffle=False,
        num_workers=NUM_WORKERS
    )

    test_loader = DataLoader(
        test_dataset,
        batch_size=BATCH_SIZE,
        shuffle=False,
        num_workers=NUM_WORKERS
    )

    class_names = train_dataset.classes

    return train_loader, val_loader, test_loader, class_names


if __name__ == "__main__":
    # Quick test - run this file to check everything loads correctly
    # python src/preprocess.py
    train_loader, val_loader, test_loader, class_names = get_dataloaders()

    print("Categories found:")
    for i, name in enumerate(class_names):
        print(f"  {i} → {name}")

    print(f"\nTraining batches   : {len(train_loader)}")
    print(f"Validation batches : {len(val_loader)}")
    print(f"Test batches       : {len(test_loader)}")

    # Check one batch
    images, labels = next(iter(train_loader))
    print(f"\nOne batch shape    : {images.shape}")
    print(f"  → {images.shape[0]} images")
    print(f"  → {images.shape[1]} color channels (RGB)")
    print(f"  → {images.shape[2]}x{images.shape[3]} pixels")
    print("\npreprocess.py is working correctly.")
