from django.shortcuts import render
from django.http import HttpResponse
from models import *
from src.common.functions import *
import json
from django.core.files.storage import FileSystemStorage
from django.core import serializers
# Create your views here.

def default(request):
    return HttpResponse('none')

def userRegistration(request):
    success = False
    log = None
    userExist = False
    if request.method == "POST":
        name = request.POST["name"]
        lastName = request.POST["lastName"]
        email = request.POST["email"].lower()
        password = request.POST["password"].lower()
		
        try:
            userExist = bool(userInfo.objects.filter(email=email))
            if not userExist:    		
                user = userInfo.objects.create(
                            email=email, 
                            name=name, 
                            lastName=lastName
                        )
                users.objects.create(
                            email=user.email, 
                            password=password
                        )
                success = True                        
        except Exception as e:
            log = str(e.message)
		
    return HttpResponse(json.dumps({
        "success": success,
        "userExist": userExist,
        "log": log
        }))

def authentication(request):
    authenticated = False
    userExist = False
    log = None
    if request.method == "POST":
        email = request.POST["email"].lower()
        password = request.POST["password"].lower()
		
        try:
            user = users.objects.filter(email=email)

            if user:          
                userExist = True
                authenticated= True if user[0].password == password else False
        except Exception as e:
            log = str(e.message)

    return HttpResponse(json.dumps({
        "userExist": userExist,
        "authenticated": authenticated,
        "log": log
        }))

def getcomplaints(request):
    success = False
    log = None
    result = []
    try:
        data = list(complaint.objects.prefetch_related("complaintTypeId").all())
        for i in range(len(data)):
            result.append({
                "id":data[i].id,
                "complaintType":data[i].complaintTypeId.description,
                "description":data[i].description,
                "address":data[i].address,
                "location":data[i].location,
                "userId":data[i].userId.email
            })
        success = True if data else False
    except Exception as e:
        log = str(e.message)

    return HttpResponse(json.dumps({
        "success": success,
        "data": result,
        "log": log
        }))

def getComplaintTypes(request):
    log = None
    success = False
    data = []
    
    try:
        data = list(complaintTypes.objects.values().all())
        success = True if data else False
    except Exception as e:
        log = str(e.message)

    return HttpResponse(json.dumps({
        "success":success,
        "data": data,
        "log": log
        }))


def saveComplaintTypes(request):
    log = None
    data = None
    success = True
    if request.method == "POST":
        description = request.POST["description"]
        try:
            kwargs = {"description":description}
            obj, created = filter_or_create(complaintTypes,kwargs)
            if created:
                data = obj.id
            else:
                data = obj.id
        except Exception as e:
            log = str(e.message)
            success = False

    return HttpResponse(json.dumps({
        "success": success,
        "data": data,
        "log": log
        }))

def updateComplaintTypes(request):
    log = None
    data = None
    success = True
    if request.method == "POST":
        id = request.POST["id"]
        description = request.POST["description"]
        try:
            obj = complaintTypes.objects.filter(id=id).update(
                description=description
            )
            data = id
        except Exception as e:
            log = str(e.message)
            success = False

    return HttpResponse(json.dumps({
        "success": success,
        "data": data,
        "log": log
        }))
    
def deleteComplaintTypes(request):
    log = None
    success = True
    if request.method == "POST":
        id = request.POST["id"]
        try:
            complaintTypes.objects.filter(id=id).delete()
        except Exception as e:
            log = str(e.message)
            success = False

    return HttpResponse(json.dumps({
        "success": success,
        "log": log
        }))


def saveComplaint(request):
    complaintTypeExist = False
    log = None
    success = False

    if request.method == "POST":
        userId = request.POST["userId"]
        complaintType = request.POST["complaintTypeId"]
        description = request.POST["description"]
        address = request.POST["address"]
        location = request.POST["location"]

        try:
            # filtering to prevent duplicity erros.
            cType = complaintTypes.objects.filter(description=complaintType)#complaintTypeId)
            user = userInfo.objects.filter(email=userId)
            
            if cType and user: # save complaint
                suc = complaint.objects.create(
                    userId = user[0],
                    complaintTypeId = cType[0],
                    description = description,
                    address = address,
                    location = location
                )

                success = True if success else False
                
        except Exception as e:
            log = str(e.message)
            print log
            

    return HttpResponse(json.dumps({
        "success": success,
        "log": log
        }))


def saveFile(request):
    success = False
    log = None
    if request.method == "POST":
        userId = request.POST["userId"]
        remFile = request.FILES['userfile']
        try:
            fs = FileSystemStorage()

            saved = fs.save("foto", remFile)
            success = True if saved else False
        except Exception as e:
            log = str(e.message)
            print log
        
    return HttpResponse(json.dumps({
        "success": success,
        "log": log
        }))
