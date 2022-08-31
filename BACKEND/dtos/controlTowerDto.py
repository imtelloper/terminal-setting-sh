from typing import Optional
from dtos.baseDto import BaseDtoMixin


class ControlTowerDto(BaseDtoMixin):
    def __init__(self, **data):
        super().__init__(**data)

    ip: str = ...
    username: str = ...
    password: str = ...




