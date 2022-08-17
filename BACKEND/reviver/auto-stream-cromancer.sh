#!/usr/bin/zsh
echo '### AUTO STREAM CROMANCER IS RUNNING ###'
PROGRAM_PORT_WATCHER=auto-stream-watcher.py
PROGRAM_AUTO_STREAM=auto-stream.py

portWatcherPidCnt=`ps -ef|grep $PROGRAM_PORT_WATCHER|grep -v grep|wc -l`
PORT_WATCHER_PID=`ps -ef|grep $PROGRAM_PORT_WATCHER|grep -v grep|awk '{print $2}'`

autoStreamPidCnt=`ps -ef|grep $PROGRAM_AUTO_STREAM|grep -v grep|wc -l`
AUTO_STREAM_PID=`ps -ef|grep $PROGRAM_AUTO_STREAM|grep -v grep|awk '{print $2}'`

echo $portWatcherPidCnt
echo $PROGRAM_PORT_WATCHER running on $PORT_WATCHER_PID

if [ $portWatcherPidCnt -gt 0 ]
then
  echo 'auto-stream-watcher.py port is running'
  if [ $autoStreamPidCnt -gt 0 ]
  then
    echo 'pass'
  else
    echo 'auto-stream.py is dead'
    echo 'RUN AUTO STEAM WATCHER'
    kill -9 $PORT_WATCHER_PID
    kill -9 $AUTO_STREAM_PID
    ps aux | grep python
    python /home/interx/SAFETY-AI/BACKEND/reviver/auto-stream-watcher.py
  fi
else
  echo 'auto-stream-watcher.py port is dead'
  echo 'RUN AUTO STEAM WATCHER'
  kill -9 $PORT_WATCHER_PID
  kill -9 `pgrep -f auto-stream.py`
  ps aux | grep python
  echo '### DO PYTHON AUTO STEAM WATCHER .PY ###'
  python /home/interx/SAFETY-AI/BACKEND/reviver/auto-stream-watcher.py
fi