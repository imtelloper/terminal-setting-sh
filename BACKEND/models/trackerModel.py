from datetime import datetime
from typing import Optional
from bson import ObjectId
from pydantic import BaseModel, Field
from models.baseModel import PyObjectId


class Tracker(BaseModel):
    _id = Optional[PyObjectId]
    ip: Optional[str] = Field(default="", description="카메라가 설치된 PC IP")
    area: str = Field(default="", description="카메라가 설치된 구역 이름")
    camPort: str = Field(default="", description="현재 카메라의 번호 -> cam1 | cam2 | cam3 | cam4")
    camName: str = Field(default="", description="카메라 지정 이름")
    computeDevice: str = Field(default="CPU", description="연산장치 선택 -> CPU | GPU")
    savingPath: str = Field(default="", description="현재 카메라의 각종 파일 저장 경로")
    sensingModel: str = Field(default="small", description="AI 감지 모델")
    calibImg: str = Field(..., description="calibration 설정시 보여지는 이미지")
    baseLine: str = Field(default="", description="기준선 x, y 좌표, calibration 설정시 저장. 단위(m).       ex) 123,234,456,234&12.5")
    dangerLine: str = Field(default="", description="위험구간 설정 Yellow Zone, Green Zone 설정. 단위(m)  ex.)3.0&6.5")
    sensingGroup1: Optional[str] = Field(default="", description="감지 그룹 1의 좌표 Green & Yellow(1차 감지) & Red(2차 감지)   ex.) 234,456,123&234,456,123&234,456,123")
    sensingGroup2: Optional[str] = Field(default="", description="감지 그룹 2의 좌표 Green & Yellow(1차 감지) & Red(2차 감지)   ex.) 234,456,123&234,456,123&234,456,123")
    threshold: int = Field(default=40, description="이미지 전역에 전개될 임계치")
    imgSaveSwitch: bool = Field(default=True, description="알람 이미지 저장(안전 알람시 이미지 자동저장 유무)")
    messageSwitch: bool = Field(default=True, description="문자 알람 on/off 설정")
    kakaoSwitch: bool = Field(default=True, description="카카오톡 알람 on/off 설정")
    isObserving: Optional[bool] = Field(default=False, description="관제 PC에서 보고 있다면 true, auto-stream.py에서 작동이 안되도록 해야함 보고 있지 않다면 false, auto-stream 재가동")
    createdAt: Optional[datetime] = datetime.now()

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        scheme_extra = {
            "example": {
                "ip": '192.168.0.255',
                "area": 'H1 공장 크레인',
                "camPort": 'cam1',
                "camName": '크레인 1',
                "computeDevice": 'CPU',
                "savingPath": '/home/interx/',
                "sensingModel": 'small',
                "calibImg": '/home/interx/',
                "baseLine": 3,
                "dangerLine": '3.0&6.5',
                "sensingGroup1": None,
                "sensingGroup2": None,
                "threshold": 70,
                "imgSaveSwitch": False,
                "messageSwitch": False,
                "kakaoSwitch": False,
                "isObserving": False,
            }
        }


# PATCH 전용 모델
class UpdateTracker(BaseModel):
    ip: Optional[str] = None
    area: Optional[str] = None
    camPort: Optional[str] = None
    camName: Optional[str] = None
    computeDevice: Optional[str] = None
    savingPath: Optional[str] = None
    sensingModel: Optional[str] = None
    calibImg: Optional[str] = None
    baseLine: Optional[str] = None
    dangerLine: Optional[str] = None
    sensingGroup1: Optional[str] = None
    sensingGroup2: Optional[str] = None
    threshold: Optional[int] = None
    imgSaveSwitch: Optional[bool] = None
    messageSwitch: Optional[bool] = None
    kakaoSwitch: Optional[bool] = None
    isObserving: Optional[bool] = None

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        scheme_extra = {
            "example": {
                "ip": '192.168.0.255',
                "area": 'H1 공장 크레인',
                "camPort": 'cam1',
                "camName": '크레인 1',
                "computeDevice": 'CPU',
                "savingPath": '/home/interx/',
                "sensingModel": 'small',
                "calibImg": '/home/interx/',
                "baseLine": '',
                "dangerLine": '3.0&6.5',
                "sensingGroup1": None,
                "sensingGroup2": None,
                "threshold": 70,
                "imgSaveSwitch": False,
                "messageSwitch": False,
                "kakaoSwitch": False,
                "isObserving": False,
            }
        }

