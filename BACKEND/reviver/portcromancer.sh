#!/usr/bin/zsh

PROGRAM_PORT_WATCHER=port-watcher.py
PROGRAM_BACKEND=main.py

#portWatcherPidCnt=`ps -ef|grep $PROGRAM_PORT_WATCHER|grep -v grep|grep -v vi|wc -l`
#PORT_WATCHER_PID=`ps -ef|grep $PROGRAM_PORT_WATCHER|grep -v grep|grep -v vi|awk '{print $2}'`

portWatcherPidCnt=`ps -ef|grep $PROGRAM_PORT_WATCHER|grep -v grep|wc -l`
PORT_WATCHER_PID=`ps -ef|grep $PROGRAM_PORT_WATCHER|grep -v grep|awk '{print $2}'`

BACKEND_PID=`ps -ef|grep $PROGRAM_BACKEND|grep -v grep|grep -v vi|awk '{print $2}'`

echo $portWatcherPidCnt
echo $PROGRAM_PORT_WATCHER running on $PORT_WATCHER_PID
echo BACKEND $PROGRAM_BACKEND running on $BACKEND_PID

if [ $portWatcherPidCnt -gt 0 ]
then
  echo 'port is running'
else
  echo 'port is dead'
  kill -9 $PORT_WATCHER_PID $BACKEND_PID
  fuser -k 8000/tcp
  ps aux | grep python
  python /home/interx/SAFETY-AI/BACKEND/reviver/port-watcher.py
fi