import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Crane from '../images/crane.png';
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
import { number } from 'prop-types';

type AreaCard = {
  title: string;
  imgSrc: string;
  zoneState: string;
  zoneColor: string;
  camName: string;
  camState: string;
  alrmColor: string;
  alarmMessage: string;
  firstName: string;
  firstState: string;
  secondName: string;
  secondState: string;
  alarmTxt: string;
};
const dummyData = [
  {
    activate: true,
    alarms: '없음',
    area: 'H1 공장크레인',
    camCoordinate1: null,
    camCoordinate2: null,
    camName: null,
    camPort: '4',
    camSafetyLevel: 'Green',
    camSensing1: '7',
    camSensing2: '7',
    computeDevice: null,
    createdAt: '2022-06-28T00:12:52+00:00',
    date: '2022-06-28',
    savingPath: null,
    sensingModel: null,
    alarmTxt: '안전합니다.',
  },
  {
    activate: true,
    alarms: '없음',
    area: 'H2 공장크레인',
    camCoordinate1: null,
    camCoordinate2: null,
    camName: null,
    camPort: '4',
    camSafetyLevel: 'Green',
    camSensing1: '2',
    camSensing2: '7',
    computeDevice: null,
    createdAt: '2022-06-28T00:12:52+00:00',
    date: '2022-06-28',
    savingPath: null,
    sensingModel: null,
    alarmTxt: '작업자 진입 확인',
  },
];

