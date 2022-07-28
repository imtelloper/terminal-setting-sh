from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder
from dtos.trackerDto import TrackerDto
from models.trackerModel import *
from services.trackerService import TrackerService

'''
Change below variables
- APIRouter -> tags
- service =
- dto =
- dataModel =
- updateModel =
'''

router = APIRouter(
    tags=['tracker'],
    responses={404: {"description": "not found"}, 200: {"description": "ok"}}
)

service = TrackerService()

dto = TrackerDto
dataModel = Tracker
updateModel = UpdateTracker


@router.post("", response_description="데이터 저장")
async def saveData(data: dataModel = Body(...)):
    """
    데이터 저장

    - **_id**: _id
    - **createdAt**: 생성 날짜
    - **area**: (고정) 카메라 설치 구역 이름
    - **camPort**: (고정) 현재 카메라 번호 -> cam1|cam2|cam3|cam4
    - **camName**: 카메라 지정 이름
    - **computeDevice**: 연산 장치 선택 -> CPU|GPU
    - **savingPath**: 현재 카메라의 각종 파일 저장 경로(root path)
    - **sensingModel**: AI 감지 모델
    - **calibImg**: calibration 설정 시 보여지는 이미지
    - **baseLine**: 기준선 x,y 좌표(단위: m), calibration 설정 시 저장
    - **dangerLine**: 위험 구간 설정 Yellow Zone, Green Zone 설정 (단위: m)
    - **sensingGroup1**: 감지 그룹 1의 좌표 Green & Yellow(1차 감지) & Red(2차 감지)     ex.) 234,456,123&234,456,123&234,456,123
    - *8sensingGroup2**: 감지 그룹 2의 좌표 Green & Yellow(1차 감지) & Red(2차 감지)     ex.) 234,456,123&234,456,123&234,456,123
    - **threshold**: 이미지 전역에 전개될 임계정
    - **imgSaveSwitch**: 알람 이미지 저장(안전 알람 시 이미지 자동 저장 유무)
    - **messageSwitch**: 문자 알림 on/off 설정
    - **kakaoSwitch**: 카카오톡 알람 on/off 설
    """
    print('tracker saveData data', data)
    jsonData = jsonable_encoder(data)
    print('tracker saveData jsonData', jsonData)
    resultData = await service.addOneData(jsonData)
    return dto(**resultData)


@router.get("", description = "")
async def getAllDatas():
    """
    모든 데이터 검색
    """
    serviceResult = await service.getAllDatas()
    resultArr = []
    for idx in serviceResult:
        resultArr.append(dto(**idx))
    return resultArr


@router.get("/{id}", response_description="")
async def getOneData(id):
    """
    id로 데이터 검색
    """
    serviceResult = await service.getDataOne(id)
    return dto(**serviceResult)


@router.post("/find", response_description="")
async def findData(data=Body(...)):
    """
    Json데이터로 찾아서 가져오기

    - body example -> **{ "date": "2022-06-22" }**
    """
    jsonData = jsonable_encoder(data)
    print('jsonData',jsonData)
    serviceResult = await service.searchDatas(jsonData)
    resultArr = []
    for res in serviceResult:
        resultArr.append(dto(**res))
    return resultArr


@router.patch("/{id}", response_description="")
async def modifyOneData(id, data: updateModel = Body(...)):
    """
    id로 데이터 수정
    """
    jsonData = jsonable_encoder(data)
    serviceResult = await service.updateOneData(id, jsonData)
    return dto(**serviceResult)


@router.delete("/{id}", response_description="")
async def deleteOneData(id):
    """
     id로 데이터 삭제
    """
    serviceResult = await service.removeOneData(id)
    return serviceResult


@router.get("/{start}/{limit}", response_description="")
async def getRangeData(start, limit):
    """
    시작 인덱스(start)와 가져올 개수(limit)로 데이터 검색
    """
    serviceResult = await service.searchRangeData(int(start), int(limit))
    resultArr = []
    for res in serviceResult:
        resultArr.append(dto(**res))
    return resultArr


@router.get("/count/", response_description="")
async def getCount():
    """
    데이터 개수 출력
    """
    serviceResult = await service.getDataCount()
    return serviceResult
