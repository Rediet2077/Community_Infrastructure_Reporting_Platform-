from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Report submission page
    path('submit-report/', TemplateView.as_view(template_name='submit_report.html'), name='submit_report'),

    # Users & Authentication (Working)
    path('api/v1/', include('apps.users.urls')),

    # Audit Engine (Working)
    path('api/v1/', include('apps.audit.urls')),

    # Working Domain Apps
    path('api/v1/departments/', include('apps.departments.urls')),
    path('api/v1/categories/', include('apps.categories.urls')),
    path('api/v1/reports/', include('apps.reports.urls')),
    path('api/v1/notifications/', include('apps.notifications.urls')),
    path('api/v1/media/', include('apps.medias.url')),
    
    # Temporarily disabled until PostgreSQL/fixes:
    path('api/v1/assets/', include('apps.assets.urls')),         # Requires PostGIS
    path('api/v1/tasks/', include('apps.tasks.urls')),           # Import error: IsDepartmentAdmin
    # path('api/v1/', include('apps.collaborations.urls')),        # Not checked yet
    path('api/v1/disputes/', include('apps.disputes.urls')),     # Import error: DisputeComment  
    path('api/v1/', include('apps.notifications.urls')),         # Not checked yet
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)