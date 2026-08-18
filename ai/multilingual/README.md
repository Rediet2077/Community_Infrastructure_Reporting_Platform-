# CIRP - Multilingual Text Understanding

Detects language and compares report texts across English, Amharic, Afaan Oromo, and Tigrinya.

## Supported Languages

| Code | Language |
|---|---|
| en | English |
| am | Amharic (አማርኛ) |
| or | Afaan Oromo |
| ti | Tigrinya (ትግርኛ) |

## How It Works

```
Report A: "Large pothole near DBU gate"     (English)
Report B: "ትልቅ ጉድጓድ ቡና ሰርቪስ አካባቢ"          (Amharic)
         ↓
Language detector identifies each language
         ↓
Multilingual model encodes both texts to vectors
         ↓
Cosine similarity compares vectors
         ↓
Result: { similarity_score: 0.82, cross_language: true }
```

## Files

| File | Purpose |
|---|---|
| `src/language_detector.py` | Detects language of text (en/am/or/ti) |
| `src/multilingual_encoder.py` | Encodes and compares multilingual texts |
| `api/router.py` | API endpoints |
| `api/schemas.py` | Request/response format |
| `tests/test_language_detector.py` | 9 passing tests |

## API Endpoints

### Detect Language
```
POST /ai/detect-language/
Body: { "text": "ትልቅ ጉድጓድ" }
Response: { "language": "am", "language_name": "Amharic" }
```

### Compare Multilingual Texts
```
POST /ai/compare-multilingual/
Body: { "text_a": "Large pothole", "text_b": "ትልቅ ጉድጓድ" }
Response: { "similarity_score": 0.82, "cross_language": true }
```

## Integration with Duplicate Detection

`duplicate_detection/src/text_similarity.py` now uses this module.
Cross-language duplicate detection works automatically.
