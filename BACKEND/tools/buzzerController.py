import serial
import threading
import time
import sys
import glob

# SER_STX = chr(0x02)
# SER_ETX = chr(0x03)
# SER_ON = chr(0x36)
# SER_OFF = chr(0x31)
SER_STX = "STX"
SER_ETX = "ETX"
SER_ON = "4"
SER_OFF = "2"
line = ''
# port = '/dev/ttyUSB0'
port = '/dev/ttyACM0'
baud = 9600

ser = serial.Serial(port, baud, timeout=1)

alivethread = True


def readthread(ser):
    global line

    while alivethread:
        print('1 alivethread ser', ser)
        print('2 alivethread ser.read()', ser.read())
        print('3 alivethread ser.read() type', type(ser.read()))
        for c in ser.read():
            line += (chr(c))
            if line.startswith(SER_STX) and line.endswith(SER_ETX):
                print('receive data=' + line)
                line = ''
    ser.close()


def serialPorts():
    if sys.platform.startswith('win'):
        ports = ['COM%s' % (i + 1) for i in range(256)]
    elif sys.platform.startswith('linux') or sys.platform.startswith('cygwin'):
        # this excludes your current terminal "/dev/tty"
        ports = glob.glob('/dev/ttyA[A-Za-z]*')
        # ttyU
    elif sys.platform.startswith('darwin'):
        ports = glob.glob('/dev/tty.*')
    else:
        raise EnvironmentError('Unsupported platform')

    result = []
    for port in ports:
        try:
            s = serial.Serial(port)
            s.close()
            result.append(port)
        except (OSError, serial.SerialException):
            pass
    return result


# 경광등 on
def serialSendOn(opend_ser):
    strcmd = SER_STX + SER_ON + SER_ETX
    print('send data = ON[' + strcmd + ']')
    return opend_ser.write(strcmd.encode())


# 경광등 off
def serialSendOff(opend_ser):
    strcmd = SER_STX + SER_OFF + SER_ETX
    print('send data = OFF[' + strcmd + ']')
    opend_ser.write(strcmd.encode())


def serial_open():
    open_serial = serial.Serial(port, baud, timeout=1)
    print("serial open")
    return open_serial


def read(ser, size=1, timeout=1):
    print('read ser', ser)
    ser.timeout = timeout
    while 1:
        try:
            readed = ser.readline(size).decode()
            if readed != "":
                print('receive data = ' + readed)
                serial_send_on(ser)
                serial_send_on(ser)
                serial_send_on(ser)
                time.sleep(5)
                serial_send_off(ser)
                serial_send_off(ser)
                serial_send_off(ser)
        except serial.serialutil.SerialException as e:
            print(e)
            continue


def main():
    print('##ser : ', ser)
    # thread = threading.Thread(target=readthread, args=(ser,))
    # thread.start()

    print('##serialPorts', serialPorts())
    # ser_connected = serial.Serial(serialPorts()[0], baud, timeout=1)

    count = 10
    while count > 0:
        # serialSendOn(ser)
        time.sleep(1)
        serialSendOff(ser)
        time.sleep(1)
        count -= 1
    # read(ser)

# main()
