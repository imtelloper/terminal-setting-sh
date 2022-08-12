import numpy as np
import cv2
import time
import os
import pymongo
from dotenv import load_dotenv

load_dotenv(verbose=True)
area = os.getenv('AREA')
camPort = os.getenv('CAMPORT')

mongodbUri = "mongodb://interx:interx12!@192.168.0.4:27017/interx"
connection = pymongo.MongoClient(mongodbUri)
dbSafety = connection.get_database("safety")
resultData = dbSafety["tracker"].find_one({"area": area, "camPort": camPort})
print('resultData: ', resultData)
splitGrp1, splitGrp2 = resultData["sensingGroup1"].split('&'), resultData["sensingGroup2"].split('&')
print('splitGrp1: ', splitGrp1)
print('splitGrp2: ', splitGrp2)
sensingGroup1 = ''
sensingGroup2 = ''

if len(splitGrp1) > 1: sensingGroup1 = splitGrp1[1] + '/' + splitGrp1[2]
if len(splitGrp2) > 1: sensingGroup2 = splitGrp2[1] + '/' + splitGrp2[2]

print('sensingGroup1: ', sensingGroup1)
print('sensingGroup2: ', sensingGroup2)

if sensingGroup2 is not None:
    sensingGroup = "2/{}/{}".format(sensingGroup1, sensingGroup2)
else:
    sensingGroup = "1/{}".format(sensingGroup1)

baseStreamAreaUrl = 'http://127.0.0.1:8000/api/stream/area/'
baseStreamGroupUrl = baseStreamAreaUrl + sensingGroup
print('baseStreamGroupUrl', baseStreamGroupUrl)

vcap = cv2.VideoCapture(baseStreamGroupUrl)
vcap.set(cv2.CAP_PROP_BUFFERSIZE, 3)

while (True):
    ret, frame = vcap.read()
    if frame is not None:
        cv2.imshow('frame', frame)
        '''
        waitKey(1)를 넣었을때는 작동하던 코드가 이걸 빼니깐 작동하지 않는 걸 발견하였습니다.
        waitKey(0)은 새로운 input이 들어올 때까지 무작정 기다리고, 
        waitKey(1)은 1ms을 기다리고 다음 이미지를 display하기 때문에, 다음과 같이 사용합니다.
        만일 waitKey(0)을 사용한다면 rtsp feed가 계속 play 되는 게 아니라 still image로 display됩니다.
        '''

        if cv2.waitKey(1) == ord('q'): break
    else:
        print("Frame is None")
        break

vcap.release()
cv2.destroyAllWindows()
