"""src URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from views import *

urlpatterns = [
    url(r'^login$',login_page, name='login_page'),
    url(r'^admin$',admin_page, name='admin_page'),
    url(r'^admin/complaint$',complaint_page, name='complaint_page'),
    url(r'^admin/complainttypes$',complainttypes_page, name='complainttypes_page'),
    url(r'^admin/users$',users_page, name='users_page'),
    url(r'^admin/termsofuse$',termsofuse_page, name='termsofuse_page'),
    url(r'^admin/news$',news_page, name='news_page'),
    url(r'^denuncias$',denuncias_page, name='denuncias_page'),

    
]
