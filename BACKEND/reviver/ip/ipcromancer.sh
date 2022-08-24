#!/usr/bin/zsh

PROGRAM_BACKEND=main.py
PROGRAM_IP_WATCHER=ip-watcher.py

BACKEND_PID=`ps -ef|grep $PROGRAM_BACKEND|grep -v grep|grep -v vi|awk '{print $2}'`
IP_WATCHER_PID=`ps -ef|grep $PROGRAM_IP_WATCHER|grep -v grep|awk '{print $2}'`
DEVICE_IP=`hostname -I | grep '192' |  awk '{print $1}'`

if [ -z $DEVICE_IP ]
then
  echo 'ip null'
  kill -9 $IP_WATCHER_PID $BACKEND_PID
  python /home/interx/SAFETY-AI/BACKEND/reviver/ip-watcher.py
else
  echo 'ip' $DEVICE_IP
fi