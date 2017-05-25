#!/usr/bin/env python
import subprocess as sp
import datetime as dt
import threading
import time
import sys
import json

def pushGitHub():
    diff = sp.check_output(['git', 'diff'])
    if diff:
        date = str(dt.datetime.now())
        sp.call(['git', 'add', '.'])
        sp.call(['git', 'commit', '-m', '"{0}"'.format(date)])
        sp.call(['git', 'push', 'origin', 'master'])
    else:
        print 'No hay diferencias'

def jsonLoad(file):
    aux = ''.join(open(file, 'r').readlines())
    aux = aux.replace(' ', '').replace('\n', '')
    return json.loads(aux)



if __name__ == "__main__":
    args = sys.argv[1:]
    config = jsonLoad("config/deploy/config.json")

    if args[0] == 'autoPush':
        while True:
            pushGitHub()
            time.sleep(2)
    elif args[0] == 'setEnv':
        pass