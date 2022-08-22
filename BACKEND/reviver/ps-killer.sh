#!/usr/bin/zsh

PROGRAM_PORT_WATCHER=port-watcher.py
PROGRAM_BACKEND=main.py

#portWatcherPidCnt=`ps -ef|grep $PROGRAM_PORT_WATCHER|grep -v grep|grep -v vi|wc -l`
#PORT_WATCHER_PID=`ps -ef|grep $PROGRAM_PORT_WATCHER|grep -v grep|grep -v vi|awk '{print $2}'`

portWatcherPidCnt=`ps -ef|grep $PROGRAM_PORT_WATCHER|grep -v grep|wc -l`
PORT_WATCHER_PID=`ps -ef|grep $PROGRAM_PORT_WATCHER|grep -v grep|awk '{print $2}'`

BACKEND_PID=`ps -ef|grep $PROGRAM_BACKEND|grep -v grep|grep -v vi|awk '{print $2}'`

echo '#################################1'
ps -ef|grep $PROGRAM_PORT_WATCHER
echo '#################################2'
ps -ef|grep $PROGRAM_PORT_WATCHER|grep -v grep
echo '#################################3'
ps -ef|grep $PROGRAM_PORT_WATCHER|grep -v grep|awk '{print $2}'
echo '#################################4'
ps -ef|grep $PROGRAM_PORT_WATCHER|grep -v grep|grep -v vi|awk '{print $2}'
echo '#################################5'

echo port-watcher process count: $portWatcherPidCnt
echo $PROGRAM_PORT_WATCHER running on $PORT_WATCHER_PID
echo BACKEND $PROGRAM_BACKEND running on $BACKEND_PID


if [ $portWatcherPidCnt -gt 0 ]
then
  echo 'port is running'
  sudo service cron stop
  sudo service crond stop
  sudo kill -9 $PORT_WATCHER_PID $BACKEND_PID
  sudo fuser -k 8000/tcp
  sudo kill -9 $(sudo lsof -t -i:8000)
  sudo sh /home/interx/SAFETY-AI/BACKEND/reviver/auto-stream-killer.sh
  ps aux | grep python
fi