# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-05-24 14:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0006_news_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='complaint',
            name='date',
            field=models.DateField(auto_now=True, null=True),
        ),
    ]