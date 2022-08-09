from datetime import datetime
from typing import Optional
from bson import ObjectId
from pydantic import BaseModel, Field
from models.baseModel import PyObjectId


class Observe(BaseModel):
    _id = Optional[PyObjectId]
    trackerId: str = Field(..., description="area, camPort로 setting objectID 조회 -> objectID로 기록 조회")
    date: str = Field(..., description="날짜 -> yyyy-mm-dd 형식")
    groupNum: int = Field(..., description="1 -> group1, 2 -> group2")
    safetyLevel: str = Field(...,
                             description="감지 구역의 현재 안전 레벨 -> Green | Yellow | Red, "
                                         "알람 메세지(yellow, red 감지 될때마다 업뎃) -> 없음 | 작업자 진입 확인 | 작업자 위험 반경 진입")
    yellowCnt: Optional[int] = Field(..., description="해당 감지 그룹에서 YELLO 카메라 감지 됐을때 +1")
    redCnt: Optional[int] = Field(..., description="해당 감지 그룹에서 RED 카메라 감지 됐을때 +1")
    observeSwitch: bool = Field(..., description="현재 안전펜스 작동중 -> true | false")
    observeTime: str = Field(..., description="observeSwitch가 false면 초기화 true가 되었을때 시간 기록")
    createdAt: Optional[datetime] = datetime.now()

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        scheme_extra = {
            "example": {
                "trackerId": '62a2a2072cbaf74db79fdde9',
                "date": '2022-07-07',
                "groupNum": 1,
                "safetyLevel": 'Green',
                "yellowCnt": 8,
                "redCnt": 9,
                "observeSwitch": True,
                "observeTime": '',
            }
        }


# PATCH 전용 모델
class UpdateObserve(BaseModel):
    trackerId: Optional[str] = None
    date: Optional[str] = None
    groupNum: Optional[int] = None
    safetyLevel: Optional[str] = None
    yellowCnt: Optional[int] = None
    redCnt: Optional[int] = None
    observeSwitch: Optional[bool] = None
    observeTime: Optional[str] = None

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "trackerId": '62a2a2072cbaf74db79fdde9',
                "date": '2022-07-07',
                "groupNum": 1,
                "safetyLevel": 'Green',
                "yellowCnt": 8,
                "redCnt": 9,
                "observeSwitch": True,
                "observeTime": '',
            }
        }
