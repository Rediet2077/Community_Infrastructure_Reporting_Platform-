import os
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    import sys, subprocess
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'Pillow'])
    from PIL import Image, ImageDraw, ImageFont

base = Path('ai') / 'image_classification' / 'dataset'
if not base.exists():
    raise SystemExit(f'Dataset base folder not found: {base}')

splits = {'train': 5, 'validation': 2, 'test': 1}
train_dir = base / 'train'
if not train_dir.exists():
    raise SystemExit(f'Train folder not found: {train_dir}')

categories = [p.name for p in sorted(train_dir.iterdir()) if p.is_dir()]
colors = {
    'drainage': (0, 123, 255),
    'garbage': (40, 167, 69),
    'other': (108, 117, 125),
    'public_facility': (255, 193, 7),
    'road_damage': (220, 53, 69),
    'streetlight_failure': (23, 162, 184),
    'water_leakage': (13, 110, 253)
}
for split, count in splits.items():
    for category in categories:
        folder = base / split / category
        folder.mkdir(parents=True, exist_ok=True)
        for i in range(1, count + 1):
            filename = folder / f'{category}_{split}_{i}.png'
            if filename.exists():
                continue
            color = colors.get(category, (100, 100, 100))
            img = Image.new('RGB', (640, 480), color=color)
            draw = ImageDraw.Draw(img)
            text = f'{category.replace("_", " ").title()}\n{split.title()} {i}'
            try:
                font = ImageFont.truetype('arial.ttf', 28)
            except Exception:
                font = ImageFont.load_default()
            y = 20
            for line in text.split('\n'):
                draw.text((20, y), line, fill='white', font=font)
                y += font.getsize(line)[1] + 10
            img.save(filename)
print('Created placeholder images for:', ', '.join(categories))
