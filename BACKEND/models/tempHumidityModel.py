from datetime import datetime
from typing import Optional
from bson import ObjectId
from pydantic import BaseModel, Field
from models.baseModel import PyObjectId


class TempHumidity(BaseModel):
    _id = Optional[PyObjectId]
    temperature: float = Field(..., gt=-50, description="The price must be greater than -50")
    humidity: Optional[float] = Field(..., description="")
    weatherTemp: Optional[float] = Field(...)
    weather: Optional[str] = Field(...)
    ip: Optional[str] = Field(...)
    timeStamp: datetime = datetime.now()
    createdAt: Optional[datetime] = datetime.now()

    class Config:
        arbitrary_types_allowed = True
        # arbitrary_types_allowed = False
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
               "temperature": 36.5,
               "humidity": 30,
               "weatherTemp": 27.5,
               "weather": "sunny",
               "ip": "0.0.0.0",
            }
        }
