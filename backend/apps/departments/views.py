from rest_framework import viewsets, permissions
from .models import Department
from .serializers import DepartmentSerializer
from apps.tasks.permissions import IsDepartmentAdmin

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.filter(is_active=True)
    serializer_class = DepartmentSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsDepartmentAdmin()]
        return [permissions.IsAuthenticated()]