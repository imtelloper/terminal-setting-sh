import socket
import subprocess
import time
import os
import sys
import daemon
from daemon import pidfile
from daemon import runner
import argparse


def runPortChecker():
    print("### Port watcher is running ###")
    while True:
        # 5초마다 localhost 8000포트가 돌아가고 있는지 확인
        time.sleep(5)
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        result = sock.connect_ex(('127.0.0.1', 8000))  # ip, port

        # 포트가 돌아가고 있으면 그냥 패스
        if result == 0:
            print("Port is Open")
        # 포트가 돌아가고 있지 않으면 main.py 실행
        else:
            print("Port is not Open")
            # backend 8000 port가 안돌아가고 있으면 실행시킴.
            os.system("pwd")
            os.system("python /home/interx/SAFETY-AI/BACKEND/reviver/safety-log.py &")
            os.system("python /home/interx/SAFETY-AI/BACKEND/main.py")


def doTask():
    # new session create
    os.setsid()
    os.open("/dev/null", os.O_RDWR)
    os.dup(0)
    os.dup(0)

    runPortChecker()


def runDaemon():
    try:
        pid = os.fork()

        if pid > 0:
            print('PID: %d' % pid)
            sys.exit()

    except OSError as error:
        print('Unable to fork. Error: %d (%s)' % (error.errno, error.strerror))
        sys.exit()

    doTask()


if __name__ == '__main__':
    runDaemon()
