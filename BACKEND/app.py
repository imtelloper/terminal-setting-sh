from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.mongoDB import *
from routers.tempHumidityRouter import router as TempHumidityRouter
from routers.utilRouter import router as UtilRouter
from routers.streamRouter import router as StreamRouter
from routers.authRouter import router as AuthRouter
from dotenv import load_dotenv
from pathlib import Path
import os
import logging
import logging.config
import cv2

import traceback
import warnings
warnings.filterwarnings( 'ignore' )
from modules.yolov5.detect import detect
from modules.calculate import *
import speech_recognition as sr
from gtts import gTTS
import os
import time
import playsound


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

def yoloDetectStart(portNum):
    # W: 256 H: 192
    capture = cv2.VideoCapture(portNum)
    capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
    # 사용자 설정
    pt = "modules/yolov5/weights/2_small.pt"
    device_mode = ""
    conf = 0.7
    # 전역 변수
    # color
    GREEN = (0,255,0)
    RED = (255,0,0)
    BLUE = (0,0,255)
    img_color = False
    setting_signal = False
    rois_history = [] # rois history
    rois = [] # polygon 영역
    sub_rois = [] # 다중 polygon을 위한 리스트
    rois_signal = False # polygon 영역지정 신호
    btn_rois_signal = 0 # 영역지정 버튼 신호
    btn_run_signal = 0 # 실행 버튼 신호
    yolo_cnt = 0
    cnt = 0 # 트랙킹시 사라진 객체를 프레임수마다 카운팅
    track_signal = False # 트랙킹 신호 True면 트랙킹한다
    buzzer_cnt = 0 # 경고음 카운트
    red_signal = False
    green_signal = True
    unit_num = 9 # 사람 영역 분할 계수
    # tracking api 호출
    multi_tracker = cv2.MultiTracker_create()

    while cv2.waitKey(33) < 0 :
        ret, frame = capture.read()
        img = frame.copy()
        if ret:
            humans = []
            try:
                if cnt == 0:
                    print('pt : ', pt)
                    print('device_mode : ', device_mode)
                    print('conf : ', conf)
                    # print('img : ', img)
                    humans = detect(weights=pt, device=device_mode, conf_thres=conf, source=img)
                    print('humans : ', humans)
                    multi_tracker.__init__()
                    track_signal = False
                    cnt += 1
                elif cnt > 0 and cnt < 3:
                    cnt += 1
                else:
                    cnt = 0
                if humans:
                    # detection
                    for bbox in humans:
                        x1, y1, x2, y2 = tuple([int(_) for _ in bbox])
                        w, h = x2 - x1, y2 - y1
                        track_bbox = (x1, y1, w, h)
                        # tracking signal
                        multi_tracker.add(cv2.TrackerCSRT_create(), img, track_bbox)
                        track_signal = True
                        warn_sig, result_img = calculate_human(img, x1, y1, x2, y2, w, h, unit_num, rois)
                else:
                    print("tracking")
                    if track_signal:
                        ret, t_bboxes = multi_tracker.update(img)
                        if ret:
                            for i, t_bbox in enumerate(t_bboxes):
                                x1, y1, w, h = tuple([int(_) for _ in t_bbox])
                                x2, y2 = x1 + w, y1 + h
                                warn_sig, result_img = calculate_human(img, x1, y1, x2, y2, w, h, unit_num, rois)
                cv2.imshow("VideoFrame", result_img)
            except Exception as e:
                print('예외가 발생했습니다.', e)
                print(traceback.format_exc())
    capture.release()
    cv2.destroyAllWindows()


# def speak(text):
#     tts = gTTS(text=text, lang='ko')
#
#     filename = 'voice.mp3'
#
#     tts.save(filename)
#
#     playsound.playsound(filename)
#
#
# speak("안녕하세요 호호호")


# s = gTTS("Sample Text")
# s.save('sample.mp3')
# playsound('sample.mp3')
#

# yoloDetectStart(1)


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

# routers
app.include_router(TempHumidityRouter, prefix="/api/temperature-humidity")
app.include_router(UtilRouter, prefix="/api/util")
app.include_router(StreamRouter, prefix="/api/stream")
app.include_router(AuthRouter, prefix="/api/auth")


@app.on_event("startup")
async def onAppStart():
    await connectMongo()


@app.on_event("shutdown")
async def onAppShutdown():
    await disconnectMongo()
