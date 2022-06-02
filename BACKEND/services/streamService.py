import os
import time
import cv2
import traceback
import numpy as np
from modules.calculate import calculate_human
from modules.yolov5.detect import detect

# W: 256 H: 192
class StreamService:
    def __init__(self):
        print('##############self.list_ports() : ', self.list_ports())
        self.video = cv2.VideoCapture(self.list_ports()[1][0])
        self.video.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        self.video.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        self.cameraOnOff = True

    def __del__(self):
        self.video.release()

    def setCameraOff(self):
        self.cameraOnOff = False

    def setCameraOn(self):
        self.cameraOnOff = True

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


    def video_streaming(self, coordinates=[]):
        # 사용자 설정
        pt = "modules/yolov5/weights/1_nano.pt"
        device_mode = ""
        conf = 0.7

        # 전역 변수
        # color
        GREEN = (0, 255, 0)
        RED = (0, 0, 255)
        BLUE = (255, 0, 0)

        img_color = False
        setting_signal = False
        rois_history = []  # rois history
        # rois = [[(200,200), (200,600), (800,200), (800,600)]]  # polygon 영역
        rois = coordinates  # polygon 영역
        sub_rois = []  # 다중 polygon을 위한 리스트
        rois_signal = False  # polygon 영역지정 신호
        btn_rois_signal = 0  # 영역지정 버튼 신호
        btn_run_signal = 0  # 실행 버튼 신호
        yolo_cnt = 0
        cnt = 0  # 트랙킹시 사라진 객체를 프레임수마다 카운팅
        track_signal = False  # 트랙킹 신호 True면 트랙킹한다
        buzzer_cnt = 0  # 경고음 카운트
        red_signal = False
        green_signal = True
        unit_num = 9  # 사람 영역 분할 계수

        # tracking api 호출
        multi_tracker = cv2.MultiTracker_create()

        imgType = 'jpeg'

        while self.cameraOnOff:
            time.sleep(0.1)
            ret, frame = self.video.read()
            if frame is None: return
            img = frame.copy()
            img = np.array(img) # hoon
            img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

            img = cv2.resize(img, dsize=(256,192), interpolation=cv2.INTER_AREA)
            if ret:
                humans = []
                try:
                    result_img = ""
                    if cnt == 0:
                        humans = detect(weights=pt, device=device_mode, conf_thres=conf, source=img)
                        multi_tracker.__init__()
                        track_signal = False
                        cnt += 1
                    elif cnt > 0 and cnt < 3:
                        cnt += 1
                    else:
                        cnt = 0

                    if humans:
                        # detection
                        for bbox in humans:
                            x1, y1, x2, y2 = tuple([int(_) for _ in bbox])
                            w, h = x2 - x1, y2 - y1
                            track_bbox = (x1, y1, w, h)
                            # tracking signal
                            multi_tracker.add(cv2.TrackerCSRT_create(), img, track_bbox)
                            track_signal = True
                            warn_sig, result_img = calculate_human(img, x1, y1, x2, y2, w, h, unit_num, rois)

                    else:
                        # print("tracking")
                        if track_signal:
                            ret, t_bboxes = multi_tracker.update(img)
                            if ret:
                                for i, t_bbox in enumerate(t_bboxes):
                                    x1, y1, w, h = tuple([int(_) for _ in t_bbox])
                                    x2, y2 = x1 + w, y1 + h
                                    warn_sig, result_img = calculate_human(img, x1, y1, x2, y2, w, h, unit_num, rois)

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