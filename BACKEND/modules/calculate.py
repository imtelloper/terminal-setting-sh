import cv2
import sys, os
import datetime
import numpy as np
from shapely.geometry import Point, Polygon

GREEN = (0,255,0)
YELLOW = (0,255,255)
RED = (0,0,255)
BLUE = (255,0,0)


def calculate_human(cam, x1, y1, x2, y2, w, h, unit_num, rois):
    point_in_poly1, point_in_poly2, human_box, sigs = [], [], [], []
    # 사람 영역 계산
    unit_x, unit_y = int(w / unit_num), int(h / unit_num)
    for ix in range(unit_num + 1):
        for iy in range(unit_num + 1):
            hx, hy = int((unit_x * ix) + x1), int((unit_y * iy) + y1)
            human_box.append((hx, hy))

            # temp = human_temp(cam, x1, y1, x2, y2)
    if rois[0]:
        for human_roi in human_box:
            human_point = Point(human_roi)
            for roi in rois[0]:
                roi = list((np.array(roi)).round(0))
                poly = Polygon(roi)
                point_in_poly1.append(human_point.within(poly))

    if rois[1]:
        for human_roi in human_box:
            human_point = Point(human_roi)
            for roi in rois[1]:
                roi = list((np.array(roi)).round(0))
                poly = Polygon(roi)
                point_in_poly2.append(human_point.within(poly))

    if not rois[0] and not rois[1]:
        # cv2.putText(cam, temp, (x1, y1-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, GREEN, 2)
        cv2.rectangle(cam, (x1, y1), (x2, y2), GREEN, 3)
        warning_signal = 0
        sigs.append(warning_signal)

        # draw rectangle
    if True in point_in_poly1 and True in point_in_poly2:
        # cv2.putText(cam, temp, (x1, y1-8), cv2.FONT_HERSHEY_SIMPLEX, 0.7, RED, 2)
        cv2.rectangle(cam, (x1, y1), (x2, y2), RED, 3)
        warning_signal = 2
        sigs.append(warning_signal)

    if True in point_in_poly2 and not True in point_in_poly1:
        # cv2.putText(cam, temp, (x1, y1-8), cv2.FONT_HERSHEY_SIMPLEX, 0.7, RED, 2)
        cv2.rectangle(cam, (x1, y1), (x2, y2), RED, 3)
        warning_signal = 2
        sigs.append(warning_signal)

    if True in point_in_poly1 and not True in point_in_poly2:
        # cv2.putText(cam, temp, (x1, y1-8), cv2.FONT_HERSHEY_SIMPLEX, 0.7, RED, 2)
        cv2.rectangle(cam, (x1, y1), (x2, y2), YELLOW, 3)
        warning_signal = 1
        sigs.append(warning_signal)

    if not True in point_in_poly1 and not True in point_in_poly2:
        # cv2.putText(cam, temp, (x1, y1-10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, GREEN, 2)
        cv2.rectangle(cam, (x1, y1), (x2, y2), GREEN, 3)
        warning_signal = 0
        sigs.append(warning_signal)

    sig = max(sigs)

    return sig, cam


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

