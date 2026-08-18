# CIRP - AI Duplicate Detection

Detects whether two infrastructure reports describe the same problem.

## How It Works

```
New report submitted
        ↓
Compare with nearby existing reports
        ↓
text_similarity     (35%) — compare descriptions
location_similarity (30%) — compare GPS distance
image_similarity    (25%) — compare photos
category_similarity (10%) — compare categories
        ↓
Final score >= 0.80 → is_duplicate = True
        ↓
Officer makes final decision
```

## Output

```json
{
  "is_duplicate":      true,
  "similarity_score":  0.92,
  "similar_report_id": 1024,
  "breakdown": {
    "text":     {"score": 0.88, "weight": 0.35, "contribution": 0.308},
    "location": {"score": 0.95, "weight": 0.30, "contribution": 0.285},
    "category": {"score": 1.00, "weight": 0.10, "contribution": 0.100},
    "image":    {"score": null}
  }
}
```

## API Endpoint

```
POST /ai/detect-duplicate/
Content-Type: application/json
```

Request body:
```json
{
  "report_id":   2050,
  "title":       "Large pothole near DBU gate",
  "description": "Deep hole causing accidents",
  "category":    "road_damage",
  "latitude":    9.0192,
  "longitude":   38.7525,

  "existing_report_id":   1024,
  "existing_title":       "Big road hole near university",
  "existing_description": "Dangerous pothole near main gate",
  "existing_category":    "road_damage",
  "existing_latitude":    9.0194,
  "existing_longitude":   38.7527
}
```

## Folder Structure

```
duplicate_detection/
├── src/
│   ├── text_similarity.py      ← sentence-transformers (multilingual)
│   ├── location_similarity.py  ← Haversine GPS distance
│   ├── category_similarity.py  ← category match scoring
│   ├── image_similarity.py     ← EfficientNet visual features
│   ├── scorer.py               ← weighted score combiner
│   └── classifier.py           ← final duplicate decision
├── api/
│   ├── main.py                 ← standalone FastAPI service
│   ├── router.py               ← route definitions
│   └── schemas.py              ← request/response models
├── tests/
│   ├── test_text_similarity.py
│   ├── test_location_similarity.py
│   └── test_classifier.py
└── test_duplicate.py           ← quick end-to-end test
```

## Similarity Weights

| Component | Weight | Why |
|---|---|---|
| Text | 35% | Description is most important indicator |
| Location | 30% | Same location = likely same problem |
| Image | 25% | Visual confirmation |
| Category | 10% | Category alone is not enough |

## Duplicate Threshold

Score >= **0.80** = flagged as potential duplicate

This threshold can be adjusted in `src/classifier.py`:
```python
DUPLICATE_THRESHOLD = 0.80
```

## Running Tests

```bash
cd ai/duplicate_detection
python test_duplicate.py
```

## Important Rule

The AI only makes a **recommendation**.
The municipality officer always makes the **final decision** to merge or dismiss.
