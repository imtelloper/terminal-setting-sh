from typing import Optional
from dtos.baseDto import BaseDtoMixin


class ArchiveDto(BaseDtoMixin):
    def __init__(self, **data):
        super().__init__(**data)

    trackerId: str = ...
    fileType: str = ...
    path: str = ...
    safetyLevel: Optional[str] = None




