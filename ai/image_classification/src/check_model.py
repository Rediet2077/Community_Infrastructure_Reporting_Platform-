import torch
from torchvision.models import efficientnet_b0, EfficientNet_B0_Weights

print("PyTorch version:", torch.__version__)
print("CUDA available:", torch.cuda.is_available())

print("\nLoading EfficientNet-B0...")

weights = EfficientNet_B0_Weights.DEFAULT
model = efficientnet_b0(weights=weights)

print("EfficientNet-B0 loaded successfully!")
print("Model type:", type(model).__name__)