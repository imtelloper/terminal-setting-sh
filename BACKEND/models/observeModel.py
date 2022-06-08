from datetime import datetime
from typing import Optional
from bson import ObjectId
from pydantic import BaseModel, Field
from models.baseModel import PyObjectId


class Observe(BaseModel):
    _id = Optional[PyObjectId]
    area: str = Field(..., description="카메라가 설치된 구역")
    camPort: str = Field(..., description="cam1 | cam2 | cam3 | cam4")
    activate: bool = Field(..., description="카메라 작동중 true | false")
    alarms: str = Field(..., description="없음 | 작업자 진입 확인 | 작업자 위험 반경 진입!")
    date: str = Field(..., description="날짜")
    computeDevice: str = Field(..., description="cpu, gpu 둘중 연산장치 선택")
    savingPath: str = Field(..., description="현재 카메라의 각종 파일 저장위치")
    camName: str = Field(..., description="카메라 지정 이름")
    sensingModel: str = Field(..., description="AI 감지 모델")
    camCoordinate1: str = Field(..., description="1차 감지 구역의 좌표")
    camCoordinate2: str = Field(..., description="2차 감지 구역의 좌표")
    camSafetyLevel1: str = Field(..., description="1차 감지 구역의 현재 안전 레벨")
    camSafetyLevel2: str = Field(..., description="2차 감지 구역의 현재 안전 레벨")
    camSensing1: Optional[int] = Field(..., description="1차 감지 구역에서 카메라 감지 됐을때 +1")
    camSensing2: Optional[int] = Field(..., description="2차 감지 구역에서 카메라 감지 됐을때 +1")
    createdAt: Optional[datetime] = datetime.now()

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        scheme_extra = {
            "example": {
                "area": 'H3 공장 크레인',
                "camPort": 'cam1',
                "activate": True,
                "alarms": '없음',
                "date": '2022-06-03',
                "computeDevice": 'cpu',
                "savingPath": '/home/',
                "camName": '3크레인 구역1',
                "sensingModel": 'small',
                "camCoordinate1": '456,307,658,329,536,486,332,469',
                "camCoordinate2": '456,307,658,329,536,486,332,469',
                "camSafetyLevel1": 'Green',
                "camSafetyLevel2": 'Yellow',
                "camSensing1": 5,
                "camSensing2": 1,
            }
        }

