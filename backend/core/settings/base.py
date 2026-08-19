import os
import sys
from pathlib import Path
import dj_database_url
from dotenv import load_dotenv
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv(BASE_DIR / '.env')
# BASE_DIR = str(Path(__file__).resolve().parent.parent.parent)
# arr = BASE_DIR.split("\\")
# BASE_DIR = "/".join(arr)+"/"+".env"
# load_dotenv(BASE_DIR)

# -----------------------------------------------------------------------------
# GeoDjango Windows Configuration (GDAL / GEOS)
# -----------------------------------------------------------------------------
if os.name == 'nt':
    OSGEO4W_DIR = r"C:\OSGeo4W"
    venv_osgeo = os.path.join(sys.prefix, 'Lib', 'site-packages', 'osgeo')

    # Option A: Check for OSGeo4W installation
    if os.path.isdir(OSGEO4W_DIR):
        os.environ['OSGEO4W_ROOT'] = OSGEO4W_DIR
        os.environ['GDAL_DATA'] = os.path.join(OSGEO4W_DIR, r"share\gdal")
        os.environ['PROJ_LIB'] = os.path.join(OSGEO4W_DIR, r"share\proj")
        os.environ['PATH'] = os.path.join(OSGEO4W_DIR, "bin") + ';' + os.environ['PATH']

        bin_dir = Path(OSGEO4W_DIR) / "bin"
        gdal_dll = next(bin_dir.glob("gdal*.dll"), None)
        geos_dll = next(bin_dir.glob("geos_c*.dll"), None)
        if gdal_dll:
            GDAL_LIBRARY_PATH = str(gdal_dll)
        if geos_dll:
            GEOS_LIBRARY_PATH = str(geos_dll)

    # Option B: Fallback to virtualenv wheel (pip install GDAL)
    elif os.path.isdir(venv_osgeo):
        os.environ['PATH'] = venv_osgeo + ';' + os.environ['PATH']
        os.environ['GDAL_DATA'] = os.path.join(venv_osgeo, 'data', 'gdal')
        os.environ['PROJ_LIB'] = os.path.join(venv_osgeo, 'data', 'proj')
        
        osgeo_path = Path(venv_osgeo)
        gdal_dll = osgeo_path / 'gdal.dll' if (osgeo_path / 'gdal.dll').exists() else next(osgeo_path.glob('gdal*.dll'), None)
        geos_dll = osgeo_path / 'geos_c.dll' if (osgeo_path / 'geos_c.dll').exists() else next(osgeo_path.glob('geos_c*.dll'), None)
        if gdal_dll:
            GDAL_LIBRARY_PATH = str(gdal_dll)
        if geos_dll:
            GEOS_LIBRARY_PATH = str(geos_dll)

# -----------------------------------------------------------------------------
# Core Security & App Configuration
# -----------------------------------------------------------------------------
SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-default-change-me')
DEBUG = os.getenv('DEBUG', 'False') == 'True'

ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '*').split(',')

INSTALLED_APPS = [
    # GeoDjango Admin & Core
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.gis',  # Required for PostGIS spatial fields

    # Third-Party Packages
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'django_filters',

    # CIRP Domain Apps
    'apps.users',
    'apps.reports',
    'apps.categories',
    'apps.locations',
    'apps.departments',
    'apps.assets',
    'apps.collaborations',
    'apps.notifications',
    'apps.disputes',
    'apps.tasks',
    'apps.audit',
    'apps.medias',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Top of middleware for CORS handling
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

# -----------------------------------------------------------------------------
# Database Configuration (Neon PostGIS)
# -----------------------------------------------------------------------------
DATABASES = {
    'default': dj_database_url.config(
        default=os.getenv('DATABASE_URL'),
        conn_max_age=600,  # Recommended 0 for serverless pooler endpoints
        conn_health_checks=True,
        engine='django.contrib.gis.db.backends.postgis'
    )
}

# -----------------------------------------------------------------------------
# Custom User Model & Password Validation
# -----------------------------------------------------------------------------
AUTH_USER_MODEL = 'users.User'

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# -----------------------------------------------------------------------------
# Internationalization
# -----------------------------------------------------------------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# -----------------------------------------------------------------------------
# Static & Media Files
# -----------------------------------------------------------------------------
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# -----------------------------------------------------------------------------
# REST Framework & JWT
# -----------------------------------------------------------------------------
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
    ),
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
    ),
    'EXCEPTION_HANDLER': 'utils.exceptions.custom_exception_handler',
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': False,
    'SIGNING_KEY': SECRET_KEY,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
}
# -----------------------------------------------------------------------------
# CORS Configuration
# -----------------------------------------------------------------------------
CORS_ALLOW_ALL_ORIGINS = DEBUG
CORS_ALLOWED_ORIGINS = os.getenv('CORS_ALLOWED_ORIGINS', 'http://localhost:3000,http://127.0.0.1:3000').split(',')