import json
import os

from fastapi import APIRouter, Body
from fastapi.responses import JSONResponse
import minimalmodbus as minimalmodbus
import serial
import cv2
import config
import socket

router = APIRouter(
    tags=['util'],
    responses={404: {"description": "not found"}, 200: {"description": "ok"}},
)

@router.get("/echoTest")
async def echoTest():
    """
    시스템 재실행
    """
    os.system("echo ECHO ECHO ECHO")
    return "echo"

@router.get("/reboot/")
async def reboot():
    """
    시스템 재실행
    """
    os.system("echo reboot")
    os.system("sudo reboot")
    return "reboot"


@router.get("/autoStreamOn")
async def autoStreamOn():
    """
    autoStream.py 실행
    """
    os.system("echo autoStream on!!")
    # os.system("screen -S autoStream")
    # os.system("screen -x autoStreeam")
    os.system("echo hi")
    os.system("sudo sh /home/interx/SAFETY-AI/BACKEND/reviver/auto-stream-killer.sh")
    os.system("nohup python /home/interx/SAFETY-AI/BACKEND/reviver/autoStream.py &")
    return "autoStreamOn"


@router.get("/autoStreamOff")
async def autoStreamOff():
    """
    autoStream.py 종료
    """
    os.system("sudo sh /home/interx/SAFETY-AI/BACKEND/reviver/auto-stream-killer.sh")
    return "autoStreamOff"


@router.get("/", response_description="")
async def getRtu():
    instrument = minimalmodbus.Instrument("COM3", 1, 'rtu')
    instrument.serial.baudrate = 9600  # Baud
    instrument.serial.bytesize = 8
    instrument.serial.parity = serial.PARITY_NONE
    instrument.serial.stopbits = 1
    instrument.serial.timeout = 1  # seconds

    try:
        temperature = instrument.read_register(0, 2, functioncode=int('0x04', 16))
        humidity = instrument.read_register(1, 2, functioncode=int('0x04', 16))
        tempHumidity = {'temperature': temperature, 'humidity':humidity}
        return JSONResponse(tempHumidity)
    except IOError:
        print("Failed to read from instrument")
    return "RTU"


@router.get("/camera", response_description="")
async def getRtu():
    instrument = minimalmodbus.Instrument("COM3", 1, 'rtu')
    instrument.serial.baudrate = 9600  # Baud
    instrument.serial.bytesize = 8
    instrument.serial.parity = serial.PARITY_NONE
    instrument.serial.stopbits = 1
    instrument.serial.timeout = 1  # seconds

    try:
        temperature = instrument.read_register(0, 2, functioncode=int('0x04', 16))
        humidity = instrument.read_register(1, 2, functioncode=int('0x04', 16))
        tempHumidity = {'temperature': temperature, 'humidity':humidity}
        return JSONResponse(tempHumidity)
    except IOError:
        print("Failed to read from instrument")
    return "RTU"

@router.get("/info", response_description="")
async def getInfo():
    """
    연결 정보

    - **ip**: 현재 IP 주소
    - **camPort**: 연결 카메라
    - **area**: 설치 공간
    """
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.connect(("pwnbit.kr", 443))
        ip = sock.getsockname()[0]
        obj = {
            'ip': ip,
            'camPort': config.CAMPORT,
            'area': config.AREA,
        }
        return JSONResponse(obj)
    except IOError:
        print("Failed to get info")
    return "get info error"


