import torch.nn as nn
from torchvision.models import efficientnet_b0, EfficientNet_B0_Weights


# CIRP classification categories
CLASS_NAMES = [
    "road_damage",
    "water_leakage",
    "streetlight_failure",
    "garbage",
    "drainage",
    "public_facility",
    "other"
]

NUM_CLASSES = len(CLASS_NAMES)


def create_model():
    """
    Create an EfficientNet-B0 model
    customized for CIRP's 7 infrastructure categories.
    """

    # Load pretrained EfficientNet-B0
    weights = EfficientNet_B0_Weights.DEFAULT

    model = efficientnet_b0(weights=weights)

    # Get input size of original classifier
    input_features = model.classifier[1].in_features

    # Replace original classifier
    model.classifier[1] = nn.Linear(
        input_features,
        NUM_CLASSES
    )

    return model