import os
import pipes
import platform
import time
import cv2
import traceback
import numpy as np
import config
import datetime
from modules.calculate import HumanCalculator
from modules.yolov5.detect import detect
from database.mongoDB import *
from services.observeService import ObserveService
from fastapi.encoders import jsonable_encoder
from repo.baseRepo import *
from routers.observeRouter import modifyOneData
from bson import ObjectId
from util import *
from fastapi.responses import JSONResponse
import paramiko
import time
import subprocess
import stat


# W: 256 H: 192
class StreamService:
    def __init__(self):
        self.camWidth = 512
        self.camHeight = 384
        self.camPort = config.CAMPORT  # 카메라 포트
        self.camArea = config.AREA.replace(" ", "")  # 카메라 설치 구역
        self.savePath = '/home/interx/SAFETY-AI/BACKEND/safety-archives'  # 각 파일들의 폴더들이 저장될 루트 경로
        self.currentDate = datetime.datetime.now().strftime('%Y-%m-%d')  # 현재 날짜
        self.currentTime = datetime.datetime.now().strftime('%Y-%m-%d_%H:%M:%S.%f')  # 현재 시간
        # 파일명을 다르게 하기 위한 파일 정보 생성
        self.fileInfo = '-{0}-{1}-{2}'.format(self.camArea, self.camPort, self.currentTime)
        # 녹화 파일 저장 경로  safety-archives / 오늘날짜 / area / camPort / video
        self.videoFolderPath = '{0}/{1}/{2}/{3}/video'.format(
            self.savePath, self.currentDate, self.camArea, self.camPort)
        # 녹화 파일 이름
        self.videoRecordPath = '{0}/safety-record{1}.avi'.format(self.videoFolderPath, self.fileInfo)
        # 캡쳐 파일 저장 경로  safety-archives / 오늘날짜 / area / camPort / capture
        self.screenShotFolderPath = '{0}/{1}/{2}/{3}/capture'.format(
            self.savePath, self.currentDate, self.camArea, self.camPort)
        # 캡쳐 파일 이름
        self.screenShotRecordPath = '{0}/safety-shot{1}.png'.format(self.screenShotFolderPath, self.fileInfo)
        self.fcc = cv2.VideoWriter_fourcc('M', 'J', 'P', 'G')
        self.fps = 30
        self.videoWriter = None  # cv 녹화 객체
        self.recordGate = False  # 녹화 시작, 중지를 위한 bool
        self.captureGate = False  # 캡쳐를 위한 bool
        self.calibCaptureGate = False  # Calibration 설정을 위한 스크린샷 캡쳐를 위한 bool
        self.currentPort = None  # 카메라가 mini pc에 연결된 포트 번호
        self.listPorts = self.list_ports()  # 현재 연결된 카메라의 포트 번호
        if (self.listPorts[1]):
            self.currentPort = self.listPorts[1][0]
            self.video = cv2.VideoCapture(self.currentPort)
            self.video.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
            self.video.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        else:
            os.system("fuser -k 8000/tcp")
            self.video = cv2.VideoCapture(0)
        self.cameraOnOff = True  # 스트림 카메라를 열었다면 닫아줘야 재활성화 되기 때문에 필요한 bool
        self.observeService = ObserveService()
        self.dbName = config.DB_NAME
        self.tableName = config.TABLE_OBSERVE
        self.trackerId = ""  # 현재 pc의 trackerId (현재 pc의 감지 모델, 연산 장치, 좌표.. 등 각종 셋팅값을 가져올 수 있음)
        self.todayFstCamDataId = ""  # 오늘 날짜의 1차 감지그룹의 아이디
        self.todaySecCamDataId = ""  # 오늘 날짜의 2차 감지그룹의 아이디
        self.fstYellowCnt = 0  # 현재 1차 감지 그룹의 Yellow 감지 카운트
        self.fstRedCnt = 0  # 현재 1차 감지 그룹의 Red 감지 카운트
        self.secYellowCnt = 0  # 현재 2차 감지 그룹의 Yellow 감지 카운트
        self.secRedCnt = 0  # 현재 2차 감지 그룹의 Red 감지 카운트
        self.fstObserveSwitch = True  # 현재 1차 감지 그룹 작동 스위치
        self.secObserveSwitch = True  # 현재 2차 감지 그룹 작동 스위치
        self.thisCamThreshold = 0  # 현재 pc의 threshold 셋팅 값
        self.thisCamSensingModel = ""  # 현재 pc의 감지 모델 셋팅 값
        self.humanCalcurator = HumanCalculator()
        self.camImg = ""

        # 각종 파일 저장 경로 폴더 생성
        if platform.platform() != 'macOS-12.4-arm64-arm-64bit':
            makedirs(self.videoFolderPath)
            makedirs(self.screenShotFolderPath)
        print('##### CONNECTED CAMERA ##### : ', self.listPorts)

    async def test(self):
        print('self.dbName', self.dbName)
        print('self.tableName', self.tableName)
        searchedData = findDatas(self.dbName, self.tableName, {
            'trackerId': ObjectId('62c796f09715acf6931d4e6b'),
            'date': '2022-07-08',
            'groupNum': 2,
        })
        print('searchedData type ', type(searchedData))
        dataArr = []
        try:
            # 데이터가 들어 있으므로 전역변수에 셋팅한다.
            async for val in searchedData:
                print('val', val)
                dataArr.append(val)
            print('dataArr len', len(dataArr))
            foundData = dataArr[0]
            print('foundData', foundData)
            return JSONResponse(foundData)
        except Exception as e:
            return False

    def __del__(self):
        self.video.release()

    def getVideoRecordPath(self):
        return self.videoRecordPath

    def setCurrentPort(self, port):
        self.currentPort = port

    # 열린 스트림 카메라를 닫아주기 위한 메서드
    def setCameraOff(self):
        self.cameraOnOff = False

    # 열린 스트림 카메라를 닫아주기 위한 메서드
    def setCameraOn(self):
        self.cameraOnOff = True

    # 스크린 캡쳐 경로, 파일명 초기화
    def initScreenCapturePath(self):
        self.currentDate = datetime.datetime.now().strftime('%Y-%m-%d')
        self.currentTime = datetime.datetime.now().strftime('%Y-%m-%d_%H:%M:%S.%f')
        self.fileInfo = '-{0}-{1}-{2}'.format(self.camArea, self.camPort, self.currentTime)
        self.screenShotFolderPath = '{0}/{1}/{2}/{3}/capture'.format(self.savePath, self.currentDate, self.camArea,
                                                                     self.camPort)
        self.screenShotRecordPath = '{0}/safety-shot{1}.png'.format(self.screenShotFolderPath, self.fileInfo)

    # 캡쳐를 하기 위한 메서드
    def setCaptureGateOpen(self):
        self.initScreenCapturePath()
        self.captureGate = True
        return True

    # Calibration 설정을 위한 스크린샷 캡쳐를 하기 위한 메서드
    def setCalibCaptureGateOpen(self):
        self.initScreenCapturePath()
        self.calibCaptureGate = True
        return True

    # 녹화 경로, 파일명 초기화
    def initVideoRecordPath(self):
        print('initVideoRecordPath')
        self.currentDate = datetime.datetime.now().strftime('%Y-%m-%d')
        self.currentTime = datetime.datetime.now().strftime('%Y-%m-%d_%H:%M:%S.%f')
        self.fileInfo = '-{0}-{1}-{2}'.format(self.camArea, self.camPort, self.currentTime)
        self.videoFolderPath = '{0}/{1}/{2}/{3}/video'.format(self.savePath, self.currentDate, self.camArea,
                                                              self.camPort)
        self.videoRecordPath = '{0}/safety-record{1}.avi'.format(self.videoFolderPath, self.fileInfo)
        self.videoWriter = cv2.VideoWriter(self.videoRecordPath, self.fcc, self.fps,
                                           (self.camWidth, self.camHeight))

    # 녹화 시작 메서드
    def setRecordGateOpen(self):
        print('*************** setRecordGateOpen ***************')
        self.initVideoRecordPath()
        self.recordGate = True
        return True

    # 녹화 중지 메서드
    def setRecordGateClose(self):
        self.recordGate = False
        return False

    # 지금 PC의 area, camPort 정보로 tracker object id 가져오기
    async def getTrackerId(self):
        print('************* getTrackerId ***************')
        dataArr = []
        searchedData = findDatas(self.dbName, config.TABLE_TRACKER, {
            "area": config.AREA,
            "camPort": config.CAMPORT,
        })
        async for val in searchedData:
            dataArr.append(val)
        foundData = dataArr[0]
        trackerId = ObjectId(foundData['_id'])
        self.trackerId = trackerId
        self.thisCamThreshold = float(foundData['threshold']) / 100
        self.thisCamSensingModel = foundData['sensingModel']
        print('trackerId', trackerId)
        return trackerId

    # 동영상 녹화 경로 삽입
    async def insertVideoRecordPath(self, trackerId, videoRecordPath):
        print('insertVideoRecordPath')
        print('insertVideoRecordPath trackerId', trackerId)
        print('insertVideoRecordPath videoRecordPath', videoRecordPath)
        insertData = {
            "trackerId": ObjectId(trackerId),
            "fileType": "video",
            "path": videoRecordPath,
            "safetyLevel": "",
        }
        resultData = await insertOne(self.dbName, config.TABLE_ARCHIVE, insertData)
        print('resultData.inserted_id', resultData.inserted_id)
        return str(resultData.inserted_id)

    async def isTodayObserveExist(self, groupNum: int):
        print('######## isTodayObserveExist ########')
        today = str(datetime.date.today())
        searchedData = getConnection()[self.dbName][self.tableName].find({
            'trackerId': self.trackerId,
            'date': today,
        }).sort("groupNum", 1)

        dataArr = []
        responseRes = {
            "fst": False,
            "sec": False
        }
        try:
            async for val in searchedData:
                dataArr.append(val)

            # 오늘 날짜로 첫번째 observe 데이터만 있는 경우
            fstGroupData = dataArr[0]
            # 데이터가 들어 있으므로 전역변수에 셋팅한다.
            self.todayFstCamDataId = fstGroupData['_id']
            self.fstYellowCnt = int(fstGroupData['yellowCnt'])
            self.fstRedCnt = int(fstGroupData['redCnt'])
            self.fstObserveSwitch = fstGroupData['observeSwitch']
            print('self.todayFstCamDataId', self.todayFstCamDataId)
            print('self.fstYellowCnt', self.fstYellowCnt)
            print('self.fstRedCnt', self.fstRedCnt)

            if len(dataArr) > 0:
                responseRes["fst"] = True

            # 오늘 날짜로 두번째 observe 데이터도 있는 경우
            if len(dataArr) > 1:
                responseRes["sec"] = True
                secGroupData = dataArr[1]
                self.todaySecCamDataId = secGroupData['_id']
                self.secYellowCnt = int(secGroupData['yellowCnt'])
                self.secRedCnt = int(secGroupData['redCnt'])
                self.secObserveSwitch = secGroupData['observeSwitch']
                print('self.todaySecCamDataId', self.todaySecCamDataId)
                print('self.secYellowCnt', self.secYellowCnt)
                print('self.secRedCnt', self.secRedCnt)
            return responseRes
        except Exception as e:
            # 오늘 날짜로 observe 데이터가 없는 경우
            return responseRes

    async def addTodayCamData(self, observeChk: dict, groupNum: int):
        print('############ addTodayCamData ############')
        today = str(datetime.date.today())
        try:
            if groupNum == 1 and observeChk["fst"]:
                print('첫번째 그룹은 이미 있습니다.')
                return
            if groupNum == 2 and observeChk["sec"]:
                print('두번째 그룹은 이미 있습니다.')
                return

            # 데이터가 없으므로 오늘자 데이터를 삽입한다.
            insertData = {
                'trackerId': ObjectId(self.trackerId),
                "date": today,
                "groupNum": int(groupNum),
                "safetyLevel": "Green",
                "yellowCnt": 0,
                "redCnt": 0,
                "observeSwitch": False,
                "observeTime": datetime.datetime.now(),
            }
            resultData = await insertOne(self.dbName, self.tableName, insertData)
            newData = await findOne(self.dbName, self.tableName, {"_id": ObjectId(resultData.inserted_id)})
            if groupNum == 1:
                self.todayFstCamDataId = resultData.inserted_id
            else:
                self.todaySecCamDataId = resultData.inserted_id

        except Exception as e:
            print(e)

    def updateCurrentLevel(self, todayCamDataId, level):
        getConnection()[self.dbName][self.tableName].update_one(
            {'_id': ObjectId(todayCamDataId)},
            {'$set':
                {
                    'safetyLevel': level.capitalize(),
                }
            }
        )

    def updateCurrentLevelCnt(self, todayCamDataId, level: str, cnt: int):
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
        cv2.imwrite(imgPath, captureImg, params=[cv2.IMWRITE_PNG_COMPRESSION, 0])
        getConnection()[self.dbName][config.TABLE_TRACKER].update_one(
            {'_id': ObjectId(trackerId)},
            {'$set':
                {
                    'calibImg': imgPath,
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

    def list_ports(self):
        """
        Test the ports and returns a tuple with the available ports and the ones that are working.
        """
        non_working_ports = []
        dev_port = 0
        working_ports = []
        available_ports = []
        while len(non_working_ports) < 3:  # if there are more than 5 non working ports stop the testing.
            camera = cv2.VideoCapture(dev_port)
            if not camera.isOpened():
                non_working_ports.append(dev_port)
                print("Port %s is not working." % dev_port)
            else:
                is_reading, img = camera.read()
                w = camera.get(3)
                h = camera.get(4)
                if is_reading:
                    print("Port %s is working and reads images (%s x %s)" % (dev_port, h, w))
                    working_ports.append(dev_port)
                else:
                    print("Port %s for camera ( %s x %s) is present but does not reads." % (dev_port, h, w))
                    available_ports.append(dev_port)
            dev_port += 1
        return available_ports, working_ports, non_working_ports

    # 관제 PC에 파일 저장
    def saveFile(self, folderPath, recordPath):
        # print('###### folderPath',folderPath)
        # print('###### recordPath',recordPath)
        #관제 PC
        host = "192.168.0.4"
        port = 22  # 고정
        transport = paramiko.transport.Transport(host, port)
        userId = "interx"
        password = "interx12!"

        # 연결
        transport.connect(username=userId, password=password)
        sftp = paramiko.SFTPClient.from_transport(transport)

        # 관제 PC 내 폴더 생성
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        client.load_system_host_keys()
        client.connect(host, username=userId, password=password)
        client.invoke_shell()
        cmd = 'ls -d ' + folderPath
        stdin, stdout, stderr = client.exec_command(cmd)
        if not str(stderr.read()):
            return True
        else:
            cmd = 'sudo mkdir -p ' + recordPath
            client.exec_command(cmd)

        # Upload - 파일 업로드
        remotepath = recordPath
        localpath = recordPath

        if os.path.isfile(localpath):
            sftp.put(localpath, remotepath)

            # Get - 파일 다운로드
            sftp.get(remotepath,
                     localpath)

            os.remove(localpath)

        # Close
        sftp.close()
        transport.close()

    def video_streaming(self, coordinates1=[], coordinates2=[]):
        print('video_streaming video check : ', self.currentPort)
        if self.currentPort is None: os.system("fuser -k 8000/tcp")
        pt = "/home/interx/SAFETY-AI/BACKEND/modules/yolov5/weights/1_nano.pt"
        device_mode = ""
        print('쓰레쉬 홀드', self.thisCamThreshold)
        print('감지 모델', self.thisCamSensingModel)
        conf = self.thisCamThreshold
        # rois = [[[1차 그룹 yellow영역], [1차 그룹 red영역]], [[1차영역], [2차영역]], ... , [[1차영역], [2차영역]]]
        rois = []
        if len(coordinates1) > 0: rois.append(coordinates1)
        if len(coordinates2) > 0: rois.append(coordinates2)

        cnt = 0  # 트랙킹시 사라진 객체를 프레임수마다 카운팅
        track_signal = False  # 트랙킹 신호 True면 트랙킹한다
        unit_num = 15  # 사람 영역 분할 계수
        warn_sig = None
        multi_tracker = cv2.MultiTracker_create()  # tracking api 호출
        imgType = 'jpeg'
        timeCnt = 0
        fstSensingLevel = None
        secSensingLevel = None

        while self.cameraOnOff:
            k = cv2.waitKey(1) & 0xFF
            timeCnt += 1
            # time.sleep(0.08)
            time.sleep(10)
            ret, frame = self.video.read()
            if frame is None: return
            self.camImg = frame.copy()
            self.camImg = np.array(self.camImg)
            self.camImg = cv2.cvtColor(self.camImg, cv2.COLOR_RGB2BGR)
            self.camImg = cv2.cvtColor(self.camImg, cv2.COLOR_BGR2RGB)
            self.camImg = cv2.resize(self.camImg, dsize=(self.camWidth, self.camHeight), interpolation=cv2.INTER_AREA)
            if not ret: return
            humans, rsigs = [], []
            try:
                result_img = ""
                if cnt == 0:
                    # 욜로 감지(딥러닝을 돌린다. 사람을 찾아주는 기능)
                    humans = detect(weights=pt, device=device_mode, conf_thres=conf, source=self.camImg)
                    multi_tracker.__init__()
                    track_signal = False
                    cnt += 1
                # 트랙킹 돌리기(추적한다., 박스가 따라간다.)
                elif 0 < cnt < 3: cnt += 1
                else: cnt = 0
                # 욜로가 0.2초, 트랙킹이 3번 <- 반복
                bboxes = []

                if humans:
                    # 욜로로 감지 -> 객체를 오픈cv
                    # detection
                    # print('detect')
                    for bbox in humans:
                        x1, y1, x2, y2 = tuple([int(_) for _ in bbox])
                        w, h = x2 - x1, y2 - y1
                        bboxes.append([x1, y1, x2, y2, w, h])
                        track_bbox = (x1, y1, w, h)
                        # tracking signal
                        multi_tracker.add(cv2.TrackerCSRT_create(), self.camImg, track_bbox)
                        track_signal = True
                    rsigs, self.camImg = self.humanCalcurator.calculate_human(self.camImg, bboxes, unit_num, rois)
                        # print('warn_sig', warn_sig) # 0:안전, 1: 옐로우1차, 2: 2차 레드
                    result_img = self.camImg
                else:
                    # tracking
                    # print('tracking')
                    if track_signal:
                        track_img = self.camImg.copy()
                        ret, t_bboxes = multi_tracker.update(track_img)
                        if ret:
                            for i, t_bbox in enumerate(t_bboxes):
                                x1, y1, w, h = tuple([int(_) for _ in t_bbox])
                                x2, y2 = x1 + w, y1 + h
                                bboxes.append([x1, y1, x2, y2, w, h])
                            rsigs, result_img = self.humanCalcurator.calculate_human(self.camImg, bboxes, unit_num, rois)
                                # print('warn_sig',warn_sig) # 0:안전, 1: 옐로우1차, 2: 2차 레드
                            result_img = self.camImg
                    else:
                        result_img = self.camImg

                fstGroupSensing = None
                secGroupSensing = None

                # print('rsigs :', rsigs)
                testSigs = [[0,1], [2,0], [2,0]]
                fstGroup =[]
                secGroup =[]
                if len(rsigs)>0 and len(rsigs[0])>0:
                    for person in rsigs:
                        # print('person',person)
                        fstGroup.append(person[0])
                        if len(person)>1:
                            secGroup.append(person[1])

                # print('첫번째 사람들만', fstGroup)
                # print('두번째 사람들만', secGroup)

                if len(fstGroup) > 0 :
                    # print('첫번째 그룹 ', max(fstGroup))
                    fstGroupSensing = max(fstGroup)

                if len(secGroup) > 0:
                    # print('두번째 그룹 ', max(secGroup))
                    secGroupSensing = max(secGroup)

                # timeCnt가 낮을수록 Yellow, Red 업데이트 속도 빨라짐. 너무 빠르면 성능에 문제 있을 수 있음
                if timeCnt == 8 and len(str(self.todayFstCamDataId)) > 0:
                    print('첫번째 그룹 입니다 #####################################timeCnt :', timeCnt)
                    # timeCnt = 0
                    '''
                    1차 감지, 2차 감지에 따라 안전 등급 수정 
                    '''
                    if fstGroupSensing is not None:
                        if fstGroupSensing == 0:  # 사람 감지
                            print('1 FST GREEN FST GREEN FST GREEN FST GREEN FST GREEN FST GREEN 1')
                            if fstSensingLevel != 'GREEN':
                                # rsig에서 첫번째 배열이 첫번째 그룹이고 여기서 1이 하나라도 있으면 yellow, 2가 하나라도 있으면 red가 된다.
                                if len(str(self.todayFstCamDataId)) > 0:
                                    self.updateCurrentLevel(self.todayFstCamDataId, 'Green')
                            fstSensingLevel = 'GREEN'
                        elif fstGroupSensing == 1:
                            print('1 FST YELLOW FST YELLOW FST YELLOW FST YELLOW FST YELLOW FST YELLOW 1')
                            # Green level에서 yellow 되었을 경우에만 카운트를 올린다.
                            if fstSensingLevel != 'YELLOW' and fstSensingLevel != 'RED':
                                if len(str(self.todayFstCamDataId)) > 0:  # 첫번째 그룹에서 감지 되었을 경우
                                    self.fstYellowCnt = self.fstYellowCnt + 1
                                    self.updateCurrentLevelCnt(self.todayFstCamDataId, 'Yellow', self.fstYellowCnt)
                                    self.screenCaptureInsertData(result_img, 'Yellow')
                            fstSensingLevel = 'YELLOW'
                        elif fstGroupSensing == 2:
                            print('1 FST RED FST RED FST RED FST RED FST RED FST RED 1')
                            if fstSensingLevel != 'RED':  # sensingLevel이 RED가 아닐때 캡쳐 및 데이터 수정
                                if len(str(self.todayFstCamDataId)) > 0:
                                    self.fstRedCnt = self.fstRedCnt + 1
                                    self.updateCurrentLevelCnt(self.todayFstCamDataId, 'Red', self.fstRedCnt)
                                    self.screenCaptureInsertData(result_img, 'Red')
                            fstSensingLevel = 'RED'

                # print('str(self.todaySecCamDataId)', str(self.todaySecCamDataId))
                if timeCnt == 8 and len(str(self.todaySecCamDataId)) > 0:
                    print('두번 그룹 입니다 #####################################timeCnt :', timeCnt)
                    # timeCnt = 0
                    if secGroupSensing is not None:
                        if secGroupSensing == 0:
                            print('2 SEC GREEN SEC GREEN SEC GREEN SEC GREEN SEC GREEN SEC GREEN 2')
                            if secSensingLevel != 'GREEN':
                                if len(str(self.todaySecCamDataId)) > 0:  # 두번째 그룹에서 감지 되었을 경우
                                    self.updateCurrentLevel(self.todaySecCamDataId, 'Green')
                            secSensingLevel = 'GREEN'
                        elif secGroupSensing == 1:
                            print('2 SEC YELLOW SEC YELLOW SEC YELLOW SEC YELLOW SEC YELLOW SEC YELLOW 2')
                            if secSensingLevel != 'YELLOW' and secSensingLevel != 'RED':
                                if len(str(self.todaySecCamDataId)) > 0:  # 두번째 그룹에서 감지 되었을 경우
                                    self.secYellowCnt = self.secYellowCnt + 1
                                    self.updateCurrentLevelCnt(self.todaySecCamDataId, 'Yellow', self.secYellowCnt)
                                    self.screenCaptureInsertData(result_img, 'Yellow')
                            secSensingLevel = 'YELLOW'
                        elif secGroupSensing == 2:
                            print('2 SEC RED SEC RED SEC RED SEC RED SEC RED SEC RED 2')
                            if secSensingLevel != 'RED':
                                if len(str(self.todaySecCamDataId)) > 0:  # 두번째 그룹에서 감지 되었을 경우
                                    self.secRedCnt = self.secRedCnt + 1
                                    self.updateCurrentLevelCnt(self.todaySecCamDataId, 'Red', self.secRedCnt)
                                    self.screenCaptureInsertData(result_img, 'Red')
                            secSensingLevel = 'RED'

                if timeCnt == 8:
                    timeCnt = 0

                if len(result_img) <= 0: continue
                result_img = np.array(result_img)
                result_img = cv2.resize(result_img, dsize=(self.camWidth, self.camHeight),
                                        interpolation=cv2.INTER_CUBIC)
                ret, buffer = cv2.imencode('.jpg', result_img)
                frame = buffer.tobytes()

                # 관제 PC에 저장이 되어야함.
                # video 녹화
                if self.recordGate:
                    # VIDEO 저장 메서드
                    self.videoWriter.write(result_img)
                    print(self.recordGate)
                    # cv2.imshow('frame', result_img)
                else:
                    cv2.destroyAllWindows()
                    self.saveFile(self.videoFolderPath, self.videoRecordPath)

                # 스크린 캡쳐
                if self.captureGate:
                    print('SCREEN CAPTURE SCREEN CAPTURE SCREEN CAPTURE SCREEN CAPTURE SCREEN CAPTURE SCREEN CAPTURE ')
                    self.screenCaptureInsertData(result_img, 'Normal')
                    self.captureGate = False
                    self.saveFile(self.screenShotFolderPath, self.screenShotRecordPath)

                # 칼리브레이션 이미지 캡쳐
                if self.calibCaptureGate:
                    print('CALIB CAPTURE CALIB CAPTURE CALIB CAPTURE CALIB CAPTURE CALIB CAPTURE')
                    self.updateCalibrationImgPath(self.trackerId, result_img, self.screenShotRecordPath)
                    self.calibCaptureGate = False
                    self.saveFile(self.screenShotFolderPath, self.screenShotRecordPath)

                # 키보드 눌렀을 시 이벤트 발생
                if k == ord('s'):
                    print("Screenshot saved...")
                    # 이미지 저장 메서드
                    cv2.imwrite(self.screenShotRecordPath, result_img, params=[cv2.IMWRITE_PNG_COMPRESSION, 0])
                    self.saveFile(self.screenShotFolderPath, self.screenShotRecordPath)
                elif k == ord('q'):
                    break

                yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + bytearray(frame) + b'\r\n')

            except Exception as e:
                print('예외가 발생했습니다.', e)
                print(traceback.format_exc())
