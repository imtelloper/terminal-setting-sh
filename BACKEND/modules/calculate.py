import cv2
import sys, os
import datetime
import numpy as np
from shapely.geometry import Point, Polygon

GREEN = (0,255,0)
RED = (255,0,0)
BLUE = (0,0,255)


def calculate_human(cam, x1, y1, x2, y2, w, h, unit_num, rois):
    point_in_poly, human_box = [], []
    # 사람 영역 계산
    unit_x, unit_y = int(w/unit_num), int(h/unit_num)
    for ix in range(unit_num+1):
        for iy in range(unit_num+1):
            hx, hy = int((unit_x*ix)+x1), int((unit_y*iy)+y1)
            human_box.append((hx,hy))      
    
    # temp = human_temp(cam, x1, y1, x2, y2)
    if len(rois)>0:
        for human_roi in human_box:
            human_point = Point(human_roi)
            for roi in rois:
                poly = Polygon(roi)
                point_in_poly.append(human_point.within(poly))
        # draw rectangle   
        if True in point_in_poly:
            # cv2.putText(cam, temp, (x1, y1-8), cv2.FONT_HERSHEY_SIMPLEX, 0.7, RED, 2)
            cv2.rectangle(cam, (x1,y1), (x2,y2), RED, 3)
            warning_signal = 1
        else:
            # cv2.putText(cam, temp, (x1, y1-10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, GREEN, 2)
            cv2.rectangle(cam, (x1,y1), (x2,y2), GREEN, 3)
            warning_signal = 0
    else:
        # cv2.putText(cam, temp, (x1, y1-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, GREEN, 2)
        cv2.rectangle(cam, (x1,y1), (x2,y2), GREEN, 3)
        warning_signal = 0

    return warning_signal, cam
            

def  calculate_tarcking(multi_tracker, cam):
    ret, t_bboxes = multi_tracker.update(cam)
    humans = []
    if ret:
        for i, t_bbox in enumerate(t_bboxes):
            x1, y1, w, h = tuple([int(_) for _ in t_bbox])
            humans.append((x1,y1,w,h))
    return ret, humans


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

