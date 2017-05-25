# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse
from models import *
from src.common.functions import *
import json
from django.core.files.storage import FileSystemStorage
from django.core import serializers
from django.core.mail import send_mail
from random import randint
from django.core.files.storage import FileSystemStorage


# Create your views here.

def default(request):
    return HttpResponse('none')

def userRegistration(request):
    success = False
    log = None
    userExist = False
    if request.method == "POST":
        name = request.POST["name"]
        phone = request.POST["phone"]
        address = request.POST["address"]
        email = request.POST["email"].lower()
        password = request.POST["password"].lower()
        rol = "user"

        if "rol" in request.POST:
            rol = request.POST["rol"]
		
        try:
            userExist = bool(userInfo.objects.filter(email=email))
            if not userExist:    		
                user = userInfo.objects.create(
                            email=email, 
                            name=name,
                            phone=phone,
                            address=address
                        )
                if user:
                    users.objects.create(
                                email=user, 
                                password=password,
                                rol=rol
                            )
                    success = True                        
        except Exception as e:
            log = str(e.message)
            success = False
            print log

    return HttpResponse(json.dumps({
        "success": success,
        "userExist": userExist,
        "log": log
        }))


def isRegistered(request):
    registered = False
    log = None
    if request.method == "POST":
        email = request.POST["email"].lower()
        try:
            registered = users.objects.filter(email=email)
            registered = True if registered else False

        except Exception as ex:
            log = str(ex.message)
            print log

    return HttpResponse(json.dumps({
        "registered": registered,
        "log": log
        }))

def authentication(request):
    authenticated = False
    userExist = False
    log = None
    rol = None
    if request.method == "POST":
        email = request.POST["email"].lower()
        password = request.POST["password"].lower()
		
        try:
            user = users.objects.filter(email=email)

            if user:          
                userExist = True
                authenticated= True if user[0].password == password else False
                rol = user[0].rol
        except Exception as e:
            log = str(e.message)

    return HttpResponse(json.dumps({
        "userExist": userExist,
        "authenticated": authenticated,
        "rol":rol,
        "log": log
        }))


def getUsers(request):
    log = None
    success = False
    data = []
    try:
        u = users.objects.prefetch_related("email").all()
        for i in range(len(u)):
            # print u[i].email
            data.append({
                "email": u[i].email.email,
                "password": u[i].password,
                "name": u[i].email.name
            })
        success = True if data else False
    except Exception as e:
        log = str(e.message)
        print log

    return HttpResponse(json.dumps({
        "success":success,
        "data": data,
        "log": log
        }))


def restorePassword(request):
    success = True
    data = []
    log = None
    if request.method == "POST":
        email = request.POST["email"].lower()
        pwd = request.POST["pwd"]
        newPwd = randint(1234,999999)
        try:
            success = users.objects.filter(email=email).update(
                password=newPwd
            )
            success = True if success else False

            if success:
                """
                send_mail(
                    "Restablecer contrasena",
                    "Su nueva contraseña es: "+newPwd,
                    "starlin.gil.cruz@gmail.com",
                    ["starlin.gil.cruz@gmail.com"]
                )
                """

        except Exception as e:
            log = str(e.message)
            success = False

    return HttpResponse(json.dumps({
        "success":success,
        "log": log
        }))


def getcomplaints(request):
    success = False
    log = None
    result = []
    try:
        data = list(complaint.objects.prefetch_related("complaintTypeId").all().order_by("id"))
        for i in range(len(data)):
            result.append({
                "id":data[i].id,
                "complaintType":data[i].complaintTypeId.description,
                "description":data[i].description,
                "address":data[i].address,
                "location":data[i].location,
                "userId":data[i].userId.email,
                "date": str(data[i].date)
            })
        success = True if data else False
    except Exception as e:
        log = str(e.message)

    return HttpResponse(json.dumps({
        "success": success,
        "data": result,
        "log": log
        }))


