from fastapi import APIRouter, Body
import warnings
from starlette.responses import StreamingResponse
from services.streamService import StreamService
import cv2
import time
import traceback
import numpy as np
from modules.calculate import calculate_human
from modules.yolov5.detect import detect
import os
import config
from database.mongoDB import *
from dtos.observeDto import ObserveDto
from fastapi.encoders import jsonable_encoder
import socket

warnings.filterwarnings('ignore')

router = APIRouter(
    tags=['stream'],
    responses={404: {"description": "not found"}, 200: {"description": "ok"}},
)

service = StreamService()


def isInternetConnected() -> bool:
    ethernetIp = socket.gethostbyname(socket.gethostname())
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    wifiIp = s.getsockname()[0]
    s.close()

    if ethernetIp == wifiIp:
        print('Internet is not connected')
        return False
    else:
        print('Internet connected ')
        return True


@router.get("/", response_description="")
async def streamVideo():
    if isInternetConnected():
        await service.addTodayCamData()
    service.setCameraOff()
    service.setCameraOn()
    return StreamingResponse(service.video_streaming(), media_type="multipart/x-mixed-replace; boundary=frame")


@router.get("/on", response_description="")
async def streamVideoOn():
    service.setCameraOn()
    return service.cameraOnOff


@router.get("/off", response_description="")
async def streamVideoOff():
    service.setCameraOff()
    return service.cameraOnOff


@router.get("/area/{coordinate1}", response_description="")
async def streamVideoAreaSet(coordinate1):
    if isInternetConnected():
        await service.addTodayCamData()
    data = coordinate1.split(',')
    coordinates = [[]]
    coordiList = []
    for val in data:
        coordiList.append(int(val))
        if (len(coordiList) > 1):
            coordinates[0].append(tuple(coordiList))
            coordiList = []

    print('streamVideoAreaSet 2data :', coordinates)
    return StreamingResponse(service.video_streaming(coordinates),
                             media_type="multipart/x-mixed-replace; boundary=frame")


@router.get("/area/{coordinate1}/{coordinate2}", response_description="")
async def streamVideoAreaSet(coordinate1, coordinate2):
    if isInternetConnected():
        await service.addTodayCamData()
    data1 = coordinate1.split(',')
    data2 = coordinate2.split(',')
    coordinates1 = [[]]
    coordinates2 = [[]]
    coordiList1 = []
    coordiList2 = []

    for val in data1:
        coordiList1.append(int(val))
        if (len(coordiList1) > 1):
            coordinates1[0].append(tuple(coordiList1))
            coordiList1 = []

    for val in data2:
        coordiList2.append(int(val))
        if (len(coordiList2) > 1):
            coordinates2[0].append(tuple(coordiList2))
            coordiList2 = []

    print('streamVideoAreaSet 2data :', coordinates1)
    print('streamVideoAreaSet 2data :', coordinates2)
    return StreamingResponse(service.video_streaming(coordinates1, coordinates2),
                             media_type="multipart/x-mixed-replace; boundary=frame")


@router.get("/area/{coordinate1}/{coordinate2}/{coordinate3}/{coordinate4}", response_description="")
async def streamVideoAreaSet(coordinate1, coordinate2, coordinate3, coordinate4):
    await service.addTodayCamData()
    data1 = coordinate1.split(',')
    data2 = coordinate2.split(',')
    data3 = coordinate3.split(',')
    data4 = coordinate4.split(',')
    coordinates1 = [[], []]
    coordinates2 = [[], []]
    coordiList1 = []
    coordiList2 = []
    coordiList3 = []
    coordiList4 = []

    for val in data1:
        coordiList1.append(int(val))
        if (len(coordiList1) > 1):
            coordinates1[0].append(tuple(coordiList1))
            coordiList1 = []

    for val in data2:
        coordiList2.append(int(val))
        if (len(coordiList2) > 1):
            coordinates2[0].append(tuple(coordiList2))
            coordiList2 = []

    for val in data3:
        coordiList3.append(int(val))
        if (len(coordiList3) > 1):
            coordinates1[1].append(tuple(coordiList3))
            coordiList3 = []

    for val in data4:
        coordiList4.append(int(val))
        if (len(coordiList4) > 1):
            coordinates2[1].append(tuple(coordiList4))
            coordiList4 = []

    print('streamVideoAreaSet 2data :', coordinates1)
    print('streamVideoAreaSet 2data :', coordinates2)
    return StreamingResponse(service.video_streaming(coordinates1, coordinates2),
                             media_type="multipart/x-mixed-replace; boundary=frame")
