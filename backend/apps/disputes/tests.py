from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from apps.departments.models import Department
from .models import Dispute

User = get_user_model()


class DisputeAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="citizen_user", password="password123")
        self.dept = Department.objects.create(name="Sanitation")
        self.dispute = Dispute.objects.create(
            raised_by=self.user,
            department=self.dept,
            title="Delayed Cleanup",
            description="Debris left on sidewalk."
        )
        self.client.force_authenticate(user=self.user)

    def test_add_dispute_comment(self):
        response = self.client.post(
            f'/api/disputes/{self.dispute.id}/add-comment/',
            {'comment': 'Photo evidence attached.'},
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)