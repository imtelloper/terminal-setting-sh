import numpy as np
import cv2
import time

vcap = cv2.VideoCapture('http://19.168.0.3:81/api/stream/area/2/65,110,128,108,95,283,58,285/76,149,111,144,92,243,70,247/285,121,356,121,349,303,275,304/298,159,340,158,335,265,291,268')

# if vcap is not None
print(vcap.read()[0])
setVcapBool = True
while(setVcapBool):
    time.sleep(1)
    if vcap.read()[0] == False:
        print('재시')
        vcap = cv2.VideoCapture(
            'http://192.168.0.3:81/api/stream/area/2/65,110,128,108,95,283,58,285/76,149,111,144,92,243,70,247/285,121,356,121,349,303,275,304/298,159,340,158,335,265,291,268')
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
