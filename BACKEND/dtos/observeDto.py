from typing import Optional
from dtos.baseDto import BaseDtoMixin


class ObserveDto(BaseDtoMixin):
    def __init__(self, **data):
        super().__init__(**data)

    area: str = ...
    camPort: str = ...
    activate: bool = ...
    alarms: str = ...
    date: str = ...
    computeDevice: Optional[str] = None
    savingPath: Optional[str] = None
    camName: Optional[str] = None
    sensingModel: Optional[str] = None
    camCoordinate1: Optional[str] = None
    camCoordinate2: Optional[str] = None
    camSafetyLevel: Optional[str] = None
    camSensing1: Optional[int] = None
    camSensing2: Optional[int] = None