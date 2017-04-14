#!/usr/bin/env python
import os
import datetime as dt

def pushGitHub():
    date = str(dt.datetime.now())
    os.system('git add .')
    os.system('git commit -m "{0}"'.format(date))
    os.system('git push origin master')

pushGitHub()