const AreaInfo = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);
  const [getObserveState, setGetObserveState] = useState([]);
  const { data: swrState, mutate: setSwrState } = useSWRState();

  const findFetcher = (url: string) =>
    axios.post(url, { date: today }).then((res) => res.data);

  const { data: swrObserveData, error: swrObserveErr } = useSWR<
    Array<TrackerObserve>
  >('/api/observe/find', findFetcher, {
    refreshInterval: 1000,
  });

  const { data: swrTrackerData, error: swrTrackerErr } = useSWR<
    Array<TrackerObserve>
  >('/api/tracker', getFetcher, {
    refreshInterval: 1000,
  });

  let count = 20;
  window.onscroll = (e) => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setTimeout(() => {
        const addContent = document.createElement('div');
        addContent.classList.add('areaCardBox');
        addContent.innerHTML = `<h3>H${++count} 공장 크레인</h3>
          <div className="areaContent">
            <div className="areaImgContent">
              <img src={Crane} />
              <div className="areaZone areaZoneGreen">
                Green Zone
              </div>
            </div>
            <div className="areaTextContent">
              <span className="camContent">Cam(2):<span>Active</span></span>
              <span>Alarms:</span><span>없음</span>
              <div className="detectContent">
                <span>1차 감지: <span>0</span></span>
                <span>2차 감지: <span>0</span></span>
              </span>
            </span>
          </div>`;
        document.querySelector('section').appendChild(addContent);
        // document.querySelector("section").createElement(addContent);
      }, 1000);
    }
  };

  const goObservePage = (e) => {
    const target = e.currentTarget;
    const dType = target.getAttribute('datatype');
    const targetArea = target.getAttribute('itemID');
    console.log('dType', dType);
    console.log('targetArea', targetArea);
    setSwrState({ ...swrState, curTrackerArea: targetArea });
    navigate('/observe');
  };

  /* tracker데이터들을 메인 페이지에 맞게 데이터 가공해서 셋팅해주는 메서드‼️ */
  const setProcessedSwrData = useCallback(() => {
    const processedData = [];
    const areaData = [...new Set(swrTrackerData?.map((obj) => obj.area))];

    swrTrackerData.forEach(async (tracker, idx) => {
      await Api.observe
        .findData({
          trackerId: tracker._id,
          date: today,
        })
        .then((observe) => {
          /* 오늘 날짜로의 감지 데이터가 있으면 실행 */
          if (observe?.length > 0) {
            /* 오늘 날짜의 observe 데이터와 tracker 데이터 결합 */
            const processedObserve = observe.map((obj) => {
              return { ...tracker, ...obj };
            });

            processedData.push(...processedObserve);
            /* 정렬 */
            processedData.sort((prev, next) => {
              if (prev.area > next.area) return 1;
              if (prev.area < next.area) return -1;
              return 0;
            });

            const areaFilteredObj = [];
            /* 구역 이름을 객체의 키 값으로 먼저 생성 */
            areaData.forEach((area) => {
              areaFilteredObj.push({
                [area]: [...processedData.filter((obj) => obj.area === area)],
              });
            });

            /* 구역 이름 키에 해당 객체 투입 */
            areaData.forEach((area, idx) => {
              if (areaFilteredObj[idx][area]?.length > 0) {
                /* 해당 구역의 안전 레벨들을 고유값으로 셋팅 */
                const safetyLevelSet = [
                  ...new Set(
                    areaFilteredObj[idx][area].map((obj) => obj.safetyLevel)
                  ),
                ];
                /* 각 구역에 safetyLevel, redCnt, yellowCnt 셋팅 */
                areaFilteredObj[idx][area] = {
                  safetyLevel: safetyLevelSet.includes('Red')
                    ? 'Red'
                    : safetyLevelSet.includes('Yellow')
                    ? 'Yellow'
                    : 'Green',
                  redCnt: areaFilteredObj[idx][area]
                    .map((obj) => obj.redCnt)
                    .reduce((acc, cur) => acc + cur),
                  yellowCnt: areaFilteredObj[idx][area]
                    .map((obj) => obj.yellowCnt)
                    .reduce((acc, cur) => acc + cur),
                };
              }
            });
            console.log('2 💐💐💐💐💐', areaFilteredObj);
            // flushSync(() => setGetObserveState([...processedData]));
            flushSync(() => setGetObserveState([...areaFilteredObj]));
          }
        });
    });
  }, [swrTrackerData, swrObserveData]);

  useEffect(() => {
    // console.log('#####getObserveState', getObserveState);
    // console.log('🌸🌸🌸 swrObserveData', swrObserveData);
    /* getObserveState 데이터가 있을때 한번 가공 데이터 셋팅 */
    if (getObserveState.length === 0)
      swrTrackerData?.length > 0 && setProcessedSwrData();
  }, [getObserveState]);

  useEffect(() => {
    // console.log('swrTrackerData?.length', swrTrackerData?.length);
    /* db에서 tracker 데이터가 바뀔때마다 가공 데이터 셋팅 */
    swrTrackerData?.length > 0 && setProcessedSwrData();
  }, [swrTrackerData, swrObserveData]);

  const areaCardsMap = useMemo(() => {
    return (getObserveState || dummyData).map((card, idx) => {
      const getObjectKey = Object.keys(card);
      return (
        <div
          className="areaCardBox"
          key={idx}
          itemID={getObjectKey.toString()}
          onClick={goObservePage}
          datatype={idx.toString()}
        >
          {/* <h3>{card.area}</h3> */}
          <div className="titleBox">
            <span>{Object.keys(card)}</span>
            {/* @ts-ignore */}
            <span>{card?.trackerId}</span>
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
                  {/* @ts-ignore */}
                  CAM <span>{card[[getObjectKey]]?.length}</span>
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
                    // @ts-ignore
                    card[[getObjectKey]]?.safetyLevel === 'Red'
                      ? 'red'
                      : // @ts-ignore
                      card[[getObjectKey]]?.safetyLevel === 'Yellow'
                      ? 'yellow'
                      : 'green'
                  }`}
                >
                  {
                    // @ts-ignore
                    card[[getObjectKey]]?.safetyLevel === 'Red'
                      ? '작업자 위험 반경 진입'
                      : // @ts-ignore
                      card[[getObjectKey]]?.safetyLevel === 'Yellow'
                      ? '작업자 진입'
                      : '안전합니다.'
                  }
                </div>
                <div className="sensingBox">
                  <span>
                    {/* @ts-ignore */}
                    1차 감지<p>{card[getObjectKey]?.yellowCnt}</p>
                  </span>
                  <span>
                    {/* @ts-ignore */}
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
                  Safety.AI가
                  <br />
                  <span className="bold">감시중인 구역</span>
                </span>
                <div className="icon">
                  <img src={Videocam} alt="" />
                  <span className="blue">4</span>
                </div>
              </div>
              <div>
                <span>
                  최근 10시간 중<br />
                  <span className="bold">감지된 위험</span>
                </span>
                <div className="icon">
                  <img src={Warning} alt="" />
                  <span className="red">3</span>
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
