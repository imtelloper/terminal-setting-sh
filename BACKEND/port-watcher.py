import socket
import subprocess
import time
import os

print("### Port watcher is running ###")
portChecking = False

while True:
  time.sleep(5)
  sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
  result = sock.connect_ex(('127.0.0.1', 8000)) # ip, port

  # if portChecking == False :
  if result == 0:
    print('portChecking : ', portChecking)
    print("Port is Open")
    portChecking = False
  else:
    print("")
    print('portChecking : ', portChecking)
    print("Port is not Open")
    os.system("pwd")
    os.system("python /home/interx/SAFETY-AI/BACKEND/main.py")
    portChecking = True