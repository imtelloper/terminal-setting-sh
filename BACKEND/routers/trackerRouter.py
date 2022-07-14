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
    print('tracker saveData data', data)
    jsonData = jsonable_encoder(data)
    print('tracker saveData jsonData', jsonData)
    resultData = await service.addOneData(jsonData)
    return dto(**resultData)


@router.get("", description = "모든 데이터 가져오기")
async def getAllDatas():
    serviceResult = await service.getAllDatas()
    resultArr = []
    for idx in serviceResult:
        resultArr.append(dto(**idx))
    return resultArr


@router.get("/{id}", response_description="id로 데이터 가져오기")
async def getOneData(id):
    serviceResult = await service.getDataOne(id)
    return dto(**serviceResult)


@router.post("/find", response_description='Json데이터로 찾아서 가져오기 body example -> { "date": "2022-06-22" } ')
async def findData(data=Body(...)):
    jsonData = jsonable_encoder(data)
    serviceResult = await service.searchDatas(jsonData)
    resultArr = []
    for res in serviceResult:
        resultArr.append(dto(**res))
    return resultArr


@router.patch("/{id}", response_description="id로 데이터 수정하기")
async def modifyOneData(id, data: updateModel = Body(...)):
    jsonData = jsonable_encoder(data)
    serviceResult = await service.updateOneData(id, jsonData)
    return dto(**serviceResult)


@router.delete("/{id}", response_description="id로 데이터 삭제하기")
async def deleteOneData(id):
    serviceResult = await service.removeOneData(id)
    return serviceResult


@router.get("/{start}/{limit}", response_description="시작 인덱스(start)와 가져올 갯수(limit)로 데이터들 가져오기")
async def getRangeData(start, limit):
    serviceResult = await service.searchRangeData(int(start), int(limit))
    resultArr = []
    for res in serviceResult:
        resultArr.append(dto(**res))
    return resultArr


@router.get("/count/", response_description="데이터 갯수 가져오기")
async def getCount():
    serviceResult = await service.getDataCount()
    return serviceResult
