import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Videocam from '../images/videocam.png';
import Warning from '../images/warning.png';
import BgImg from '../images/bg.png';
import '../style/components/AreaInfo.scss';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios';
import CurrentTime from './CurrentTime';
import { flushSync } from 'react-dom';
import { useSWRState } from '../fetcher/useSWRState';
import { getFetcher } from '../fetcher/fetcher';
import Api from '../api/Api';
import dayjs from 'dayjs';
import { areaInfoDummyData } from '../initDatas/areaInfoDummyData';
import Loading from './Loading';
import { MdDangerous, MdOutlineTaskAlt } from 'react-icons/md';
import { Feedback } from '@material-ui/icons';

const AreaInfo = () => {
  const navigate = useNavigate();
  const today = dayjs().format('YYYY-MM-DD');
  const [loadingState, setLoadingState] = useState(false);
  const [getObserveState, setGetObserveState] = useState([]);
  const [observingSetTrigger, setObservingSetTrigger] = useState(true);
  const { data: swrState, mutate: setSwrState } = useSWRState();

  const findFetcher = (url: string) =>
    axios.post(url, { date: today }).then((res) => res.data);

  /* 오늘 날짜의 observe 데이터 가져오기 */
  const { data: swrObserveData, error: swrObserveErr } = useSWR<
    Array<TrackerObserve>
  >('/api/observe/find', findFetcher, { refreshInterval: 1000 });

  /* 전체 tracker 데이터 가져오기 */
  const { data: swrTrackerData, error: swrTrackerErr } = useSWR<
    Array<TrackerObserve>
  >('/api/tracker', getFetcher, { refreshInterval: 1000 });

  /* 최근 10시간중 감지된 위험 가져오기 */
  const { data: swrSensingCnt, error: swrSensingCntErr } = useSWR<number>(
    '/api/archive/count-part/',
    getFetcher,
    { refreshInterval: 1000 }
  );

  /* 카메라 감지 페이지 넘어가기 */
  const goObservePage = (e) => {
    const target = e.currentTarget;
    const targetArea = target.getAttribute('itemID');
    setSwrState({ ...swrState, curTrackerArea: targetArea });
    navigate('/observe');
  };

  /* tracker데이터들을 메인 페이지에 맞게 데이터 가공해서 셋팅해주는 메서드‼️ */
  const setProcessedSwrData = useCallback(() => {
    setLoadingState(true);
    const processedData = [];
    /* 각 구역들만 추출 */
    const areaData = [...new Set(swrTrackerData?.map((obj) => obj.area))];
    // console.log('areaData', areaData);
    /* 메인 화면에 리스트들이 안뜨는 이유는 오늘 날짜의 observe 데이터가 없어서 그렇다. */
    swrTrackerData.forEach(async (tracker, idx) => {
      await Api.observe
        .findData({ trackerId: tracker._id, date: today })
        .then((observe) => {
          // console.log('observe', observe);
          let processedObserve = [];
          /* 오늘 날짜로의 감지 데이터가 있으면 실행 */
          if (observe?.length > 0) {
            /* 오늘 날짜의 observe 데이터와 tracker 데이터 결합 */
            processedObserve = observe.map((obj) => {
              return { ...tracker, ...obj };
            });
          } else processedObserve = [{ ...tracker }];
          // console.log('processedObserve', processedObserve);
          processedData.push(...processedObserve);
          /* 정렬 */
          processedData.sort((prev, next) => {
            if (prev.area > next.area) return 1;
            if (prev.area < next.area) return -1;
            return 0;
          });
          // console.log('😊 processedData', processedData);
          const areaFilteredObj = [];
          /* 구역 이름을 객체의 키 값으로 먼저 생성 */
          areaData.forEach((area) => {
            areaFilteredObj.push({
              [area]: [...processedData.filter((obj) => obj.area === area)],
            });
          });

          /* 구역 이름 키에 해당 객체 투입 */
          areaData.forEach((area, idx) => {
            const areaObj = areaFilteredObj[idx][area];
            if (areaObj?.length > 0) {
              /* 해당 구역의 안전 레벨들을 고유값으로 셋팅 */
              const safetyLevelSet = [
                ...new Set(areaObj?.map((obj) => obj.safetyLevel)),
              ];
              // console.log('🥰 safetyLevelSet', safetyLevelSet);
              /* 각 구역에 safetyLevel, redCnt, yellowCnt 셋팅 */
              areaFilteredObj[idx][area] = {
                activate: [...new Set(areaObj.map((obj) => obj.observeSwitch))],
                camCnt: [...new Set(areaObj.map((obj) => obj.camPort))].length,
                safetyLevel: safetyLevelSet?.includes('Red')
                  ? 'Red'
                  : safetyLevelSet?.includes('Yellow')
                  ? 'Yellow'
                  : 'Green',
                redCnt: areaObj
                  .map((obj) => (isNaN(obj?.redCnt) ? 0 : obj?.redCnt))
                  .reduce((acc: number, cur: number) => acc + cur),
                yellowCnt: areaObj
                  .map((obj) => (isNaN(obj?.yellowCnt) ? 0 : obj?.yellowCnt))
                  .reduce((acc: number, cur: number) => acc + cur),
              };
            }
          });
          // console.log('2 💐💐💐💐💐', areaFilteredObj);
          flushSync(() => setGetObserveState([...areaFilteredObj]));
          flushSync(() => setLoadingState(false));
        });
    });
  }, [swrTrackerData, swrObserveData]);

  /* INIT EFFECT */
  useEffect(() => {
    const count = 20;
    window.onscroll = (e) => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setTimeout(() => {
          /* do something for infinite scroll */
        }, 1000);
      }
    };
  }, []);

  /* 1 */
  /* 처음 한번 가공 데이터 셋팅. 가공 데이터는 getObserveState에 셋팅된다. */
  useEffect(() => {
    console.log('#####getObserveState', getObserveState);
    console.log('🌸🌸🌸 swrObserveData', swrObserveData);
    /* getObserveState 데이터가 있을때 한번 가공 데이터 셋팅 */
    if (getObserveState.length === 0)
      swrTrackerData?.length > 0 && setProcessedSwrData();
  }, [getObserveState]);

  /* 2 */
  /* tracker, observe데이터가 갱신될때마다 지속적 가공 데이터 셋팅 */
  useEffect(() => {
    /* db에서 tracker 데이터가 바뀔때마다 가공 데이터 셋팅 */
    if (swrTrackerData) {
      console.log('swrTrackerData', swrTrackerData);
      setProcessedSwrData();

      /* isObserving 데이터 전부 false로 만들기 */
      const setAllIsObservingFalse = (id) =>
        Api.tracker.modifyOneData(id, { isObserving: false });
      observingSetTrigger
        ? swrTrackerData.forEach((obj) => setAllIsObservingFalse(obj._id))
        : setObservingSetTrigger(false);
    }
  }, [swrTrackerData, swrObserveData]);

  const areaCardsMap = useMemo(() => {
    return (
      getObserveState.length > 0 ? getObserveState : areaInfoDummyData
    ).map((card, idx) => {
      const getObjectKey = Object.keys(card)[0].toString() ?? card.area;
      return (
        <div
          className="areaCardBox"
          key={idx}
          itemID={getObjectKey}
          onClick={goObservePage}
          datatype={idx.toString()}
        >
          <div className="titleBox">
            <span>{getObjectKey || card.area}</span>
          </div>
          <div className="areaContent">
            <div className="areaTop">
              <div className="imgBox">
                <img src={BgImg} alt="" />
              </div>
            </div>
            <div className="areaBottom">
              <div className="camBox">
                <div className="camPort">
                  CAM <span>{card[getObjectKey]?.camCnt}</span>
                </div>
                <div className="activeBadge">
                  <div className="circle" />
                  <span>ACTIVE</span>
                </div>
              </div>
              <div className="alarmBox">
                {/* className : green yellow red inactive => alarmTxt 에 추가해주시면 됩니다! */}
                <div
                  className={`alarmTxt ${
                    card[getObjectKey]?.safetyLevel === 'Red'
                      ? 'red'
                      : card[getObjectKey]?.safetyLevel === 'Yellow'
                      ? 'yellow'
                      : 'green'
                  }`}
                >
                  <div className="alarmBtnBoxContent">
                    {card[getObjectKey]?.safetyLevel === 'Red' ? (
                      <span className="alarmBtnBoxTxt red">
                        <p>
                          <MdDangerous style={{ fontSize: '32px' }} />
                        </p>
                        작업자 위험 반경 진입
                      </span>
                    ) : card[getObjectKey]?.safetyLevel === 'Yellow' ? (
                      <span className="alarmBtnBoxTxt yellow">
                        <p>
                          <Feedback style={{ fontSize: '32px' }} />
                        </p>
                        작업자 진입 확인
                      </span>
                    ) : (
                      <span className="alarmBtnBoxTxt green">
                        <p>
                          <MdOutlineTaskAlt style={{ fontSize: '32px' }} />
                        </p>
                        안전합니다
                      </span>
                    )}
                  </div>
                </div>
                <div className="sensingBox">
                  <span>
                    1차 감지<p>{card[getObjectKey]?.yellowCnt}</p>
                  </span>
                  <span>
                    2차 감지<p>{card[getObjectKey]?.redCnt}</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }, [getObserveState]);

  if (loadingState) return <Loading />;
  if (!swrTrackerData) return <Loading />;
  if (!swrObserveData) return <Loading />;
  return (
    <div className="areaInfoContainer">
      <div className="areaInfo">
        <div className="infoLeft">
          <div className="leftBox">
            <div className="top">
              <CurrentTime />
            </div>
            <div className="bottom">
              <div>
                <span>
                  Safety.AI가 <br />
                  <span className="bold">감시중인 구역</span>
                </span>
                <div className="icon">
                  <img src={Videocam} alt="" />
                  <span className="blue">{getObserveState?.length}</span>
                </div>
              </div>
              <div>
                <span>
                  최근 10시간 중 <br />
                  <span className="bold">감지된 위험</span>
                </span>
                <div className="icon">
                  <img src={Warning} alt="" />
                  <span className="red">{swrSensingCnt}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="infoRight">
          <div className="rightBox">
            {/* <div className="areaCardWrap">{cardSkeletonMap}</div> */}
            <div className="areaCardWrap">{areaCardsMap}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaInfo;
