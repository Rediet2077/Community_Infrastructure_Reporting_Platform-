# model.py
# Defines the AI model using pretrained EfficientNet-B0.
# Owner: AI Developer 1

import torch
import torch.nn as nn
from torchvision import models
from pathlib import Path

# ── Paths ──────────────────────────────────────────────────
BASE_DIR   = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "models" / "saved" / "model.pth"

# ── Categories ─────────────────────────────────────────────
# Must match your folder names exactly
CLASS_NAMES = [
    "drainage",
    "garbage",
    "other",
    "public_facility",
    "road_damage",
    "streetlight_failure",
    "water_leakage",
]

NUM_CLASSES = len(CLASS_NAMES)  # 7


def build_model(num_classes=NUM_CLASSES, pretrained=True):
    """
    Loads EfficientNet-B0 pretrained on ImageNet.
    Replaces the last layer to output num_classes instead of 1000.

    Simple explanation:
      - EfficientNet-B0 already knows how to recognize shapes and textures
        from 1.2 million ImageNet images.
      - We only replace the final layer so it outputs 7 categories
        instead of the original 1000.
      - This is called Transfer Learning.
    """

    # Load pretrained EfficientNet-B0
    if pretrained:
        weights = models.EfficientNet_B0_Weights.IMAGENET1K_V1
        model   = models.efficientnet_b0(weights=weights)
        print("Loaded EfficientNet-B0 with pretrained ImageNet weights.")
    else:
        model = models.efficientnet_b0(weights=None)
        print("Loaded EfficientNet-B0 without pretrained weights.")

    # Freeze all layers first (don't change ImageNet knowledge)
    for param in model.parameters():
        param.requires_grad = False

    # Replace the final classifier layer
    # Original: outputs 1000 classes (ImageNet)
    # New:      outputs 7 classes (CIRP categories)
    in_features = model.classifier[1].in_features  # 1280
    model.classifier = nn.Sequential(
        nn.Dropout(p=0.3, inplace=True),
        nn.Linear(in_features, num_classes),
    )

    print(f"Final layer replaced: 1280 → {num_classes} classes")
    return model


def unfreeze_model(model, unfreeze_last_n_blocks=3):
    """
    Unfreezes the last N blocks of EfficientNet for fine-tuning.

    After initial training with frozen layers, call this to fine-tune
    the last few layers for better accuracy on your specific dataset.
    """
    # Unfreeze classifier (already trainable)
    for param in model.classifier.parameters():
        param.requires_grad = True

    # Unfreeze last N feature blocks
    features = list(model.features.children())
    for block in features[-unfreeze_last_n_blocks:]:
        for param in block.parameters():
            param.requires_grad = True

    trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
    total     = sum(p.numel() for p in model.parameters())
    print(f"Unfrozen last {unfreeze_last_n_blocks} blocks.")
    print(f"Trainable parameters: {trainable:,} / {total:,}")
    return model


def save_model(model, class_names, path=MODEL_PATH):
    """Saves the trained model and class names to disk."""
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    torch.save({
        "model_state_dict": model.state_dict(),
        "class_names":      class_names,
        "num_classes":      len(class_names),
    }, path)
    print(f"Model saved to: {path}")


def load_model(path=MODEL_PATH):
    """
    Loads a saved model from disk.
    Returns the model and class names.
    """
    path = Path(path)
    if not path.exists():
        raise FileNotFoundError(
            f"No saved model found at {path}. "
            "Train the model first using: python src/train.py"
        )

    checkpoint  = torch.load(path, map_location="cpu")
    class_names = checkpoint["class_names"]
    num_classes = checkpoint["num_classes"]

    model = build_model(num_classes=num_classes, pretrained=False)
    model.load_state_dict(checkpoint["model_state_dict"])
    model.eval()

    print(f"Model loaded from: {path}")
    print(f"Classes: {class_names}")
    return model, class_names


if __name__ == "__main__":
    # Quick test - run this file to check model builds correctly
    # python src/model.py
    model = build_model()
    total     = sum(p.numel() for p in model.parameters())
    trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
    print(f"\nTotal parameters    : {total:,}")
    print(f"Trainable parameters: {trainable:,}")
    print(f"Number of classes   : {NUM_CLASSES}")
    print(f"Categories          : {CLASS_NAMES}")
    print("\nmodel.py is working correctly.")
