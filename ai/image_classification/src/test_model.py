from model import create_model, CLASS_NAMES, NUM_CLASSES


model = create_model()

print("CIRP model created successfully!")
print("Number of classes:", NUM_CLASSES)
print("Classes:")

for index, class_name in enumerate(CLASS_NAMES):
    print(f"{index}: {class_name}")

print("\nClassifier:")
print(model.classifier)