from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Notification
from .serializers import NotificationSerializer
from .services import mark_notification_as_read, mark_all_notifications_as_read


class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for viewing and managing user notifications.
    """
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Users can only view their own notifications
        return Notification.objects.filter(recipient=self.request.user).order_by('-created_at')

    @action(detail=True, methods=['post'], url_path='mark-read')
    def mark_read(self, request, pk=None):
        """
        POST /api/notifications/{id}/mark-read/
        """
        try:
            notification = mark_notification_as_read(notification_id=pk, user=request.user)
            serializer = self.get_serializer(notification)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='mark-all-read')
    def mark_all_read(self, request):
        """
        POST /api/notifications/mark-all-read/
        """
        count = mark_all_notifications_as_read(user=request.user)
        return Response({"message": f"{count} notifications marked as read."}, status=status.HTTP_200_OK)