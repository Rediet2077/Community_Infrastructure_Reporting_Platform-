# 🤖 CIRP — Artificial Intelligence Module

## Community Infrastructure Reporting Platform

The **CIRP AI Module** provides intelligent analysis of infrastructure reports submitted by citizens.

The AI component focuses on two major capabilities:

1. 🖼️ **AI Image Classification**
2. 🔍 **AI Duplicate Report Detection**

The purpose of the AI module is not to replace municipality officers, but to provide **automated recommendations and decision-support** that make report processing faster and more accurate.

---

# 📌 1. Introduction

CIRP receives infrastructure reports from citizens through the Flutter mobile application.

A report may contain:

* Description
* Image
* Category
* GPS location
* Date and time

The AI module analyzes this information after a report is submitted.

The overall AI workflow is:

```text
                    Citizen Report
                         │
              ┌──────────┴──────────┐
              │                     │
              ▼                     ▼
       Uploaded Image        Report Information
              │                     │
              ▼                     ▼
    AI Image Classification   Duplicate Detection
              │                     │
              └──────────┬──────────┘
                         ▼
                  AI Results
                         │
                         ▼
                Django Backend
                         │
                         ▼
              Municipality Officer
                         │
                         ▼
                  Final Decision
```

---

# 🎯 2. AI Objectives

The AI module aims to:

* Automatically identify infrastructure problems from images.
* Reduce manual category selection.
* Detect potentially duplicate reports.
* Reduce unnecessary duplicate maintenance tasks.
* Help municipality officers process reports faster.
* Provide confidence scores for AI predictions.
* Support data-driven infrastructure management.
* Provide AI-assisted decision support rather than fully automated decisions.

---

# 🖼️ 3. AI Image Classification

## 3.1 Purpose

The **AI Image Classification** feature analyzes an image uploaded by a citizen and predicts the type of infrastructure problem shown in the image.

For example:

```text
Input Image
     ↓
AI Image Classification Model
     ↓
Road Damage
     ↓
Confidence: 94%
```

The prediction can then be displayed to the citizen and municipality officer.

---

## 3.2 Supported Categories

The initial model can classify infrastructure problems into categories such as:

| Category        | Description                                         |
| --------------- | --------------------------------------------------- |
| Road Damage     | Potholes, damaged roads, cracks                     |
| Water Leakage   | Visible water leaks or damaged water infrastructure |
| Garbage         | Waste accumulation or illegal dumping               |
| Drainage        | Blocked or damaged drainage systems                 |
| Streetlight     | Damaged or non-functioning streetlights             |
| Public Facility | Damage to public infrastructure                     |
| Other           | Images that do not fit the defined categories       |

The category list can be expanded when more training data becomes available.

---

# 🔄 4. Image Classification Workflow

```text
Citizen
   │
   │ Upload Image
   ▼
Flutter Application
   │
   │ HTTP Request
   ▼
Django Backend
   │
   │ Send Image
   ▼
AI Service
   │
   ▼
Image Preprocessing
   │
   ▼
Trained Classification Model
   │
   ▼
Prediction
   │
   ├── Category
   └── Confidence Score
   │
   ▼
Django Backend
   │
   ▼
Database
   │
   ▼
React Dashboard / Flutter App
```

---

# 🧠 5. Image Classification Process

The model development process consists of several stages.

## Step 1 — Dataset Collection

Collect images representing the infrastructure categories.

Example:

```text
dataset/
├── road_damage/
├── water_leakage/
├── garbage/
├── drainage/
├── streetlight/
├── public_facility/
└── other/
```

---

## Step 2 — Data Preprocessing

Images should be prepared before training.

Typical preprocessing includes:

* Resizing images
* Normalizing pixel values
* Removing corrupted images
* Label validation
* Data augmentation

Data augmentation may include:

* Rotation
* Flipping
* Cropping
* Brightness adjustment
* Zooming

The goal is to make the model more robust to different image conditions.

---

# 🏋️ 6. Model Training

The AI team trains an image classification model using the prepared dataset.

Possible technologies include:

* Python
* PyTorch
* TensorFlow
* OpenCV
* NumPy
* Pandas

A suitable CNN or transfer-learning model can be selected based on dataset size and available computing resources.

The trained model should be evaluated using a separate validation/test dataset.

---

# 📊 6. Image Classification Output

The AI service should return a structured response.

Example:

```json
{
  "category": "road_damage",
  "confidence": 0.94
}
```

For multiple predictions:

```json
{
  "predictions": [
    {
      "category": "road_damage",
      "confidence": 0.94
    },
    {
      "category": "drainage",
      "confidence": 0.04
    },
    {
      "category": "other",
      "confidence": 0.02
    }
  ]
}
```

The municipality officer can review the prediction before making a final decision.

---

# 🔍 7. AI Duplicate Report Detection

## 8.1 Purpose

Citizens may report the same infrastructure problem multiple times.

For example:

```text
Report 101:
"Large pothole near DBU main gate."

Report 125:
"There is a big road hole close to the university entrance."
```

Although the descriptions are different, both reports may refer to the same problem.

The AI duplicate detection system identifies reports that are **potentially related or duplicate**.

---

# 🧩 8. Duplicate Detection Approach

The duplicate detection system can combine several signals:

