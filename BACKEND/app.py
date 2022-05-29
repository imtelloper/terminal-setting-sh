import glob
from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from buzzer import *
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
import minimalmodbus as minimalmodbus
import serial



# load_dotenv(dotenv_path=f".{os.getenv('DOT_ENV', 'test')}.env")
# logging.config.fileConfig("logging.conf", disable_existing_loggers=False)
logger = logging.getLogger(__name__)

print('app start')



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


# try:
#     print('########## ser start')
#     ser = serial.Serial("/dev/ttyS0", 9600)   #specify your port and braudrate
#     print('ser :',ser)
#     data = ser.read()                         #read byte from serial device
#     print('0')
#     print(data)                               #display the read byte
# except Exception as e:
#     print(e)
# print('ser END')
# print('$port : ', glob.glob('/dev/ttyS0'))
# s = serial.Serial(glob.glob('/dev/ttyS0')[0])
# print('sssssssss : ', s)
# ser_stx = chr(0x02)
# ser_etx = chr(0x03)
# ser_on = chr(0x31)
# ser_off = chr(0x30)
# line = ''
# port = '/dev/ttyS0'
# baud = 9600
# open_serial = serial.Serial(port, baud, timeout = 1)
# def serial_send_on(opend_ser):
#     strcmd = ser_stx + ser_on + ser_etx
#     print('send data = ON[' + strcmd + ']')
#     opend_ser.write(strcmd.encode())
#
# def serial_send_off(opend_ser):
#     strcmd = ser_stx + ser_off + ser_etx
#     print('send data = OFF[' + strcmd + ']')
#     opend_ser.write(strcmd.encode())
#
# serial_send_on(open_serial)
# serial_send_off(open_serial)
# red_buzzer()
#
#
# try:
#     print('########## minimalmodbus start')
#     instrument = minimalmodbus.Instrument("/dev/ttyS0", 1, 'rtu')
#     instrument.serial.baudrate = 9600  # Baud
#     # instrument.serial.bytesize = 8
#     # instrument.serial.parity = serial.PARITY_NONE
#     # instrument.serial.stopbits = 1
#     # instrument.serial.timeout = 1  # seconds
#     # temperature = instrument.read_register(0, 2, functioncode=int('0x04', 16))
#     print('instrument : ',instrument)
# except Exception as e:
#     print(e)



# instrument = minimalmodbus.Instrument('/dev/ttyUSB0', 1, minimalmodbus.MODE_ASCII)
# print('instrument : ',instrument)

# instrument = minimalmodbus.Instrument("/dev/tty.usbserial-AQ00WOQH", 1, 'rtu')
# print('instrument : ',instrument)

# instrument = minimalmodbus.Instrument('/dev/ttyUSB2', 1, minimalmodbus.MODE_ASCII)
# print('instrument : ',instrument)

# instrument = minimalmodbus.Instrument('/dev/ttyUSB3', 1, minimalmodbus.MODE_ASCII)
# print('instrument : ',instrument)

# instrument = minimalmodbus.Instrument('/dev/ttyUSB4', 1, minimalmodbus.MODE_ASCII)
# print('instrument : ',instrument)


# instrument.serial.baudrate = 9600  # Baud
# instrument.serial.bytesize = 8
# instrument.serial.parity = serial.PARITY_NONE
# instrument.serial.stopbits = 1
# instrument.serial.timeout = 1  # seconds
# temperature = instrument.read_register(0, 2, functioncode=int('0x04', 16))
# humidity = instrument.read_register(1, 2, functioncode=int('0x04', 16))

def serial_ports():
    print('#############################################')
    print('serial_ports')
    if sys.platform.startswith('win'):
        print('window')
        ports = ['COM%s' % (i + 1) for i in range(256)]
    elif sys.platform.startswith('linux') or sys.platform.startswith('cygwin'):
        # this excludes your current terminal "/dev/tty"
        print('linux')
        ports = glob.glob('/dev/ttyU[A-Za-z]*')
    elif sys.platform.startswith('darwin'):
        print('darwin')
        ports = glob.glob('/dev/tty.*')
    else:
        raise EnvironmentError('Unsupported platform')

    result = []
    print('ports :',ports)
    for port in ports:
        try:
            print('port : ',port)
            s = serial.Serial(port)

            s.close()
            result.append(port)
        except (OSError, serial.SerialException):
            pass

    print('result :',result)
    return result

# serial_ports()

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
