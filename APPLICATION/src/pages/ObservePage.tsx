import React, { useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import '../style/pages/ObservePage.scss';
import { useNavigate } from 'react-router-dom';
import ObserveCamInfo from '../components/ObserveCamInfo';
import axios from 'axios';
import Api from '../api/Api';
import PolygonDraw from '../util/PolygonDraw';
import { Settings } from '@material-ui/icons';
import { useSWRState } from '../fetcher/useSWRState';
import useSWR from 'swr';
import dayjs from 'dayjs';

export const camPort1Ip = '192.168.0.7';
export const camPort2Ip = '192.168.0.26';
export const camPort3Ip = '192.168.0.36';
export const camPort4Ip = '192.168.0.30';

type ViedeoFrameType = {
  canvasClass: string;
  frameSrc: string;
  trackerId: string;
  firstCanvas: {
    visible: boolean;
    yellowSensingPercent: number;
    redSensingPercent: number;
    coordinate: Array<Array<number>>;
  };
  secondCanvas: {
    visible: boolean;
    yellowSensingPercent: number;
    redSensingPercent: number;
    coordinate: Array<Array<number>>;
  };
};

const initVideoFrameData: Array<ViedeoFrameType> = [
  {
    canvasClass: 'polygonCanvas1',
    frameSrc: `http://${camPort1Ip}:81`,
    trackerId: '',
    firstCanvas: {
      visible: false,
      yellowSensingPercent: 1.37,
      redSensingPercent: 0.3,
      coordinate: [
        // [185, 236],
        // [90, 93],
        // [186, 109],
        // [268, 203],
      ],
    },
    secondCanvas: {
      visible: false,
      yellowSensingPercent: 0.7,
      redSensingPercent: 0.3,
      coordinate: [
        // [185, 236],
        // [90, 93],
        // [186, 109],
        // [268, 203],
      ],
    },
  },
  {
    canvasClass: 'polygonCanvas2',
    frameSrc: `http://${camPort2Ip}:81`,
    trackerId: '',
    firstCanvas: {
      visible: true,
      yellowSensingPercent: 0.7,
      redSensingPercent: 0.3,
      coordinate: [
        [242, 122],
        [298, 139],
        [296, 189],
        [239, 191],
      ],
    },
    secondCanvas: {
      visible: false,
      yellowSensingPercent: 0.7,
      redSensingPercent: 0.3,
      coordinate: [],
    },
  },
  {
    canvasClass: 'polygonCanvas3',
    frameSrc: `http://${camPort3Ip}:81`,
    trackerId: '',
    firstCanvas: {
      visible: false,
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
    canvasClass: 'polygonCanvas4',
    frameSrc: `http://${camPort4Ip}:81`,
    trackerId: '',
    firstCanvas: {
      visible: false,
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
];

const ObservePage = () => {
  const navigate = useNavigate();
  const polygonDraw = new PolygonDraw();
  const camWidth = 512;
  const camHeight = 384;
  const pointSize = 3; // 다각형 점의 크기
  const lineSize = 2.5; // 다각형 선의 굵기
  const today = dayjs().format('YYYY-MM-DD');
  const drawColor = {
    green: '#42f593',
    yellow: '#FFFA7C',
    red: '#FF374B',
  };
  const { data: swrState, mutate: setSwrState } = useSWRState();
  const [txtChangeState, setTxtChangeState] = useState('녹화시작');
  const [videoFrameState, setVideoFrameState] =
    useState<Array<ViedeoFrameType>>(initVideoFrameData);

  const [getObserveState, setGetObserveState] = useState([]);

  const [camTabState, setCamTabState] = useState(1);
  const [recordState, setRecordState] = useState(false);
  const findFetcher = (url: string) =>
    axios.post(url, { area: swrState.curTrackerArea }).then((res) => res.data);

  const { data: swrTrackerData, error: swrTrackerErr } = useSWR<
    Array<TrackerObserve>
  >('/api/tracker/find', findFetcher, {
    refreshInterval: 1000,
  });

  const observeFindFetcher = (url: string) =>
    axios
      .post(url, {
        date: today,
      })
      .then((res) => res.data);

  const { data: swrObserveData, error } = useSWR(
    '/api/observe/find',
    observeFindFetcher,
    { refreshInterval: 1000 }
  );

  const handleActive = (e) => {
    const target = e.currentTarget;
    const recordTxtEl = document.querySelector('.recordTxt');
    target.classList.toggle('txtActive');
    target.classList.toggle('hoverCircleActive');
    setTxtChangeState((prev) => (prev === '녹화중' ? '녹화시작' : '녹화중'));
    recordTxtEl.classList.toggle('txtColorActive');
    console.log('camTabState', camTabState);
    let ip = null;
    switch (camTabState) {
      case 1:
        ip = camPort1Ip;
        break;
      case 2:
        ip = camPort2Ip;
        break;
      case 3:
        ip = camPort3Ip;
        break;
      case 4:
        ip = camPort4Ip;
        break;
      default:
        ip = camPort1Ip;
    }
    if (!recordState) {
      Api.stream.startRecordVideo(ip);
      setRecordState(true);
    } else {
      Api.stream.stopRecordVideo(ip);
      setRecordState(false);
    }
  };

  const handleTxtColor = (e) => {
    const target = e.currentTarget;
    target.classList.toggle('txtColorActive');
  };

  const getStateCoordinate = (arrIndex: number, itemID: string) =>
    videoFrameState[arrIndex][itemID].coordinate;

  const setStateCoordinate = (arrIndex: number, itemID: string, coordinate) => {
    const newArr = videoFrameState;
    newArr[arrIndex][itemID].coordinate = coordinate;
    flushSync(() => setVideoFrameState([]));
    flushSync(() => setVideoFrameState(newArr));
  };

  const polySort = (arrIndex: number, itemID: string) => {
    const coordinate = getStateCoordinate(arrIndex, itemID);
    const centre = [
      coordinate.reduce((sum, p) => sum + p[0], 0) / coordinate.length,
      coordinate.reduce((sum, p) => sum + p[1], 0) / coordinate.length,
    ];
    coordinate.forEach((point) =>
      point.push(...polygonDraw.squaredPolar(point, centre))
    );
    coordinate.sort((a, b) => a[2] - b[2] || a[3] - b[3]);
    coordinate.forEach((point) => (point.length -= 2));
    setStateCoordinate(arrIndex, itemID, coordinate);
  };

  const setNewVideoSrcState = (arrIndex: number, newSrc: string) => {
    const newArr = videoFrameState;
    newArr[arrIndex].frameSrc = newSrc;
    flushSync(() => setVideoFrameState([]));
    flushSync(() => setVideoFrameState(newArr));
  };

  const draw = (canvas, clicked = false, trackerId = '') => {
    const redCtx = canvas?.getContext('2d');
    const yellowCtx = canvas?.getContext('2d');
    const greenCtx = canvas?.getContext('2d');
    const arrIndex = canvas?.getAttribute('tabIndex');
    const itemID = canvas?.getAttribute('itemID');
    greenCtx?.clearRect(0, 0, canvas.width, canvas.height);
    redCtx?.clearRect(0, 0, canvas.width, canvas.height);
    yellowCtx?.clearRect(0, 0, canvas.width, canvas.height);

    const { coordinate } = videoFrameState[arrIndex][itemID];
    const redSensingPoints = [];
    const yellowSensingPoints = [];
    const greenSensingPoints = [];
    const calibrate = PolygonDraw.getDistanceRate(200, 5);
    // console.log('calibrate', calibrate); // 13.2  ,  1m당 13.2px
    const yellowSetMeter = 0.6; // 5m
    const yellowDistancePx = calibrate * yellowSetMeter; // 5m = 66px
    const greenSetMeter = 1.2; // 5m
    const greenDistancePx = calibrate * greenSetMeter; // 5m = 66px

    // 기준 좌표에서 각 66px만큼 더 커진

    /* 내분점 구하기 공식 참고 */
    let m1;
    let n1;
    let m2;
    let n2;
    // console.log('😡 coordinate', coordinate);
    // 무게중심의 좌표값
    const centerX = polygonDraw.getCentroid(coordinate).x;
    const centerY = polygonDraw.getCentroid(coordinate).y;

    /* 무게 중식 찍기 */
    PolygonDraw.drawPoints(greenCtx, centerX, centerY, pointSize);

    /* 내분점 좌표 구하기 */
    const getInsideX = (m, n, x) => (m * x + n * centerX) / (m + n);
    const getInsideY = (m, n, y) => (m * y + n * centerY) / (m + n);

    if (!coordinate.length) return;
    for (const [x, y] of coordinate) {
      /* 무게중심과 기준 좌표들의 길이 */
      const standardLineDistance = PolygonDraw.getTwoPointsDistance(
        [x, y],
        [centerX, centerY]
      );
      // console.log('무게중심과 기준 좌표들의 길이 ', standardLineDistance);
      // console.log('meter 비율로 변환된 거리', yellowDistancePx);
      // console.log(
      //   'standardLineDistance + yellowDistancePx',
      //   standardLineDistance + yellowDistancePx
      // );

      /* 기준선 거리와 calibration에서 구해진 meter당 px 값을 더한값을 기준선거리로 나누어 내분점의 비율을 구한다. */
      m1 = (standardLineDistance + yellowDistancePx) / standardLineDistance;
      // console.log('m1', m1);
      n1 = 1 - m1;

      m2 = (standardLineDistance + greenDistancePx) / standardLineDistance;
      // console.log('m2', m2);
      n2 = 1 - m2;

      /* Red Zone 다각형점 찍기 */
      redSensingPoints.push([Math.round(x), Math.round(y)]);
      PolygonDraw.drawPoints(redCtx, x, y, pointSize, drawColor.red);

      /* Yellow Zone 다각형점 찍기 */
      const yellowInsideX = Math.round(getInsideX(m1, n1, x));
      const yellowInsideY = Math.round(getInsideY(m1, n1, y));
      yellowSensingPoints.push([yellowInsideX, yellowInsideY]);
      PolygonDraw.drawPoints(
        yellowCtx,
        yellowInsideX,
        yellowInsideY,
        pointSize,
        drawColor.yellow
      );

      /* Green Zone 다각형점 찍기 */
      const greenInsideX = Math.round(getInsideX(m2, n2, x));
      const greenInsideY = Math.round(getInsideY(m2, n2, y));
      greenSensingPoints.push([greenInsideX, greenInsideY]);
      PolygonDraw.drawPoints(
        greenCtx,
        greenInsideX,
        greenInsideY,
        pointSize,
        drawColor.green
      );
    }

    const redSensingCoordinate = redSensingPoints.join(',');
    const yellowSensingCoordinate = yellowSensingPoints.join(',');
    const greenSensingCoordinate = greenSensingPoints.join(',');

    /* Red Zone 라인  그리기 */
    PolygonDraw.drawLines(redCtx, coordinate, lineSize, drawColor.red);
    /* Yellow Zone 라인  그리기 */
    PolygonDraw.drawLines(
      yellowCtx,
      yellowSensingPoints,
      lineSize,
      drawColor.yellow
    );
    /* Green Zone 라인  그리기 */
    PolygonDraw.drawLines(
      greenCtx,
      greenSensingPoints,
      lineSize,
      drawColor.green
    );

    if (coordinate.length < 3) return;

    let { frameSrc } = videoFrameState[arrIndex];
    if (!clicked) return;

    const sensingGroup = [
      greenSensingCoordinate,
      yellowSensingCoordinate,
      redSensingCoordinate,
    ].join('&');

    console.log('sensingGroup', sensingGroup);
    console.log('👗👗👗 itemID', itemID);
    if (itemID === 'firstCanvas') {
      console.log('firstCanvas');
      frameSrc = `${frameSrc.split(':81')[0]}:81`;
      const newSrc = `${frameSrc}/api/stream/area/1/${yellowSensingCoordinate}/${redSensingCoordinate}/`;
      console.log('newSrc', newSrc);
      clicked && setNewVideoSrcState(arrIndex, newSrc);
      clicked &&
        trackerId &&
        Api.tracker.modifyOneData(trackerId, { sensingGroup1: sensingGroup });
    } else {
      console.log('secondCanvas');
      const splitedSrc = frameSrc.split('/');
      const firstSensingCoord = splitedSrc.slice(7, 9);
      splitedSrc.length = 6;
      splitedSrc.push('2');
      frameSrc = splitedSrc.concat(firstSensingCoord).join('/');
      const newSrc = `${frameSrc}/${yellowSensingCoordinate}/${redSensingCoordinate}`;
      console.log('newSrc', newSrc);
      clicked && setNewVideoSrcState(arrIndex, newSrc);
      clicked &&
        trackerId &&
        Api.tracker.modifyOneData(trackerId, { sensingGroup2: sensingGroup });
    }
  };

  const canvasClick = (e) => {
    const canvas = e.currentTarget;
    /* Viedeo Frames Array Index */
    const arrIndex = canvas?.getAttribute('tabIndex');
    /* firstCanvas | secondCanvas */
    const itemID = canvas?.getAttribute('itemID');
    const bbox = canvas.getBoundingClientRect(); // viewport 기준으로 나의 위치 알려줌
    const trackerId = canvas.id;

    // offsetLeft:원소의 왼쪽 바깥쪽 테두리 에서 원소를 포함하는 왼쪽 안쪽 테두리 사이의 픽셀 거리까지 입니다.
    // offsetTop:요소의 상단 경계선 에서 요소를 포함하는 상단 경계선 사이의 픽셀 거리 까지.
    const x = e.clientX - bbox.left;
    const y = e.clientY - bbox.top;
    const { coordinate } = videoFrameState[arrIndex][itemID];
    console.log('x', x);
    console.log('y', y);

    const match = coordinate?.findIndex(
      ([x0, y0]) => Math.abs(x0 - x) + Math.abs(y0 - y) <= 6
    );
    if (match < 0) coordinate.push([Math.round(x), Math.round(y)]);
    else coordinate.splice(match, 1); // delete point when user clicks near it.
    const newArr = videoFrameState;
    newArr[arrIndex][itemID].coordinate = coordinate;
    flushSync(() => setVideoFrameState([]));
    flushSync(() => setVideoFrameState(newArr));
    flushSync(() => polySort(arrIndex, itemID));
    draw(canvas, true, trackerId);
  };

  const coordinateMaker = (coordNums: []) => {
    const totalCoords = [];
    let coordinate: Array<number> = [];
    coordNums?.forEach((num) => {
      coordinate.push(parseInt(num, 10));
      // coordinate.push(num);
      if (coordinate.length === 2) {
        totalCoords.push(coordinate);
        coordinate = [];
      }
    });
    return totalCoords;
  };

  const setProcessedSwrData = () => {
    const processedData = [];
    swrTrackerData.forEach(async (tracker, idx) => {
      console.log('장난 tracker._id', tracker._id);
      console.log('하니 today', today);
      await Api.observe
        .findData({
          trackerId: tracker._id,
          date: today,
        })
        .then((observe) => {
          if (observe?.length > 0) {
            const processedObserve = observe.map((obj) => {
              return { ...tracker, ...obj };
            });
            processedData.push(...processedObserve);
            console.log('🌺🌺🌺processedData', processedData);
            /* 정렬 */
            processedData.sort((prev, next) => {
              if (
                `${prev.camPort}${prev.groupNum}` >
                `${next.camPort}${next.groupNum}`
              )
                return 1;
              if (
                `${prev.camPort}${prev.groupNum}` <
                `${next.camPort}${next.groupNum}`
              )
                return -1;
              return 0;
            });

            const curVideoFrameState = videoFrameState;
            processedData.forEach((obj) => {
              const { camPort, trackerId } = obj;
              const camIdx = camPort.at(-1) - 1;
              // console.log('camIdx', camIdx);

              curVideoFrameState[camIdx].trackerId = trackerId;

              const group1Coord = coordinateMaker(
                obj.sensingGroup1.split('&')[2]?.split(',')
              );
              // console.log('🌸group1Coord', group1Coord);
              /* DB에 저장된 좌표값을 기준으로 좌표값이 있다면 visible true */
              curVideoFrameState[camIdx].firstCanvas.visible =
                group1Coord.length > 0;
              curVideoFrameState[camIdx].firstCanvas.coordinate = group1Coord;

              const group2Coord = coordinateMaker(
                obj.sensingGroup2.split('&')[2]?.split(',')
              );
              // console.log('🌸group2Coord', group2Coord);
              curVideoFrameState[camIdx].secondCanvas.visible =
                group2Coord.length > 0;
              curVideoFrameState[camIdx].secondCanvas.coordinate = group2Coord;
            });
            flushSync(() => setVideoFrameState([]));
            flushSync(() => setVideoFrameState(curVideoFrameState));
            flushSync(() => setGetObserveState([...processedData]));
          }
        });
    });
  };

  /* 카메라 영상 스트림 */
  const videoFrameMap = useMemo(() => {
    return videoFrameState.map((data: ViedeoFrameType, idx) => (
      <div className="iframeBox" key={idx}>
        <div className="iframeTitle">
          <span>CAM{(idx + 1).toString()}</span>
          <span className="iframeRecording">
            {/* {camTabState - 1 === idx && recordState && ( */}
            {/*  <div style={{ width: '16px', height: '16px', color: 'red' }}>REC</div> */}
            {/* )} */}
            {camTabState - 1 === idx && recordState && (
              <div>
                <span />
                REC
              </div>
            )}
          </span>
        </div>
        {data.firstCanvas.visible && (
          <canvas
            className={`firstCanvas polygonCanvas ${data.canvasClass}`}
            tabIndex={idx}
            itemID="firstCanvas"
            width={camWidth}
            height={camHeight}
            id={data.trackerId}
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
            id={data.trackerId}
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

    const safetyContents = document.querySelector(
      `#safetyContent${dType}`
    ) as HTMLTableSectionElement;
    if (safetyContents) safetyContents.style.display = 'block';

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

  // // 녹화
  const handleRecordVideo = () => {
    console.log('camTabState', camTabState);
    let ip = null;
    switch (camTabState) {
      case 1:
        ip = camPort1Ip;
        break;
      case 2:
        ip = camPort2Ip;
        break;
      case 3:
        ip = camPort3Ip;
        break;
      case 4:
        ip = camPort4Ip;
        break;
      default:
        ip = camPort1Ip;
    }
    if (!recordState) {
      Api.stream.startRecordVideo(ip);
      setRecordState(true);
    } else {
      Api.stream.stopRecordVideo(ip);
      setRecordState(false);
    }
  };

  useEffect(() => {
    console.log('📀📀📀📀videoFrameState', videoFrameState);
    // videoFrameState.forEach((obj) => {
    //   console.log('frameSrc', obj.frameSrc);
    //   console.log('firstCanvas.visible', obj.firstCanvas.visible);
    //   console.log('firstCanvas.coordinate', obj.firstCanvas.coordinate);
    //   console.log('secondCanvas.visible', obj.secondCanvas.visible);
    //   console.log('secondCanvas.coordinate', obj.secondCanvas.coordinate);
    // });

    // redSensingCoordinate 227,111,268,148,226,141

    if (videoFrameState[0]) {
      const coor1 = videoFrameState[0]?.secondCanvas?.coordinate[0];
      const coor2 = videoFrameState[0]?.secondCanvas?.coordinate[1];
      coor1 &&
        coor2 &&
        console.log(
          '2차그룹으로 거리재기 확인',
          PolygonDraw.getTwoPointsDistance(coor1, coor2)
        );
    }

    // console.log('rate', PolygonDraw.getDistanceRate(165, 12.5));

    document.querySelectorAll('.polygonCanvas').forEach((ele, idx) => {
      draw(ele);
    });
  }, [videoFrameState]);

  useEffect(() => {
    // console.log('🌽🌽🌽🌽🌽getObserveState', getObserveState);
    if (getObserveState.length === 0) {
      swrTrackerData?.length > 0 && setProcessedSwrData();
    }
  }, [getObserveState]);

  useEffect(() => {
    // console.log('swrTrackerData', swrTrackerData);
    swrTrackerData?.length > 0 && setProcessedSwrData();
  }, [swrTrackerData, swrObserveData]);

  return (
    <div id="observeContainer" className="observeContainer">
      <div className="observeLeft">
        <div className="leftBox">
          <div className="titleBox">
            <span className="subTitle">Place</span>
            {/* <span className="mainTitle">{swrState.curTrackerArea}</span> */}
            <span className="mainTitle">데이터 들어갈자리</span>
          </div>
          <div className="safetyTabWrap">
            <div className="safetyTabBox">{getTabEles()}</div>
            <div className="safetyTabContainer">
              <ObserveCamInfo
                videoFrameState={videoFrameState}
                setVideoFrameState={setVideoFrameState}
                camTabState={camTabState}
                recordState={recordState}
                setRecordState={setRecordState}
                getObserveState={getObserveState}
                setNewVideoSrcState={setNewVideoSrcState}
              />
            </div>
            <div className="bottomBtnBox">
              <div className="recordBtnBox">
                <button className="recordBtn">
                  <div />
                  <div className="hoverCircle" onClick={handleActive} />
                </button>
                <span className="recordTxt">{txtChangeState}</span>
              </div>
              <button
                className="settingBtn"
                onClick={() => {
                  navigate('/detail');
                  // Api.stream
                  //   .stopRecordVideo()
                  //   .catch((err) => console.error(err));
                }}
              >
                <Settings />
              </button>
            </div>
          </div>
        </div>
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