### 1. Text Similarity

Compare report descriptions.

Possible approaches include:

* TF-IDF
* Cosine similarity
* Sentence embeddings
* Semantic similarity

### 2. Image Similarity

Compare uploaded images when available.

Possible approaches include:

* Image embeddings
* Feature extraction
* Computer vision similarity

### 3. Geographic Similarity

Compare GPS coordinates.

Two reports located very close to each other are more likely to describe the same infrastructure problem.

### 4. Category Similarity

Compare predicted or selected categories.

For example:

```text
Report A → Road Damage
Report B → Road Damage
```

This increases the likelihood that the reports are related.

---

# 🧮 9. Duplicate Detection Scoring

The system can combine different similarity scores.

Conceptually:

```text
Duplicate Score =
    Text Similarity
  + Image Similarity
  + Location Similarity
  + Category Similarity
```

The exact weights should be determined experimentally using the project's evaluation dataset.

Example:

```text
Text Similarity       = 0.91
Image Similarity      = 0.87
Location Similarity   = 0.96
Category Similarity   = 1.00
                       ─────
Combined Score        = 0.92
```

If the final score exceeds a selected threshold, the system can flag the report as a **potential duplicate**.

---

# 🔄 10. Duplicate Detection Workflow

```text
New Report
    │
    ▼
Django Backend
    │
    ▼
Find Candidate Reports
    │
    ├── Similar Location
    ├── Similar Category
    └── Recent Reports
    │
    ▼
AI Duplicate Detection
    │
    ├── Text Comparison
    ├── Image Comparison
    ├── Location Comparison
    └── Category Comparison
    │
    ▼
Similarity Score
    │
    ▼
Potential Duplicate?
    │
    ├── No ──────► Normal Processing
    │
    └── Yes ─────► Officer Review
```

---

# 📤 11. Duplicate Detection Output

Example:

```json
{
  "is_duplicate": true,
  "similarity_score": 0.92,
  "similar_report_id": 1024
}
```

A more detailed response may contain:

```json
{
  "is_duplicate": true,
  "similarity_score": 0.92,
  "similar_reports": [
    {
      "report_id": 1024,
      "score": 0.92
    },
    {
      "report_id": 1018,
      "score": 0.81
    }
  ]
}
```

---

# ⚠️ 12. Human-in-the-Loop Decision

AI results should **not automatically delete or merge reports**.

Instead:

```text
AI Detection
     ↓
Potential Duplicate
     ↓
Municipality Officer Review
     ↓
┌───────────────┬───────────────┐
│ Same Problem  │ Different     │
│               │ Problem       │
▼               ▼
Merge/Link      Continue
Reports         Separately
```

This prevents incorrect AI predictions from automatically removing valid citizen reports.



# 🧪 13. AI Testing and Evaluation

## Image Classification Evaluation

The image classification model should be evaluated using:

### Accuracy

Measures the overall percentage of correct predictions.

### Precision

Measures how many predicted instances of a category are actually correct.

### Recall

Measures how many actual instances of a category were correctly identified.

### F1-Score

Balances precision and recall.

### Confusion Matrix

Shows which infrastructure categories are frequently confused with one another.

Example:

```text
                Predicted
              Road  Water  Waste
Actual Road    ✓      -      -
Actual Water   -      ✓      -
Actual Waste  -      -      ✓
```

---

# 🔍 14. Duplicate Detection Evaluation

The duplicate detection system should be evaluated using:

* Precision
* Recall
* F1-score
* False Positive Rate
* False Negative Rate

The evaluation dataset should contain examples labeled as:

```text
Duplicate
Not Duplicate
```

The team can then compare AI predictions against the ground-truth labels.

---

# ⚙️ 15. AI API

## Image Classification

### Endpoint

```http
POST /api/ai/classify-image/
```

### Request

```text
multipart/form-data

image: infrastructure.jpg
```

### Response

```json
{
  "category": "road_damage",
  "confidence": 0.94
}
```

---

## Duplicate Detection

### Endpoint

```http
POST /api/ai/detect-duplicate/
```

### Request

```json
{
  "report_id": 125,
  "description": "Large pothole near DBU gate",
  "latitude": 9.68,
  "longitude": 39.53,
  "category": "road_damage"
}
```

### Response

```json
{
  "is_duplicate": true,
  "similarity_score": 0.92,
  "similar_report_id": 1024
}
```

---

# 🔐 16. AI Security and Privacy

The AI module should:

* Validate uploaded images.
* Restrict unsupported file types.
* Limit file sizes.
* Avoid storing unnecessary personal information.
* Protect AI endpoints.
* Validate API requests.
* Keep model files secure.
* Store secrets in environment variables.
* Prevent unauthorized access to AI services.

---

# ⚠️ 17. AI Limitations

The AI module has several limitations:

1. Image classification accuracy depends on training data quality.
2. Poor-quality images can reduce prediction accuracy.
3. Different infrastructure problems may look visually similar.
4. Duplicate detection can produce false positives.
5. Duplicate detection can produce false negatives.
6. GPS inaccuracies can affect geographic similarity.
7. New infrastructure categories may not be recognized.
8. AI models require periodic evaluation and improvement.
9. AI predictions should not be treated as guaranteed truth.
10. Human verification remains important for critical decisions.

---



