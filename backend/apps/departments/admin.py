from django.contrib import admin
from .models import Department


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'code',
        'admin_user',
        'created_at',
    )
    list_filter = ('created_at',)
    search_fields = ('name', 'code', 'description', 'admin_user__email')
    readonly_fields = ('created_at', 'updated_at')
    raw_id_fields = ('admin_user',)