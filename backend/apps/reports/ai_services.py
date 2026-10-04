import requests
import base64
import logging
import threading
from django.conf import settings

logger = logging.getLogger(__name__)

AI_SERVICE_URL = getattr(settings, 'AI_SERVICE_URL', 'http://127.0.0.1:8001')

def classify_report_image(base64_image_data: str) -> dict:
    """
    Calls FastAPI AI microservice /ai/classify-image/ with base64 image data.
    """
    if not base64_image_data:
        return {}
    
    try:
        clean_b64 = base64_image_data.strip()
        if 'base64,' in clean_b64:
            clean_b64 = clean_b64.split('base64,')[1]
        
        image_bytes = base64.b64decode(clean_b64)
        files = {'file': ('report_photo.jpg', image_bytes, 'image/jpeg')}
        
        response = requests.post(
            f"{AI_SERVICE_URL}/ai/classify-image/",
            files=files,
            timeout=3.0
        )
        if response.status_code == 200:
            return response.json()
        return {}
    except Exception as e:
        logger.warning(f"AI classification service unavailable: {e}")
        return {}


def detect_report_duplicate(new_report, existing_report) -> dict:
    """
    Calls FastAPI AI microservice /ai/detect-duplicate/ to compare report metadata.
    """
    try:
        payload = {
            'report_id': 0,
            'title': getattr(new_report, 'title', '') or 'Incident',
            'description': getattr(new_report, 'description', '') or 'Description',
            'category': new_report.category.name if getattr(new_report, 'category', None) else 'general',
            'latitude': getattr(new_report, 'latitude', None),
            'longitude': getattr(new_report, 'longitude', None),
            'existing_report_id': 0,
            'existing_title': getattr(existing_report, 'title', '') or 'Incident',
            'existing_description': getattr(existing_report, 'description', '') or 'Description',
            'existing_category': existing_report.category.name if getattr(existing_report, 'category', None) else 'general',
            'existing_latitude': getattr(existing_report, 'latitude', None),
            'existing_longitude': getattr(existing_report, 'longitude', None),
        }
        response = requests.post(
            f"{AI_SERVICE_URL}/ai/detect-duplicate/",
            json=payload,
            timeout=2.0
        )
        if response.status_code == 200:
            return response.json()
        return {}
    except Exception as e:
        logger.warning(f"AI duplicate service unavailable: {e}")
        return {}


def process_ai_triage_background(report_id, base64_image: str = None):
    """
    Runs AI image classification and duplicate detection in a background thread
    without blocking the user's HTTP request.
    """
    def _worker():
        try:
            from .models import Report
            report = Report.objects.get(id=report_id)
            
            # AI Image Classification
            if base64_image:
                ai_res = classify_report_image(base64_image)
                if ai_res and 'category' in ai_res:
                    report.ai_category = ai_res['category']
                    report.ai_confidence = ai_res.get('confidence', 0.0)

            # AI Duplicate Detection
            recent_reports = Report.objects.exclude(id=report.id).order_by('-created_at')[:5]
            for prev in recent_reports:
                dup_res = detect_report_duplicate(report, prev)
                if dup_res and dup_res.get('is_duplicate'):
                    report.is_duplicate = True
                    report.duplicate_similarity = dup_res.get('similarity_score', 0.85)
                    report.possible_duplicate_of = prev
                    break
            
            report.save()
        except Exception as e:
            logger.error(f"Error in background AI triage for report {report_id}: {e}")

    thread = threading.Thread(target=_worker)
    thread.daemon = True
    thread.start()
