import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import PolygonDraw from '../util/PolygonDraw';
import Api from '../api/Api';
import { useSWRState } from '../fetcher/useSWRState';
import { Autorenew } from '@material-ui/icons';
import Loading from './Loading';
import { useInterval } from '../hooks/useInterval';

const ObserveCamStream = ({
  videoFrameState,
  setVideoFrameState,
  recordState,
  setNewVideoSrcState,
  camTabState,
  swrTrackerMutate,
}) => {
  const camWidth = 512;
  const camHeight = 384;
  const pointSize = 3; // 다각형 점의 크기
  const lineSize = 2.5; // 다각형 선의 굵기
  const drawColor = {
    green: '#42f593',
    yellow: '#FFFA7C',
    red: '#FF374B',
  };

  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  // useInterval(() => isRunning && setTimer((timer) => timer + 1), 1000);
  useInterval(() => setTimer((timer) => timer + 1), 1000);
  const handleStopwatch = () => setIsRunning((isRunning) => !isRunning);
  const handleReset = () => setTimer(0);

  const { data: swrState, mutate: setSwrState } = useSWRState();

  const getStateCoordinate = (arrIndex: number, itemID: string) =>
    videoFrameState[arrIndex][itemID].coordinate;

  const setStateCoordinate = (arrIndex: number, itemID: string, coordinate) => {
    const newArr = videoFrameState;
    newArr[arrIndex][itemID].coordinate = coordinate;
    flushSync(() => setVideoFrameState([...newArr]));
  };

  const refreshVideoStreaming = async (idx) => {
    const curSrc = videoFrameState[idx].frameSrc;
    const baseSrc = `${videoFrameState[idx].frameSrc.split(':81')[0]}:81`;
    await setNewVideoSrcState(idx, baseSrc);
    await setNewVideoSrcState(idx, curSrc);
  };

  /* 카메라가 멈췄을 경우 다시 주소로 재요청하는 메서드 */
  const refreshCamStream = async (e) => {
    const target = e.currentTarget;
    const arrIndex = target.getAttribute('tabIndex');
    await refreshVideoStreaming(arrIndex);
  };

  const polySort = (arrIndex: number, itemID: string) => {
    const coordinate = getStateCoordinate(arrIndex, itemID);
    const centre = [
      coordinate.reduce((sum, p) => sum + p[0], 0) / coordinate.length,
      coordinate.reduce((sum, p) => sum + p[1], 0) / coordinate.length,
    ];
    coordinate.forEach((point) =>
      point.push(...PolygonDraw.squaredPolar(point, centre))
    );
    coordinate.sort((a, b) => a[2] - b[2] || a[3] - b[3]);
    coordinate.forEach((point) => (point.length -= 2));
    setStateCoordinate(arrIndex, itemID, coordinate);
  };

  const draw = (canvas, clicked = false, trackerId = '') => {
    const redCtx = canvas?.getContext('2d');
    const yellowCtx = canvas?.getContext('2d');
    const greenCtx = canvas?.getContext('2d');
    const arrIndex = canvas?.getAttribute('tabIndex');
    const itemID = canvas?.getAttribute('itemID');
    // console.log('☘☘☘☘☘☘☘☘☘☘☘☘☘☘☘☘☘☘☘☘☘☘☘☘☘️', canvas?.getAttribute('itemProp'));
    const itemProps = canvas?.getAttribute('itemProp').split('|');
    // console.log('☘️draw arrIndex', parseInt(arrIndex, 10) + 1, '번 카메라');
    // console.log('🍀️itemID', itemID);
    // console.log('🍀️itemProp', itemProps);
    // const baseLine = itemProps[0].includes('&') ? itemProps[0] : '0,0,0,0&0';
    const baseLine = itemProps[0].includes('&')
      ? itemProps[0]
      : '243,149,253,209&10';
    const dangerLine = itemProps[1].includes('&') ? itemProps[1] : '2&4';
    // console.log('🍊baseLine', baseLine);
    // console.log('🍊dangerLine', dangerLine);

    greenCtx?.clearRect(0, 0, canvas.width, canvas.height);
    redCtx?.clearRect(0, 0, canvas.width, canvas.height);
    yellowCtx?.clearRect(0, 0, canvas.width, canvas.height);

    const { coordinate } = videoFrameState[arrIndex][itemID];
    const redSensingPoints = [];
    const yellowSensingPoints = [];
    const greenSensingPoints = [];
    // const baseLineSplited = swrState?.curCamBaseLine?.split('&');
    const baseLineSplited = baseLine.split('&');
    const baseLineCooldiate = baseLineSplited[0].split(',');
    let baseCoords = [];
    const baseCoordsBox = [];
    baseLineCooldiate.forEach((coord) => {
      // console.log('coord', coord);
      baseCoords.push(parseInt(coord, 10));
      if (baseCoords.length > 1) {
        baseCoordsBox.push(baseCoords);
        baseCoords = [];
      }
    });
    const baseLineMeter = baseLineSplited[1];
    // console.log('baseLineMeter', baseLineMeter);
    // console.log('baseLineCooldiate', baseLineCooldiate);
    // console.log('baseCoordsBox', baseCoordsBox);
    const baseLineDistance = PolygonDraw.getTwoPointsDistance(
      baseCoordsBox[0],
      baseCoordsBox[1]
    );
    // console.log('baseLineDistance', baseLineDistance);
    const calibrate = PolygonDraw.getDistanceRate(200, baseLineMeter ?? 5);
    // console.log('calibrate', calibrate); // 13.2  ,  1m당 13.2px
    // const dangerSplited = swrState?.curCamDangerLine?.split('&');
    const dangerSplited = dangerLine.split('&');
    const yellowSetMeter: number = parseFloat(dangerSplited[0]) ?? 0.6; // dangerLine yellow m
    const yellowDistancePx = calibrate * yellowSetMeter; // 5m = 66px
    const greenSetMeter: number = parseFloat(dangerSplited[1]) ?? 1.6; // dangerLine green m
    const greenDistancePx = calibrate * greenSetMeter; // 5m = 66px

    // 기준 좌표에서 각 66px만큼 더 커진

    /* 내분점 구하기 공식 참고 */
    let m1;
    let n1;
    let m2;
    let n2;
    // console.log('😡 coordinate', coordinate);
    // 무게중심의 좌표값
    const centerX = PolygonDraw.getCentroid(coordinate).x;
    const centerY = PolygonDraw.getCentroid(coordinate).y;

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
    // console.log('🔥greenSensingCoordinate', greenSensingCoordinate);
    // console.log('🔥yellowSensingCoordinate', yellowSensingCoordinate);
    // console.log('🔥redSensingCoordinate', redSensingCoordinate);

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
    swrTrackerMutate();

    console.log('👗👗👗 itemID', itemID);
    if (itemID === 'firstCanvas') {
      console.log('firstCanvas');
      frameSrc = `${frameSrc.split(':81')[0]}:81`;
      const newSrc = `${frameSrc}/api/stream/area/1/${yellowSensingCoordinate}/${redSensingCoordinate}/`;
      console.log('newSrc', newSrc);
      clicked && setNewVideoSrcState(arrIndex, newSrc);
      clicked &&
        trackerId &&
        Api.tracker
          .modifyOneData(trackerId, { sensingGroup1: sensingGroup })
          .finally(() => swrTrackerMutate())
          .catch((err) => console.error(err));
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
        Api.tracker
          .modifyOneData(trackerId, { sensingGroup2: sensingGroup })
          .finally(() => swrTrackerMutate())
          .catch((err) => console.error(err));
    }
  };

  const canvasClick = (e) => {
    handleReset();
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
    console.log('coordinate', coordinate);
    console.log('x', x);
    console.log('y', y);

    const match = coordinate?.findIndex(
      ([x0, y0]) => Math.abs(x0 - x) + Math.abs(y0 - y) <= 6
    );
    if (match < 0) coordinate.push([Math.round(x), Math.round(y)]);
    else coordinate.splice(match, 1); // delete point when user clicks near it.
    const newArr = videoFrameState;
    newArr[arrIndex][itemID].coordinate = coordinate;
    flushSync(() => setVideoFrameState([...newArr]));
    flushSync(() => polySort(arrIndex, itemID));
    draw(canvas, true, trackerId);
  };

  /* INIT EFFECT */
  useEffect(() => {
    videoFrameState.forEach(
      (obj) =>
        obj.trackerId &&
        Api.tracker.modifyOneData(obj.trackerId, { isObserving: true })
    );
  }, []);

  /* 60초마다 동영상, 타이머 reset  */
  useEffect(() => {
    if (timer === 60) {
      videoFrameState.forEach((data, idx) => refreshVideoStreaming(idx));
      setTimer(0);
    }
  }, [timer]);

  useEffect(() => {
    if (videoFrameState.length > 0) {
      console.log('🥹videoFrameState', videoFrameState);
      document.querySelectorAll('.polygonCanvas').forEach((ele) => {
        // console.log('ele💫', ele);
        draw(ele);
      });
    }
  }, [videoFrameState]);

  /* 카메라 영상 스트림 */
  const videoFrameMap = useMemo(() => {
    return videoFrameState.map((data: ViedeoFrameType, idx) => {
      // console.log('data', data);
      return (
        <div
          className={`iframeBox ${!data.ip ? 'hideIframeBox' : ''}`}
          key={idx}
        >
          {camTabState - 1 === idx && recordState && (
            <div className="iframeBorder" />
          )}
          <div className="iframeTitle">
            <div className="iframeTitleLeft">
              <div className="iframeCamNum">CAM{(idx + 1).toString()}</div>
              <div className="iframeCamName">{data.camName}</div>
            </div>
            <span className="iframeRecording">
              {/* 녹화 상태 */}
              {camTabState - 1 === idx && recordState && (
                <div className="iframeRecordingIcon">
                  <span className="iframeRecordingCircle" />
                  REC
                </div>
              )}

              {/* 새로고침 버튼 */}
              {!recordState && (
                <span
                  tabIndex={idx}
                  className="iframeRenewIcon"
                  onClick={refreshCamStream}
                >
                  <Autorenew />
                </span>
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
              itemProp={`${data.baseLine}|${data.dangerLine}`}
              style={{ border: 'none' }}
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
              itemProp={`${data.baseLine}|${data.dangerLine}`}
              style={{ border: 'none' }}
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
            // style={{ border: 'none' }}
          />
        </div>
      );
    });
  }, [videoFrameState, recordState]);

  return (
    <Suspense fallback={<Loading />}>
      {timer}
      <div className="iframeContent">{videoFrameMap}</div>
    </Suspense>
  );
};

export default ObserveCamStream;
