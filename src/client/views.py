from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from models import *
from src.common.functions import *
from src.server.views import *
import json
from django.core.files.storage import FileSystemStorage
from django.core import serializers
# Create your views here.

def default(request):
    return HttpResponseRedirect(reverse('login_page'))

def login_page(request):
    return render(request, 'components/login.html', {})

def admin_page(request):
    return render(request, 'components/admin.html', {})

def complainttypes_page(request):
    return render(request, 'components/complainttypes.html', {})

def users_page(request):
    return render(request, 'components/users.html', {})

def termsofuse_page (request):
    return render(request, 'components/termsofuse.html', {})

def news_page (request):
    return render(request, 'components/news.html', {})


def denuncias_page (request):
    return render(request, 'components/denuncias.html', {})
    

def complaint_page(request):
    if request.method == "GET":
        id = request.GET["id"]
        result = {}
        data = list(complaint.objects.prefetch_related("complaintTypeId")
                            .prefetch_related("userId").filter(id=id))
        for i in range(len(data)):
            if data[i].filePath != "" and data[i].filePath != None:
                filePath = data[i].filePath
            else:
                filePath = ","

            result = {
                "id":data[i].id,
                "complaintType":data[i].complaintTypeId.description,
                "description":data[i].description,
                "address":data[i].address,
                "location":data[i].location,
                "userId":data[i].userId.email,
                "userName":data[i].userId.name,
                "lat": data[i].location.split(",")[0],
                "long": data[i].location.split(",")[1],
                "filePaths": list(filePath.split(","))
            }

        return render(request, 'components/complaint.html', {
            "complaintId":id,
            "data": result
            })
    else:
        return render(request, 'components/complaint.html', {})
        
