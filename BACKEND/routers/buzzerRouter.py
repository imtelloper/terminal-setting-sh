from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from services.buzzerService import BuzzerService

'''
Change below variables
- APIRouter -> tags
- service =
- dto =
- dataModel =
- updateModel = 
'''

router = APIRouter(
    tags=['buzzer'],
    responses={404: {"description": "not found"}, 200: {"description": "ok"}}
)

service = BuzzerService()


@router.get("/on", response_description="경광등 turn on")
async def buzzerOn():
    """
    경광등이 울립니다.
    """
    return await service.serialSendOn()


@router.get("/off", response_description="경광등 turn off")
async def buzzerOff():
    """
    경광등이 꺼집니다.
    """
    return await service.serialSendOff()
