# main.py
# Starts the FastAPI AI service for image classification.
# Owner: AI Developer 1
#
# Run:
#   cd ai/image_classification
#   uvicorn api.main:app --host 0.0.0.0 --port 8001 --reload
#
# Then test it at: http://localhost:8001/docs

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.router import router

# ── Create FastAPI app ─────────────────────────────────────
app = FastAPI(
    title="CIRP Image Classification API",
    description="AI service that classifies infrastructure problem images.",
    version="1.0.0",
)

# ── Allow Django backend to call this service ──────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Register routes ────────────────────────────────────────
app.include_router(router, prefix="/ai")

# ── Root endpoint ──────────────────────────────────────────
@app.get("/")
async def root():
    return {
        "service": "CIRP Image Classification AI",
        "version": "1.0.0",
        "endpoints": {
            "classify": "POST /ai/classify-image/",
            "health":   "GET  /ai/health/",
            "docs":     "GET  /docs",
        },
    }
