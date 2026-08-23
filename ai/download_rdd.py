import os
from pathlib import Path
import kagglehub
import zipfile

print('kagglehub version', kagglehub.__version__)
output = kagglehub.dataset_download('aliabdelmenam/rdd-2022')
print('download path:', output)

output_path = Path(output)
if output_path.suffix == '.zip':
    target_dir = Path('ai') / 'image_classification' / 'dataset' / 'train' / 'road_damage'
    target_dir.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(output_path, 'r') as zf:
        zf.extractall(target_dir)
    print('Extracted to:', target_dir)
else:
    print('Dataset download returned non-zip path, leaving in place.')
