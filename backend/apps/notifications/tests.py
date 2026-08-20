from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import Notification

User = get_user_model()


class NotificationAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="notif_user", password="password123")
        self.notification = Notification.objects.create(
            recipient=self.user,
            title="Task Assigned",
            message="You have been assigned to task #10"
        )
        self.client.force_authenticate(user=self.user)

    def test_mark_notification_read(self):
        response = self.client.post(f'/api/notifications/{self.notification.id}/mark-read/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.notification.refresh_from_db()
        self.assertTrue(self.notification.is_read)