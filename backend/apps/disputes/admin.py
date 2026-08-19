from django.contrib import admin
from .models import Dispute


@admin.register(Dispute)
class DisputeAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'report',
        'submitted_by',
        'status',
        'created_at',
    )
    list_filter = ('status', 'created_at')
    search_fields = ('reason', 'submitted_by__email', 'report__report_number')
    readonly_fields = ('created_at', 'reviewed_at')