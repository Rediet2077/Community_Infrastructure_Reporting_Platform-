from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from apps.departments.models import Department
from .models import Task

User = get_user_model()


class TaskAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.department = Department.objects.create(name="Roads & Transport")
        self.admin = User.objects.create_superuser(username="dept_admin", password="password123")
        self.task = Task.objects.create(
            title="Fix Main St Pothole",
            description="Repair damaged asphalt",
            department=self.department,
            status=Task.Status.PENDING
        )
        self.client.force_authenticate(user=self.admin)

    def test_list_tasks(self):
        response = self.client.get('/api/tasks/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_mark_completed_action(self):
        response = self.client.post(
            f'/api/tasks/{self.task.id}/mark-completed/',
            {'completion_notes': 'Repairs finished successfully.'},
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.task.refresh_from_db()
        self.assertEqual(self.task.status, Task.Status.COMPLETED_PENDING_VERIFICATION)