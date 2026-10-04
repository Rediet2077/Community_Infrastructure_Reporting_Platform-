import os
import sys
import django

sys.path.append('c:\\Users\\hp\\INSA\\project\\Community_Infrastructure_Reporting_Platform-\\backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings.base')
django.setup()

from django.db import connection
from apps.reports.models import Report

with connection.cursor() as cursor:
    cursor.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'reports_report';")
    existing_columns = [row[0] for row in cursor.fetchall()]

    for field in Report._meta.fields:
        if field.column not in existing_columns:
            print(f"Adding missing column: {field.column} ({field.db_type(connection)})")
            # For simplicity, we just execute ALTER TABLE ADD COLUMN
            try:
                # Basic mapping for db_type to raw sql, django's schema editor is better
                from django.db.backends.base.schema import BaseDatabaseSchemaEditor
                with connection.schema_editor() as editor:
                    editor.add_field(Report, field)
                print(f"Successfully added {field.column}")
            except Exception as e:
                print(f"Error adding {field.column}: {e}")

