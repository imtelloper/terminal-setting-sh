import cv2
import traceback

from modules.calculate import calculate_human
from modules.yolov5.detect import detect


class StreamService:
    def __init__(self):
        self.videoNum = 0

    def video_streaming(self, coordinates=[]):
        print('steam video start : ', coordinates)
        # W: 256 H: 192
        capture = cv2.VideoCapture(self.videoNum)
        capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

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
        result_img=""

        while cv2.waitKey(33) < 0:
            ret, frame = capture.read()
            img = frame.copy()
            img = cv2.resize(img, dsize=(256,192), interpolation=cv2.INTER_AREA)
            if ret:
                humans = []
                try:
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

                    result_img = cv2.resize(result_img, dsize=(1024,768), interpolation=cv2.INTER_CUBIC)
                    ret, buffer = cv2.imencode('.jpg', result_img)
                    # ret, buffer = cv2.imencode('.webp', result_img)

                    frame = buffer.tobytes()
                    yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + bytearray(frame) + b'\r\n')
                    # yield (b'--frame\r\n' b'Content-Type: image/webp\r\n\r\n' + bytearray(frame) + b'\r\n')

                except Exception as e:
                    print('예외가 발생했습니다.', e)
                    # print(traceback.format_exc())