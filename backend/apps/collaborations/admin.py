from django.contrib import admin
from .models import Collaboration


@admin.register(Collaboration)
class CollaborationAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'primary_department',
        'supporting_department',
        'report',
        'status',
        'requested_by',
        'created_at',
    )
    list_filter = ('status', 'primary_department', 'supporting_department', 'created_at')
    search_fields = (
        'primary_department__name',
        'supporting_department__name',
        'reason',
        'report__report_number',
    )
    readonly_fields = ('created_at', 'updated_at')
