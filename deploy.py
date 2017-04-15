#!/usr/bin/env python
import subprocess as sp
import datetime as dt

def pushGitHub():
    diff = sp.check_output(['git', 'diff'])
    if diff:
        date = str(dt.datetime.now())
        sp.call(['git', 'add', '.'])
        sp.call(['git', 'commit', '-m', '"{0}"'.format(date)])
        sp.call(['git', 'push', 'origin', 'master'])
    else:
        print 'No hay diferencias'

pushGitHub()
