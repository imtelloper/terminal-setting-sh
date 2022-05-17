from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.mongoDB import *
from routers.tempHumidityRouter import router as TempHumidityRouter
from routers.utilRouter import router as UtilRouter
from dotenv import load_dotenv
from pathlib import Path
import os
import logging
import logging.config
import cv2

# load_dotenv(dotenv_path=f".{os.getenv('DOT_ENV', 'test')}.env")
# logging.config.fileConfig("logging.conf", disable_existing_loggers=False)
logger = logging.getLogger(__name__)

print('app start')


def list_ports():
    """
    Test the ports and returns a tuple with the available ports and the ones that are working.
    """
    non_working_ports = []
    dev_port = 0
    working_ports = []
    available_ports = []
    while len(non_working_ports) < 6: # if there are more than 5 non working ports stop the testing.
        camera = cv2.VideoCapture(dev_port)
        if not camera.isOpened():
            non_working_ports.append(dev_port)
            print("Port %s is not working." %dev_port)
        else:
            is_reading, img = camera.read()
            w = camera.get(3)
            h = camera.get(4)
            if is_reading:
                print("Port %s is working and reads images (%s x %s)" %(dev_port,h,w))
                working_ports.append(dev_port)
            else:
                print("Port %s for camera ( %s x %s) is present but does not reads." %(dev_port,h,w))
                available_ports.append(dev_port)
        dev_port +=1
    return available_ports,working_ports,non_working_ports

# list_ports()

# capture = cv2.VideoCapture(0 + cv2.CAP_DSHOW)
try:
    # capture = cv2.VideoCapture(0)
    # capture = cv2.VideoCapture(0, cv2.CAP_AVFOUNDATION)
    capture = cv2.VideoCapture(0, 400)
    # capture = cv2.VideoCapture(0, cv2.CAP_XIAPI)
    # capture = cv2.VideoCapture(0, cv2.CAP_DSHOW)
    # capture = cv2.VideoCapture(0, cv2.CAP_ANY)
    # capture = cv2.VideoCapture(0, cv2.CAP_V4L)
    # capture = cv2.VideoCapture(0, cv2.CAP_V4L2)
    # capture = cv2.VideoCapture(0, cv2.CAP_OPENNI)
    # capture = cv2.VideoCapture(0, cv2.CAP_MSMF)
    # capture = cv2.VideoCapture(0, cv2.CAP_GSTREAMER)
    # capture = cv2.VideoCapture(0, cv2.CAP_FFMPEG)
    # capture = cv2.VideoCapture(0, cv2.CAP_OPENCV_MJPEG)
except IOError:
    print('IOError : ',IOError)
except Exception:
    print('Exception : ',Exception)
except EOFError:
    print('EOFError : ',EOFError)
except EnvironmentError:
    print('EnvironmentError : ',EnvironmentError)


print('capture: '+str(capture))
# capture1 = cv2.VideoCapture(1)
# print('capture1: '+str(capture1))
# capture2 = cv2.VideoCapture(2)
# print('capture2: '+str(capture2))
# capture3 = cv2.VideoCapture(3)
# print('capture3: '+str(capture3))
# capture4 = cv2.VideoCapture(4)
# print('capture4: '+str(capture4))
# capture5 = cv2.VideoCapture(5)
# print('capture4: '+str(capture5))
# capture6 = cv2.VideoCapture(6)
# print('capture4: '+str(capture6))
# capture7 = cv2.VideoCapture(7)
# print('capture4: '+str(capture7))
# capture8 = cv2.VideoCapture(8)
# print('apture4: '+str(capture8))
# capture9 = cv2.VideoCapture(9)
# print('capture4: '+str(capture9))
capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)


while cv2.waitKey(33) < 0 :
    ret, frame = capture.read()
    print('ret: ', ret)
    print('frame: ', frame)
    # cv2.imshow("VideoFrame", frame)

capture.release()
cv2.destroyAllWindows()


def createApp() -> FastAPI:
    app = FastAPI()
    return app


app = createApp()

# origins = [
#     "http://localhost",
#     "http://localhost:8080",
# ]

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# routers
app.include_router(TempHumidityRouter, prefix="/api/temperature-humidity")
app.include_router(UtilRouter, prefix="/api/util")


@app.on_event("startup")
async def onAppStart():
    await connectMongo()


@app.on_event("shutdown")
async def onAppShutdown():
    await disconnectMongo()
