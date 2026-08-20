from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import Department

User = get_user_model()


class DepartmentAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.department = Department.objects.create(name="Water Works", description="Handles water infrastructure")
        self.admin_user = User.objects.create_superuser(username="admin", password="password123")
        self.client.force_authenticate(user=self.admin_user)

    def test_list_departments(self):
        response = self.client.get('/api/departments/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_department_overview(self):
        response = self.client.get(f'/api/departments/{self.department.id}/overview/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('total_tasks', response.data)