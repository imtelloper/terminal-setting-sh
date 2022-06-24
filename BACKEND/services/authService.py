import os
from datetime import timedelta, datetime

import bcrypt as bcrypt
from dotenv import load_dotenv
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from starlette import status
from jose import jwt, JWTError

import config
from models.authModel import TokenData
from repo.baseRepo import insertOne, findOne, find

load_dotenv(verbose=True)
JWT_SECRET = os.getenv('JWT_SECRET')
JWT_ALGORITHM = os.getenv('JWT_ALGORITHM')
TOKEN_URL = os.getenv('TOKEN_URL')
print('TOKEN_URLTOKEN_URLTOKEN_URL : ', TOKEN_URL)
oauth2Scheme = OAuth2PasswordBearer(tokenUrl=TOKEN_URL)
# print('oauth2Scheme : ', oauth2Scheme.scheme_name)
# print('oauth2Scheme : ', oauth2Scheme.model)
dbName = config.DB_NAME
collection = config.TABLE_USERS

class UserService:
    # 회원가입
    async def addUser(self, userData: dict) -> dict:
        user = await insertOne(
            dbName,
            collection,
            userData
        )
        newUser = await findOne(
            dbName,
            collection,
            {"_id": user.inserted_id}
        )
        return newUser

    async def searchUsers(self):
        users = []
        async for user in find(dbName, collection):
            users.append(user)
        return users

    async def searchUser(self, email: str) -> dict:
        user = await findOne(
            dbName,
            collection,
            {"email": email}
        )
        if user:
            return user

    def createAccessToken(self, data: dict, expiresDelta: timedelta):
        print('createAccessToken data : ', data)
        print('createAccessToken expiresDelta data : ', expiresDelta)
        toEncode = data.copy()
        print('createAccessToken toEncode : ', toEncode)
        expire = datetime.utcnow() + expiresDelta
        print('createAccessToken expire : ', expire)
        toEncode.update({"exp": expire})
        print('createAccessToken JWT_SECRET : ', JWT_SECRET)
        print('createAccessToken JWT_ALGORITHM : ', JWT_ALGORITHM)
        encodedJwt = jwt.encode(toEncode, JWT_SECRET, algorithm=JWT_ALGORITHM)
        print('createAccessToken encodedJwt : ', encodedJwt)
        return encodedJwt

    # 비밀번호 확인
    def verifyPw(self, plainPw: str, hashedPw):

        return bcrypt.checkpw(plainPw.encode('utf-8'), hashedPw)

    # 인증
    async def authenticate(self, email, pw):
        try:
            print('authenticate email',email)
            print('authenticate pw',pw)
            user = await self.searchUser(email)
            print('authenticate user', user)
            pwCheck = self.verifyPw(pw, user['pw'])
            print('authenticate pwCheck', pwCheck)
            return pwCheck
        except:
            return False

    # 현재 사용자
    async def getCurrentUser(self, token: str = Depends(oauth2Scheme)):
        print('getCurrentUser token :', token)
        credentialsException = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"}
        )
        print('getCurrentUser credential')
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            print('getCurrentUser payload :', payload)
            email: str = payload.get("sub")
            print('getCurrentUser email :', email)
            if email is None:
                raise credentialsException
            tokenData = TokenData(email = email)
            print('getCurrentUser tokenData :', tokenData)
        except JWTError:
            raise credentialsException
        print('getCurrentUser credential passed')
        user = await self.searchUser(email=tokenData.email)
        print('getCurrentUser user :', user)
        if user is None:
            raise credentialsException
        return user






