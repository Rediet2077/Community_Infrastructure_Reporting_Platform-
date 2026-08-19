from django.urls import path
from .views import AuditLogListView, AuditLogDetailView

urlpatterns = [
    path('audit-logs/', AuditLogListView.as_view(), name='audit_log_list'),
    path('audit-logs/<uuid:id>/', AuditLogDetailView.as_view(), name='audit_log_detail'),
]