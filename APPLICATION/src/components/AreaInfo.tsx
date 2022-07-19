import React, { useEffect, useMemo, useState } from 'react';
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
  {
    activate: true,
    alarms: '없음',
    area: 'H3 공장크레인',
    camCoordinate1: null,
    camCoordinate2: null,
    camName: null,
    camPort: '4',
    camSafetyLevel: 'Green',
    camSensing1: '0',
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
    area: 'H4 공장크레인',
    camCoordinate1: null,
    camCoordinate2: null,
    camName: null,
    camPort: '4',
    camSafetyLevel: 'Green',
    camSensing1: '9999',
    camSensing2: '7',
    computeDevice: null,
    createdAt: '2022-06-28T00:12:52+00:00',
    date: '2022-06-28',
    savingPath: null,
    sensingModel: null,
    alarmTxt: '작업자 위험 반경 진입',
  },
  {
    activate: true,
    alarms: '없음',
    area: 'H5 공장크레인',
    camCoordinate1: null,
    camCoordinate2: null,
    camName: null,
    camPort: '',
    camSafetyLevel: 'Green',
    camSensing1: '0',
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
    area: 'H6 공장크레인',
    camCoordinate1: null,
    camCoordinate2: null,
    camName: null,
    camPort: '',
    camSafetyLevel: 'Green',
    camSensing1: null,
    camSensing2: null,
    computeDevice: null,
    createdAt: '2022-06-28T00:12:52+00:00',
    date: '2022-06-28',
    savingPath: null,
    sensingModel: null,
    alarmTxt: '비활성 되었습니다.',
  },
  {
    activate: true,
    alarms: '없음',
    area: 'H7 공장크레인',
    camCoordinate1: null,
    camCoordinate2: null,
    camName: null,
    camPort: '',
    camSafetyLevel: 'Green',
    camSensing1: null,
    camSensing2: null,
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
    area: '',
    camCoordinate1: null,
    camCoordinate2: null,
    camName: null,
    camPort: '',
    camSafetyLevel: 'Green',
    camSensing1: null,
    camSensing2: null,
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
    area: '',
    camCoordinate1: null,
    camCoordinate2: null,
    camName: null,
    camPort: '',
    camSafetyLevel: 'Green',
    camSensing1: null,
    camSensing2: null,
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
    area: '',
    camCoordinate1: null,
    camCoordinate2: null,
    camName: null,
    camPort: '',
    camSafetyLevel: 'Green',
    camSensing1: null,
    camSensing2: null,
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
    area: '',
    camCoordinate1: null,
    camCoordinate2: null,
    camName: null,
    camPort: '',
    camSafetyLevel: 'Green',
    camSensing1: null,
    camSensing2: null,
    computeDevice: null,
    createdAt: '2022-06-28T00:12:52+00:00',
    date: '2022-06-28',
    savingPath: null,
    sensingModel: null,
    alarmTxt: '안전합니다.',
  },
];

const AreaInfo = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);
  const [getObserveState, setGetObserveState] = useState([
    {
      area: 'H2 공장 크레인',
    },
    {
      area: 'H6 공장 크레인',
    },
    {
      area: 'H3 공장 크레인',
    },
  ]);
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
    const targetArea = target.getAttribute('itemType');
    console.log('dType', dType);
    console.log('targetArea', targetArea);
    setSwrState({ ...swrState, curTrackerArea: targetArea });
    navigate('/observe');
  };

  const areaCardsMap = useMemo(() => {
    return (getObserveState || dummyData).map((card, idx) => (
      <div
        className="areaCardBox"
        key={idx}
        itemType={card?.area}
        onClick={goObservePage}
        datatype={idx.toString()}
      >
        {/* <h3>{card.area}</h3> */}
        <div className="titleBox">
          <span>{card?.area}</span>
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
                CAM <span>{card?.camPort?.substr(3, 1)}</span>
              </div>
              <div className="activeBadge">
                <div className="circle" />
                <span>ACTIVE</span>
              </div>
            </div>
            <div className="alarmBox">
              {/* className : green yellow red inactive => alarmTxt 에 추가해주시면 됩니다! */}
              <div className="alarmTxt green">{card?.alarmTxt}</div>
              <div className="sensingBox">
                <span>
                  1차 감지<div>{card?.camSensing1}</div>
                </span>
                <span>
                  2차 감지<div>{card?.camSensing2}</div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  }, [getObserveState]);

  const setProcessedData = async () => {
    swrObserveData?.forEach((observe, idx) => {
      axios
        .get(`/api/tracker/${observe.trackerId}`)
        .then((tracker) => {
          const trackerObj = tracker.data;
          const newObserveData = { ...observe, ...trackerObj };
          const { area, camName, camPort, groupNum } = newObserveData;
          // 없을 경우 undefined
          // 없을 경우 -1
          const foundDataByArea = getObserveState.filter(
            (obj) => obj.area === area
          );
          const dataIdx = foundDataByArea?.findIndex(
            (obj) => obj.groupNum === camPort
          );
          const newObjArr = getObserveState;
          if (dataIdx === -1 || dataIdx === undefined)
            newObjArr.push(newObserveData);
          else newObjArr[dataIdx] = newObserveData;
          flushSync(() => setGetObserveState([...newObjArr]));
        })
        .catch((err) => console.error(err));
    });
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
          console.log('tracker._id', tracker._id);
          console.log('observe', observe);
          /* 오늘 날짜로의 감지 데이터가 있으면 실행 */
          if (observe?.length > 0) {
            const processedObserve = observe.map((obj) => {
              return { ...tracker, ...obj };
            });

            processedData.push(...processedObserve);
            console.log('🌺🌺🌺processedData', processedData);
            processedData.sort((prev, next) => {
              if (prev.area > next.area) return 1;
              if (prev.area < next.area) return -1;
              return 0;
            });
            flushSync(() => setGetObserveState([...processedData]));
          } else {
            processedData.push(tracker);
            console.log('🌳🌳🌳processedData', processedData);
            processedData.sort((prev, next) => {
              if (prev.area > next.area) return 1;
              if (prev.area < next.area) return -1;
              return 0;
            });
            flushSync(() => setGetObserveState([...processedData]));
          }
        });
    });
  };

  useEffect(() => {
    console.log('swrTrackerData?.length', swrTrackerData?.length);
    swrTrackerData?.length > 0 && setProcessedSwrData();
  }, [swrTrackerData]);

  // useEffect(() => {
  //   console.log('swrTrackerData', swrTrackerData);
  //   swrTrackerData?.length > 0 && setGetObserveState([]);
  // }, [swrTrackerData]);

  useEffect(() => {
    console.log('#####getObserveState', getObserveState);
    if (getObserveState.length === 0) {
      swrTrackerData?.length > 0 && setProcessedSwrData();
    }
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
