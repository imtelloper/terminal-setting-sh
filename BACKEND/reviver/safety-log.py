import time

shLogFile = '/home/interx/safety-autostart.sh.log'
newLogFile = '/home/interx/safety-log.txt'

while True:
    fr = open(shLogFile, 'r')
    fw = open(newLogFile, 'w')
    showLines = 200
    data = fr.readlines()
    lines = len(data)
    if lines < showLines:
        startLine = 0
    else:
        startLine = lines - showLines
    fw.writelines(data[startLine:])

    time.sleep(1)

fr.close()
fw.close()
