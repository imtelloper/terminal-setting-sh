import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import '../style/pages/ObservePage.scss';
import { useNavigate } from 'react-router-dom';
import ObserveCamInfo from '../components/ObserveCamInfo';
import axios from 'axios';
import Api from '../api/Api';

type ViedeoFrameType = {
  canvasClass: string;
  frameSrc: string;
  firstCanvas: {
    visible: boolean;
    yellowSensingPercent: number;
    redSensingPercent: number;
    coordinate: Array<any>;
  };
  secondCanvas: {
    visible: boolean;
    yellowSensingPercent: number;
    redSensingPercent: number;
    coordinate: Array<any>;
  };
};

const initVideoFrameData: Array<ViedeoFrameType> = [
  {
    canvasClass: 'polygonCanvas1',
    frameSrc: 'http://192.168.0.7:81',
    firstCanvas: {
      visible: true,
      yellowSensingPercent: 0.7,
      redSensingPercent: 0.3,
      coordinate: [],
    },
    secondCanvas: {
      visible: false,
      yellowSensingPercent: 0.7,
      redSensingPercent: 0.3,
      coordinate: [],
    },
  },
  {
    canvasClass: 'polygonCanvas2',
    frameSrc: 'http://192.168.0.24:81',
    firstCanvas: {
      visible: true,
      yellowSensingPercent: 0.7,
      redSensingPercent: 0.3,
      coordinate: [],
    },
    secondCanvas: {
      visible: true,
      yellowSensingPercent: 0.7,
      redSensingPercent: 0.3,
      coordinate: [],
    },
  },
  {
    canvasClass: 'polygonCanvas3',
    frameSrc: 'http://192.168.0.18:81',
    firstCanvas: {
      visible: true,
      yellowSensingPercent: 0.7,
      redSensingPercent: 0.3,
      coordinate: [],
    },
    secondCanvas: {
      visible: true,
      yellowSensingPercent: 0.7,
      redSensingPercent: 0.3,
      coordinate: [],
    },
  },
  {
    canvasClass: 'polygonCanvas4',
    frameSrc: 'http://192.168.0.30:81',
    firstCanvas: {
      visible: true,
      yellowSensingPercent: 0.7,
      redSensingPercent: 0.3,
      coordinate: [],
    },
    secondCanvas: {
      visible: true,
      yellowSensingPercent: 0.7,
      redSensingPercent: 0.3,
      coordinate: [],
    },
  },
];

