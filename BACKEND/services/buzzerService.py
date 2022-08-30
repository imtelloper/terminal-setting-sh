import serial
from bson import ObjectId
import config
from repo.baseRepo import *

'''
Change below variables
- class name
- self.dbName =
- self.tableName =
'''


class BuzzerService:
    def __init__(self):
        '''
        sudo chmod 777 /dev/ttyACM0
        '''
        self.dbName = config.DB_NAME
        self.tableName = config.TABLE_OBSERVE
        # self.SER_STX = chr(0x02)
        # self.SER_ETX = chr(0x03)
        # self.SER_ON = chr(0x36)
        # self.SER_OFF = chr(0x31)
        self.SER_STX = "STX"
        self.SER_ETX = "ETX"
        self.SER_ON = "4"
        self.SER_OFF = "2"
        self.line = ''
        # self.port = '/dev/ttyUSB0'
        self.port = '/dev/ttyACM0'
        self.baud = 9600
        self.ser = serial.Serial(self.port, self.baud, timeout=1)
        self.alivethread = True

    # 경광등 on
    def serialSendOn(self):
        strcmd = self.SER_STX + self.SER_ON + self.SER_ETX
        print('send data = ON[' + strcmd + ']')
        self.ser.write(strcmd.encode())
        return 'send data = ON[' + strcmd + ']'

    # 경광등 off
    def serialSendOff(self):
        strcmd = self.SER_STX + self.SER_OFF + self.SER_ETX
        print('send data = OFF[' + strcmd + ']')
        self.ser.write(strcmd.encode())
        return 'send data = OFF[' + strcmd + ']'
