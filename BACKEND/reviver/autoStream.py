import numpy as np
import cv2
import time
import pymongo

mongodbUri = "mongodb://interx:interx12!@192.168.0.4:27017/interx"
connection = pymongo.MongoClient(mongodbUri)
dbSafety = connection.get_database("safety")

resultData = dbSafety["tracker"].find_one({"area": "H1 공장 크레인", "camPort": "cam1"})


sensingGroup1 = resultData["sensingGroup1"]
sensingGroup2 = resultData["sensingGroup2"]

if sensingGroup2 is not None:
    sensingGroup = "2/{}/{}".format(sensingGroup1, sensingGroup2)
else:
    sensingGroup = "1/{}".format(sensingGroup1)

sensingGroup = sensingGroup.replace('&', "/")

print('http://192.168.0.4:81/api/stream/area/' + sensingGroup)

vcap = cv2.VideoCapture('http://192.168.0.4:81/api/stream/area/' + sensingGroup)

# if vcap is not None
print(vcap.read()[0])
setVcapBool = True
while (setVcapBool):
    time.sleep(1)
    if vcap.read()[0] == False:
        print('재시')
        vcap = cv2.VideoCapture(
            'http://192.168.0.4:81/api/stream/area/' + sensingGroup)
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