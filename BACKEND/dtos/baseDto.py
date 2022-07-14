from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field


class BaseDtoMixin(BaseModel):
    def __init__(self, **data):
        if "_id" in data:
            data["createdAt"] = data["_id"].generation_time
            data["_id"] = str(data["_id"])

            if "trackerId" in data:
                data["trackerId"] = str(data["trackerId"])

            if "observeTime" in data:
                data["observeTime"] = str(data["observeTime"])

        super().__init__(**data)

    id: Optional[str] = Field(alias="_id")
    createdAt: Optional[datetime] = Field(alias="createdAt")

    class Config:
        allow_population_by_field_name = True