def getcomplaints_orderby(request):
    success = False
    log = None
    result = []
    order = request.POST["order"]
    try:
        if order == "recent":     
            data = list(complaint.objects.prefetch_related("complaintTypeId").all().order_by("id").reverse())
        elif order == "viewed":
            data = list(complaint.objects.prefetch_related("complaintTypeId").filter(checked="1").order_by("id"))
        elif order == "noviewed":
            data = list(complaint.objects.prefetch_related("complaintTypeId").filter(checked="").order_by("id"))
        elif order == "inprocess":
            data = list(complaint.objects.prefetch_related("complaintTypeId").filter(inProcess="1").order_by("id"))
        else:
            data = list(complaint.objects.prefetch_related("complaintTypeId").all().order_by("id").reverse())

        for i in range(len(data)):
            result.append({
                "id":data[i].id,
                "complaintType":data[i].complaintTypeId.description,
                "description":data[i].description,
                "address":data[i].address,
                "location":data[i].location,
                "userId":data[i].userId.email,
                "date": str(data[i].date)
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
    objId = None
    if request.method == "POST":
        userId = request.POST["userId"].lower()
        complaintType = request.POST["complaintType"]
        description = request.POST["description"]
        address = request.POST["address"]
        location = request.POST["location"]
        print location
        location = "0.000000,0.000000" if len(location) == 0 or location == "(null)" else location

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
                    location = location,
                    filePath = "",
                    checked = "",
                    inProcess = ""
                )

                if suc:
                    objId = suc.id

                success = True if suc else False

                if success:
                    send_mail(
                    "ASDE",
                    "Hemos recibido su denuncia, la misma sera atendida en los horarios de lunes a viernes de 08:00am a 04:00pm. Número de caso: "+str(objId),
                    "cs@gildevelopers.com",
                    [userId])
                
        except Exception as e:
            log = str(e.message)
            print log
            

    return HttpResponse(json.dumps({
        "success": success,
        "log": log,
        "objId":objId
        }))


def updateComplaintStatus(request):
    log = None
    success = False

    if request.method == "POST":
        id = request.POST["id"]
        status = request.POST["status"]
        try:
            if status == "inProcess":
                upd = complaint.objects.filter(id=id).update(
                    inProcess="1",
                    checked="1"
                ) 
            elif status == "checked":
                upd = complaint.objects.filter(id=id).update(
                    checked="1"
                )

            success = True if upd else False
            if success and status == "inProcess":
                u = complaint.objects.filter(id=id)
                send_mail(
                    "Actualización",
                    "Notificamos que su denuncia esta siendo procesada.",
                    "cs@gildevelopers.com",
                    [u[0].userId])
                
        except Exception as e:
            log = str(e.message)
            print log
            

    return HttpResponse(json.dumps({
        "success": success,
        "log": log
        }))


def getpolicyandterms(request):
    log = None
    success = False
    data = []
    
    try:
        data = list(legal.objects.values().all())
        success = True if data else False
    except Exception as e:
        log = str(e.message)

    return HttpResponse(json.dumps({
        "success":success,
        "data": data,
        "log": log
        }))

def savepolicyandterms(request):
    log = None
    success = False
    policy = request.POST["policy"]
    terms = request.POST["terms"]
    try:
        legal.objects.all().delete()
        success = legal.objects.create(
            term_use=terms,
            privacy=policy
        )
        success = True if success else False

    except Exception as e:
        log = str(e.message)

    return HttpResponse(json.dumps({
        "success":success,
        "log": log
        }))


def savenews(request):
    log = None
    success = False
    data = None
    titulo = request.POST["titulo"]
    link = request.POST["link"]
    fecha = request.POST["fecha"]
    descripcion = request.POST["descripcion"]

    try:
        data = news.objects.create(
            title=titulo,
            link=link,
            description=descripcion,
            date=fecha
        )
        success = True if data else False
        data = data.id

    except Exception as e:
        log = str(e.message)

    return HttpResponse(json.dumps({
        "success":success,
        "data":data,
        "log": log
        }))


def getnews(request):
    log = None
    success = False
    data = None
    try:
        data = list(news.objects.values().all())
        success = True if data else False
    except Exception as e:
        log = str(e.message)

    return HttpResponse(json.dumps({
        "success":success,
        "data": data,
        "log": log
        }))


def deletenews(request):
    log = None
    success = False
    try:
        success = news.objects.all().delete()
        success = True if success else False
    except Exception as e:
        log = str(e.message)

    return HttpResponse(json.dumps({
        "success":success,
        "log": log
        }))


def savenewsfile(request):
    success = False
    if request.method == "POST":
        rowId = request.POST['rowId'] 
        if "file" in request.FILES:
            myfile = request.FILES['file']
            fs = FileSystemStorage()

            if fs.exists(rowId):
                fs.delete(rowId)

            filename = fs.save(rowId, myfile)

            exists = news.objects.filter(id=rowId)
            if exists:
                success = news.objects.filter(id=rowId).update(
                    filepath="/static/"+filename
                )
            else: 
                success = False
        else:
            exists = news.objects.filter(id=rowId)
            if exists:
                success = news.objects.filter(id=rowId).update(
                    filepath="no file"
                )
            else:
                success = False
        success = True if success else False

    return render(request, 'components/news.html', {})


def saveFile(request):
    success = False
    log = None
    objId = None
    if request.method == "POST":
        objId = request.POST["objId"]
        fileName = request.POST["uFileName"]
        remFile = request.FILES['userfile']
        try:
            fs = FileSystemStorage()

            saved = fs.save(fileName, remFile)
            success = True if saved else False

            if success:
                c = complaint.objects.filter(id=objId)
                if c:
                    fileName = c[0].filePath+","+fileName
                    complaint.objects.filter(id=objId).update(
                        filePath = fileName
                    ) 

        except Exception as e:
            log = str(e.message)
            print log
        
    return HttpResponse(json.dumps({
        "success": success,
        "objId":objId,
        "log": log
        }))


def sendEmail(request):
    suc = False
    
    return HttpResponse(json.dumps({
        "success": suc
        }))


def sendmailnow(request):
    suc = False
    if request.method == "POST":
        subj = request.POST["subject"]
        title = request.POST["title"]
        to = request.POST["to"]
        suc = send_mail(
            title,
            subj,
            "cs@gildevelopers.com",
            [to])

        suc = True if suc else False

    return HttpResponse(json.dumps({
        "success": suc
        }))
