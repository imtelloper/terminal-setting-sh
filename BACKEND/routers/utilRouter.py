import json

from fastapi import APIRouter, Body
from fastapi.responses import JSONResponse
import minimalmodbus as minimalmodbus
import serial
import cv2

router = APIRouter(
    tags=['util'],
    responses={404: {"description": "not found"}, 200: {"description": "ok"}},
)

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