from typing import Optional
from dtos.baseDto import BaseDtoMixin


class ConfigDto(BaseDtoMixin):
    def __init__(self, **data):
        super().__init__(**data)

    trackerId: str = ...
    camRestartCnt: Optional[int] = None

