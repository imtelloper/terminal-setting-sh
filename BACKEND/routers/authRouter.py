from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordRequestForm

from dtos.authDto import UsersDto
from models.authModel import NewUser, Token
from services.authService import *

router = APIRouter(tags=['users'])

userService = UserService()

@router.post("/signUp", status_code=status.HTTP_201_CREATED)
async def signUp(newUser: NewUser):
    """
    회원가입 API

    - **email**: 아이디(이메일)
    - **pw**: 비밀번호
    """
    hashPw = bcrypt.hashpw(newUser.pw.encode("utf-8"), bcrypt.gensalt())
    newUser = jsonable_encoder(newUser)
    newUser['pw'] = hashPw
    userResult = await userService.addUser(newUser)
    return UsersDto(**userResult)

# 로그인 할때 쓰는 api
@router.post("/token", response_model=Token)
async def login(formData: OAuth2PasswordRequestForm = Depends()):
    """
    로그인 API

    - **grant_type**:
    - **email**: 아이디(이메일)
    - **pw**: 비밀번호
    - **scope**:
    - **client_id**:
    - **client_secret**:
    """
# async def login(formData:NewUser):
    email = formData.username
    pw = formData.password
    flag = await userService.authenticate(email, pw)
    if flag:

        accessToken = userService.createAccessToken(
            data={"sub": email}, expiresDelta = timedelta(minutes=300) # 추후에 minutes dotenv에 추가하여 사용
        )
        return {"access_token": accessToken, "token_type": "bearer"}
    raise HTTPException(status_code=400, detail="do not creating token")

@router.get("/detail")
async def userDetail(currentUser: NewUser = Depends(userService.getCurrentUser)):
    """
    사용자 상세 정보
    """
    print('userDetail currentUser : ', currentUser)
    return UsersDto(**currentUser)

