from datetime import datetime
from typing import Optional

__all__ = [
    "NewUser",
    "Token",
    "TokenData"
]

from pydantic import BaseModel


class NewUser(BaseModel):
    email: str
    pw: str
    createdAt: datetime = datetime.now()

    class Config:
        schema_extra = {
            "example": {
                "email": "h91oon@gmail.com",
                "pw": "pw1234!"
            }
        }


# type fixed
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None
