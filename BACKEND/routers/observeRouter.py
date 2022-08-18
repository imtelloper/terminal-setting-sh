from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder
from dtos.observeDto import ObserveDto
from models.observeModel import *
from services.observeService import *

'''
Change below variables
- APIRouter -> tags
- service
- dto
'''

router = APIRouter(
    tags=['observe'],
    responses={404: {"description": "not found"}, 200: {"description": "ok"}}
)

service = ObserveService()

dto = ObserveDto


@router.post("", response_description="")
async def saveData(data: Observe = Body(...)):
    """
    데이터 저장

    - **trackerId**: ObjectId
    - **date**: 날짜 (형식 -> yyyy-mm-dd)
    - **groupNum**: 그룹 번호 (1차/2차)
    - **safetyLevel**: 감지 구역의 현재 안전 레벨 -> Green|Yellow|Red
    - **yellowCnt**: 해당 감지 그룹에서 Yellow 카메라 감지 시 +1
    - **redCnt**: 해당 감지 그룹에서 Red 카메라 감지 시 +1
    - **observeSwitch**: 현재 안전펜스 작동 중 -> true|false
    - **observeTime**: observeSwitch가 false면 초기화 true 되었을 때 시간 기록
    - **createdAt**: 생성 시간
    """
    jsonData = jsonable_encoder(data)
    resultData = await service.addOneData(jsonData)
    return dto(**resultData)


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
    Json 데이터로 검색

    - body example ->  **{ "date": "2022-06-22" }**
    """
    print('findData', data)

    # if "trackerId" in data:
    #     data["trackerId"] = ObjectId(data["trackerId"])
    #     print("this will execute")
    # print('findData', data)

    jsonData = jsonable_encoder(data)
    if "trackerId" in jsonData:
        jsonData["trackerId"] = ObjectId(jsonData["trackerId"])
    serviceResult = await service.searchDatas(jsonData)
    resultArr = []
    for res in serviceResult:
        resultArr.append(dto(**res))
    return resultArr


@router.patch("/{id}", response_description="")
async def modifyOneData(id, data: UpdateObserve = Body(...)):
    """
    id로 데이터 수정
    """
    print('🍄🍄🍄🍄 id', id)
    print('🍄🍄🍄🍄 data', data)
    jsonData = jsonable_encoder(data)
    print('🍄🍄🍄🍄 jsonData', jsonData)
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
    serviceResult = await service.getDataCount({})
    return serviceResult
