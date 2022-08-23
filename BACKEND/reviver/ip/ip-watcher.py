import socket
import subprocess
import time
import os
import sys
import daemon
from daemon import pidfile
from daemon import runner
import argparse


def ip4Addresses():
    ipList = []
    for interface in interfaces():
        try:
            for link in ifaddresses(interface)[AF_INET]:
                ipList.append(link['addr'])
        except Exception as e:
            print(e)
    return ipList


def runIpChecker():
    print("### IP watcher is running ###")
    while True:
        time.sleep(5)
        deviceIpList = list(filter(lambda x: x[0:3] == '192', ip4Addresses()))
        if len(deviceIpList) != 0:
            deviceIp = deviceIpList[0]
            print('IP watcher: deviceIp: ', deviceIp)
        else:
            print('IP watcher: deviceIp: None')
            for i in range(0, 3):
                os.system("sh /home/interx/SAFETY-AI/BACKEND/reviver/auto-stream-killer.sh")
                os.system("sh /home/interx/SAFETY-AI/BACKEND/reviver/ps-killer.sh")
            os.system("python /home/interx/SAFETY-AI/BACKEND/main.py")

def doTask():
    # new session create
    os.setsid()
    os.open("/dev/null", os.O_RDWR)
    os.dup(0)
    os.dup(0)

    runIpChecker()


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