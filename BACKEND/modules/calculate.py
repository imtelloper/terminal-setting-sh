import cv2
import sys, os
import datetime
import numpy as np
from shapely.geometry import Point, Polygon


class HumanCalculator:
    def __init__(self):
        self.camImg = None
        self.GREEN = (0, 255, 0)
        self.YELLOW = (0, 255, 255)
        self.RED = (0, 0, 255)
        self.BLUE = (255, 0, 0)

    def calculate_human(self, cam, bboxes, unit_num, rois):
        # print('unit_num',unit_num)
        # print('roid',rois)
        warning_signal = None
        self.camImg = cam
        results = []
        # 사람 영역 계산
        for bbox in bboxes:
            point_in_poly1, point_in_poly2, human_box = [], [], []
            x1, y1, x2, y2, w, h = bbox
            unit_x, unit_y = int(w / unit_num), int(h / unit_num)
            for ix in range(unit_num + 1):
                for iy in range(unit_num + 1):
                    hx, hy = int((unit_x * ix) + x1), int((unit_y * iy) + y1)
                    human_box.append((hx, hy))

                # temp = human_temp(cam, x1, y1, x2, y2)

        # def camSigSetting(warnSig, color):
        #     warning_signal = warnSig
        #     camImg = cv2.rectangle(cam, (x1, y1), (x2, y2), color, 3)
        #     sigs.append(warning_signal)

        # Yellow 영역 True or False push
            rsigs = []
            for roi in rois:
                sigs, sig_poly1, sig_poly2 = [], [], []
                roi1, roi2 = roi
                if roi1:
                    for human_roi in human_box:
                        human_point = Point(human_roi)
                        rois1 = list((np.array(roi1)).round(0))
                        poly1 = Polygon(rois1)
                        point_in_poly1.append(human_point.within(poly1))
                        sig_poly1.append(human_point.within(poly1))

                if roi2:
                    for human_roi in human_box:
                        human_point = Point(human_roi)
                        rois2 = list((np.array(roi2)).round(0))
                        poly2 = Polygon(rois2)
                        point_in_poly2.append(human_point.within(poly2))
                        sig_poly2.append(human_point.within(poly2))

                if not roi1 and not roi2:
                    self.camImg = cv2.rectangle(self.camImg, (x1, y1), (x2, y2), self.GREEN, 3)
                    # camSigSetting(0, GREEN)

                    # draw rectangle
                elif True in point_in_poly1 and True in point_in_poly2:
                    self.camImg = cv2.rectangle(self.camImg, (x1, y1), (x2, y2), self.RED, 3)
                    # camSigSetting(2, RED)

                elif True in point_in_poly2 and not True in point_in_poly1:
                    self.camImg = cv2.rectangle(self.camImg, (x1, y1), (x2, y2), self.RED, 3)
                    # camSigSetting(2, RED)

                elif True in point_in_poly1 and not True in point_in_poly2:
                    self.camImg = cv2.rectangle(self.camImg, (x1, y1), (x2, y2), self.YELLOW, 3)
                    # camSigSetting(1, YELLOW)

                elif not True in point_in_poly1 and not True in point_in_poly2:
                    self.camImg = cv2.rectangle(self.camImg, (x1, y1), (x2, y2), self.GREEN, 3)
                    # camSigSetting(0, GREEN)

                if not roi1 and not roi2:
                    warning_signal = 0
                    sigs.append(warning_signal)
                    # camSigSetting(0, GREEN)

                    # draw rectangle
                elif True in sig_poly1 and True in sig_poly2:
                    warning_signal = 2
                    sigs.append(warning_signal)
                    # camSigSetting(2, RED)

                elif True in sig_poly2 and not True in sig_poly1:
                    warning_signal = 2
                    sigs.append(warning_signal)
                    # camSigSetting(2, RED)

                elif True in sig_poly1 and not True in sig_poly2:
                    warning_signal = 1
                    sigs.append(warning_signal)
                    # camSigSetting(1, YELLOW)

                elif not True in sig_poly1 and not True in sig_poly2:
                    warning_signal = 0
                    sigs.append(warning_signal)
                    # camSigSetting(0, GREEN)

                sig = max(sigs)
                rsigs.append(sig),
            results.append(rsigs)

        return results, self.camImg


def save_files(img, save_path):
    os.makedirs(save_path, exist_ok=True)
    now = datetime.datetime.now()
    save_name = f'{save_path}/warning_{now.strftime("%Y_%m_%d_%H_%M_%S")}.jpg'
    extension = os.path.splitext(save_name)[1]
    result, encoded_img = cv2.imencode(extension, img)
    if result:
        with open(save_name, mode='w+b') as f:
            encoded_img.tofile(f)
    return save_name
