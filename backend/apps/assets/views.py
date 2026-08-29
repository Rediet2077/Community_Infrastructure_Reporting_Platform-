from django.shortcuts import render
from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import AssetRegistrationSerializer
from .services import register_infrastructure_asset

class AssetRegistrationView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AssetRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Hand off to the service layer
        asset = register_infrastructure_asset(
            user=request.user, 
            validated_data=serializer.validated_data
        )
        
        return Response({
            "message": "Asset registered successfully.",
            "asset_id": str(asset.id),
            "asset_code": asset.asset_code
        }, status=status.HTTP_201_CREATED)