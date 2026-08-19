from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from apps.departments.models import Department
from .models import CollaborationRequest

User = get_user_model()


class CollaborationAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.dept_a = Department.objects.create(name="Water")
        self.dept_b = Department.objects.create(name="Power")
        self.user = User.objects.create_superuser(username="collab_admin", password="password123")
        self.collab_req = CollaborationRequest.objects.create(
            requesting_department=self.dept_a,
            target_department=self.dept_b,
            requested_by=self.user,
            reason="Joint excavation required"
        )
        self.client.force_authenticate(user=self.user)

    def test_respond_to_collaboration(self):
        response = self.client.post(
            f'/api/collaborations/{self.collab_req.id}/respond/',
            {'approved': True, 'notes': 'Approved for equipment sharing.'},
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.collab_req.refresh_from_db()
        self.assertEqual(self.collab_req.status, CollaborationRequest.Status.ACCEPTED)