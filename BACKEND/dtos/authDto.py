from typing import Optional
from dtos.baseDto import BaseDtoMixin

__all__ = ['UsersDto']

class UsersDto(BaseDtoMixin):
    def __init__(self, **data):
        super().__init__(**data)

    email: str = ...
    pw: str = ...
    disabled: Optional[bool] = False