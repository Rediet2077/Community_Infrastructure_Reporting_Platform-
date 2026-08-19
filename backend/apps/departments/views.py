from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Department
from .serializers import DepartmentSerializer
from apps.tasks.permissions import IsDepartmentManagerOrAdmin

class DepartmentViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing infrastructure departments.
    """
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated, IsDepartmentManagerOrAdmin]