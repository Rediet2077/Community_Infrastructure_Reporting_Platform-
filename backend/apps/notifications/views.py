from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from utils.responses import success_response

from .models import Notification
from .serializers import NotificationSerializer
from .services import mark_notification_as_read, mark_all_notifications_as_read


class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for viewing and managing user notifications.
    Users can only view their own notifications.
    """
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user).order_by('-created_at')

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        unread_count = queryset.filter(is_read=False).count()
        serializer = self.get_serializer(queryset, many=True)
        return success_response(
            data={
                'notifications': serializer.data,
                'unread_count': unread_count,
            },
            message="Notifications retrieved.",
        )

    @action(detail=True, methods=['post'], url_path='mark-read')
    def mark_read(self, request, pk=None):
        """POST /api/v1/notifications/<id>/mark-read/"""
        try:
            notification = mark_notification_as_read(notification_id=pk, user=request.user)
            serializer = self.get_serializer(notification)
            return success_response(data=serializer.data, message="Notification marked as read.")
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='mark-all-read')
    def mark_all_read(self, request):
        """POST /api/v1/notifications/mark-all-read/"""
        count = mark_all_notifications_as_read(user=request.user)
        return success_response(message=f"{count} notifications marked as read.")