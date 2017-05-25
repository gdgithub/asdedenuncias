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
    url(r'^$', default, name='form'),
    url(r'userRegistration/$', userRegistration, name='userRegistration'),
    url(r'isRegistered/$', isRegistered, name='isRegistered'),
    url(r'authentication/$', authentication, name='authentication'),
    url(r'getcomplaints/$', getcomplaints, name='getcomplaints'),
    url(r'getcomplaints_orderby/$', getcomplaints_orderby, name='getcomplaints_orderby'),     
    url(r'newComplaint/$', saveComplaint, name='saveComplaint'),
    url(r'updatecomplaintstatus/$', updateComplaintStatus, name='updateComplaintStatus'),
    url(r'saveFile/$', saveFile, name='saveFile'),   
    url(r'savecomplainttypes/$', saveComplaintTypes, name='saveComplaintTypes'),
    url(r'updatecomplainttypes/$', updateComplaintTypes, name='updateComplaintTypes'),
    url(r'deletecomplainttypes/$', deleteComplaintTypes, name='deleteComplaintTypes'),
    url(r'getcomplainttypes/$', getComplaintTypes, name='getComplaintTypes'),
    url(r'getpolicyandterms/$', getpolicyandterms, name="getpolicyandterms"),
    url(r'savepolicyandterms/$', savepolicyandterms, name="savepolicyandterms"),
    url(r'getusers/$', getUsers, name='getUsers'),
    url(r'restorepassword/$', restorePassword, name='restorePassword'),
    url(r'savenews/$', savenews, name='savenews'),
    url(r'savenewsfile/$', savenewsfile, name='savenewsfile'),
    url(r'getnews/$', getnews, name='getnews'),
    url(r'deletenews/$', deletenews, name='deletenews'),
    url(r'sendemail/$', sendEmail, name='sendEmail'),
    url(r'sendmailnow/$', sendmailnow, name='sendmailnow'),
    

]
