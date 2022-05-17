from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field


class BaseDtoMixin(BaseModel):
    def __init__(self, **data):
        if "_id" in data:
            data["createdAt"] = data["_id"].generation_time
            data["_id"] = str(data["_id"])
        super().__init__(**data)

    id: Optional[str] = Field(alias="_id")
    createdAt: Optional[datetime] = Field(alias="createdAt")

    class Config:
        allow_population_by_field_name = True

