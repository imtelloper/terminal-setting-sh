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
    # os.system("echo 'hello world!'")
    os.system("pwd")
    # os.system("cd /home/interx/SAFETY-AI/BACKEND/")
    # os.system("pwd")
    # os.system("pip install -r /home/interx/SAFETY-AI/BACKEND/requirements.txt")
    # os.system("gunicorn -k uvicorn.workers.UvicornWorker app:app")
    # os.system("conda activate SAFETY-AI")
    os.system("python /home/interx/SAFETY-AI/BACKEND/main.py")
    portChecking = True
    # break
    # subprocess.call(["pwd"])
    # subprocess.call(["cd", "/home/interx/SAFETY-AI/BACKEND/"])
    # subprocess.call(["pwd"])
    # subprocess.call(["pip", "install", "-r", "requirements.txt"])
    # subprocess.call(["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "app:app"])
