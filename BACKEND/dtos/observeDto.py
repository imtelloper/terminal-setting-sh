from typing import Optional
from dtos.baseDto import BaseDtoMixin
from datetime import datetime
from pydantic import Field


class ObserveDto(BaseDtoMixin):
    def __init__(self, **data):
        super().__init__(**data)

    trackerId: str = ...
    date: str = ...
    groupNum: int = ...
    safetyLevel: str = ...
    yellowCnt: Optional[int] = None
    redCnt: Optional[int] = None
    observeSwitch: bool = ...
    observeTime: Optional[datetime] = Field(alias="createdAt")
