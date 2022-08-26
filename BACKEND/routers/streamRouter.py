from fastapi import APIRouter, Body
import warnings
from starlette.responses import StreamingResponse
from services.streamService import StreamService
import cv2
import time
import traceback
import numpy as np
from modules.yolov5.detect import detect
import os
import config
from database.mongoDB import *
from dtos.observeDto import ObserveDto
from fastapi.encoders import jsonable_encoder
import socket
from netifaces import interfaces, ifaddresses, AF_INET


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
    # try:
    #     socket.setdefaulttimeout(timeout)
    #     socket.socket(socket.AF_INET, socket.SOCK_STREAM).connect((host, port))
    #     print('Internet connected ')
    #     return True
    # except socket.error as ex:
    #     print('Internet is not connected')
    #     print(ex)
    #     return False
    ipList = []
    for interface in interfaces():
        try:
            for link in ifaddresses(interface)[AF_INET]:
                ipList.append(link['addr'])
        except Exception as e:
            print(e)

    try:
        deviceIp = list(filter(lambda x: x[0:3] == '192', ipList))[0]
        print('Internet connected ')
        return True
    except Exception as e:
        print('Internet is not connected')
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
    """
     사람 감지 영상 출력
    """
    print('isInternetConnected :', isInternetConnected)
    if isInternetConnected():
        await service.getTrackerId()
        await service.getCamRestartCnt()
    service.setCameraOff()
    service.setCameraOn()
    return StreamingResponse(service.video_streaming(), media_type="multipart/x-mixed-replace; boundary=frame")


@router.get("/test", response_description="")
async def test():
    """
    테스트

    - 그룹 별 하루 동안의 감지 정보 출력 (yellow, red 영역 감지 횟수)
    """
    # return await service.test()
    # return await service.isTodayObserveExist(2)
    # return await service.insertVideoRecordPath('62c796f09715acf6931d4e6b', '/home')
    service.setCameraOff()
    # service.setCameraOn()
    return 'cameraInit'
    # if isInternetConnected():
    #     await service.getTrackerId()
    #     observeChk = await service.isTodayObserveExist(1)
    #     print('observeChk', observeChk)
    #     print('observeChk type ', type(observeChk))
    #     if type(observeChk) == dict:
    #         print('hi')
    #     await service.addTodayCamData(observeChk, 1)
    #     return observeChk


# 스크린샷 캡쳐
@router.get("/capture", response_description="")
async def screenCapture():
    """
    스크린샷 캡쳐
    """
    return service.setCaptureGateOpen()

# 칼리브레이션 이미지 캡쳐
@router.get("/calib-capture", response_description="")
async def screenCapture():
    """
    Calibration 설정을 위한 스크린샷 캡쳐
    """
    await service.setCalibCaptureGateOpen()
    imgPath = service.getScreenShotRecordPath
    return imgPath


# 감지 중 날짜가 다음날로 넘어 갔을때 safetyLevel, observeSwitch 값들은 이월 시켜 줘야 한다.
# 오늘 날짜의 observe data 추가
@router.get("/add-observe-data/{groupNum}", response_description="")
async def addObserveData(groupNum):
    if isInternetConnected():
        await service.getTrackerId()
        observeChk = await service.isTodayObserveExist(int(groupNum))
        await service.addTodayCamData(observeChk, int(groupNum))
    return observeChk


# 그룹 삭제했을때 카운트 초기화하기
@router.get("/init-count/{groupNum}", response_description="")
async def initGroupSensingCnt(groupNum):
    service.setGroupCnt(int(groupNum))
    return 'success'


# 녹화 시작
@router.get("/record-on", response_description="")
async def videoRecordOn():
    """
    녹화 시작

    - **Response body** -> true : 영상 녹화 시작
    - **Response body** -> false : 영상 녹화 종료
    --------------------------------------------
    - **trackerId**: ObjectID
    - **videoPath**: 영상 저장 경로
    """
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
    """
    녹화 중지

    - **Response body** -> true : 영상 녹화 시작
    - **Response body** -> false : 영상 녹화 종료
    """
    return service.setRecordGateClose()


# 첫번째 그룹 좌표 설정
@router.get("/area/{groupNum}/{coordinate1}/{coordinate2}/", response_description="")
async def streamVideoFirstAreaSet(groupNum, coordinate1, coordinate2):
    """
    첫번째 그룹 좌표 설정

    - **groupNum**: 그룹 번호 (1차/2차)
    - **coordinate1**: 1차 그룹 yellow 좌표
    - **coordinate2**: 1차 그룹 red 좌표
    """
    print("🥞🥞🥞1🥞🥞🥞1streamVideoFirstAreaSet🥞🥞🥞1🥞🥞🥞")
    service.setCameraOff()
    service.setCameraOn()
    print('groupNum     ', groupNum)
    print('coordinate1     ', coordinate1)
    print('coordinate2     ', coordinate2)
    if isInternetConnected():
        await service.getTrackerId()
        observeChk = await service.isTodayObserveExist(int(groupNum))
        print('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ observeChk: ',observeChk)
        await service.addTodayCamData(observeChk, int(groupNum))

    coordinates1 = [[], []]

    setCoordinates(coordinate1, coordinates1, 1)
    setCoordinates(coordinate2, coordinates1, 2)

    print('streamVideoAreaSet 2data :', coordinates1)
    return StreamingResponse(service.video_streaming(coordinates1),
                             media_type="multipart/x-mixed-replace; boundary=frame")


# 두번째 그룹 좌표 설정
# coordinate1 : 1차 그룹 yellow 좌표
# coordinate2 : 1차 그룹 red 좌표
@router.get("/area/{groupNum}/{coordinate1}/{coordinate2}/{coordinate3}/{coordinate4}", response_description="")
async def streamVideoSecondAreaSet(groupNum, coordinate1, coordinate2, coordinate3, coordinate4):
    """
    두번째 그룹 좌표 설정

    - **groupNum**: 그룹 번호 (1차/2차)
    - **coordinate1**: 1차 그룹 yellow 좌표
    - **coordinate2**: 1차 그룹 red 좌표표
    - **coordinate3**: 2차 그룹 yellow 좌표
    - **coordinate4**: 2차 그룹 red 좌표
    """
    print("🥞🥞🥞2🥞🥞🥞2streamVideoSecondAreaSet🥞🥞🥞2🥞🥞🥞")
    service.setCameraOff()
    service.setCameraOn()
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
    setCoordinates(coordinate2, coordinates1, 2)
    setCoordinates(coordinate3, coordinates2, 1)
    setCoordinates(coordinate4, coordinates2, 2)

    print('streamVideoAreaSet 2data :', coordinates1)
    print('streamVideoAreaSet 2data :', coordinates2)
    return StreamingResponse(service.video_streaming(coordinates1, coordinates2),
                             media_type="multipart/x-mixed-replace; boundary=frame")
