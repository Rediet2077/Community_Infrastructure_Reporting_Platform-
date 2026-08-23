from django.urls import path
from .views import AuditLogListView, AuditLogDetailView

app_name = 'audit'

urlpatterns = [
    path('audit/', AuditLogListView.as_view(), name='audit-log-list'),
    path('audit/<uuid:id>/', AuditLogDetailView.as_view(), name='audit-log-detail'),
]