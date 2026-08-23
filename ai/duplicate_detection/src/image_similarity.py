# image_similarity.py
# Compares two images and returns how visually similar they are.
# Owner: AI Developer 1
#
# Simple idea:
#   Photo A: pothole on road (from report A)
#   Photo B: same pothole from slightly different angle (report B)
#   Result:  0.91  (very similar — likely same problem)
#
# How it works:
#   1. Load each image
#   2. Pass through EfficientNet (without final layer) to get feature vector
#   3. Compare feature vectors using cosine similarity
#   Feature vector = numbers that describe what is IN the photo

import sys
import torch
import torch.nn.functional as F
from torchvision import models, transforms
from PIL import Image
from pathlib import Path

# ── Image transform (same as classification model) ────────
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    ),
])

DEVICE   = torch.device("cuda" if torch.cuda.is_available() else "cpu")
_encoder = None


def _get_encoder():
    """
    Load EfficientNet-B0 without the final classification layer.
    This gives us a 1280-dimensional feature vector for each image.
    Loaded once and reused.
    """
    global _encoder
    if _encoder is None:
        base = models.efficientnet_b0(
            weights=models.EfficientNet_B0_Weights.IMAGENET1K_V1
        )
        # Remove the classifier — keep only the feature extractor
        _encoder = torch.nn.Sequential(*list(base.children())[:-1])
        _encoder = _encoder.to(DEVICE)
        _encoder.eval()
    return _encoder


def get_image_features(image: "PIL.Image.Image") -> torch.Tensor:
    """
    Converts a PIL image to a feature vector (1280 numbers).
    These numbers describe the visual content of the image.
    """
    encoder = _get_encoder()
    tensor  = transform(image).unsqueeze(0).to(DEVICE)
    with torch.no_grad():
        features = encoder(tensor)
    return features.squeeze()


def compute_image_similarity(image_a: "PIL.Image.Image",
                             image_b: "PIL.Image.Image") -> float:
    """
    Compares two PIL images and returns visual similarity score.

    Score range: 0.0 to 1.0
      1.0 = identical images
      0.0 = completely different images

    Args:
        image_a: PIL Image of report A
        image_b: PIL Image of report B

    Returns:
        float: visual similarity score 0.0 to 1.0
    """
    if image_a is None or image_b is None:
        return 0.0

    features_a = get_image_features(image_a)
    features_b = get_image_features(image_b)

    # Cosine similarity between two feature vectors
    score = F.cosine_similarity(
        features_a.unsqueeze(0),
        features_b.unsqueeze(0)
    ).item()

    return round(max(0.0, min(1.0, float(score))), 4)


def compute_image_similarity_from_paths(path_a: str,
                                        path_b: str) -> float:
    """
    Compares two images by file path.
    Convenience wrapper around compute_image_similarity.
    """
    try:
        img_a = Image.open(path_a).convert("RGB")
        img_b = Image.open(path_b).convert("RGB")
        return compute_image_similarity(img_a, img_b)
    except Exception as e:
        print(f"Error loading images: {e}")
        return 0.0


if __name__ == "__main__":
    # Quick test with two images from your dataset
    base = Path(__file__).resolve().parent.parent
    test_dir = base / "dataset"

    # Find two images in the same category (should be similar)
    road_imgs = list((test_dir / "test" / "road_damage").glob("*.jpg"))

    if len(road_imgs) >= 2:
        score = compute_image_similarity_from_paths(
            str(road_imgs[0]),
            str(road_imgs[1])
        )
        print(f"Two road_damage images: {score:.2f}")
        print("(Expected: moderate similarity — same category)")
    else:
        print("Not enough test images found.")
        print("Run from: ai/duplicate_detection/")
