import os
from dotenv import load_dotenv

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
DATABASE ADDRESS
"""
DB_ADDRESS = "mongodb://interx:interx%40504@{0}/admin".format("server.interxlab.io:15115")
# DB_ADDRESS = "mongodb://127.0.0.1:27017/"

"""
DATABASE KEYWORD
"""
DB_NAME = "safety"
# DB_NAME = "DC4F67F8"
# DB_NAME = "testdb"

"""
COLLECTION KEYWORD
"""
TABLE_TAMPERATURE_HUMIDITY = "temperatureHumidity"
TABLE_USERS = "users"
TABLE_OBSERVE = "observe"

DB_TABLE = {
    TABLE_TAMPERATURE_HUMIDITY: TABLE_TAMPERATURE_HUMIDITY,
}


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