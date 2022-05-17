from dtos.baseDto import BaseDtoMixin
from typing import Optional


class TempHumidityDto(BaseDtoMixin):
    def __init__(self, **data):
        super().__init__(**data)

    temperature: float = ...
    humidity: Optional[float] = None
    weatherTemp: Optional[float] = None
    weather: Optional[str] = None
    ip: Optional[str] = None
    timeStamp: Optional[str] = None
