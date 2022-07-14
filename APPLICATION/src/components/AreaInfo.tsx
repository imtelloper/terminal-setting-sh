import React, { useEffect, useState } from 'react';
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
    // {
    //   area: 'H2 공장 크레인',
    // },
    // {
    //   area: 'H6 공장 크레인',
    // },
    // {
    //   area: 'H3 공장 크레인',
    // },
  ]);
  const findFetcher = (url: string) =>
    axios.post(url, { date: today }).then((res) => res.data);

  const { data: swrObserveData, error } = useSWR<Array<TrackerObserve>>(
    '/api/observe/find',
    findFetcher,
    {
      refreshInterval: 1000,
    }
  );

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
    console.log('dType', dType);
    navigate('/observe');
  };

  const areaCardsMap = (swrObserveData || dummyData).map((card, idx) => (
    <div
      className="areaCardBox"
      key={idx}
      onClick={goObservePage}
      datatype={idx.toString()}
    >
      {/* <h3>{card.area}</h3> */}
      <div className="titleBox">
        <span>{card.area}</span>
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
              CAM <span>{card.camPort}</span>
            </div>
            <div className="activeBadge">
              <div className="circle" />
              <span>ACTIVE</span>
            </div>
          </div>
          <div className="alarmBox">
            {/* className : green yellow red inactive => alarmTxt 에 추가해주시면 됩니다! */}
            <div className="alarmTxt green">{card.alarmTxt}</div>
            <div className="sensingBox">
              <span>
                1차 감지<p>{card.camSensing1}</p>
              </span>
              <span>
                2차 감지<p>{card.camSensing2}</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  useEffect(() => {
    console.log('swrObserveData', swrObserveData);

    // date: "2022-07-13"
    // groupNum: 2
    // observeSwitch: false
    // observeTime: "2022-07-13 08:27:01.800000"
    // redCnt: 8
    // safetyLevel: "Red"
    // trackerId: "62c796f09715acf6931d4e6b"
    // yellowCnt: 1
    // area: "H1 공장 크레인"
    // baseLine: 0
    // calibImg: "string"
    // camName: "크레인1"
    // camPort: "cam1"
    // computeDevice: "string"
    // createdAt: "2022-07-08T02:31:12+00:00"
    // dangerLine: "string"
    // imgSaveSwitch: true
    // kakaoSwitch: true
    // messageSwitch: true
    // savingPath: "string"
    // sensingGroup1: "string"
    // sensingGroup2: "string"
    // sensingModel: "string"
    // threshold: 80

    swrObserveData?.forEach((observe, idx) => {
      console.log('observe', observe);

      axios
        .get(`/api/tracker/${observe.trackerId}`)
        .then((tracker) => {
          console.log('idx', idx);
          const trackerObj = tracker.data;
          const newObserveData = { ...observe, ...trackerObj };
          const { area, camName, camPort, groupNum } = newObserveData;
          // console.log('newObserveData', newObserveData);
          console.log('getObserveState', getObserveState);
          // 없을 경우 undefined
          console.log(
            '이거늬 ? ',
            getObserveState.find((obj) => obj.area === area)
          );
          // 없을 경우 -1
          console.log(
            '이거늬 2? ',
            getObserveState.findIndex((obj) => obj.area === area)
          );

          const foundDataByArea = getObserveState.filter(
            (obj) => obj.area === area
          );

          console.log('foundDataByArea', foundDataByArea);

          const dataIdx = foundDataByArea?.findIndex(
            (obj) => obj.groupNum === camPort
          );

          const newObjArr = getObserveState;
          console.log('dataIdx', dataIdx);
          if (dataIdx === -1 || dataIdx === undefined) {
            newObjArr.push(newObserveData);
          } else {
            newObjArr[dataIdx] = newObserveData;
          }
          console.log('newObjArr', newObjArr);
          flushSync(() => setGetObserveState(newObjArr));
        })
        .catch((err) => console.error(err));
    });
  }, [swrObserveData]);

  useEffect(() => {
    console.log('#####getObserveState', getObserveState);
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
