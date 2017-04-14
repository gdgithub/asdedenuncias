from __future__ import unicode_literals

from django.db import models

# Create your models here.

class userInfo(models.Model):
    email = models.TextField(primary_key=True)
    name = models.TextField(blank=True, null=True)
    lastName = models.TextField(blank=True, null=True)
    
    class Meta:
        db_table = 'userInfo'

class users(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.ForeignKey(userInfo, on_delete=models.CASCADE)
    password = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'users'

class complaintTypes(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'complaintTypes'


class complaint(models.Model):
    id = models.AutoField(primary_key=True)
    userId = models.ForeignKey(userInfo, on_delete=models.DO_NOTHING, blank=True, null=True)
    complaintTypeId = models.ForeignKey(complaintTypes, on_delete=models.DO_NOTHING, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    location = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'complaint'
