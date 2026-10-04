from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status


class NotificationListView(APIView):
    """
    Real notification list endpoint
    """
    permission_classes = [AllowAny]
    
    def get(self, request):
        from .models import Notification
        user = request.user
        if user and not user.is_anonymous:
            qs = Notification.objects.filter(user=user).order_by('-created_at')
        else:
            qs = Notification.objects.all().order_by('-created_at')
            
        data = [{
            'id': str(n.id),
            'title': n.title,
            'message': n.message,
            'is_read': n.is_read,
            'created_at': n.created_at.isoformat(),
        } for n in qs[:50]]
        
        unread_count = sum(1 for item in data if not item['is_read'])
        
        return Response({
            'success': True,
            'message': 'Notifications retrieved successfully',
            'data': data,
            'unread_count': unread_count,
            'count': len(data),
            'next': None,
            'previous': None,
        }, status=status.HTTP_200_OK)
