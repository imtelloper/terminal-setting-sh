import numpy as np
import cv2
import time
import pymongo

mongodbUri = "mongodb://interx:interx12!@192.168.0.4:27017/interx"
connection = pymongo.MongoClient(mongodbUri)
dbSafety = connection.get_database("safety")

resultData = dbSafety["tracker"].find_one({"area": "H1 공장 크레인", "camPort": "cam1"})

split_grp1, split_grp2 = resultData["sensingGroup1"].split('&'), resultData["sensingGroup2"].split('&')

sensingGroup1 = split_grp1[1]+'/'+split_grp1[2]
sensingGroup2 = split_grp2[1]+'/'+split_grp2[2]

if sensingGroup2 is not None:
    sensingGroup = "2/{}/{}".format(sensingGroup1, sensingGroup2)
else:
    sensingGroup = "1/{}".format(sensingGroup1)

print('http://127.0.0.1:8000/api/stream/area/' + sensingGroup)

vcap = cv2.VideoCapture('http://127.0.0.1:8000/api/stream/area/' + sensingGroup)

# if vcap is not None
print(vcap.read()[0])
setVcapBool = True
while (setVcapBool):
    time.sleep(1)
    if vcap.read()[0] == False:
        print('재시')
        vcap = cv2.VideoCapture(
            'http://127.0.0.1:8000/api/stream/area/' + sensingGroup)
        print(vcap.read()[0])
    else:
        setVcapBool = False

while (True):
    ret, frame = vcap.read()
    if frame is not None:
        cv2.imshow('frame', frame)
        # Press q to close the video windows before it ends if you want
        if cv2.waitKey(22) & 0xFF == ord('q'):
            break
    else:
        print("Frame is None")
        break

# When everything done, release the capture
vcap.release()
cv2.destroyAllWindows()
