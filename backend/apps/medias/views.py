import uuid
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Media
from .serializers import MediaSerializer
from .services import attach_evidence
from .appwrite_service import upload_file_to_appwrite
from utils.responses import success_response

class MediaListView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        entity_type = request.query_params.get('entity_type')
        entity_id = request.query_params.get('entity_id')
        
        qs = Media.objects.all()
        if entity_type:
            qs = qs.filter(entity_type=entity_type)
        if entity_id:
            qs = qs.filter(entity_id=entity_id)
            
        return success_response(data=MediaSerializer(qs, many=True).data, message="Media retrieved.")

class MediaUploadView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    
    def post(self, request):
        uploaded_file = request.FILES.get('file')
        if not uploaded_file:
            return Response({"error": "No file provided."}, status=400)
            
        try:
            file_url = upload_file_to_appwrite(uploaded_file)
            data = {
                "file_url": file_url
            }
            return success_response(data=data, message="File uploaded successfully.")
        except Exception as e:
            return Response({"error": str(e)}, status=500)

class MediaConfirmView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        entity_type = request.data.get('entity_type')
        entity_id = request.data.get('entity_id')
        media_data = request.data.get('media_data', [])
        
        if not entity_type or not entity_id or not media_data:
            return Response({"error": "Missing required fields."}, status=400)
            
        media_records = attach_evidence(
            user=request.user,
            entity_type=entity_type,
            entity_id=entity_id,
            media_data=media_data
        )
        return success_response(data=MediaSerializer(media_records, many=True).data, message="Media attached successfully.")
