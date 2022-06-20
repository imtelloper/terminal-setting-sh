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

# W: 256 H: 192
class StreamService:
    def __init__(self):
        '''
        지금 이 미니 PC가 CAM1인지 2인지 알 수 있음
        지금 미니 PC가 알 수 있는것들
        area, camPort

        오늘 날짜로 CAM1의 데이터가 있다면 그것을 가져와서 ObjectId에 넣고 사용하고
        아니라면 만들도록 한다.
        '''
        print('##############self.list_ports() : ', self.list_ports())
        self.currentPort = None
        if(self.list_ports()[1]):
            self.currentPort = self.list_ports()[1][0]
            self.video = cv2.VideoCapture(self.currentPort)
            self.video.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
            self.video.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        else:
            os.system("fuser -k 8000/tcp")
            self.video = cv2.VideoCapture(0)
        self.cameraOnOff = True
        self.observeService = ObserveService()
        self.dbName = config.DB_NAME
        self.tableName = config.TABLE_OBSERVE
        self.todayCamDataId = ""

        # self.camData = getConnection()[self.dbName][self.tableName].find({'camPort':'string'})

    def __del__(self):
        self.video.release()

    def setCameraOff(self):
        self.cameraOnOff = False

    def setCameraOn(self):
        self.cameraOnOff = True

    async def searchDatas(self, data: dict):
        dataArr = []
        async for val in findDatas(self.dbName, self.tableName, data):
            dataArr.append(val)
        return dataArr

    async def addTodayCamData(self):
        today = str(datetime.date.today())
        dataArr = []
        searchedData = findDatas(self.dbName, self.tableName, {
            'camPort': config.CAMPORT,
            'date': today,
        })
        try:
            # 데이터가 들어 있으므로 전역변수에 셋팅한다.
            async for val in searchedData:
                print('val valvalvalvalvalval : ', val)
                dataArr.append(val)

            print('############################')
            print('dataArr : ', dataArr[0])
            foundData = dataArr[0]
            print('foundData[alarms] : ', foundData['alarms'])
            self.todayCamDataId = foundData['_id']

        except Exception as e:
            # 데이터가 없으므로 오늘자 데이터를 삽입한다.
            insertData = {
                "area": config.AREA,
                "camPort": config.CAMPORT,
                "activate": True,
                "alarms": "없음",
                "date": today,
            }
            resultData = await insertOne(self.dbName, self.tableName, insertData)
            newData = await findOne(self.dbName, self.tableName, {"_id": ObjectId(resultData.inserted_id)})
            print('newData : ',newData)
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
                # print('camera.read() : ',camera.read())
                is_reading, img = camera.read()
                w = camera.get(3)
                h = camera.get(4)
                print('is_reading : ', is_reading)
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

        # 전역 변수
        # color
        GREEN = (0, 255, 0)
        RED = (0, 0, 255)
        BLUE = (255, 0, 0)

        #  /area/50,50,400,50,400,300,50,300/200,200,300,200,300,300,200,300
        img_color = False
        setting_signal = False
        rois_history = []  # rois history
        # rois1 = Yellow Zone / 2차원으로 설정 가능하며 배열 안에서 첫번째 배열 좌표값은 첫번째 Yellow Zone이다. 두번째 배열 좌표값은 두번째 Yellow Zone이다.
        # rois1 = [[(50,50), (400,50), (400,300), (50,300)]]
        rois1 = coordinates1
        # rois2 = Red Zone / 2차원으로 설정 가능하며 배열 안에서 첫번째 배열 좌표값은 첫번째 Red Zone이다. 두번째 배열 좌표값은 두번째 Red Zone이다.
        # rois2 = [[(200,200), (300,200), (300,300), (200,300)]]
        rois2 = coordinates2
        sub_rois = []  # 다중 polygon을 위한 리스트
        rois_type = 1
        rois_signal = False  # polygon 영역지정 신호
        btn_rois_signal = 0  # 영역지정 버튼 신호
        btn_run_signal = 0  # 실행 버튼 신호
        yolo_cnt = 0
        cnt = 0  # 트랙킹시 사라진 객체를 프레임수마다 카운팅
        track_signal = False  # 트랙킹 신호 True면 트랙킹한다
        buzzer_cnt = 0  # 경고음 카운트
        warning_signal = 0
        unit_num = 9  # 사람 영역 분할 계수
        warn_sig = None

        # tracking api 호출
        multi_tracker = cv2.MultiTracker_create()

        imgType = 'jpeg'
        timeCnt = 0
        while self.cameraOnOff:
            timeCnt += 1
            sensing = ''
            time.sleep(0.1)
            ret, frame = self.video.read()
            if frame is None: return
            img = frame.copy()
            img = np.array(img) # hoon
            img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            img = cv2.resize(img, dsize=(512,384), interpolation=cv2.INTER_AREA)
            if ret:
                humans = []
                try:
                    result_img = ""
                    if cnt == 0:
                        # 욜로 감지(딥러닝을 돌린다. 사람을 찾아주는 기능)
                        humans = detect(weights=pt, device=device_mode, conf_thres=conf, source=img)
                        multi_tracker.__init__()
                        track_signal = False
                        cnt += 1
                    elif cnt > 0 and cnt < 3:
                        # 트랙킹 돌리기(추적한다., 박스가 따라간다.)
                        cnt += 1
                    else:
                        cnt = 0
                    # 욜로가 0.2초, 트랙킹이 3번 <- 반복
                    if humans:
                        # 욜로로 감지 -> 객체를 오픈cv
                        print('humans')
                        # detection
                        for bbox in humans:
                            x1, y1, x2, y2 = tuple([int(_) for _ in bbox])
                            w, h = x2 - x1, y2 - y1
                            track_bbox = (x1, y1, w, h)
                            # tracking signal
                            multi_tracker.add(cv2.TrackerCSRT_create(), img, track_bbox)
                            track_signal = True
                            warn_sig, result_img = calculate_human(img, x1, y1, x2, y2, w, h, unit_num, [rois1, rois2])
                            sensing = warn_sig
                            print('warn_sig', warn_sig) # 0:안전, 1: 옐로우1차, 2: 2차 레드

                    else:
                        print('aliean')
                        # print("tracking")
                        if track_signal:
                            ret, t_bboxes = multi_tracker.update(img)
                            if ret:
                                for i, t_bbox in enumerate(t_bboxes):
                                    x1, y1, w, h = tuple([int(_) for _ in t_bbox])
                                    x2, y2 = x1 + w, y1 + h
                                    warn_sig, result_img = calculate_human(img, x1, y1, x2, y2, w, h, unit_num, [rois1, rois2])
                                    sensing = warn_sig
                                    print('warn_sig',warn_sig) # 0:안전, 1: 옐로우1차, 2: 2차 레드
                        else:
                            result_img = img

                    if timeCnt == 10:
                        print('#########################################################timeCnt :',timeCnt)
                        timeCnt = 0
                        '''
                        1차 감지, 2차 감지에 따라 안전 등급 수정 
                        '''
                        print('warn_sig', warn_sig)
                        if warn_sig == 0:
                            # 사람 감지
                            print('GREEN GREEN GREEN GREEN GREEN GREEN GREEN GREEN GREEN GREEN GREEN GREEN GREEN')
                            getConnection()[self.dbName][self.tableName].update_one(
                                {'_id': ObjectId(self.todayCamDataId)},
                                {'$set':
                                    {
                                        'camSafetyLevel': 'Green'
                                    }
                                }
                            )
                        elif warn_sig == 1:
                            # 1차 감지
                            print('YELLOW YELLOW YELLOW YELLOW YELLOW YELLOW YELLOW YELLOW YELLOW YELLOW YELLOW')
                            getConnection()[self.dbName][self.tableName].update_one(
                                {'_id': ObjectId(self.todayCamDataId)},
                                {'$set':
                                    {
                                        'camSafetyLevel': 'Yellow'
                                    }
                                }
                            )
                        elif warn_sig == 2:
                            # 2차 감지
                            print('RED RED RED RED RED RED RED RED RED RED RED RED RED RED RED RED RED RED RED')

                            getConnection()[self.dbName][self.tableName].update_one(
                                {'_id': ObjectId(self.todayCamDataId)},
                                {'$set':
                                    {
                                        'camSafetyLevel': 'Red'
                                    }
                                }
                            )


                    print('############## len result_img : ', len(result_img))
                    if len(result_img) <= 0:
                        continue
                    result_img = np.array(result_img)  # hoon
                    result_img = cv2.resize(result_img, dsize=(512,384), interpolation=cv2.INTER_CUBIC)
                    ret, buffer = cv2.imencode('.jpg', result_img)
                    # ret, buffer = cv2.imencode('.webp', result_img)

                    frame = buffer.tobytes()
                    yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + bytearray(frame) + b'\r\n')
                    # yield (b'--frame\r\n' b'Content-Type: image/webp\r\n\r\n' + bytearray(frame) + b'\r\n')

                except Exception as e:
                    print('예외가 발생했습니다.', e)
                    print(traceback.format_exc())