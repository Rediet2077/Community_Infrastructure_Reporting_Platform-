from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView,
    CustomTokenObtainPairView,
    UserProfileView,
    UserListView,
    UserDetailAdminView,
)

urlpatterns = [
    # Auth endpoints
    path('auth/register/', RegisterView.as_view(), name='auth_register'),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='auth_login'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # User profile endpoint
    path('users/me/', UserProfileView.as_view(), name='user_me'),

    # Admin User Management endpoints
    path('users/', UserListView.as_view(), name='user_list_admin'),
    path('users/<uuid:id>/', UserDetailAdminView.as_view(), name='user_detail_admin'),
]