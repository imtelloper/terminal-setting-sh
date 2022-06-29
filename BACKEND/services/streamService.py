import os
import time
import cv2
import traceback
import numpy as np
import config
import datetime
from modules.calculate import calculate_human
from modules.yolov5.detect import detect
from database.mongoDB import *
from services.observeService import ObserveService
from fastapi.encoders import jsonable_encoder
from repo.baseRepo import *
from routers.observeRouter import modifyOneData
from bson import ObjectId
from util import *


# W: 256 H: 192
class StreamService:
    def __init__(self):
        self.camWidth = 512
        self.camHeight = 384
        # 카메라 포트
        self.camPort = config.CAMPORT
        # 카메라 설치 구역
        self.camArea = config.AREA.replace(" ", "")
        # 각 파일들의 폴더들이 저장될 루트 경로
        # self.savePath = '{0}/safety-archives'.format(os.path.expanduser('~'))
        # self.savePath = './safety-archives'
        self.savePath = '/home/interx/SAFETY-AI/BACKEND/safety-archives'
        # 현재 날짜
        self.currentDate = datetime.datetime.now().strftime('%Y-%m-%d')
        # 현재 시간
        self.currentTime = datetime.datetime.now().strftime('%Y-%m-%d_%H:%M:%S.%f')
        # 파일명을 다르게 하기 위한 파일 정보 생성
        self.fileInfo = '-{0}-{1}-{2}'.format(self.camArea, self.camPort, self.currentTime)
        # 녹화 파일 저장 경로  safety-archives / 오늘날짜 / area / camPort / video
        self.videoFolderPath = '{0}/{1}/{2}/{3}/video'.format(self.savePath, self.currentDate, self.camArea,
                                                              self.camPort)
        # 녹화 파일 이름
        self.videoRecordPath = '{0}/safety-record{1}.avi'.format(self.videoFolderPath, self.fileInfo)
        # 캡쳐 파일 저장 경로  safety-archives / 오늘날짜 / area / camPort / capture
        self.screenShotFolderPath = '{0}/{1}/{2}/{3}/capture'.format(self.savePath, self.currentDate, self.camArea,
                                                                     self.camPort)
        # 캡쳐 파일 이름
        self.screenShotRecordPath = '{0}/safety-shot{1}.png'.format(self.screenShotFolderPath, self.fileInfo)
        self.fcc = cv2.VideoWriter_fourcc('M', 'J', 'P', 'G')
        self.fps = 30
        # cv 녹화 객체
        self.videoWriter = None
        # 녹화 시작, 중지를 위한 bool
        self.recordGate = False
        # 캡쳐를 위한 bool
        self.captureGate = False
        # 카메라가 mini pc에 연결된 포트 번호
        self.currentPort = None
        self.listPorts = self.list_ports()
        if (self.listPorts[1]):
            self.currentPort = self.listPorts[1][0]
            self.video = cv2.VideoCapture(self.currentPort)
            self.video.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
            self.video.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        else:
            os.system("fuser -k 8000/tcp")
            self.video = cv2.VideoCapture(0)
        # 스트림 카메라를 열었다면 닫아줘야 재활성화 되기 때문에 필요한 bool
        self.cameraOnOff = True
        self.observeService = ObserveService()
        self.dbName = config.DB_NAME
        self.tableName = config.TABLE_OBSERVE
        self.todayCamDataId = ""
        # 각종 파일 저장 경로 폴더 생성
        # makedirs(self.videoFolderPath)
        # makedirs(self.screenShotFolderPath)
        print('##### CONNECTED CAMERA ##### : ', self.listPorts)

    def __del__(self):
        self.video.release()

    def setCurrentPort(self, port):
        self.currentPort = port

    # 열린 스트림 카메라를 닫아주기 위한 메서드
    def setCameraOff(self):
        self.cameraOnOff = False

    # 열린 스트림 카메라를 닫아주기 위한 메서드
    def setCameraOn(self):
        self.cameraOnOff = True

    # 캡쳐를 하기 위한 메서드
    def setCaptureGateOpen(self):
        self.initScreenCapturePath()
        self.captureGate = True
        return True

    # 녹화 시작 메서드
    def setRecordGateOpen(self):
        self.initVideoRecordPath()
        self.recordGate = True
        return True

    # 녹화 중지 메서드
    def setRecordGateClose(self):
        self.recordGate = False
        return False

    # 녹화 경로, 파일명 초기화
    def initVideoRecordPath(self):
        self.currentDate = datetime.datetime.now().strftime('%Y-%m-%d')
        self.currentTime = datetime.datetime.now().strftime('%Y-%m-%d_%H:%M:%S.%f')
        self.fileInfo = '-{0}-{1}-{2}'.format(self.camArea, self.camPort, self.currentTime)
        self.videoFolderPath = '{0}/{1}/{2}/{3}/video'.format(self.savePath, self.currentDate, self.camArea,
                                                              self.camPort)
        self.videoRecordPath = '{0}/safety-record{1}.avi'.format(self.videoFolderPath, self.fileInfo)
        self.videoWriter = cv2.VideoWriter(self.videoRecordPath, self.fcc, self.fps, (self.camWidth, self.camHeight))

        self.insertVideoRecordPath(self.getTrackerId())

    async def insertVideoRecordPath(self, trackerId):
        print('insertVideoRecordPath trackerId',trackerId)
        insertData = {
            "trackerId": trackerId,
            "fileType": "video",
            "path": self.videoRecordPath,
            "safetyLevel": "",
        }
        resultData = insertOne(self.dbName, config.TABLE_ARCHIVE, insertData)
        print('resultData',resultData)
        return resultData

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
        trackerId = foundData['_id']
        print('trackerId',trackerId)
        return trackerId

    # 스크린 캡쳐 경로, 파일명 초기화
    def initScreenCapturePath(self):
        self.currentDate = datetime.datetime.now().strftime('%Y-%m-%d')
        self.currentTime = datetime.datetime.now().strftime('%Y-%m-%d_%H:%M:%S.%f')
        self.fileInfo = '-{0}-{1}-{2}'.format(self.camArea, self.camPort, self.currentTime)
        self.screenShotFolderPath = '{0}/{1}/{2}/{3}/capture'.format(self.savePath, self.currentDate, self.camArea,
                                                                     self.camPort)
        self.screenShotRecordPath = '{0}/safety-shot{1}.png'.format(self.screenShotFolderPath, self.fileInfo)

    async def searchDatas(self, data: dict):
        dataArr = []
        async for val in findDatas(self.dbName, self.tableName, data):
            dataArr.append(val)
        return dataArr

    async def addTodayCamData(self):
        today = str(datetime.date.today())
        dataArr = []
        searchedData = findDatas(self.dbName, self.tableName, {
            'camPort': self.camPort,
            'date': today,
        })
        try:
            # 데이터가 들어 있으므로 전역변수에 셋팅한다.
            async for val in searchedData:
                dataArr.append(val)

            foundData = dataArr[0]
            self.todayCamDataId = foundData['_id']
        except Exception as e:
            # 데이터가 없으므로 오늘자 데이터를 삽입한다.
            insertData = {
                "area": self.camArea,
                "camPort": self.camPort,
                "activate": True,
                "alarms": "없음",
                "date": today,
            }
            resultData = await insertOne(self.dbName, self.tableName, insertData)
            newData = await findOne(self.dbName, self.tableName, {"_id": ObjectId(resultData.inserted_id)})
            self.todayCamDataId = resultData.inserted_id

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

    def video_streaming(self, coordinates1=[], coordinates2=[]):
        print('video_streaming video check : ', self.currentPort)
        if self.currentPort == None:
            os.system("fuser -k 8000/tcp")
        # 사용자 설정
        # pt = "modules/yolov5/weights/1_nano.pt"
        pt = "/home/interx/SAFETY-AI/BACKEND/modules/yolov5/weights/1_nano.pt"
        device_mode = ""
        conf = 0.7
        # rois1 = Yellow Zone / 2차원으로 설정 가능하며 배열 안에서 첫번째 배열 좌표값은 첫번째 Yellow Zone이다. 두번째 배열 좌표값은 두번째 Yellow Zone이다.
        rois1 = coordinates1  # [[(50,50), (400,50), (400,300), (50,300)]]
        # rois2 = Red Zone / 2차원으로 설정 가능하며 배열 안에서 첫번째 배열 좌표값은 첫번째 Red Zone이다. 두번째 배열 좌표값은 두번째 Red Zone이다.
        rois2 = coordinates2  # [[(200,200), (300,200), (300,300), (200,300)]]
        cnt = 0  # 트랙킹시 사라진 객체를 프레임수마다 카운팅
        track_signal = False  # 트랙킹 신호 True면 트랙킹한다
        unit_num = 9  # 사람 영역 분할 계수
        warn_sig = None
        # tracking api 호출
        multi_tracker = cv2.MultiTracker_create()
        imgType = 'jpeg'
        timeCnt = 0
        sensingLevel = None

        while self.cameraOnOff:
            k = cv2.waitKey(1) & 0xFF
            timeCnt += 1
            time.sleep(0.08)
            ret, frame = self.video.read()
            if frame is None: return
            img = frame.copy()
            img = np.array(img)  # hoon
            img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            img = cv2.resize(img, dsize=(self.camWidth, self.camHeight), interpolation=cv2.INTER_AREA)
            if not ret: return

            humans = []
            try:
                result_img = ""
                if cnt == 0:
                    # 욜로 감지(딥러닝을 돌린다. 사람을 찾아주는 기능)
                    humans = detect(weights=pt, device=device_mode, conf_thres=conf, source=img)
                    multi_tracker.__init__()
                    track_signal = False
                    cnt += 1
                elif 0 < cnt and cnt < 3:
                    # 트랙킹 돌리기(추적한다., 박스가 따라간다.)
                    cnt += 1
                else:
                    cnt = 0
                # 욜로가 0.2초, 트랙킹이 3번 <- 반복
                if humans:
                    # 욜로로 감지 -> 객체를 오픈cv
                    # detection
                    for bbox in humans:
                        x1, y1, x2, y2 = tuple([int(_) for _ in bbox])
                        w, h = x2 - x1, y2 - y1
                        track_bbox = (x1, y1, w, h)
                        # tracking signal
                        multi_tracker.add(cv2.TrackerCSRT_create(), img, track_bbox)
                        track_signal = True
                        warn_sig, result_img = calculate_human(img, x1, y1, x2, y2, w, h, unit_num, [rois1, rois2])
                        # print('warn_sig', warn_sig) # 0:안전, 1: 옐로우1차, 2: 2차 레드
                else:
                    # tracking
                    if track_signal:
                        ret, t_bboxes = multi_tracker.update(img)
                        if ret:
                            for i, t_bbox in enumerate(t_bboxes):
                                x1, y1, w, h = tuple([int(_) for _ in t_bbox])
                                x2, y2 = x1 + w, y1 + h
                                warn_sig, result_img = calculate_human(img, x1, y1, x2, y2, w, h, unit_num,
                                                                       [rois1, rois2])
                                # print('warn_sig',warn_sig) # 0:안전, 1: 옐로우1차, 2: 2차 레드
                    else:
                        result_img = img

                # timeCnt가 낮을수록 Yellow, Red 업데이트 속도 빨라짐. 너무 빠르면 성능에 문제 있을 수 있음
                if timeCnt == 8:
                    print('#########################################################timeCnt :', timeCnt)
                    timeCnt = 0
                    '''
                    1차 감지, 2차 감지에 따라 안전 등급 수정 
                    '''
                    print('warn_sig', warn_sig)
                    if warn_sig == 0:
                        # 사람 감지
                        print('GREEN GREEN GREEN GREEN GREEN GREEN GREEN GREEN GREEN GREEN GREEN GREEN GREEN')
                        if sensingLevel != 'GREEN':
                            getConnection()[self.dbName][self.tableName].update_one(
                                {'_id': ObjectId(self.todayCamDataId)},
                                {'$set':
                                    {
                                        'camSafetyLevel': 'Green'
                                    }
                                }
                            )
                        sensingLevel = 'GREEN'
                    elif warn_sig == 1:
                        print('YELLOW YELLOW YELLOW YELLOW YELLOW YELLOW YELLOW YELLOW YELLOW YELLOW YELLOW')
                        if sensingLevel != 'YELLOW':
                            self.initScreenCapturePath()
                            cv2.imwrite(self.screenShotRecordPath, result_img, params=[cv2.IMWRITE_PNG_COMPRESSION, 0])
                            getConnection()[self.dbName][self.tableName].update_one(
                                {'_id': ObjectId(self.todayCamDataId)},
                                {'$set':
                                    {
                                        'camSafetyLevel': 'Yellow'
                                    }
                                }
                            )
                        sensingLevel = 'YELLOW'
                    elif warn_sig == 2:
                        print('RED RED RED RED RED RED RED RED RED RED RED RED RED RED RED RED RED RED RED')
                        # sensingLevel이 RED가 아닐때 캡쳐 및 데이터 수정
                        if sensingLevel != 'RED':
                            self.initScreenCapturePath()
                            cv2.imwrite(self.screenShotRecordPath, result_img, params=[cv2.IMWRITE_PNG_COMPRESSION, 0])
                            getConnection()[self.dbName][self.tableName].update_one(
                                {'_id': ObjectId(self.todayCamDataId)},
                                {'$set':
                                    {
                                        'camSafetyLevel': 'Red'
                                    }
                                }
                            )
                        sensingLevel = 'RED'
                    else:
                        warn_sig = None

                # print('############## len result_img : ', len(result_img))
                if len(result_img) <= 0:
                    continue
                result_img = np.array(result_img)  # hoon
                result_img = cv2.resize(result_img, dsize=(self.camWidth, self.camHeight),
                                        interpolation=cv2.INTER_CUBIC)
                ret, buffer = cv2.imencode('.jpg', result_img)
                frame = buffer.tobytes()

                # 관제 PC에 저장이 되어야함.

                # video 녹화
                if self.recordGate:
                    # print('self.recordGate', self.recordGate)
                    # print('self.videoRecordPath', self.videoRecordPath)
                    # VIDEO 저장 메서드
                    self.videoWriter.write(result_img)
                    # cv2.imshow('frame', result_img)
                else:
                    cv2.destroyAllWindows()

                # 스크린 캡쳐
                if self.captureGate:
                    cv2.imwrite(self.screenShotRecordPath, result_img, params=[cv2.IMWRITE_PNG_COMPRESSION, 0])
                    self.captureGate = False

                # 키보드 눌렀을시 이벤트 발생
                if k == ord('s'):
                    print("Screenshot saved...")
                    # 이미지 저장 메서드
                    cv2.imwrite(self.screenShotRecordPath, result_img, params=[cv2.IMWRITE_PNG_COMPRESSION, 0])
                elif k == ord('q'):
                    break

                yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + bytearray(frame) + b'\r\n')

            except Exception as e:
                print('예외가 발생했습니다.', e)
                print(traceback.format_exc())
