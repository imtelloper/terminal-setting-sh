# DB ERD
https://www.erdcloud.com/d/ca5xyxoCFGmyY3bHj

# .env 파일 필요

# SAMPLE
```dotenv
MONGO_ADDRESS=
JWT_SECRET=ABCD1234!
JWT_ALGORITHM=HS256
TOKEN_URL=/api/auth/token
AREA=MAC
CAMPORT=cam1
```

# API 설계
### MainPage
area, camPort로 tracker id 가져와서 id로 observe 테이블에서 날짜와 함께 검색
<br>

### ObservePage

각 카메라 camCoordicate1, camCoordinate2 셋팅, 카메라 ID로 현재 날짜로 observe 데이터 가져와서 셋팅
 - 다각형 좌표 생성 가능
 - 안전 레벨 셋팅 가능 
 - 현재 작동중인지 
<br>



