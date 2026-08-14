# evaluate.py
# Checks how accurate the trained model is.
# Produces accuracy, F1 score, and confusion matrix.
# Owner: AI Developer 1
#
# Run AFTER training: python src/evaluate.py

import torch
import numpy as np
from pathlib import Path
from sklearn.metrics import (
    classification_report,
    confusion_matrix,
    accuracy_score,
)

from preprocess import get_dataloaders
from model import load_model

DEVICE   = torch.device("cuda" if torch.cuda.is_available() else "cpu")
BASE_DIR = Path(__file__).resolve().parent.parent


def get_predictions(model, loader):
    """
    Runs the model on all images in loader.
    Returns true labels and predicted labels.
    """
    model.eval()
    all_preds  = []
    all_labels = []

    with torch.no_grad():
        for images, labels in loader:
            images  = images.to(DEVICE)
            outputs = model(images)
            preds   = outputs.argmax(dim=1).cpu().numpy()
            all_preds.extend(preds)
            all_labels.extend(labels.numpy())

    return np.array(all_labels), np.array(all_preds)


def main():
    print("="*55)
    print("  CIRP - Model Evaluation")
    print("="*55)

    # Load trained model
    model, class_names = load_model()
    model = model.to(DEVICE)

    # Load test data
    _, _, test_loader, _ = get_dataloaders()

    # Get predictions
    print("\nRunning model on test set...")
    true_labels, pred_labels = get_predictions(model, test_loader)

    # ── Overall Accuracy ───────────────────────────────────
    accuracy = accuracy_score(true_labels, pred_labels) * 100
    print(f"\nOverall Accuracy: {accuracy:.1f}%")

    # ── Per-category Report ────────────────────────────────
    # Shows Precision, Recall, F1 for each category
    print("\nPer-Category Report:")
    print("-"*55)
    print(classification_report(
        true_labels,
        pred_labels,
        target_names=class_names
    ))

    # ── Confusion Matrix ───────────────────────────────────
    # Rows = actual category
    # Columns = predicted category
    # Diagonal = correct predictions
    print("Confusion Matrix:")
    print("(Rows=Actual, Columns=Predicted)")
    print()
    cm = confusion_matrix(true_labels, pred_labels)

    # Print with labels
    header = f"{'':20}" + "".join(f"{n[:6]:>8}" for n in class_names)
    print(header)
    for i, row in enumerate(cm):
        label = class_names[i][:18]
        row_str = f"{label:<20}" + "".join(f"{v:>8}" for v in row)
        print(row_str)

    # ── Save results ───────────────────────────────────────
    results_path = BASE_DIR / "models" / "saved" / "evaluation_results.txt"
    with open(results_path, "w") as f:
        f.write(f"Overall Accuracy: {accuracy:.1f}%\n\n")
        f.write("Per-Category Report:\n")
        f.write(classification_report(
            true_labels, pred_labels, target_names=class_names
        ))
    print(f"\nResults saved to: {results_path}")


if __name__ == "__main__":
    main()