const ObservePage = () => {
  const navigate = useNavigate();
  const camWidth = 512;
  const camHeight = 384;
  const pointSize = 3;
  const lineSize = 2.5;

  const drawColor = {
    green: '#42f593',
    yellow: '#FFFA7C',
    red: '#FF374B',
  };
  const [videoFrameState, setVideoFrameState] =
    useState<Array<ViedeoFrameType>>(initVideoFrameData);

  const [camTabState, setCamTabState] = useState(1);
  const [recordState, setRecordState] = useState(false);

  const getCentroid = (points) => {
    let area = 0;
    let cx = 0;
    let cy = 0;

    for (let i = 0; i < points?.length; i++) {
      const j = (i + 1) % points?.length;

      const pt1 = points[i];
      const pt2 = points[j];

      const x1 = pt1[0];
      const x2 = pt2[0];
      const y1 = pt1[1];
      const y2 = pt2[1];

      area += x1 * y2;
      area -= y1 * x2;

      cx += (x1 + x2) * (x1 * y2 - x2 * y1);
      cy += (y1 + y2) * (x1 * y2 - x2 * y1);
    }

    area /= 2;
    area = Math.abs(area);

    cx /= 6.0 * area;
    cy /= 6.0 * area;

    return {
      x: Math.abs(cx),
      y: Math.abs(cy),
    };
  };

  const squaredPolar = (point, centre) => {
    return [
      Math.atan2(point[1] - centre[1], point[0] - centre[0]),
      (point[0] - centre[0]) ** 2 + (point[1] - centre[1]) ** 2, // Square of distance
    ];
  };

  const polySort = (arrIndex, itemID) => {
    const { coordinate } = videoFrameState[arrIndex][itemID];
    const centre = [
      coordinate.reduce((sum, p) => sum + p[0], 0) / coordinate.length,
      coordinate.reduce((sum, p) => sum + p[1], 0) / coordinate.length,
    ];
    coordinate.forEach((point) => point.push(...squaredPolar(point, centre)));
    coordinate.sort((a, b) => a[2] - b[2] || a[3] - b[3]);
    coordinate.forEach((point) => (point.length -= 2));

    const newArr = videoFrameState;
    newArr[arrIndex][itemID].coordinate = coordinate;
    flushSync(() => setVideoFrameState([]));
    flushSync(() => setVideoFrameState(newArr));
  };

  const draw = (canvas, clicked = false) => {
    const greenCtx = canvas?.getContext('2d');
    const yellowCtx = canvas?.getContext('2d');
    const redCtx = canvas?.getContext('2d');
    const arrIndex = canvas?.getAttribute('tabIndex');
    const itemID = canvas?.getAttribute('itemID');
    greenCtx?.clearRect(0, 0, canvas.width, canvas.height);

    /* 다각형 라인 그리기 */
    const drawLines = (context, targetPoints, color = drawColor.green) => {
      context.strokeStyle = color;
      context.lineWidth = lineSize;
      context.beginPath();
      context.moveTo(...targetPoints[0]);
      for (const [x, y] of targetPoints.slice(1)) context.lineTo(x, y);
      context.closePath();
      context.stroke();
    };

    const { yellowSensingPercent, redSensingPercent, coordinate } =
      videoFrameState[arrIndex][itemID];
    const yellowSensingPoints = [];
    const redSensingPoints = [];
    /* 내분점 구하기 공식 참고 */
    const m1 = yellowSensingPercent;
    const n1 = 1 - yellowSensingPercent;
    const m2 = redSensingPercent;
    const n2 = 1 - redSensingPercent;

    // 무게중심의 좌표값
    const centerX = getCentroid(coordinate).x;
    const centerY = getCentroid(coordinate).y;

    /* 다각형의 점 찍기 */
    const drawPoints = (context, x, y, color = drawColor.green) => {
      context.beginPath();
      context.arc(x, y, pointSize, 0, 2 * Math.PI, true);
      context.fillStyle = color;
      context.fill();
    };

    /* 무게 중식 찍기 */
    // drawPoints(greenCtx, centerX, centerY);

    /* 내분점 좌표 구하기 */
    const getInsideX = (m, n, x) => (m * x + n * centerX) / (m + n);
    const getInsideY = (m, n, y) => (m * y + n * centerY) / (m + n);

    if (!coordinate.length) return;
    for (const [x, y] of coordinate) {
      /* Green Zone 다각형점 찍기 */
      drawPoints(greenCtx, x, y);

      /* Yellow Zone 다각형점 찍기 */
      const yellowInsideX = Math.round(getInsideX(m1, n1, x));
      const yellowInsideY = Math.round(getInsideY(m1, n1, y));
      yellowSensingPoints.push([yellowInsideX, yellowInsideY]);
      drawPoints(yellowCtx, yellowInsideX, yellowInsideY, drawColor.yellow);

      /* Red Zone 다각형점 찍기 */
      const redInsideX = Math.round(getInsideX(m2, n2, x));
      const redInsideY = Math.round(getInsideY(m2, n2, y));
      redSensingPoints.push([redInsideX, redInsideY]);
      drawPoints(redCtx, redInsideX, redInsideY, drawColor.red);
    }

    const yellowSensingCoordinate = yellowSensingPoints.join(',');
    const redSensingCoordinate = redSensingPoints.join(',');

    /* Green Zone 라인  그리기 */
    drawLines(greenCtx, coordinate);
    /* Yellow Zone 라인  그리기 */
    drawLines(yellowCtx, yellowSensingPoints, drawColor.yellow);
    /* Red Zone 라인  그리기 */
    drawLines(redCtx, redSensingPoints, drawColor.red);

    if (coordinate.length < 3) {
      return;
    }

    let { frameSrc } = videoFrameState[arrIndex];
    if (!clicked) {
      return;
    }

    const setNewVideoState = (newSrc) => {
      const newArr = videoFrameState;
      newArr[arrIndex].frameSrc = newSrc;
      flushSync(() => setVideoFrameState([]));
      flushSync(() => setVideoFrameState(newArr));
    };

    if (itemID === 'firstCanvas') {
      console.log('firstCanvas');
      frameSrc = `${frameSrc.split(':81')[0]}:81`;
      const newSrc = `${frameSrc}/api/stream/area/${yellowSensingCoordinate}/${redSensingCoordinate}`;
      setNewVideoState(newSrc);
    } else {
      console.log('secondCanvas');
      const splitedSrc = frameSrc.split('/');
      splitedSrc.length = 8;
      frameSrc = splitedSrc.join('/');
      const newSrc = `${frameSrc}/${yellowSensingCoordinate}/${redSensingCoordinate}`;
      setNewVideoState(newSrc);
    }
  };

  const canvasClick = (e) => {
    const canvas = e.currentTarget;
    /* Viedeo Frames Array Index */
    const arrIndex = canvas?.getAttribute('tabIndex');
    /* firstCanvas | secondCanvas */
    const itemID = canvas?.getAttribute('itemID');
    // const x = e.clientX - canvas.offsetLeft - 6;
    // const y = e.clientY - canvas.offsetTop - 8;
    let offsetWidth = 504;
    let offsetHeight = 336 - 49;
    switch (parseInt(arrIndex, 10) + 1) {
      case 1:
        offsetWidth = 504;
        offsetHeight = 336 - 49;
        break;
      case 2:
        offsetWidth = 1031;
        offsetHeight = 336 - 49;
        break;
      case 3:
        offsetWidth = 504;
        offsetHeight = 784 - 49;
        break;
      case 4:
        offsetWidth = 1031;
        offsetHeight = 784 - 49;
        break;
    }
    const x = e.clientX - canvas.offsetLeft - offsetWidth;
    const y = e.clientY - canvas.offsetTop - offsetHeight;
    const { coordinate } = videoFrameState[arrIndex][itemID];
    const match = coordinate?.findIndex(
      ([x0, y0]) => Math.abs(x0 - x) + Math.abs(y0 - y) <= 6
    );
    if (match < 0) coordinate.push([x, y]);
    else coordinate.splice(match, 1); // delete point when user clicks near it.
    const newArr = videoFrameState;
    newArr[arrIndex][itemID].coordinate = coordinate;
    flushSync(() => setVideoFrameState([]));
    flushSync(() => setVideoFrameState(newArr));
    flushSync(() => polySort(arrIndex, itemID));
    draw(canvas, true);
  };

  const drawCallback = useCallback((ele) => draw(ele), [videoFrameState]);

  useEffect(() => {
    // videoFrameState[0]?.frameSrc &&
    //   console.log('videoFrameState[0].frameSrc', videoFrameState[0]?.frameSrc);

    document.querySelectorAll('.polygonCanvas').forEach((ele, idx) => {
      draw(ele);
      // drawCallback(ele);
    });
  }, [videoFrameState]);

  const videoFrameMap = useMemo(() => {
    return videoFrameState.map((data: ViedeoFrameType, idx) => (
      <div className="iframeBox" key={idx}>
        <div className="iframeTitle">
          CAM{(idx + 1).toString()}
          {/* <span */}
          {/*  className="iframeRecording" */}
          {/*  onClick={() => { */}
          {/*    axios.get( */}
          {/*      `${data.frameSrc.split(':81')[0]}:81/api/util/reboot/`, */}
          {/*      { */}
          {/*        withCredentials: false, */}
          {/*      } */}
          {/*    ); */}
          {/*  }} */}
          {/* > */}
          {/*  Refresh({data.frameSrc}) */}
          {/* </span> */}
          {/* <span className="iframeRecording">Recording...</span> */}
        </div>
        {data.firstCanvas.visible && (
          <canvas
            className={`firstCanvas polygonCanvas ${data.canvasClass}`}
            tabIndex={idx}
            itemID="firstCanvas"
            width={camWidth}
            height={camHeight}
            onClick={canvasClick}
          />
        )}
        {data.secondCanvas.visible && (
          <canvas
            className={`secondCanvas polygonCanvas ${data.canvasClass}`}
            tabIndex={idx}
            itemID="secondCanvas"
            width={camWidth}
            height={camHeight}
            onClick={canvasClick}
          />
        )}
        <iframe
          title="stream1"
          src={
            data.frameSrc.split('/').includes('area')
              ? data.frameSrc
              : `${data.frameSrc}/api/stream/`
          }
          width={camWidth}
          height={camHeight}
        />
      </div>
    ));
  }, [videoFrameState, recordState]);

  const visibilityCamInfo = (e) => {
    const target = e.currentTarget;
    const dType = target.getAttribute('datatype');
    const camTabs = Array.from(document.querySelectorAll('.safetyContents'));
    camTabs.forEach((ele: HTMLElement) => {
      ele.style.display = 'none';
    });
    (
      document.querySelector(
        `#safetyContent${dType}`
      ) as HTMLTableSectionElement
    ).style.display = 'block';

    setCamTabState(parseInt(dType, 10));
  };

  const getTabEles = () => {
    const tabArr = [];
    for (let i = 0; i < 4; i++) {
      tabArr.push(
        <div className="safetyTabBox" key={i}>
          <input
            className="safetyTab"
            id={`safetyTab${i + 1}`}
            datatype={(i + 1).toString()}
            type="radio"
            name="tabs"
            defaultChecked={i === 0 && true}
            onChange={visibilityCamInfo}
          />
          <label className="safeLabel" htmlFor={`safetyTab${i + 1}`}>
            {`Cam${i + 1}`}
          </label>
        </div>
      );
    }
    return tabArr;
  };

  // 녹화
  const handleRecordVideo = () => {
    Api.stream.startRecordVideo();
  };

  return (
    <div id="observeContainer" className="observeContainer">
      <div className="observeLeft">
        <div className="leftBox">
          <div className="titleBox">
            <p>Place</p>
            <span>H1 공장 크레인</span>
          </div>
          <div className="safetyTabWrap">
            <div className="safetyTabBox">{getTabEles()}</div>
            <div className="safetyContainer">
              <div className="safetyContent">
                <ObserveCamInfo
                  videoFrameState={videoFrameState}
                  setVideoFrameState={setVideoFrameState}
                  camTabState={camTabState}
                  recordState={undefined}
                  setRecordState={undefined}
                />
              </div>
            </div>
            <div className="bottomBtnBox">
              <button className="bottomBtn" onClick={handleRecordVideo}>
                SETTING
              </button>
              <button
                className="bottomBtn"
                onClick={() => {
                  // navigate('/detail');
                  Api.stream.stopRecordVideo();
                }}
              >
                SAVE
              </button>
            </div>
          </div>
        </div>

        {/* <div className="safetyTabContainer">{getTabEles()}</div> */}
        {/* <ObserveCamInfo */}
        {/*  videoFrameState={videoFrameState} */}
        {/*  setVideoFrameState={setVideoFrameState} */}
        {/*  camTabState={camTabState} */}
        {/* /> */}
      </div>
      <div className="observeRight">
        <div className="rightBox">
          {/* 카메라 Observe 박스 */}
          <div className="iframeContent">{videoFrameMap}</div>
        </div>
      </div>
    </div>
  );
};

export default ObservePage;
