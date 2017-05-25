# coding=utf-8
from base import *

SITE_ID = 1

DEBUG = True
ALLOWED_HOSTS = ['*']

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'd3bbn4n5oe70kp',
        'USER': 'wslzzbciwhjaod',
        'PASSWORD': '4e88fd4e840d8412f4d374fed83a720156870ccb0c05e081c851c59d1a083c96',
        'HOST': 'ec2-23-21-220-23.compute-1.amazonaws.com',
        'PORT': '5432',
    }
}
