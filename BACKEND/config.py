import os
from dotenv import load_dotenv
import pymongo
from database.mongoDB import *
from pymongo.cursor import CursorType

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

load_dotenv(verbose=True)

"""
POSITION KEYWORD
"""
AREA = os.getenv('AREA')
CAMPORT = os.getenv('CAMPORT')

"""
DEFAULT KEYWORD
"""
DEFAULT = "default"

"""
DATABASE KEYWORD
"""
DB_NAME = "safety"

"""
COLLECTION KEYWORD
"""
TABLE_USERS = "users"
TABLE_OBSERVE = "observe"
TABLE_ARCHIVE = "archive"
TABLE_TRACKER = "tracker"
TABLE_CONFIG = "config"
TABLE_CONTROL_TOWER = "controlTower"

DB_TABLE = {
    TABLE_USERS: TABLE_USERS,
    TABLE_OBSERVE: TABLE_OBSERVE,
    TABLE_ARCHIVE: TABLE_ARCHIVE,
    TABLE_TRACKER: TABLE_TRACKER,
    TABLE_CONFIG: TABLE_CONFIG,
    TABLE_CONTROL_TOWER: TABLE_CONTROL_TOWER,
}

"""
DATABASE ADDRESS
"""


def getDatabaseIp():
    print('********************* getDatabaseIp start **********************')
    ipList = []
    for num in range(2, 256):
        ipAddr = "192.168.0." + str(num)
        pingCmd = "ping -c " + ipAddr

        # if response == 0:
        #     Netstatus = "Network Active"
        # else:
        #     Netstatus = "Network Error"

        response = os.system("ping -n 1 " + ipAddr)
        # response = os.system(pingCmd)
        if response == 0:
            ipList.append(ipAddr)
            print(ipList)
        else:
            continue

    # for list in ipList:
    #     connection = pymongo.MongoClient(list, 27017, connectTimeoutMS=1000)
    #     try:
    #         dbList = connection.list_database_names()
    #         return list
    #     except Exception as e:
    #         continue


# dbAddressBase = os.getenv('MONGO_ADDRESS')
# index = dbAddressBase.find(":27017")

# IP_ADDRESS = getDatabaseIp()
# DB_ADDRESS = dbAddressBase[:index] + IP_ADDRESS + dbAddressBase[index:]
DB_ADDRESS = os.getenv('MONGO_ADDRESS')

# print(IP_ADDRESS)

"""
관제PC ID
"""
# USER_ID = foundData['username']
# print(USER_ID)
"""
관제PC PW
"""


# USER_PW = foundData['password']
# print(USER_PW)


def getMessageResponse(custom_code):
    return {
        # success messages
        '200': {"code": "200", "message": "successfully get."},
        '200_1': {"code": "200", "message": "successfully save."},
        '200_2': {"code": "200", "message": "successfully update."},
        '200_3': {"code": "200", "message": "successfully delete."},

        # not found related messages
        '404': {"code": "400", "message": "Function not found."},

        # dataframe related messages
        '500': {"code": "500", "message": "Dataframe is empty."},
        '500_1': {"code": "500", "message": "Dataframe doesn't contains selected field."},
        '500_2': {"code": "500", "message": "Bad type of data delivered."},
        '500_3': {"code": "500", "message": "Error while operation."},

    }.get(custom_code, "this code is not available in our message response directory. Please add it.")
