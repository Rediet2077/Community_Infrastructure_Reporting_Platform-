import os
import sys
import django

sys.path.append('c:\\Users\\hp\\INSA\\project\\Community_Infrastructure_Reporting_Platform-\\backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings.base')
django.setup()

from apps.categories.models import Category

categories_data = [
    ('d5029881-2d3a-4add-817d-1c48614d39ee', 'Road Damage', 'RD'),
    ('5e850149-14bd-45b5-a7bf-7aa83dfe97da', 'Water & Sewage', 'WS'),
    ('576d6b9f-d2b5-4569-91f4-a9c7cf56be60', 'Garbage', 'GB'),
    ('3ffaed57-c384-4a22-8c06-a9817e176de8', 'Streetlight', 'SL'),
    ('9d84109c-e4df-463d-83ae-d8c31d4ab7e0', 'Drainage', 'DR'),
    ('64940c79-479c-4784-ab44-e7b8c0a3c777', 'Other', 'OT'),
]

for uuid, name, code in categories_data:
    Category.objects.get_or_create(
        id=uuid,
        defaults={'name': name, 'code': code, 'description': f'{name} category'}
    )

print("Categories seeded successfully.")
