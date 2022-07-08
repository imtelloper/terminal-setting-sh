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

@router.get("/reboot/", response_description="")
async def reboot():
    os.system("echo reboot")
    os.system("sudo reboot")
    return "reboot"

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


