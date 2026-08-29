from django.urls import path
from .views import AssetRegistrationView

urlpatterns = [
    path('register/', AssetRegistrationView.as_view(), name='asset-register'),
]