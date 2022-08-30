import os

os.system('python /home/interx/SAFETY-AI/BACKEND/controlTowerFinder.py')

import cv2
import time
import pymongo
from dotenv import load_dotenv

print('######## auto-stream.py RUN ########')
load_dotenv(verbose=True)
area = os.getenv('AREA')
camPort = os.getenv('CAMPORT')
# mongodbUri = "mongodb://interx:interx12!@192.168.0.4:27017/interx"
mongodbUri = os.getenv('MONGO_ADDRESS')
connection = pymongo.MongoClient(mongodbUri)
dbSafety = connection.get_database("safety")
isObserving = False

'''
DB에서 좌표가 업데이트 될때마다 여기서도 업데이트 되어야함
'''


def setsUrlCoordinate():
    global isObserving
    baseStreamAreaUrl = 'http://127.0.0.1:8000/api/stream'
    resultData = dbSafety["tracker"].find_one({"area": area, "camPort": camPort})
    print('resultData: ', resultData)
    print()
    print('@isObserving', resultData['isObserving'])
    isObserving = resultData['isObserving']
    print()
    sensingGroup1: str = ''
    sensingGroup2: str = ''
    splitGrp1, splitGrp2 = resultData["sensingGroup1"].split('&'), resultData["sensingGroup2"].split('&')
    print()
    print('splitGrp1: ', splitGrp1)
    print('splitGrp2: ', splitGrp2)
    print()

    if len(splitGrp1) > 1: sensingGroup1 = splitGrp1[1] + '/' + splitGrp1[2]
    if len(splitGrp2) > 1: sensingGroup2 = splitGrp2[1] + '/' + splitGrp2[2]

    print()
    print('### sensingGroup1: ', sensingGroup1)
    print('### sensingGroup2: ', sensingGroup2)
    print()
    print('len(sensingGroup1): ', len(sensingGroup1))
    print('len(sensingGroup2): ', len(sensingGroup2))
    print()

    # 감지 좌표가 둘 다 있는 경우
    if len(sensingGroup1) > 0 and len(sensingGroup2) > 0:
        print('*************************1*******************************')
        print('**************** 감지 좌표가 둘 다 있는 경우 ******************')
        print('### sensingGroup2 is not None')
        sensingGroup = "/area/2/{}/{}".format(sensingGroup1, sensingGroup2)

    # 감지 좌표가 1그룹에만 있는 경우
    if len(sensingGroup1) > 0 and len(sensingGroup2) == 0:
        print('*************************2*******************************')
        print('************* 감지 좌표가 1그룹에만 있는 경우 ******************')
        sensingGroup = "/area/1/{}/".format(sensingGroup1)

    # 감지 좌표가 2그룹에만 있는 경우
    if len(sensingGroup1) == 0 and len(sensingGroup2) > 0:
        print('*************************3*******************************')
        print('************** 감지 좌표가 2그룹에만 있는 경우 *****************')
        sensingGroup = "/area/2/{}/".format(sensingGroup2)

    # 감지 좌표 없는 경우
    if len(sensingGroup1) == 0 and len(sensingGroup2) == 0:
        print('*************************4*******************************')
        print('******************** 감지 좌표 없는 경우 ********************')
        sensingGroup = '/'

    print('###sensingGroup: ', sensingGroup)

    baseStreamGroupUrl = baseStreamAreaUrl + sensingGroup
    print('baseStreamGroupUrl', baseStreamGroupUrl)
    return baseStreamGroupUrl


vcap = cv2.VideoCapture(setsUrlCoordinate())
vcap.set(cv2.CAP_PROP_BUFFERSIZE, 3)

cameraOnOff = True
cnt = 0
isObservingCnt = 0
while cameraOnOff:
    print('--------------------- CAMERA IS RUNNING, NOW IN WHILE ---------------------')
    print('isObserving', isObserving)
    if isObserving:
        print('트루')
        time.sleep(1)
        print('isObservingCnt', isObservingCnt)
        isObservingCnt += 1
        if isObservingCnt == 5:
            isObservingCnt = 0
            resultData = dbSafety["tracker"].find_one({"area": area, "camPort": camPort})
            print('resultData: ', resultData)
            print()
            isObserving = resultData['isObserving']
            print('isObserving', isObserving)
        continue
    print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    cnt += 1
    print('cnt', cnt)
    ret, frame = vcap.read()
    if cnt == 50:
        cnt = 0
        # 일정 시간마다 videocapture reset 해줘야 합니다.
        vcap = cv2.VideoCapture(setsUrlCoordinate())
        vcap.set(cv2.CAP_PROP_BUFFERSIZE, 3)
        ret, frame = vcap.read()

        ### imshow를 사용하면 재부팅시 화면 출력 관련 에러가 납니다. 개발시에만 사용하세요
        # cv2.imshow('frame', frame)

    if frame is not None:
        # cv2.imshow('frame', frame)
        # cnt가 50번 되었을때 다시 vcap을 초기화하여 보여주는것으로 해결
        '''
        waitKey(1)를 넣었을때는 작동하던 코드가 이걸 빼니깐 작동하지 않는 걸 발견하였습니다.
        waitKey(0)은 새로운 input이 들어올 때까지 무작정 기다리고, 
        waitKey(1)은 1ms을 기다리고 다음 이미지를 display하기 때문에, 다음과 같이 사용합니다.
        만일 waitKey(0)을 사용한다면 rtsp feed가 계속 play 되는 게 아니라 still image로 display됩니다.
        '''
        if cv2.waitKey(1) == ord('q'): break
    else:
        print("Frame is None")
        vcap = cv2.VideoCapture(setsUrlCoordinate())
        vcap.set(cv2.CAP_PROP_BUFFERSIZE, 3)

print('GOOD BYE')
