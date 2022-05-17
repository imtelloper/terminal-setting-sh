from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder
from dtos.tempHumidityDto import TempHumidityDto
from models.tempHumidityModel import *
from services.tempHumidityService import *

router = APIRouter(
    tags=['tempHumidity'],
    responses={404: {"description": "not found"}, 200: {"description": "ok"}},
)

service = TempHumidityService()


@router.post("/", response_description="온습도 데이터 저장")
async def saveTempHumidity(tempData: TempHumidity = Body(...)):
    data = jsonable_encoder(tempData)
    resultData = await service.addTempData(data)
    return TempHumidityDto(**resultData)


@router.get("/", response_description="")
async def getAllTempHumidities():
    serviceResult = await service.searchTempHumidities()
    print('serviceResult', serviceResult)
    resultArr = []
    for res in serviceResult:
        resultArr.append(TempHumidityDto(**res))
    return resultArr


@router.get("/{id}", response_description="")
async def getTempHumidity(id):
    serviceResult = await service.searchTempHumidity(id)
    return TempHumidityDto(**serviceResult)


@router.put("/{id}", response_description="")
async def modifyTempHumidity(id, data: TempHumidity = Body(...)):
    data = jsonable_encoder(data)
    serviceResult = await service.updateTempHumidity(id, data)
    return TempHumidityDto(**serviceResult)


@router.delete("/{id}", response_description="")
async def deleteTempHumidity(id):
    serviceResult = await service.removeTempHumidity(id)
    return serviceResult


@router.get("/{start}/{limit}", response_description="")
async def getRangeData(start, limit):
    serviceResult = await service.searchRangeData(int(start), int(limit))
    resultArr = []
    for res in serviceResult:
        resultArr.append(TempHumidityDto(**res))
    return resultArr


@router.get("/count/", response_description="")
async def getCount():
    serviceResult = await service.getDataCount()
    return serviceResult
