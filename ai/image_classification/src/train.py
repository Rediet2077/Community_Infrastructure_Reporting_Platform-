# train.py
# Trains the EfficientNet-B0 model on your 7-category dataset.
# Owner: AI Developer 1
#
# Run: python src/train.py

import torch
import torch.nn as nn
import torch.optim as optim
from pathlib import Path
import time
import json

from preprocess import get_dataloaders
from model import build_model, unfreeze_model, save_model, CLASS_NAMES

# ── Settings ───────────────────────────────────────────────
PHASE1_EPOCHS  = 10    # train only final layer
PHASE2_EPOCHS  = 10    # fine-tune last few blocks
LEARNING_RATE  = 0.001
FINE_TUNE_LR   = 0.0001
BASE_DIR       = Path(__file__).resolve().parent.parent
HISTORY_PATH   = BASE_DIR / "models" / "saved" / "training_history.json"

# ── Use GPU if available, otherwise CPU ────────────────────
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")


def train_one_epoch(model, loader, criterion, optimizer):
    """
    Runs one training epoch.
    Returns average loss and accuracy for this epoch.
    """
    model.train()
    total_loss     = 0.0
    correct        = 0
    total_images   = 0

    for images, labels in loader:
        images = images.to(DEVICE)
        labels = labels.to(DEVICE)

        # Forward pass - model makes predictions
        outputs = model(images)
        loss    = criterion(outputs, labels)

        # Backward pass - model learns from its mistakes
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        # Track accuracy
        total_loss   += loss.item() * images.size(0)
        predicted     = outputs.argmax(dim=1)
        correct      += (predicted == labels).sum().item()
        total_images += images.size(0)

    avg_loss = total_loss / total_images
    accuracy = correct   / total_images * 100
    return avg_loss, accuracy


def evaluate(model, loader, criterion):
    """
    Evaluates model on validation or test set.
    Returns average loss and accuracy.
    """
    model.eval()
    total_loss   = 0.0
    correct      = 0
    total_images = 0

    with torch.no_grad():
        for images, labels in loader:
            images  = images.to(DEVICE)
            labels  = labels.to(DEVICE)
            outputs = model(images)
            loss    = criterion(outputs, labels)

            total_loss   += loss.item() * images.size(0)
            predicted     = outputs.argmax(dim=1)
            correct      += (predicted == labels).sum().item()
            total_images += images.size(0)

    avg_loss = total_loss / total_images
    accuracy = correct   / total_images * 100
    return avg_loss, accuracy


def train(model, train_loader, val_loader, optimizer, criterion, epochs, phase_name):
    """
    Full training loop for one phase.
    Saves the best model based on validation accuracy.
    """
    best_val_acc  = 0.0
    best_model_wts = None
    history        = []

    print(f"\n{'='*55}")
    print(f"  {phase_name}")
    print(f"{'='*55}")
    print(f"  {'Epoch':<8} {'Train Loss':<12} {'Train Acc':<12} {'Val Loss':<12} {'Val Acc':<10}")
    print(f"  {'-'*52}")

    for epoch in range(1, epochs + 1):
        start = time.time()

        train_loss, train_acc = train_one_epoch(
            model, train_loader, criterion, optimizer
        )
        val_loss, val_acc = evaluate(
            model, val_loader, criterion
        )

        elapsed = time.time() - start

        print(f"  {epoch:<8} {train_loss:<12.4f} {train_acc:<12.1f} "
              f"{val_loss:<12.4f} {val_acc:<10.1f}  ({elapsed:.0f}s)")

        history.append({
            "epoch":      epoch,
            "train_loss": round(train_loss, 4),
            "train_acc":  round(train_acc, 2),
            "val_loss":   round(val_loss, 4),
            "val_acc":    round(val_acc, 2),
        })

        # Save best model
        if val_acc > best_val_acc:
            best_val_acc   = val_acc
            best_model_wts = {k: v.clone() for k, v in model.state_dict().items()}
            print(f"  *** New best: {best_val_acc:.1f}% ***")

    # Restore best weights
    if best_model_wts:
        model.load_state_dict(best_model_wts)

    print(f"\n  Best validation accuracy: {best_val_acc:.1f}%")
    return model, history


def main():
    print("="*55)
    print("  CIRP - Image Classification Training")
    print("="*55)
    print(f"  Device : {DEVICE}")
    print(f"  Classes: {CLASS_NAMES}")

    # Load data
    print("\nLoading dataset...")
    train_loader, val_loader, test_loader, class_names = get_dataloaders()
    print(f"  Train batches : {len(train_loader)}")
    print(f"  Val batches   : {len(val_loader)}")

    # Build model
    model     = build_model(num_classes=len(class_names), pretrained=True)
    model     = model.to(DEVICE)
    criterion = nn.CrossEntropyLoss()

    # ── Phase 1: Train only the final layer ────────────────
    # All EfficientNet layers are frozen
    # Only the new 7-class layer learns
    optimizer = optim.Adam(
        filter(lambda p: p.requires_grad, model.parameters()),
        lr=LEARNING_RATE
    )

    model, history1 = train(
        model, train_loader, val_loader,
        optimizer, criterion,
        epochs=PHASE1_EPOCHS,
        phase_name="Phase 1: Training final layer only"
    )

    # ── Phase 2: Fine-tune last blocks ─────────────────────
    # Unfreeze last 3 blocks for better accuracy
    model = unfreeze_model(model, unfreeze_last_n_blocks=3)
    optimizer = optim.Adam(
        filter(lambda p: p.requires_grad, model.parameters()),
        lr=FINE_TUNE_LR
    )

    model, history2 = train(
        model, train_loader, val_loader,
        optimizer, criterion,
        epochs=PHASE2_EPOCHS,
        phase_name="Phase 2: Fine-tuning last blocks"
    )

    # ── Save model ─────────────────────────────────────────
    save_model(model, class_names)

    # Save training history
    HISTORY_PATH.parent.mkdir(parents=True, exist_ok=True)
    all_history = {"phase1": history1, "phase2": history2}
    with open(HISTORY_PATH, "w") as f:
        json.dump(all_history, f, indent=2)
    print(f"Training history saved to: {HISTORY_PATH}")

    # ── Final test evaluation ──────────────────────────────
    print("\n" + "="*55)
    print("  Final Test Evaluation")
    print("="*55)
    test_loss, test_acc = evaluate(model, test_loader, criterion)
    print(f"  Test Loss     : {test_loss:.4f}")
    print(f"  Test Accuracy : {test_acc:.1f}%")
    print("\nTraining complete.")


if __name__ == "__main__":
    main()
