import uuid
from django.conf import settings
from appwrite.client import Client
from appwrite.services.storage import Storage
from appwrite.input_file import InputFile

def get_appwrite_storage():
    client = Client()
    client.set_endpoint(settings.APPWRITE_ENDPOINT)
    client.set_project(settings.APPWRITE_PROJECT_ID)
    client.set_key(settings.APPWRITE_API_KEY)
    
    return Storage(client)

def upload_file_to_appwrite(file_obj) -> str:
    """
    Uploads a Django UploadedFile to Appwrite storage and returns the public URL.
    """
    storage = get_appwrite_storage()
    
    file_bytes = file_obj.read()
    filename = getattr(file_obj, 'name', f"upload_{uuid.uuid4().hex[:8]}")
    
    result = storage.create_file(
        bucket_id=settings.APPWRITE_BUCKET_ID,
        file_id='unique()',
        file=InputFile.from_bytes(file_bytes, filename)
    )
    
    appwrite_file_id = result.id
    file_url = f"{settings.APPWRITE_ENDPOINT}/storage/buckets/{settings.APPWRITE_BUCKET_ID}/files/{appwrite_file_id}/view?project={settings.APPWRITE_PROJECT_ID}"
    
    return file_url
