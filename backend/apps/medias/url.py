from django.urls import path
from .views import MediaListView, MediaUploadView, MediaConfirmView

urlpatterns = [
    path('', MediaListView.as_view(), name='media-list'),
    path('upload/', MediaUploadView.as_view(), name='media-upload'),
    path('confirm/', MediaConfirmView.as_view(), name='media-confirm'),
]
