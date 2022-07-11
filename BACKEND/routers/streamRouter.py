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


# 인터넷이 연결되어 있는지 확인
def isInternetConnected(host="8.8.8.8", port=53, timeout=3) -> bool:
    """
    Host: 8.8.8.8 (google-public-dns-a.google.com)
    OpenPort: 53/tcp
    Service: domain (DNS/TCP)
    """
    try:
        socket.setdefaulttimeout(timeout)
        socket.socket(socket.AF_INET, socket.SOCK_STREAM).connect((host, port))
        print('Internet connected ')
        return True
    except socket.error as ex:
        print('Internet is not connected')
        print(ex)
        return False


# query string 값으로부터 좌표 설정
def setCoordinates(coordinate, coordinates, groupIdx):
    data = coordinate.split(',')
    coordiList = []

    for val in data:
        coordiList.append(int(val))
        if (len(coordiList) > 1):
            coordinates[groupIdx - 1].append(tuple(coordiList))
            coordiList = []


# 기본 사람 감지 영상 출력
@router.get("/", response_description="")
async def streamVideo():
    print('isInternetConnected :', isInternetConnected)
    if isInternetConnected():
        await service.getTrackerId()
    service.setCameraOff()
    service.setCameraOn()
    return StreamingResponse(service.video_streaming(), media_type="multipart/x-mixed-replace; boundary=frame")


@router.get("/test", response_description="")
async def test():
    # return await service.test()
    # return await service.isTodayObserveExist(2)
    # return await service.insertVideoRecordPath('62c796f09715acf6931d4e6b', '/home')
    if isInternetConnected():
        await service.getTrackerId()
        observeChk = await service.isTodayObserveExist(1)
        print('observeChk', observeChk)
        await service.addTodayCamData(observeChk, 1)
        return observeChk


# 스크린샷 캡쳐
@router.get("/capture", response_description="")
async def screenCapture():
    return service.setCaptureGateOpen()


# 녹화 시작
@router.get("/record-on", response_description="")
async def videoRecordOn():
    serviceResult = service.setRecordGateOpen()
    trackerId = await service.getTrackerId()
    videoPath = service.getVideoRecordPath()
    print('trackerId : ', trackerId)
    print('videoPath : ', videoPath)
    await service.insertVideoRecordPath(trackerId, videoPath)
    return serviceResult


# 녹화 중지
@router.get("/record-off", response_description="")
async def videoRecordOff():
    return service.setRecordGateClose()


# 첫번째 그룹 좌표 설정
@router.get("/area/{groupNum}/{coordinate1}/{coordinate2}/", response_description="")
async def streamVideoFirstAreaSet(groupNum, coordinate1, coordinate2):
    print('groupNum     ', groupNum)
    print('coordinate1     ', coordinate1)
    print('coordinate2     ', coordinate2)
    if isInternetConnected():
        await service.getTrackerId()
        observeChk = await service.isTodayObserveExist(int(groupNum))
        await service.addTodayCamData(observeChk, int(groupNum))
    coordinates1 = [[]]
    coordinates2 = [[]]
    setCoordinates(coordinate1, coordinates1, 1)
    setCoordinates(coordinate2, coordinates2, 1)
    print('streamVideoAreaSet 2data :', coordinates1)
    print('streamVideoAreaSet 2data :', coordinates2)
    return StreamingResponse(service.video_streaming(coordinates1, coordinates2),
                             media_type="multipart/x-mixed-replace; boundary=frame")


# 두번째 그룹 좌표 설정
@router.get("/area/{groupNum}/{coordinate1}/{coordinate2}/{coordinate3}/{coordinate4}", response_description="")
async def streamVideoSecondAreaSet(groupNum, coordinate1, coordinate2, coordinate3, coordinate4):
    print('2차 감지 groupNum     ', groupNum)
    print('2차 감지 coordinate1     ', coordinate1)
    print('2차 감지 coordinate2     ', coordinate2)
    print('2차 감지 coordinate3     ', coordinate3)
    print('2차 감지 coordinate4     ', coordinate4)
    if isInternetConnected():
        await service.getTrackerId()
        observeChk = await service.isTodayObserveExist(int(groupNum))
        await service.addTodayCamData(observeChk, int(groupNum))

    coordinates1 = [[], []]
    coordinates2 = [[], []]

    setCoordinates(coordinate1, coordinates1, 1)
    setCoordinates(coordinate2, coordinates2, 1)
    setCoordinates(coordinate3, coordinates1, 2)
    setCoordinates(coordinate4, coordinates2, 2)

    print('streamVideoAreaSet 2data :', coordinates1)
    print('streamVideoAreaSet 2data :', coordinates2)
    return StreamingResponse(service.video_streaming(coordinates1, coordinates2),
                             media_type="multipart/x-mixed-replace; boundary=frame")
