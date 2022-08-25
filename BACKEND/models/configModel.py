from datetime import datetime
from typing import Optional
from bson import ObjectId
from pydantic import BaseModel, Field
from models.baseModel import PyObjectId


class Config(BaseModel):
    _id = Optional[PyObjectId]
    trackerId: str = Field(..., description="tracker 해당 추적 카메라 ObjectId ")
    camRestartCnt: int = Field(..., description="카메라 재시작 횟수 기록")

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        scheme_extra = {
            "example": {
                "trackerId": '62a171212f95704e30e83744',
                "camRestartCnt": 0,
            }
        }


# PATCH 전용 모델
class UpdateConfig(BaseModel):
    trackerId: str = Field(..., description="tracker 해당 추적 카메라 ObjectId ")
    camRestartCnt: Optional[int] = None

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "trackerId": '62a171212f95704e30e83744',
                "camRestartCnt": '0',
            }
        }
