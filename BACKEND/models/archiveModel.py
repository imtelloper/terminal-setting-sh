from datetime import datetime
from typing import Optional
from bson import ObjectId
from pydantic import BaseModel, Field
from models.baseModel import PyObjectId
from pytz import timezone


class Archive(BaseModel):
    _id = Optional[PyObjectId]
    trackerId: str = Field(..., description="tracker 해당 추적 카메라 ObjectId ")
    fileType: str = Field(..., description="녹화 파일인지 캡쳐 파일인지 video | img")
    path: str = Field(..., description="카메라 녹화 파일 혹은 캡쳐 파일 저장 경로")
    safetyLevel: Optional[str] = Field(..., description="이미지 캡쳐시 안전 레벨 기록.   GREEN, YELLOW, RED")
    createdAt: Optional[datetime] = datetime.now(timezone('Asia/Seoul'))

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        scheme_extra = {
            "example": {
                "trackerId": '62a171212f95704e30e83744',
                "fileType": 'img',
                "path": 'http://192.168.0.18:81/safety-archives/2022-06-29/H1공장크레인/cam3/capture/safety-shot-H1공장크레인-cam3-2022-06-29_10:47:23.110536.png',
                "safetyLevel": 'YELLOW',
            }
        }


# PATCH 전용 모델
class UpdateArchive(BaseModel):
    trackerId: Optional[str] = None
    fileType: Optional[str] = None
    path: Optional[str] = None
    safetyLevel: Optional[str] = None

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        scheme_extra = {
            "example": {
                "trackerId": '62a171212f95704e30e83744',
                "fileType": 'img',
                "path": 'http://192.168.0.18:81/safety-archives/2022-06-29/H1공장크레인/cam3/capture/safety-shot-H1공장크레인-cam3-2022-06-29_10:47:23.110536.png',
                "safetyLevel": 'YELLOW',
            }
        }



