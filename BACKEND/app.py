import glob
from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.mongoDB import *
from routers.tempHumidityRouter import router as TempHumidityRouter
from routers.utilRouter import router as UtilRouter
from routers.streamRouter import router as StreamRouter
from routers.authRouter import router as AuthRouter
from routers.observeRouter import router as ObserveRouter
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

# @app.get("/image/{path}")
# async def main():
#     return FileResponse("./safety-archives/2022-06-28/H1공장크레인/cam1/capture/safety-shot#H1공장크레인#cam1#2022-06-28_13:50:46.913461.png")

@app.get("/{saveFolder}/{dateFolder}/{areaFolder}/{camPortFolder}/{fileTypeFolder}/{file}")
async def main(saveFolder, dateFolder, areaFolder, camPortFolder, fileTypeFolder, file):
    # print('path :',path)
    # if len(path) > 0:
    #     print('버터 플라이 ')
    print('saveFolder : ',saveFolder)
    print('dateFolder : ',dateFolder)
    print('areaFolder : ',areaFolder)
    print('camPortFolder : ',camPortFolder)
    print('fileTypeFolder : ',fileTypeFolder)
    print('file : ',file)

    return FileResponse("./{0}/{1}/{2}/{3}/{4}/{5}".format(saveFolder, dateFolder, areaFolder, camPortFolder, fileTypeFolder, file))


# routers
app.include_router(TempHumidityRouter, prefix="/api/temperature-humidity")
app.include_router(UtilRouter, prefix="/api/util")
app.include_router(StreamRouter, prefix="/api/stream")
app.include_router(AuthRouter, prefix="/api/auth")
app.include_router(ObserveRouter, prefix="/api/observe")


@app.on_event("startup")
async def onAppStart():
    await connectMongo()


@app.on_event("shutdown")
async def onAppShutdown():
    await disconnectMongo()