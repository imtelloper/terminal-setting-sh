import cv2
import config
from bson import ObjectId
from database.mongoDB import getConnection
import datetime

'''
추후에 stream service 리팩토링 할 것.
'''


def updateCurrentLevel(self, todayCamDataId, level):
    print('updateCurrentLevel todayCamDataId', todayCamDataId)
    getConnection()[self.dbName][self.tableName].update_one(
        {'_id': ObjectId(todayCamDataId)},
        {'$set':
            {
                'safetyLevel': level.capitalize(),
            }
        }
    )


def updateCurrentLevelCnt(self, todayCamDataId, level: str, cnt: int):
    print('updateCurrentLevelCnt todayCamDataId', todayCamDataId)
    getConnection()[self.dbName][self.tableName].update_one(
        {'_id': ObjectId(todayCamDataId)},
        {'$set':
            {
                'safetyLevel': level.capitalize(),
                '{0}Cnt'.format(level.lower()): cnt
            }
        }
    )


def updateCalibrationImgPath(self, trackerId, captureImg: str, imgPath: str):
    self.initScreenCapturePath()
    getConnection()[self.dbName][config.TABLE_TRACKER].update_one(
        {'_id': ObjectId(trackerId)},
        {'$set':
            {
                'calibImg': imgPath,
            }
        }
    )
    cv2.imwrite(imgPath, captureImg, params=[cv2.IMWRITE_PNG_COMPRESSION, 0])


def updateDeviceIp(self, trackerId, ip: str):
    self.initScreenCapturePath()
    print('updateDeviceIp trackerId', trackerId)
    getConnection()[self.dbName][config.TABLE_TRACKER].update_one(
        {'_id': ObjectId(trackerId)},
        {'$set':
            {
                'ip': ip,
            }
        }
    )


def screenCaptureInsertData(self, captureImg: str, level: str):
    self.initScreenCapturePath()
    cv2.imwrite(self.screenShotRecordPath, captureImg,
                params=[cv2.IMWRITE_PNG_COMPRESSION, 0])
    getConnection()[self.dbName][config.TABLE_ARCHIVE].insert_one(
        {
            "trackerId": ObjectId(self.trackerId),
            "fileType": "img",
            "path": self.screenShotRecordPath,
            "safetyLevel": level.capitalize(),
            "createdAt": datetime.datetime.now()
        },
    )
