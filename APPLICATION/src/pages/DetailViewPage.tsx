import React, { useEffect, useState } from 'react';
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
import { camPort1Ip } from '../initDatas/initVideoFrameData';
import { flushSync } from 'react-dom';

const DetailViewPage = () => {
  const { data: swrState, mutate: setSwrState } = useSWRState();
  const navigate = useNavigate();
  const [isOpenDangerZoneState, setIsOpenDangerZoneState] = useState(false);
  const [isOpenCalibrationState, setIsOpenCalibrationState] = useState(false);
  const [imgSrcState, setImgSrcState] = useState(
    'http://192.168.0.4:81/api/stream/'
  );
  const [calibImgSrcState, setCalibImgSrcState] = useState('');
  const [imgArchiveState, setImgArchiveState] = useState([]);
  const levelColor = {
    yellow: '#ffca2b',
    red: '#ff530d',
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
        .calibrationImgCapture('192.168.0.4')
        .then((res) => {
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
                  `http://${camPort1Ip}:81/${tracker[0].calibImg
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
    Api.archive
      .getDetailRangeData({
        trackerId: swrState.curTrackerId,
        fileType: 'img',
        start: 0,
        limit: 20,
      })
      .then((archives) => {
        dayjs.locale('ko');
        console.log('GASHEEEEEE    archives', archives);
        archives.forEach((obj) => {
          console.log(
            'dayjs(obj.createdAt)',
            dayjs(obj.createdAt).format('YYYY-MM-DD')
          );
          console.log(
            'dayjs(obj.createdAt)',
            dayjs(obj.createdAt).format('h:m:s')
          );
        });
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
    console.log('imgArchiveState', imgArchiveState);
  }, [imgArchiveState]);

  const handleSetArchiveImg = (e) => {
    const target = e.currentTarget;
    const dType = target.getAttribute('datatype');
    // console.log('dType', dType);
    // console.log(
    //   `http://${camPort1Ip}:81/${dType.split('/').slice(5).join('/')}`
    // );
    setImgSrcState(
      `http://${camPort1Ip}:81/${dType.split('/').slice(5).join('/')}`
    );
  };

  const handleClickTab = (e) => {
    const target = e.currentTarget;
    const dType = target.getAttribute('datatype');
    if (dType === 'realTimeStream') {
      setImgSrcState('http://192.168.0.4:81/api/stream/');
    }
    // else if (dType === 'historyRefer') {
    //   setImgSrcState('http://192.168.0.4:81/api/stream/');
    // }
  };

  /* 감지 이력 리스트 */
  const imgCaptureHistoryMap = imgArchiveState.map((obj) => (
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
              <select>
                <option>Group 1</option>
                <option>Group 2</option>
              </select>
              {/* 실시간 영상 */}
              <div className="tabContent realTimeBox">
                <div className="realTimeContent">
                  {/* className : 색상별 green yellow red inactive */}
                  <div className="alarmTxt green">
                    <MdOutlineTaskAlt style={{ fontSize: '32px' }} />
                    <span>안전합니다.</span>
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
                      1차 감지<p>7</p>
                    </span>
                    <span>
                      2차 감지<p>8</p>
                    </span>
                  </div>
                </div>
                <div className="realTimeBox">
                  <span>안전펜스 가동시간</span>
                  <span>1일 19시간 58분</span>
                </div>
              </div>
              {/* 이력 조회 */}
              <div className="tabContent historyBox">
                <div className="sensingBox">
                  <span>
                    1차 감지<p>7</p>
                  </span>
                  <span>
                    2차 감지<p>8</p>
                  </span>
                </div>
                <div className="historyTimeBox">
                  <div>
                    <span>생성시간</span>
                    <span>
                      2022-05-28<span>14:10:18</span>
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

            <div className="settingBtnBox">
              <button>
                <MdModeEdit style={{ fontSize: '38px' }} />
                <span>영역 재설정</span>
              </button>
              <button datatype="calibration" onClick={openClosePopup}>
                <Tune style={{ fontSize: '38px' }} />
                <span>Calibration 설정</span>
              </button>
              <button datatype="dangerZone" onClick={openClosePopup}>
                <MdDangerous style={{ fontSize: '38px' }} />
                <span>위험구간 설정</span>
              </button>
            </div>

            <div className="bottomBtnBox">
              <button
                className="iconR normalPrimary"
                onClick={() => {
                  navigate('/observe');
                }}
              >
                취소
              </button>
              <button className="iconR defaultPrimary">확인</button>
            </div>
          </div>

          {isOpenDangerZoneState && (
            <DangerZonePopup setIsOpenDangerZoneState={setIsOpenDangerZoneState}/>
          )}
          {isOpenCalibrationState && (
            <CalibrationPopup
              calibImgSrcState={calibImgSrcState}
              setIsOpenCalibrationState={setIsOpenCalibrationState}
            />
          )}
        </div>
      </div>

      <div className="detailRight">
        <div className="rightBox">
          <div className="iframeBox">
            <div className="iframeTitle">
              {swrState.curCamPort.toUpperCase()}
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
