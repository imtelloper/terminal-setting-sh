from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder
from dtos.configDto import ConfigDto
from services.configService import *
from models.configModel import *
import datetime
from datetime import *

'''
Change below variables
- APIRouter -> tags
- service
- dto
- dataModel
- updateModel
'''

router = APIRouter(
    tags=['config'],
    responses={404: {"description": "not found"}, 200: {"description": "ok"}}
)

service = ConfigService()
dto = ConfigDto
dataModel = Config
updateModel = UpdateConfig

@router.post("", response_description="데이터 저장")
async def saveData(data: dataModel = Body(...)):
    """
    데이터 저장

    - **trackerId**: Tracker ObjectId
    - **camRestartCnt**: 카메라 재시작 횟수 ( <=3 )
    """
    jsonData = jsonable_encoder(data)
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
    Json 데이터로 검색

    - body example ->  **{ "date": "2022-06-22" }**
    """
    jsonData = jsonable_encoder(data)
    if "trackerId" in jsonData:
        jsonData["trackerId"] = ObjectId(jsonData["trackerId"])
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