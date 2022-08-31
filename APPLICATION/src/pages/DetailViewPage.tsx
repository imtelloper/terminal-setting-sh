import React, { useEffect, useMemo, useState } from 'react';
import '../style/DesignSystem.scss';
import '../style/pages/DetailViewPage.scss';
import DangerZonePopup from '../components/DangerZonePopup';
import CalibrationPopup from '../components/CalibrationPopup';
import { MdDangerous, MdModeEdit, MdOutlineTaskAlt } from 'react-icons/md';
import { ArrowDropDown, Autorenew, Feedback, Tune } from '@material-ui/icons';
import Api from '../api/Api';
import { useSWRState } from '../fetcher/useSWRState';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { flushSync } from 'react-dom';
import useSWR from 'swr';
import axios from 'axios';
import { today } from '../util/dateLibrary';
import ReactPaginate from 'react-paginate';
import PolygonDraw from '../util/PolygonDraw';
import { findFetcher } from '../fetcher/fetcher';

const DetailViewPage = () => {
  const { data: swrState, mutate: setSwrState } = useSWRState();
  const camWidth = 512;
  const camHeight = 384;
  const pointSize = 3; // 다각형 점의 크기
  const lineSize = 2.5; // 다각형 선의 굵기
  const drawColor = { green: '#42f593', yellow: '#FFFA7C', red: '#FF374B' };
  const navigate = useNavigate();
  const levelColor = { yellow: '#ffca2b', red: '#ff530d' };
  const [isOpenDangerZoneState, setIsOpenDangerZoneState] =
    useState<boolean>(false);
  const [isOpenCalibrationState, setIsOpenCalibrationState] =
    useState<boolean>(false);
  const [imgSrcState, setImgSrcState] = useState(
    `http://${swrState?.curCamIp}:81/api/stream/`
  );
  const [calibImgSrcState, setCalibImgSrcState] = useState<string>('');
  const [groupNumState, setGroupNumState] = useState<number>(1);
  const [curObserveState, setCurObserveState] = useState<Partial<Observe>>({});
  const [archiveImgsCnt, setArchiveImgsCnt] = useState<number>(0);
  const [pageNumState, setPageNumState] = useState<number>(1);

  const observeFindFetcher = (url: string) =>
    axios
      .post(url, { date: today, trackerId: swrState.curTrackerId })
      .then((res) => res.data);

  const { data: swrObserveData } = useSWR(
    '/api/observe/find',
    observeFindFetcher,
    { refreshInterval: 1000 }
  );

  const { data: swrFenceOperatingTime } = useSWR(
    `/api/observe/fence-operating-time/${
      swrState.curTrackerId
    }/${groupNumState.toString()}`,
    findFetcher,
    { refreshInterval: 1000 }
  );

  useEffect(() => {
    console.log('swrFenceOperatingTime', swrFenceOperatingTime);
  }, [swrFenceOperatingTime]);

  /* 감지 이력 데이터 스테이트 */
  const [imgArchiveState, setImgArchiveState] = useState([]);
  const pageRange = 15;

  const setArchiveImgData = (startNum: number, limitNum: number) => {
    /* 이력조회에서 조회할 이미지 정보들 셋팅 */
    Api.archive
      .getDetailRangeData({
        trackerId: swrState?.curTrackerId,
        fileType: 'img',
        start: startNum,
        limit: limitNum,
      })
      .then((archives) => {
        dayjs.locale('ko');
        setImgArchiveState(
          archives.map((obj) => {
            return {
              id: obj._id,
              path: obj.path,
              safetyLevel: obj.safetyLevel,
              date: dayjs(obj.createdAt).format('YYYY-MM-DD'),
              time: dayjs(obj.createdAt).format('HH:mm:ss'),
            };
          })
        );
      })
      .catch((err) => console.error(err));
  };

  const changePage = (data) => {
    const pageNum = data.selected;
    setPageNumState(pageNum + 1);
    console.log('pageNum', pageNum);
    setArchiveImgData(pageNum * pageRange, pageRange);
  };

  const polySort = (coordinate) => {
    const centre = [
      coordinate.reduce((sum, p) => sum + p[0], 0) / coordinate.length,
      coordinate.reduce((sum, p) => sum + p[1], 0) / coordinate.length,
    ];
    coordinate.forEach((point) =>
      point.push(...PolygonDraw.squaredPolar(point, centre))
    );
    coordinate.sort((a, b) => a[2] - b[2] || a[3] - b[3]);
    coordinate.forEach((point) => (point.length -= 2));
    // setStateCoordinate(arrIndex, itemID, coordinate);
    groupNumState === 1
      ? setSwrState({ ...swrState, curGroup1Coordinates: coordinate })
      : setSwrState({ ...swrState, curGroup2Coordinates: coordinate });
  };

  const draw = (canvas, clicked = false, trackerId = '', coordinate = []) => {
    const redCtx = canvas?.getContext('2d');
    const yellowCtx = canvas?.getContext('2d');
    const greenCtx = canvas?.getContext('2d');
    const arrIndex = canvas?.getAttribute('tabIndex');
    const itemID = canvas?.getAttribute('itemID');
    console.log('☘☘☘☘☘☘☘☘☘☘☘☘☘☘☘☘☘☘☘☘☘☘☘☘☘️', canvas?.getAttribute('itemProp'));
    // eslint-disable-next-line no-param-reassign
    coordinate =
      groupNumState === 1
        ? swrState.curGroup1Coordinates
        : swrState.curGroup2Coordinates;

    console.log('🎃draw coordinate', coordinate);

    const itemProps = canvas?.getAttribute('itemProp').split('|');
    // console.log('☘️draw arrIndex', parseInt(arrIndex, 10) + 1, '번 카메라');
    console.log('🍀️itemID', itemID);
    console.log('🍀️itemProp', itemProps);
    // const baseLine = itemProps[0].includes('&') ? itemProps[0] : '0,0,0,0&0';
    const baseLine = itemProps[0].includes('&')
      ? itemProps[0]
      : '243,149,253,209&10';
    const dangerLine = itemProps[1].includes('&') ? itemProps[1] : '2&4';
    console.log('🍊baseLine', baseLine);
    console.log('🍊dangerLine', dangerLine);

    greenCtx?.clearRect(0, 0, canvas.width, canvas.height);
    redCtx?.clearRect(0, 0, canvas.width, canvas.height);
    yellowCtx?.clearRect(0, 0, canvas.width, canvas.height);

    const redSensingPoints = [];
    const yellowSensingPoints = [];
    const greenSensingPoints = [];
    // const baseLineSplited = swrState?.curCamBaseLine?.split('&');
    const baseLineSplited = baseLine.split('&');
    const baseLineCooldiate = baseLineSplited[0].split(',');
    let baseCoords = [];
    const baseCoordsBox = [];
    baseLineCooldiate.forEach((coord) => {
      console.log('coord', coord);
      baseCoords.push(parseInt(coord, 10));
      if (baseCoords.length > 1) {
        baseCoordsBox.push(baseCoords);
        baseCoords = [];
      }
    });
    const baseLineMeter = baseLineSplited[1];
    console.log('baseLineMeter', baseLineMeter);
    console.log('baseLineCooldiate', baseLineCooldiate);
    console.log('baseCoordsBox', baseCoordsBox);
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

      /* 기준선 거리와 calibration에서 구해진 meter당 px 값을 더한값을 기준선거리로 나누어 내분점의 비율을 구한다. */
      m1 = (standardLineDistance + yellowDistancePx) / standardLineDistance;
      console.log('m1', m1);
      n1 = 1 - m1;

      m2 = (standardLineDistance + greenDistancePx) / standardLineDistance;
      console.log('m2', m2);
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

    // let { frameSrc } = videoFrameState[arrIndex];
    let frameSrc = `http://${swrState.curCamPort}:81`;
    if (!clicked) return;

    const sensingGroup = [
      greenSensingCoordinate,
      yellowSensingCoordinate,
      redSensingCoordinate,
    ].join('&');
    console.log('sensingGroup', sensingGroup);

    console.log('👗👗👗 itemID', itemID);
    if (groupNumState === 1) {
      console.log('firstCanvas');
      frameSrc = `${frameSrc.split(':81')[0]}:81`;
      const newSrc = `${frameSrc}/api/stream/area/1/${yellowSensingCoordinate}/${redSensingCoordinate}/`;
      console.log('newSrc', newSrc);
      clicked &&
        trackerId &&
        Api.tracker
          .modifyOneData(trackerId, { sensingGroup1: sensingGroup })
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
      clicked &&
        trackerId &&
        Api.tracker
          .modifyOneData(trackerId, { sensingGroup2: sensingGroup })
          .catch((err) => console.error(err));
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

    console.log('groupNumState🍯', groupNumState);
    // const { coordinate } = videoFrameState[arrIndex][itemID];
    const coordinate =
      groupNumState === 1
        ? swrState.curGroup1Coordinates
        : swrState.curGroup2Coordinates;

    console.log('x', x);
    console.log('y', y);

    const match = coordinate?.findIndex(
      ([x0, y0]) => Math.abs(x0 - x) + Math.abs(y0 - y) <= 6
    );
    if (match < 0) coordinate.push([Math.round(x), Math.round(y)]);
    else coordinate.splice(match, 1); // delete point when user clicks near it.

    // const newArr = videoFrameState;
    // newArr[arrIndex][itemID].coordinate = coordinate;
    // flushSync(() => setVideoFrameState([...newArr]));
    groupNumState === 1
      ? setSwrState({ ...swrState, curGroup1Coordinates: coordinate })
      : setSwrState({ ...swrState, curGroup2Coordinates: coordinate });

    flushSync(() => polySort(coordinate));
    draw(canvas, true, trackerId, coordinate);
  };

  /* 그룹 선택 */
  const handleSelectGroupNum = (e) => {
    const target = e.currentTarget;
    const { value } = target;
    console.log('🥑value', value);
    setGroupNumState(parseInt(value, 10));
  };
  useEffect(() => {
    document.querySelectorAll('.polygonCanvas').forEach((ele) => {
      console.log('ele', ele);
      draw(ele);
    });
  }, [groupNumState]);

  const handleSetArchiveImg = (e) => {
    const target = e.currentTarget;
    const dType = target.getAttribute('datatype');
    // console.log('dType', dType);
    setImgSrcState(
      `http://${swrState.curCamIp}:81/${dType.split('/').slice(5).join('/')}`
    );
  };

  const handleClickTab = (e) => {
    const target = e.currentTarget;
    const dType = target.getAttribute('datatype');
    if (dType === 'realTimeStream') {
      setImgSrcState(`http://${swrState.curCamIp}:81/api/stream/`);
    }
    // else if (dType === 'historyRefer') {
    //   setImgSrcState('http://192.168.0.4:81/api/stream/');
    // }
  };

  const openClosePopup = (e) => {
    const target = e.currentTarget;
    const dType = target.getAttribute('datatype');
    const type = {
      calibration: () => setIsOpenCalibrationState(!isOpenCalibrationState),
      dangerZone: () => setIsOpenDangerZoneState(!isOpenDangerZoneState),
    };

    /* calibration 오픈시 이미지 캡쳐 */
    if (dType === 'calibration') {
      Api.stream
        .calibrationImgCapture(swrState.curCamIp)
        .then((res) => {
          console.log('calibrationImgCapture res', res);
          Api.tracker
            .findData({
              area: swrState.curTrackerArea,
              camPort: swrState.curCamPort,
            })
            .then((tracker) => {
              console.log('🍋🍋🍋🍋🍋🍋tracker', tracker);
              console.log('🍋🍋🍋🍋🍋🍋tracker', tracker[0].calibImg);
              flushSync(() => {
                setCalibImgSrcState(
                  `http://${swrState.curCamIp}:81/${tracker[0].calibImg
                    .split('/')
                    .slice(5)
                    .join('/')}`
                );
              });
            })
            .finally(() => type[dType]())
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    } else type[dType]();
  };

  /* INIT EFFECT */
  useEffect(() => {
    console.log('🍓swr', swrState);
    console.log('🍓swrState.curTrackerId', swrState?.curTrackerId);

    Api.archive
      .getCount({ trackerId: swrState?.curTrackerId, fileType: 'img' })
      .then((res) => setArchiveImgsCnt(res))
      .catch((err) => console.error(err));

    /* 이력조회에서 조회할 이미지 정보들 셋팅 */
    setArchiveImgData(0, pageRange);
  }, []);

  useEffect(() => {
    // console.log('😇swrState',swrState);
    if (swrState?.curGroup1Coordinates.length > 0) {
      // console.log('🥹videoFrameState', videoFrameState);
      document.querySelectorAll('.polygonCanvas').forEach((ele) => {
        console.log('ele', ele);
        draw(ele);
      });
    }
  }, [swrState]);

  useEffect(() => {
    console.log('🍅groupNumState', groupNumState);
  }, [groupNumState]);

  useEffect(() => {
    console.log('imgArchiveState', imgArchiveState);
  }, [imgArchiveState]);

  useEffect(() => {
    // console.log('🍒swrObserveData', swrObserveData);
    // console.log('🍒groupNumState', groupNumState);
    const getCurObserve = swrObserveData?.filter(
      (obj) => obj.groupNum === groupNumState
    );
    // console.log('🍒🍒🍒🍒🍒🍒getCurObserve', getCurObserve);
    getCurObserve?.length > 0 && setCurObserveState(getCurObserve[0]);
  }, [swrObserveData, groupNumState]);

  useEffect(() => {
    console.log('🌷curObserveState', curObserveState);
  }, [curObserveState]);

  /* 감지 이력 리스트 */
  const imgCaptureHistoryMap = useMemo(() => {
    return imgArchiveState.map((obj, idx) => (
      <p
        datatype={obj.path}
        onClick={handleSetArchiveImg}
        key={obj.id}
        role="presentation"
      >
        <span>
          <div>
            <span>{pageRange * (pageNumState - 1) + (idx + 1)}</span>
            <Feedback
              style={{
                fontSize: '20px',
                color: levelColor[obj.safetyLevel.toLowerCase()],
              }}
            />
          </div>

          <span className={obj.safetyLevel.toLowerCase()}>
            {`${obj.safetyLevel.toUpperCase()} ${
              obj.safetyLevel === 'Yellow' ? '1' : '2'
            }`}
            차 감지
          </span>
        </span>
        <span>{obj.date}</span>
        <span>{obj.time}</span>
      </p>
    ));
  }, [imgArchiveState]);

  return (
    <div className="detailViewContainer">
      <div className="detailLeft">
        <div className="leftBox">
          <div className="titleBox">
            <span className="subTitle">Place</span>
            <span className="mainTitle" onClick={() => navigate('/observe')}>
              {swrState.curTrackerArea}
            </span>
          </div>
          <div className="detailTabWrap">
            <div className="detailTabBox">
              {/* 실시간 영상 | 이력 조회 */}
              <input
                className="menuTab"
                id="menuTab1"
                type="radio"
                name="tabs"
                defaultChecked
              />
              <label
                role="presentation"
                className="label1"
                htmlFor="menuTab1"
                datatype="realTimeStream"
                onClick={handleClickTab}
              >
                실시간 영상
              </label>
              <input
                className="menuTab"
                id="menuTab2"
                type="radio"
                name="tabs"
              />
              <label
                role="presentation"
                className="label2"
                htmlFor="menuTab2"
                datatype="historyRefer"
                // onClick={handleClickTab}
                onClick={handleClickTab}
              >
                이력조회
              </label>

              {/* 그룹 선택 */}
              <select onChange={handleSelectGroupNum}>
                <option value={1}>Group 1</option>
                <option value={2}>Group 2</option>
              </select>
              <span className="arrowIcon"><ArrowDropDown/></span>

              {/* 실시간 영상 TAB */}
              <div className="tabContent realTimeBox">
                <div className="realTimeContent">
                  {/* className : 색상별 green yellow red inactive */}
                  <div
                    className={`alarmTxt ${curObserveState?.safetyLevel?.toLowerCase()}`}
                  >
                    <div>
                      {curObserveState?.safetyLevel === 'Green' ? (
                        <>
                          <div className="btnBoxLine green" />
                          <span className="btnBoxTxt green">
                            <p>
                              <MdOutlineTaskAlt style={{ fontSize: '32px' }} />
                            </p>
                            안전합니다
                          </span>
                          <div className="btnBoxLine green" />
                        </>
                      ) : curObserveState?.safetyLevel === 'Yellow' ? (
                        <>
                          <div className="btnBoxLine yellow" />
                          <span className="btnBoxTxt yellow">
                            <p>
                              <Feedback style={{ fontSize: '32px' }} />
                            </p>
                            작업자 진입 확인
                          </span>
                          <div className="btnBoxLine yellow" />
                        </>
                      ) : (
                        <>
                          <div className="btnBoxLine red" />
                          <span className="btnBoxTxt red">
                            <p>
                              <MdDangerous style={{ fontSize: '32px' }} />
                            </p>
                            작업자 위험 반경 진입
                          </span>
                          <div className="btnBoxLine red" />
                        </>
                      )}
                    </div>
                  </div>
                  <div className="sensingBox">
                    <span>
                      1차 감지<p>{curObserveState?.yellowCnt}</p>
                    </span>
                    <span>
                      2차 감지<p>{curObserveState?.redCnt}</p>
                    </span>
                  </div>
                </div>
                <div className="realTimeBox">
                  <span>안전펜스 가동시간</span>
                  <span>{swrFenceOperatingTime}</span>
                </div>

                {/* 영역 재설정 | Calibration 설정 | 위험구간 설정 */}
                <div className="settingBtnBox">
                  <button>
                    <div className="settingBtnCon">
                      <MdModeEdit style={{ fontSize: '38px' }} />
                      <span>영역 재설정</span>
                    </div>
                  </button>
                  <button datatype="calibration" onClick={openClosePopup}>
                    <div className="settingBtnCon">
                      <Tune style={{ fontSize: '38px' }} />
                      <span>Calibration 설정</span>
                    </div>
                  </button>
                  <button datatype="dangerZone" onClick={openClosePopup}>
                    <div className="settingBtnCon">
                      <MdDangerous style={{ fontSize: '38px' }} />
                      <span>위험구간 설정</span>
                    </div>
                  </button>
                </div>
                {/* 취소 | 확인 */}
                <div className="bottomBtnBox">
                  <button
                    className="iconBtnR normalPrimary"
                    onClick={() => {
                      navigate('/observe');
                    }}
                  >
                    취소
                  </button>
                  <button
                    className="iconBtnR defaultPrimary"
                    onClick={() => {
                      navigate('/observe');
                    }}
                  >
                    확인
                  </button>
                </div>
              </div>

              {/* 이력 조회 TAB */}
              <div className="tabContent historyBox">
                <div className="sensingBox">
                  <span>
                    1차 감지<p>{curObserveState?.yellowCnt}</p>
                  </span>
                  <span>
                    2차 감지<p>{curObserveState?.redCnt}</p>
                  </span>
                </div>
                {/* 생성 시간, 가동 시간 */}
                <div className="historyTimeBox">
                  <div>
                    <span>생성시간</span>
                    <span>
                      {dayjs(curObserveState?.createdAt).format('YYYY-MM-DD')}
                      <span>
                        {dayjs(curObserveState?.createdAt).format('hh:mm:ss')}
                      </span>
                    </span>
                  </div>
                  <div>
                    <span>가동 시간</span>
                    <span>{swrFenceOperatingTime}</span>
                  </div>
                </div>

                <div className="alertBox">
                  <div className="alertContent">{imgCaptureHistoryMap}</div>
                  <ReactPaginate
                    pageCount={Math.ceil(archiveImgsCnt / pageRange)}
                    pageRangeDisplayed={7}
                    marginPagesDisplayed={0}
                    breakLabel=""
                    previousLabel="이전"
                    nextLabel="다음"
                    onPageChange={changePage}
                    containerClassName="paginationUl"
                    activeClassName="currentPage"
                    previousClassName="pageLabelBtn"
                    nextClassName="pageLabelBtn"
                    disabledClassName="paginationDisabled"
                    pageClassName="paginationLi"
                  />
                </div>
              </div>
            </div>
          </div>

          {isOpenDangerZoneState && (
            <DangerZonePopup
              setIsOpenDangerZoneState={setIsOpenDangerZoneState}
            />
          )}
          {isOpenCalibrationState && (
            <CalibrationPopup
              calibImgSrcState={calibImgSrcState}
              setIsOpenCalibrationState={setIsOpenCalibrationState}
            />
          )}
        </div>
      </div>

      {/* 우측 영상 | 이미지 */}
      <div className="detailRight">
        <div className="rightBox">
          <div className="iframeBox">
            <div className="iframeTitle">
              {/* <div>{swrState.curCamPort?.toUpperCase()}</div> */}
              <div className="iframeTitleLeft">
                {/* 캠번호 */}
                {/* <div className="iframeCamNum">Cam2</div> */}
                {/* <div className="iframeCamName">이름</div> */}
                <div className="iframeCamNum">
                  {swrState.curCamPort?.toUpperCase()}
                </div>
                <div className="iframeCamName">{swrState.curCamName}</div>
              </div>
              <span className="iframeRecording">
                <span className="iframeRenewIcon">
                  <Autorenew />
                </span>
              </span>
              {/* <div className="iframeCamNum"> */}
              {/*  {swrState.curCamPort?.toUpperCase()} */}
              {/* </div> */}
              {/* <div className="iframeCamName">{swrState.curCamName}</div> */}
            </div>
            {/* <canvas className="polygonCanvas" typeof="coordinate3" /> */}
            <canvas
              // className={`firstCanvas polygonCanvas ${data.canvasClass}`}
              className="firstCanvas polygonCanvas"
              // tabIndex={idx}
              itemID="firstCanvas"
              width={camWidth}
              height={camHeight}
              id={swrState.curTrackerId}
              onClick={canvasClick}
              itemProp={`${swrState.curCamBaseLine}|${swrState.curCamDangerLine}`}
              style={{ border: 'none' }}
            />

            <iframe
              title="stream1"
              // src={streamUrl ??"http://127.0.0.1:8000/api/stream/area/"}
              // src="http://192.168.0.4:81/api/stream/"
              src={imgSrcState}
              width={camWidth}
              height={camHeight}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailViewPage;
