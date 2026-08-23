# predict.py
# Takes one image and returns the predicted category + confidence.
# This is what the API calls when a citizen uploads a photo.
# Owner: AI Developer 1
#
# Test: python src/predict.py path/to/image.jpg

import sys
import torch
import torch.nn.functional as F
from PIL import Image
from pathlib import Path

from preprocess import val_test_transform
from model import load_model

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load model once when the module is imported (not on every request)
_model       = None
_class_names = None


def _get_model():
    """Load model once and reuse it for all requests."""
    global _model, _class_names
    if _model is None:
        _model, _class_names = load_model()
        _model = _model.to(DEVICE)
    return _model, _class_names


def predict_image_from_pil(image: "PIL.Image.Image") -> dict:
    """
    Takes a PIL Image object and returns prediction.
    Used by the FastAPI router (no file path needed).

    This is faster than predict_image() because it
    does not reload the model on every request.
    """
    model, class_names = _get_model()
    model.eval()

    image_tensor = val_test_transform(image).unsqueeze(0).to(DEVICE)

    with torch.no_grad():
        output = model(image_tensor)
        probs  = F.softmax(output, dim=1)[0]

    best_idx   = probs.argmax().item()
    category   = class_names[best_idx]
    confidence = probs[best_idx].item()

    all_scores = {
        class_names[i]: round(probs[i].item(), 4)
        for i in range(len(class_names))
    }

    return {
        "category":   category,
        "confidence": round(confidence, 4),
        "all_scores": all_scores,
    }


def predict_image(image_path: str):
    """
    Takes a path to one image.
    Returns predicted category and confidence.

    Example output:
    {
        "category":    "road_damage",
        "confidence":  0.94,
        "all_scores": {
            "road_damage":        0.94,
            "garbage":            0.03,
            "water_leakage":      0.01,
            "drainage":           0.01,
            "streetlight_failure":0.00,
            "public_facility":    0.00,
            "other":              0.01
        }
    }
    """
    # Load model
    model, class_names = load_model()
    model = model.to(DEVICE)
    model.eval()

    # Load and prepare the image
    image = Image.open(image_path).convert("RGB")
    image_tensor = val_test_transform(image).unsqueeze(0).to(DEVICE)

    # Run model
    with torch.no_grad():
        output = model(image_tensor)
        probs  = F.softmax(output, dim=1)[0]

    # Get the best category
    best_idx    = probs.argmax().item()
    category    = class_names[best_idx]
    confidence  = probs[best_idx].item()

    # All scores
    all_scores = {
        class_names[i]: round(probs[i].item(), 4)
        for i in range(len(class_names))
    }

    return {
        "category":   category,
        "confidence": round(confidence, 4),
        "all_scores": all_scores,
    }


if __name__ == "__main__":
    # Test from command line:
    # python src/predict.py path/to/image.jpg

    if len(sys.argv) < 2:
        print("Usage: python src/predict.py <image_path>")
        print("Example: python src/predict.py dataset/test/road_damage/image1.jpg")
        sys.exit(1)

    image_path = sys.argv[1]

    if not Path(image_path).exists():
        print(f"Error: File not found: {image_path}")
        sys.exit(1)

    print(f"Predicting: {image_path}")
    result = predict_image(image_path)

    print(f"\nResult:")
    print(f"  Category   : {result['category']}")
    print(f"  Confidence : {result['confidence']*100:.1f}%")
    print(f"\nAll scores:")
    for cat, score in sorted(
        result['all_scores'].items(),
        key=lambda x: x[1],
        reverse=True
    ):
        bar = "█" * int(score * 30)
        print(f"  {cat:<22} {score*100:>5.1f}%  {bar}")
