from datetime import datetime
from typing import Optional
from bson import ObjectId
from pydantic import BaseModel, Field
from models.baseModel import PyObjectId


class ControlTowerModel(BaseModel):
    _id = Optional[PyObjectId]
    ip: str = Field(..., description="관제pc만의 ip를 등록하기 위함")
    username: str = Field(..., description="관제pc username")
    password: str = Field(..., description="관제pc password")

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        scheme_extra = {
            "example": {
                "ip": "",
                "username": "",
                "password": "",
            }
        }


class UpdateControlTowerModel(BaseModel):
    ip: Optional[str] = None
    username: Optional[str] = None
    password: Optional[str] = None

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        scheme_extra = {
            "example": {
                "ip": "",
                "username": "",
                "password": "",
            }
        }






