# CIRP AI Service

Unified AI service for the Community Infrastructure Reporting Platform.

## Two AI Features

| Feature | Endpoint | Description |
|---|---|---|
| Image Classification | `POST /ai/classify-image/` | Analyzes photo → suggests category |
| Duplicate Detection | `POST /ai/detect-duplicate/` | Compares two reports → detects duplicates |

---

## How to Run

```bash
cd ai
uvicorn api.main:app --host 0.0.0.0 --port 8001 --reload
```

API docs available at: `http://localhost:8001/docs`

---

## Endpoints

### 1. Image Classification

```
POST /ai/classify-image/
Content-Type: multipart/form-data
Body: file (image)
```

Response:
```json
{
  "category":   "road_damage",
  "confidence": 0.94,
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
```

### 2. Duplicate Detection

```
POST /ai/detect-duplicate/
Content-Type: application/json
```

Request:
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

Response:
```json
{
  "is_duplicate":      true,
  "similarity_score":  0.92,
  "similar_report_id": 1024,
  "breakdown": {
    "text":     {"score": 0.88, "weight": 0.35},
    "location": {"score": 0.95, "weight": 0.30},
    "category": {"score": 1.00, "weight": 0.10},
    "image":    {"score": null}
  }
}
```

---

## Folder Structure

```
ai/
├── api/                          ← Unified service (run this)
│   ├── main.py                   ← Starts service on port 8001
│   └── routes/
│       ├── classify.py           ← Image classification route
│       └── duplicate.py          ← Duplicate detection route
│
├── image_classification/
│   ├── src/
│   │   ├── preprocess.py         ← Image loading and transforms
│   │   ├── model.py              ← EfficientNet-B0 model
│   │   ├── train.py              ← Training script
│   │   ├── evaluate.py           ← Accuracy evaluation
│   │   └── predict.py            ← Single image prediction
│   ├── dataset/                  ← 6,238 labeled images
│   └── models/saved/model.pth    ← Trained model (90.7% accuracy)
│
└── duplicate_detection/
    ├── src/
    │   ├── text_similarity.py    ← Sentence-transformers comparison
    │   ├── location_similarity.py← GPS Haversine distance
    │   ├── category_similarity.py← Category match scoring
    │   ├── image_similarity.py   ← Visual feature comparison
    │   ├── scorer.py             ← Weighted score combiner
    │   └── classifier.py        ← Final duplicate decision
    └── api/
        └── router.py             ← Standalone duplicate endpoint
```

---

## Model Performance

| Category | Accuracy |
|---|---|
| road_damage | 98% |
| garbage | 100% |
| water_leakage | 90% |
| public_facility | 90% |
| drainage | 66% |
| streetlight_failure | 48% |
| **Overall** | **90.7%** |

---

## Django Integration

In Django `settings.py`:
```python
AI_SERVICE_URL = "http://localhost:8001"
```

Django calls AI service after a report is submitted:
```python
import httpx

# Image classification
response = httpx.post(
    f"{AI_SERVICE_URL}/ai/classify-image/",
    files={"file": image_file},
    timeout=30,
)

# Duplicate detection
response = httpx.post(
    f"{AI_SERVICE_URL}/ai/detect-duplicate/",
    json=report_data,
    timeout=30,
)
```
