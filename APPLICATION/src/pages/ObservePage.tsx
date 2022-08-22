import React, { useEffect, useMemo, useState, Suspense } from 'react';
import { flushSync } from 'react-dom';
import '../style/pages/ObservePage.scss';
import { useNavigate } from 'react-router-dom';
import ObserveCamInfo from '../components/ObserveCamInfo';
import axios from 'axios';
import Api from '../api/Api';
import PolygonDraw from '../util/PolygonDraw';
import { Build, GpsFixed, PhotoLibrary, Settings } from '@material-ui/icons';
import { useSWRState } from '../fetcher/useSWRState';
import useSWR from 'swr';
import dayjs from 'dayjs';
import ObserveCamTabs from '../components/ObserveCamTabs';
import { initVideoFrameData } from '../initDatas/initVideoFrameData';
import CoordinateTool from '../util/CoordinateTool';
import ObserveCamStream from '../components/ObserveCamStream';
import { today } from '../util/dateLibrary';
import { FiX } from 'react-icons/all';
import ClipLoader from 'react-spinners/ClipLoader';
import { PulseLoader } from 'react-spinners';
import Loading from '../components/Loading';

const ObservePage = () => {
  const navigate = useNavigate();
  const { data: swrState, mutate: setSwrState } = useSWRState();
  const [txtChangeState, setTxtChangeState] = useState('녹화시작');
  const [videoFrameState, setVideoFrameState] =
    useState<Array<ViedeoFrameType>>(initVideoFrameData);
  const [getObserveState, setGetObserveState] = useState([]);
  const [camTabState, setCamTabState] = useState(1);
  const [recordState, setRecordState] = useState(false);
  const swrIntervalMilliSec = 300;
  const findFetcher = (url: string) =>
    axios.post(url, { area: swrState.curTrackerArea }).then((res) => res.data);
  const [loadingState, setLoadingState] = useState(false);

  const { data: swrTrackerData, error: swrTrackerErr } = useSWR<
    Array<TrackerObserve>
  >('/api/tracker/find', findFetcher, {
    refreshInterval: swrIntervalMilliSec,
  });

  const observeFindFetcher = (url: string) =>
    axios.post(url, { date: today }).then((res) => res.data);

  const { data: swrObserveData, error } = useSWR(
    '/api/observe/find',
    observeFindFetcher,
    { refreshInterval: swrIntervalMilliSec }
  );

  const handleActive = (e) => {
    const target = e.currentTarget;
    const recordTxtEl = document.querySelector('.recordTxt');
    const iframeTitleEl = document.querySelector('.iframeTitle');
    const recordBtnCircleEl = document.querySelector('.recordBtnCircle');
    target.classList.toggle('txtActive');
    target.classList.toggle('hoverCircleActive');
    setTxtChangeState((prev) => (prev === '녹화중' ? '녹화시작' : '녹화중'));
    recordTxtEl.classList.toggle('txtColorActive');
    iframeTitleEl.classList.toggle('iframeTxtColorActive');
    recordBtnCircleEl.classList.toggle('spinnerActive');
    const camStateObj = {
      cam1: videoFrameState[0].ip,
      cam2: videoFrameState[1].ip,
      cam3: videoFrameState[2].ip,
      cam4: videoFrameState[3].ip,
    };
    const ip = camStateObj[`cam${camTabState.toString()}`];
    Api.stream.startRecordVideo(ip);
    !recordState ? setRecordState(true) : setRecordState(false);
  };

  const setNewVideoSrcState = (arrIndex: number, newSrc: string) => {
    const newArr = videoFrameState;
    newArr[arrIndex].frameSrc = newSrc;
    flushSync(() => setVideoFrameState([...newArr]));
  };

  /* setVideoFrameState, setGetObserveState */
  const setProcessedSwrData = () => {
    setLoadingState(true);
    console.log('🍯🍯🍯🍯🍯🍯🍯🍯🍯🍯🍯🍯🍯🍯🍯🍯🍯🍯🍯🍯🍯🍯🍯🍯🍯🍯');
    // console.log('initVideoFrameData', initVideoFrameData);
    const processedData = [];
    setVideoFrameState([]);

    /* 정렬 */
    swrTrackerData.sort((prev, next) => {
      if (prev.camPort > next.camPort) return 1;
      if (prev.camPort < next.camPort) return -1;
      return 0;
    });

    // console.log('🌈swrTrackerData', swrTrackerData);
    // console.log(
    //   '🌈🌈swrTrackerData',
    //   swrTrackerData.map((tracker) => tracker.camName)
    // );
    const camNames = swrTrackerData.map((tracker) => tracker.camName);

    /*
     * tracker 데이터와 videoFrameState와 일치하는 데이터만 초기값으로 주면 될듯 하다.
     * */
    swrTrackerData.forEach(async (tracker, idx) => {
      // console.log('🪸tracker', tracker);
      // console.log('🪸tracker ip', tracker.ip);

      // console.log(
      //   '🪸🪸🪸🪸🪸🪸',
      //   videoFrameState.filter((data) => camNames.includes(data.camName))
      // );

      // console.log('swrTrackerData.length', swrTrackerData.length);

      console.log(
        '🍥swrTrackerData.length',
        initVideoFrameData.slice(0, swrTrackerData.length)
      );

      const curVideoFrameState = initVideoFrameData.slice(
        0,
        swrTrackerData.length
      );

      // const curVideoFrameState = videoFrameState.filter((obj) => {
      //   console.log('🍰🍰🍰');
      //   console.log('🍰🍰🍰obj.camName', obj.camName);
      //   console.log(
      //     swrTrackerData.map((tracker) => tracker.camName).includes(obj.camName)
      //   );
      //   return swrTrackerData
      //     .map((tracker) => tracker.camName)
      //     .includes(obj.camName);
      // });

      // const curVideoFrameState =
      //   swrTrackerData.length === idx + 1
      //     ? videoFrameState.filter((data) => camNames.includes(data.camName))
      //     : videoFrameState;
      // const curVideoFrameState = videoFrameState.filter((data) => camNames.includes(data.camName));

      // console.log('🍕🍕🍕🍕🍕🍕videoFrameState', videoFrameState);
      // console.log('processedData.length', processedData.length);
      const {
        _id,
        ip,
        baseLine,
        dangerLine,
        sensingGroup1,
        sensingGroup2,
        camName,
      } = tracker;
      // console.log('🐳sensingGroup1', sensingGroup1);
      // console.log('🐳sensingGroup2', sensingGroup2);
      // GYR
      const yellowSensingCoordinate1 = sensingGroup1.split('&')[1];
      const redSensingCoordinate1 = sensingGroup1.split('&')[2];
      const yellowSensingCoordinate2 = sensingGroup2.split('&')[1];
      const redSensingCoordinate2 = sensingGroup2.split('&')[2];
      // console.log('🍑yellowSensingCoordinate1', yellowSensingCoordinate1);
      // console.log('🍑redSensingCoordinate1', redSensingCoordinate1);
      let frameSrc = `http://${ip}:81`;
      const areaFrameSrc = `http://${ip}:81/api/stream/area`;

      if (yellowSensingCoordinate1) {
        frameSrc = `${areaFrameSrc}/1/${yellowSensingCoordinate1}/${redSensingCoordinate1}/`;
      }

      if (yellowSensingCoordinate2) {
        frameSrc = yellowSensingCoordinate1
          ? `${areaFrameSrc}/2/${yellowSensingCoordinate1}/${redSensingCoordinate1}/${yellowSensingCoordinate2}/${redSensingCoordinate2}`
          : `${areaFrameSrc}/2/${yellowSensingCoordinate2}/${redSensingCoordinate2}/`;
      }

      // const newSrc = `http://${ip}:81/api/stream/area/1/${yellowSensingCoordinate}/${redSensingCoordinate}/`;

      // const camIdx = camPort.at(-1) - 1;
      // console.log('camIdx', camIdx);
      // console.log('🍄obj', obj);
      // console.log('🌾camPort', camPort);
      // console.log('🍄camPort.at(-1)', camPort.at(-1));
      // console.log('🌳camIdx', camIdx);
      // console.log('🌺ip', ip);
      const group1Coord = CoordinateTool.coordinateMaker(
        tracker.sensingGroup1.split('&')[2]?.split(',')
      );
      // console.log('🌸group1Coord', group1Coord);
      /* DB에 저장된 좌표값을 기준으로 좌표값이 있다면 visible true */
      const group2Coord = CoordinateTool.coordinateMaker(
        tracker.sensingGroup2.split('&')[2]?.split(',')
      );
      // console.log('🌸group2Coord', group2Coord);

      if (curVideoFrameState[idx]) {
        curVideoFrameState[idx].trackerId = _id;
        curVideoFrameState[idx].baseLine = baseLine;
        curVideoFrameState[idx].dangerLine = dangerLine;
        curVideoFrameState[idx].ip = ip;
        curVideoFrameState[idx].frameSrc = frameSrc;
        curVideoFrameState[idx].camName = camName;
        curVideoFrameState[idx].firstCanvas.visible = group1Coord.length > 0;
        curVideoFrameState[idx].firstCanvas.coordinate = group1Coord;
        curVideoFrameState[idx].secondCanvas.visible = group2Coord.length > 0;
        curVideoFrameState[idx].secondCanvas.coordinate = group2Coord;
      }

      // console.log('🍟🍟🍟🍟🍟curVideoFrameState', curVideoFrameState);
      await setVideoFrameState([...curVideoFrameState]);

      await Api.observe
        .findData({ trackerId: tracker._id, date: today })
        .then((observe) => {
          if (observe?.length > 0) {
            const processedObserve = observe.map((obj) => {
              return { ...tracker, ...obj };
            });
            processedData.push(...processedObserve);
            // console.log('🌺🌺🌺processedData', processedData);
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

            flushSync(() => setGetObserveState([...processedData]));
          }
        })
        .finally(() => setLoadingState(false));
    });
  };

  /* INIT EFFECT */
  useEffect(() => {
    return () => {
      console.log('🌽🌽🌽CLEAR EFFECT🌽🌽🌽');
    };
  }, []);

  useEffect(() => {
    // console.log('📀📀📀📀videoFrameState', videoFrameState);
    // if (videoFrameState[0]) {
    //   const coor1 = videoFrameState[0]?.secondCanvas?.coordinate[0];
    //   const coor2 = videoFrameState[0]?.secondCanvas?.coordinate[1];
    //   coor1 &&
    //     coor2 &&
    //     console.log(
    //       '2차그룹으로 거리재기 확인',
    //       PolygonDraw.getTwoPointsDistance(coor1, coor2)
    //     );
    // }
    // console.log('rate', PolygonDraw.getDistanceRate(165, 12.5));
  }, [videoFrameState]);

  /* SET FIRST */
  useEffect(() => {
    console.log('🧀');
    // console.log('🌽🌽🌽🌽🌽getObserveState', getObserveState);
    if (getObserveState.length === 0)
      swrTrackerData?.length > 0 && setProcessedSwrData();
  }, [getObserveState]);

  useEffect(() => {
    // console.log('🫑');
    // console.log('swrTrackerData', swrTrackerData);
    swrTrackerData?.length > 0 && setProcessedSwrData();
  }, [swrTrackerData, swrObserveData]);

  if (loadingState) return <Loading />;
  return (
    <div id="observeContainer" className="observeContainer">
      <div className="observeLeft">
        <div className="leftBox">
          <div className="titleBox">
            <span className="subTitle">Place</span>
            {/* 구역 이름 */}
            <span className="mainTitle">{swrState?.curTrackerArea}</span>
          </div>
          <div className="safetyTabWrap">
            <div className="safetyTabBox">
              {/* cam1, 2, 3, 4 tab */}
              <ObserveCamTabs
                setCamTabState={setCamTabState}
                camTabState={camTabState}
                videoFrameState={videoFrameState}
              />
            </div>
            <div className="safetyTabContainer">
              {/* 각 cam탭 밑에 그룹 정보 */}
              <ObserveCamInfo
                videoFrameState={videoFrameState}
                setVideoFrameState={setVideoFrameState}
                getObserveState={getObserveState}
                setNewVideoSrcState={setNewVideoSrcState}
              />
            </div>
            <div className="bottomBtnBox">
              {/* 녹화 버튼 */}
              <div className="recordBtnBox">
                <button className="recordBtn">
                  <div className="recordBtnCircle"/>
                  <div className="hoverCircle" onClick={handleActive} />
                </button>
                <span className="recordTxt">{txtChangeState}</span>
              </div>
              {/* 셋팅 버튼 */}
              <div className="rightBtnBox">
                {/* <button */}
                {/*  className="archiveBtn" */}
                {/*  onClick={() => { */}
                {/*    navigate('/videoArchive'); */}
                {/*  }} */}
                {/* > */}
                {/*  <PhotoLibrary /> */}
                {/* </button> */}
                <button className="fixIcon" onClick={() => navigate('/detail')}>
                  <Build />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="observeRight">
        <div className="rightBox">
          <Suspense fallback={<Loading />}>
            {/* 카메라 영상 출력 박스 */}
            <ObserveCamStream
              videoFrameState={videoFrameState}
              setVideoFrameState={setVideoFrameState}
              recordState={recordState}
              setNewVideoSrcState={setNewVideoSrcState}
              camTabState={camTabState}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ObservePage;
