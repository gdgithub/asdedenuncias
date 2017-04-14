# coding=utf-8
from base import *

SITE_ID = 1

DEBUG = False
ALLOWED_HOSTS = ['*']

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'dc08ksnl4p0ec6',
        'USER': 'honmhaszhrchhb',
        'PASSWORD': 'Pdi86c-z1WOS0XoXMOz22K0toK',
        'HOST': 'ec2-54-243-249-165.compute-1.amazonaws.com',
        'PORT': '5432',
    }
}
