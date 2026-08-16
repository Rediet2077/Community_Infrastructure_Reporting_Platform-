# main.py
# Starts the FastAPI service for duplicate detection.
# Owner: AI Developer 1
#
# Run:
#   cd ai/duplicate_detection
#   uvicorn api.main:app --host 0.0.0.0 --port 8002 --reload
#
# Docs at: http://localhost:8002/docs

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "src"))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.router import router

app = FastAPI(
    title="CIRP Duplicate Detection API",
    description="Detects whether two infrastructure reports describe the same problem.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/ai")


@app.get("/")
async def root():
    return {
        "service":   "CIRP Duplicate Detection AI",
        "version":   "1.0.0",
        "endpoints": {
            "detect":  "POST /ai/detect-duplicate/",
            "health":  "GET  /ai/health/",
            "docs":    "GET  /docs",
        },
    }
