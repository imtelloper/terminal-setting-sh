import React, { useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import '../style/pages/ObservePage.scss';
import { useNavigate } from 'react-router-dom';
import ObserveCamInfo from '../components/ObserveCamInfo';
import axios from 'axios';
import Api from '../api/Api';
import PolygonDraw from '../util/PolygonDraw';
import { PhotoLibrary, Settings } from '@material-ui/icons';
import { useSWRState } from '../fetcher/useSWRState';
import useSWR from 'swr';
import dayjs from 'dayjs';
import ObserveCamTabs from '../components/ObserveCamTabs';
import {
  camPort1Ip,
  camPort2Ip,
  camPort3Ip,
  camPort4Ip,
  initVideoFrameData,
} from '../initDatas/initVideoFrameData';
import CoordinateTool from '../util/CoordinateTool';
import ObserveCamStream from '../components/ObserveCamStream';

const ObservePage = () => {
  const navigate = useNavigate();
  const today = dayjs().format('YYYY-MM-DD');
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
    axios.post(url, { date: today }).then((res) => res.data);

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
    const camStateObj = {
      cam1: camPort1Ip,
      cam2: camPort2Ip,
      cam3: camPort3Ip,
      cam4: camPort4Ip,
    };
    const ip = camStateObj[`cam${camTabState.toString()}`];
    Api.stream.startRecordVideo(ip);
    !recordState ? setRecordState(true) : setRecordState(false);
  };

  const setNewVideoSrcState = (arrIndex: number, newSrc: string) => {
    const newArr = videoFrameState;
    newArr[arrIndex].frameSrc = newSrc;
    flushSync(() => setVideoFrameState([]));
    flushSync(() => setVideoFrameState(newArr));
  };

  const setProcessedSwrData = () => {
    const processedData = [];
    swrTrackerData.forEach(async (tracker, idx) => {
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

              const group1Coord = CoordinateTool.coordinateMaker(
                obj.sensingGroup1.split('&')[2]?.split(',')
              );
              // console.log('🌸group1Coord', group1Coord);
              /* DB에 저장된 좌표값을 기준으로 좌표값이 있다면 visible true */
              curVideoFrameState[camIdx].firstCanvas.visible =
                group1Coord.length > 0;
              curVideoFrameState[camIdx].firstCanvas.coordinate = group1Coord;

              const group2Coord = CoordinateTool.coordinateMaker(
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
            {/* 구역 이름 */}
            <span className="mainTitle">{swrState?.curTrackerArea}</span>
            {/* <span className="mainTitle">데이터 들어갈자리</span> */}
          </div>
          <div className="safetyTabWrap">
            <div className="safetyTabBox">
              {/* cam1, 2, 3, 4 tab */}
              <ObserveCamTabs
                setCamTabState={setCamTabState}
                camTabState={camTabState}
              />
            </div>
            <div className="safetyTabContainer">
              {/* 각 cam탭 밑에 그룹 정보 */}
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
              {/* 녹화 버튼 */}
              <div className="recordBtnBox">
                <button className="recordBtn">
                  <div />
                  <div className="hoverCircle" onClick={handleActive} />
                </button>
                <span className="recordTxt">{txtChangeState}</span>
              </div>
              {/* 셋팅 버튼 */}
              <div className="rightBtnBox">
                <button
                  className="archiveBtn"
                  onClick={() => {
                    navigate('/videoArchive');
                  }}
                >
                  <PhotoLibrary />
                </button>
                <button
                  className="settingBtn"
                  onClick={() => navigate('/detail')}
                >
                  <Settings />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="observeRight">
        <div className="rightBox">
          {/* 카메라 영상 출력 박스 */}
          <ObserveCamStream
            videoFrameState={videoFrameState}
            setVideoFrameState={setVideoFrameState}
            recordState={recordState}
            setNewVideoSrcState={setNewVideoSrcState}
            camTabState={camTabState}
          />
        </div>
      </div>
    </div>
  );
};

export default ObservePage;
