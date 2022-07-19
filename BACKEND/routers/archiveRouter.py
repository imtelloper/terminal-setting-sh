from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder
from dtos.archiveDto import ArchiveDto
from models.archiveModel import *
from services.archiveService import *


'''
Change below variables
- APIRouter -> tags
- service
- dto
- dataModel
- updateModel
'''

router = APIRouter(
    tags=['archive'],
    responses={404: {"description": "not found"}, 200: {"description": "ok"}}
)

service = ArchiveService()
dto = ArchiveDto
dataModel = Archive
updateModel = UpdateArchive


@router.post("", response_description="데이터 저장")
async def saveData(data: dataModel = Body(...)):
    """
    데이터 저장

    - **trackerId**: ObjectId
    - **fileType**: video|img
    - **path**: 카메라 녹화 혹은 캡쳐 파일 저장 경로
    - **safetyLevel**: 이미지 캡쳐 시 안전 레벨 기록 - Green|Yellow|Red
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
    jsonData = jsonable_encoder(data)
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
