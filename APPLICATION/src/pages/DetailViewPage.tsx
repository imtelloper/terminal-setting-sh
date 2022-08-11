import React, { useEffect, useMemo, useState } from 'react';
import '../style/DesignSystem.scss';
import '../style/pages/DetailViewPage.scss';
import DangerZonePopup from '../components/DangerZonePopup';
import CalibrationPopup from '../components/CalibrationPopup';
import { MdDangerous, MdModeEdit, MdOutlineTaskAlt } from 'react-icons/md';
import { Feedback, Tune } from '@material-ui/icons';
import Api from '../api/Api';
import { useSWRState } from '../fetcher/useSWRState';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { flushSync } from 'react-dom';
import useSWR from 'swr';
import axios from 'axios';
import { today } from '../util/dateLibrary';

const DetailViewPage = () => {
  const { data: swrState, mutate: setSwrState } = useSWRState();
  const navigate = useNavigate();
  const levelColor = {
    yellow: '#ffca2b',
    red: '#ff530d',
  };
  const [isOpenDangerZoneState, setIsOpenDangerZoneState] = useState(false);
  const [isOpenCalibrationState, setIsOpenCalibrationState] = useState(false);
  const [imgSrcState, setImgSrcState] = useState(
    `http://${swrState.curCamIp}:81/api/stream/`
  );
  const [calibImgSrcState, setCalibImgSrcState] = useState('');
  const [imgArchiveState, setImgArchiveState] = useState([]);
  const [groupNumState, setGroupNumState] = useState(1);
  const [curObserveState, setCurObserveState] = useState<Partial<Observe>>({});

  const observeFindFetcher = (url: string) =>
    axios
      .post(url, { date: today, trackerId: swrState.curTrackerId })
      .then((res) => res.data);

  const { data: swrObserveData, error } = useSWR(
    '/api/observe/find',
    observeFindFetcher,
    { refreshInterval: 1000 }
  );

  /* 그룹 선택 */
  const handleSelectGroupNum = (e) => {
    const target = e.currentTarget;
    const { value } = target;

    console.log('🥑value', value);
    setGroupNumState(parseInt(value, 10));
  };

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
            .finally(() => {
              type[dType]();
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    } else {
      type[dType]();
    }
  };

  /* INIT EFFECT */
  useEffect(() => {
    console.log('🍓swr', swrState);
    console.log('🍓swrState.curTrackerId', swrState.curTrackerId);

    /* 이력조회에서 조회할 이미지 정보들 셋팅 */
    Api.archive
      .getDetailRangeData({
        trackerId: swrState.curTrackerId,
        fileType: 'img',
        start: 0,
        limit: 20,
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
              time: dayjs(obj.createdAt).format('hh:mm:ss'),
            };
          })
        );
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    console.log('🍅groupNumState', groupNumState);
  }, [groupNumState]);

  useEffect(() => {
    console.log('imgArchiveState', imgArchiveState);
  }, [imgArchiveState]);

  // useEffect(() => {
  //   console.log('🍒swrObserveData', swrObserveData);
  //   const getCurObserve = swrObserveData?.filter(
  //     (obj) => obj.groupNum === groupNumState
  //   );
  //   console.log('🍒🍒🍒🍒🍒🍒getCurObserve', getCurObserve);
  //   setCurObserveState(getCurObserve[0]);
  // }, [swrObserveData, groupNumState]);

  useEffect(() => {
    console.log('🌷curObserveState', curObserveState);
  }, [curObserveState]);

  /* 감지 이력 리스트 */
  const imgCaptureHistoryMap = useMemo(() => {
    return imgArchiveState.map((obj) => (
      <p
        datatype={obj.path}
        onClick={handleSetArchiveImg}
        key={obj.id}
        role="presentation"
      >
        <span>
          <Feedback
            style={{
              fontSize: '20px',
              color: levelColor[obj.safetyLevel.toLowerCase()],
            }}
          />
          <span className={obj.safetyLevel.toLowerCase()}>YELLOW 2차 감지</span>
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
            <span className="mainTitle">H1 공장 크레인</span>
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
                onClick={handleClickTab}
              >
                이력조회
              </label>

              {/* 그룹 선택 */}
              <select onChange={handleSelectGroupNum}>
                <option value={1}>Group 1</option>
                <option value={2}>Group 2</option>
              </select>

              {/* 실시간 영상 TAB */}
              <div className="tabContent realTimeBox">
                <div className="realTimeContent">
                  {/* className : 색상별 green yellow red inactive */}
                  <div
                    className={`alarmTxt ${curObserveState?.safetyLevel?.toLowerCase()}`}
                  >
                    <MdOutlineTaskAlt style={{ fontSize: '32px' }} />
                    <span>
                      {curObserveState?.safetyLevel === 'Green'
                        ? '안전합니다.'
                        : curObserveState?.safetyLevel === 'Yellow'
                        ? '작업자 진입 확인'
                        : '작업자 위험 반경 진입'}
                    </span>
                  </div>

                  {/* <div className="alarmTxt yellow"> */}
                  {/*  <Feedback style={{ fontSize: '32px' }}/> */}
                  {/*  <span>작업자 진입 확인</span> */}
                  {/* </div> */}

                  {/* <div className="alarmTxt red"> */}
                  {/*  <MdDangerous style={{ fontSize: '32px' }} /> */}
                  {/*  <span>작업자 위험 반경 진입</span> */}
                  {/* </div> */}

                  {/* <div className="alarmTxt inactive"> */}
                  {/*  <HighlightOff style={{ fontSize: '32px' }} /> */}
                  {/*  <span>비활성화 되었습니다.</span> */}
                  {/* </div> */}

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
                  <span>1일 19시간 58분</span>
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
                    <span>32분</span>
                  </div>
                </div>

                <div className="alertBox">
                  <div className="alertContent">{imgCaptureHistoryMap}</div>
                </div>
              </div>
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
            {/*<div className="bottomBtnBox">*/}
            {/*  <button*/}
            {/*    className="iconBtnR normalPrimary"*/}
            {/*    onClick={() => {*/}
            {/*      navigate('/observe');*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    취소*/}
            {/*  </button>*/}
            {/*  <button*/}
            {/*    className="iconBtnR defaultPrimary"*/}
            {/*    onClick={() => {*/}
            {/*      navigate('/observe');*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    확인*/}
            {/*  </button>*/}
            {/*</div>*/}
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
              {/*<div>{swrState.curCamPort?.toUpperCase()}</div>*/}
              <div className="iframeTitleLeft">
                {/*캠번호*/}
                <div className="iframeCamNum">Cam2</div>
                <div className="iframeCamName">이름</div>
              </div>
              <div className="iframeIcon">
                <span />
                REC
              </div>
            </div>
            <canvas className="polygonCanvas" typeof="coordinate3" />
            <img
              title="stream1"
              // src={streamUrl ??"http://127.0.0.1:8000/api/stream/area/"}
              // src="http://192.168.0.4:81/api/stream/"
              src={imgSrcState}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailViewPage;
