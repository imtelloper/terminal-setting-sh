import glob
import platform
from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.mongoDB import *
from routers.utilRouter import router as UtilRouter
from routers.streamRouter import router as StreamRouter
from routers.authRouter import router as AuthRouter
from routers.observeRouter import router as ObserveRouter
from routers.archiveRouter import router as ArchiveRouter
from routers.trackerRouter import router as TrackerRouter
from dotenv import load_dotenv
from pathlib import Path
import os
import logging
import logging.config
import cv2
import traceback
import warnings
import datetime
from fastapi.responses import FileResponse

warnings.filterwarnings('ignore')
from modules.yolov5.detect import detect
from modules.calculate import *
import speech_recognition as sr
from gtts import gTTS
import os
import time
import playsound
import minimalmodbus as minimalmodbus
import serial
import socket
from services.streamService import StreamService

# load_dotenv(dotenv_path=f".{os.getenv('DOT_ENV', 'test')}.env")
# logging.config.fileConfig("logging.conf", disable_existing_loggers=False)
logger = logging.getLogger(__name__)

print('app start')

platform.system()
print(platform.system())
print(platform.system())
print(platform.system())
print(platform.system())
print(platform.system())
print(platform.system())
print(platform.platform())
print(platform.platform())
print(platform.platform())
# def speak(text):
#     tts = gTTS(text=text, lang='ko')
#     filename = 'voice.mp3'
#     tts.save(filename)
#     playsound.playsound(filename)
#
# speak("안녕하세요 호호호")

# s = gTTS("Sample Text")
# s.save('sample.mp3')
# playsound('sample.mp3')

def createApp() -> FastAPI:
    app = FastAPI()
    return app


app = createApp()

# origins = [
#     "http://localhost",
#     "http://127.0.0.1",
# "http://localhost:8080",
# ]

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/{saveFolder}/{dateFolder}/{areaFolder}/{camPortFolder}/{fileTypeFolder}/{file}")
async def main(saveFolder, dateFolder, areaFolder, camPortFolder, fileTypeFolder, file):
    return FileResponse(
        "/home/interx/SAFETY-AI/BACKEND/{0}/{1}/{2}/{3}/{4}/{5}".format(saveFolder, dateFolder, areaFolder,
                                                                        camPortFolder, fileTypeFolder, file))

@app.get("/")
async def greeting():
    return 'hi'


# routers
app.include_router(UtilRouter, prefix="/api/util")
app.include_router(StreamRouter, prefix="/api/stream")
app.include_router(AuthRouter, prefix="/api/auth")
app.include_router(ObserveRouter, prefix="/api/observe")
app.include_router(ArchiveRouter, prefix="/api/archive")
app.include_router(TrackerRouter, prefix="/api/tracker")


@app.on_event("startup")
async def onAppStart():
    await connectMongo()


@app.on_event("shutdown")
async def onAppShutdown():
    await disconnectMongo()
