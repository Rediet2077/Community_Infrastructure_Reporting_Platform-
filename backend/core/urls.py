from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # Users & Authentication (Migbaru's Scope)
    path('api/v1/', include('apps.users.urls')),

    # Audit Engine (Migbaru's Scope)
    path('api/v1/', include('apps.audit.urls')),

    # Domain App Routes
    path('api/v1/assets/', include('apps.assets.urls')),
    path('api/v1/tasks/', include('apps.tasks.urls')),
    path('api/v1/departments/', include('apps.departments.urls')),
    path('api/v1/', include('apps.collaborations.urls')),
    path('api/v1/disputes/', include('apps.disputes.urls')),
    path('api/v1/', include('apps.notifications.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    # ... other apps