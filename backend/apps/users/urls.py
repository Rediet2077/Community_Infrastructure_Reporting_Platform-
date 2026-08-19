from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    RegisterView,
    CustomTokenObtainPairView,
    UserProfileView,
    UserListView,
    UserDetailAdminView,
    ChangePasswordView,
    UserStatusUpdateView,
)

urlpatterns = [
    # Authentication Endpoints
    path('auth/register/', RegisterView.as_view(), name='auth_register'),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='auth_login'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='auth_token_refresh'),
    path('auth/change-password/', ChangePasswordView.as_view(), name='auth_change_password'),

    # Profile Endpoints
    path('users/me/', UserProfileView.as_view(), name='user_profile'),

    # Administrative User Management Endpoints
    path('users/', UserListView.as_view(), name='admin_user_list'),
    path('users/<uuid:id>/', UserDetailAdminView.as_view(), name='admin_user_detail'),
    path('users/<uuid:id>/status/', UserStatusUpdateView.as_view(), name='admin_user_status_update'),
]