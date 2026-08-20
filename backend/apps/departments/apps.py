from django.apps import AppConfig


class DepartmentsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.departments'
    verbose_name = 'Department Management Operations'

    def ready(self):
        """
        Import signals when the app is ready to listen for department updates
        and trigger automated actions/notifications.
        """
        try:
            import apps.departments.signals  # noqa: F401
        except ImportError:
            pass
