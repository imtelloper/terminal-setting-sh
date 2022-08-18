import socket
import subprocess
from subprocess import check_output
import time
import os
import sys
import daemon
from daemon import pidfile
from daemon import runner
import argparse


def checkProcess(name):
    output = []
    cmd = "ps -aef | grep -i '%s' | grep -v 'grep' | awk '{ print $2 }' > /tmp/out"
    os.system(cmd % name)
    with open('/tmp/out', 'r') as f:
        line = f.readline()
        while line:
            output.append(line.strip())
            line = f.readline()
            if line.strip():
                output.append(line.strip())

    return output


def runPortChecker():
    print("### RUN PORT CHECKER ###")
    print("### AUTO STREAM WATCHER IS RUNNING ###")
    while True:
        # 5초마다 localhost 8000포트가 돌아가고 있는지 확인
        time.sleep(5)
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        result = sock.connect_ex(('127.0.0.1', 8000))  # ip, port

        getPid = checkProcess('auto-stream.py')
        print('checkProcess..', checkProcess('auto-stream.py'))

        # 포트가 돌아가고 있고 auto-stream이 실행되고 있지 않으면
        # auto-stream 실행(프론트에서 요청하지 않아도 침입자 감지를 위한 스크립트)
        if result == 0 and len(getPid) == 0:
            print("Port is Open")
            os.system("python /home/interx/SAFETY-AI/BACKEND/reviver/auto-stream.py")
        # 8000포트가 돌아가고 있지 않으면 auto-stream도 종료
        else:
            print("Port is not Open")
            os.system("kill -9 `pgrep -f auto-stream.py`")


def doTask():
    print("### DO TASK ###")
    # new session create
    os.setsid()
    os.open("/dev/null", os.O_RDWR)
    os.dup(0)
    os.dup(0)

    runPortChecker()


def runDaemon():
    print("### RUN DAEMON ###")
    print("sys.path : ", sys.path)
    try:
        pid = os.fork()

        if pid > 0:
            print("#1")
            print('PID: %d' % pid)
            print("#2")
            sys.exit()
            print("#3")

    except OSError as error:
        print("#4")
        print('Unable to fork. Error: %d (%s)' % (error.errno, error.strerror))
        print("#5")
        sys.exit()

    print("#6")

    try:
        print("#7")
        doTask()
    except EnvironmentError as error:
        print("#8")
        print('#EnvironmentError: ', error)

    print("#9")


if __name__ == '__main__':
    runDaemon()