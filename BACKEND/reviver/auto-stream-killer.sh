#!/usr/bin/zsh

PROGRAM_AUTO_STREAM=auto-stream.py
PROGRAM_PORT_WATCHER=auto-stream-watcher.py

portWatcherPidCnt=`ps -ef|grep $PROGRAM_PORT_WATCHER|grep -v grep|wc -l`
PORT_WATCHER_PID=`ps -ef|grep $PROGRAM_PORT_WATCHER|grep -v grep|awk '{print $2}'`
AUTO_STREAM_PID=`ps -ef|grep $PROGRAM_AUTO_STREAM|grep -v grep|awk '{print $2}'`

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
echo $PROGRAM_AUTO_STREAM running on $AUTO_STREAM_PID

if [ $portWatcherPidCnt -gt 0 ]
then
  echo 'port is running'
  sudo service cron stop
  sudo service crond stop
  sudo kill -9 $PORT_WATCHER_PID $AUTO_STREAM_PID
  ps -ef | grep auto-stream
fi