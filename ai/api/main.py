# ai/api/main.py
# Unified CIRP AI Service
# Combines Image Classification + Duplicate Detection into one service.
# Owner: AI Developer 1
#
# Run:
#   cd ai
#   uvicorn api.main:app --host 0.0.0.0 --port 8001 --reload
#
# API docs: http://localhost:8001/docs
#
# Endpoints:
#   POST /ai/classify-image/     ← image classification
#   POST /ai/detect-duplicate/   ← duplicate detection
#   GET  /ai/health/             ← health check
#   GET  /                       ← service info

import sys
from pathlib import Path

# Add both src folders to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "image_classification" / "src"))
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "duplicate_detection" / "src"))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes.classify     import router as classify_router
from api.routes.duplicate    import router as duplicate_router
from api.routes.multilingual import router as multilingual_router

# ── Create app ─────────────────────────────────────────────
app = FastAPI(
    title="CIRP AI Service",
    description="""
    Unified AI service for the Community Infrastructure Reporting Platform.

    ## Endpoints

    ### Image Classification
    `POST /ai/classify-image/`
    Upload an infrastructure photo → get category + confidence

    ### Duplicate Detection
    `POST /ai/detect-duplicate/`
    Compare two reports → get is_duplicate + similarity score

    ## How Django connects
    Set `AI_SERVICE_URL=http://localhost:8001` in Django .env
    """,
    version="1.0.0",
)

# ── Allow Django and Flutter to call this service ──────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Register both routers under /ai prefix ─────────────────
app.include_router(classify_router,     prefix="/ai")
app.include_router(duplicate_router,    prefix="/ai")
app.include_router(multilingual_router, prefix="/ai")


# ── Root endpoint ──────────────────────────────────────────
@app.get("/", tags=["Info"])
async def root():
    return {
        "service": "CIRP AI Service",
        "version": "1.0.0",
        "status":  "running",
        "endpoints": {
            "classify_image":       "POST /ai/classify-image/",
            "detect_duplicate":     "POST /ai/detect-duplicate/",
            "compare_multilingual": "POST /ai/compare-multilingual/",
            "detect_language":      "POST /ai/detect-language/",
            "health":               "GET  /ai/health/",
            "docs":                 "GET  /docs",
        },
    }
