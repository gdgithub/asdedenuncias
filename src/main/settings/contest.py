# coding=utf-8
from base import *

SITE_ID = 1

DEBUG = True
ALLOWED_HOSTS = ['*']

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'dc60t9t4dnghoh',
        'USER': 'qdoswzvbrgmmtu',
        'PASSWORD': '0141da0ef7bbab4c04aab682d5288869a2bc9c03569e91b2c8661595003a4a7f',
        'HOST': 'ec2-54-221-254-72.compute-1.amazonaws.com',
        'PORT': '5432',
    }
}
