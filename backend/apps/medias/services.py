from django.db import transaction
from apps.medias.models import Media
import uuid

@transaction.atomic
def attach_evidence(user, entity_type: str, entity_id: uuid.UUID, media_data: list) -> list:
    """
    Creates Media records for uploaded Cloudflare R2 URLs and links them 
    to a Report, Task, Dispute, or Asset.
    """
    media_records = []
    for item in media_data:
        media = Media(
            entity_type=entity_type,
            entity_id=entity_id,
            file_type=item['file_type'],
            file_url=item['file_url'],
            uploaded_by=user
        )
        media_records.append(media)
    
    # Bulk create for database performance
    return Media.objects.bulk_create(media_records)