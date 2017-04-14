#!/usr/bin/env python
import os
import subprocess
import datetime as dt

def pushGitHub():
    diff = subprocess.check_output(['git', 'diff'])
    if diff:
        date = str(dt.datetime.now())
        os.system('git add .')
        os.system('git commit -m "{0}"'.format(date))
        os.system('git push origin master')
    else:
        print 'No hay diferencias'

pushGitHub()