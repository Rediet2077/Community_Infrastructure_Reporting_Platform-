from django.contrib import admin
from .models import Dispute, DisputeComment


@admin.register(Dispute)
class DisputeAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'title',
        'raised_by',
        'department',
        'task',
        'status',
        'created_at',
    )
    list_filter = ('status', 'department', 'created_at')
    search_fields = ('title', 'description', 'raised_by__username', 'task__title')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(DisputeComment)
class DisputeCommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'dispute', 'author', 'created_at')
    search_fields = ('dispute__title', 'comment', 'author__username')
    readonly_fields = ('created_at',)