import React, { useEffect, useState } from 'react';
import Robot from '../images/robot.png';
import Crane from '../images/crane.png';
import Videocam from '../images/videocam.png';
import Warning from '../images/warning.png';
import BgImg from '../images/bg.png';
import '../style/components/AreaInfo.scss';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { getFetcher } from '../fetcher/fetcher';
import axios from 'axios';
import CurrentTime from './CurrentTime';

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
  const [getObserveState, setGetObserveState] = useState({
    date: today,
    // date: '2022-06-22',
  });
  const findFetcher = (url: string) =>
    axios.post(url, getObserveState).then((res) => res.data);

  const { data: swrObserveData, error } = useSWR<Array<Observe>>(
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
              <p className="camContent">Cam(2):<span>Active</span></p>
              <p>Alarms:</p><p>없음</p>
              <div className="detectContent">
                <p>1차 감지: <span>0</span></p>
                <p>2차 감지: <span>0</span></p>
              </div>
            </div>
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
            <img src={BgImg} />
          </div>
        </div>
        <div className="areaBottom">
          <div className="camBox">
            <div className="camPort">
              CAM <span>{card.camPort}</span>
            </div>
            <div className="activeBadge">
              <p />
              <span>ACTIVE</span>
            </div>
          </div>
          <div className="alarmBox">
            {/* className : green yellow red inactive => alarmTxt 에 추가해주시면 됩니다! */}
            <div className="alarmTxt yellow">{card.alarmTxt}</div>
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

  const cardSkeletonMap = (swrObserveData || dummyData).map((card, idx) => (
    <div
      className="areaCardBox"
      key={idx}
      onClick={goObservePage}
      datatype={idx.toString()}
    >
      {/* <h3>{card.area}</h3> */}
      <div className="titleBox">
        <span/>
      </div>
      <div className="areaContent">
        <div className="areaTop">
          <div className="imgBox"/>
        </div>
        <div className="areaBottom">
          <div className="camBox">
            <div className="camPort">
              CAM <span>{card.camPort}</span>
            </div>
            <div className="activeBadge">
              <p />
              <span>ACTIVE</span>
            </div>
          </div>
          <div className="alarmBox">
            {/* className : green yellow red inactive => alarmTxt 에 추가해주시면 됩니다! */}
            <div className="alarmTxt yellow">{card.alarmTxt}</div>
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
    swrObserveData?.forEach((obj) => {
      console.log('obj', obj);
    });
  }, [swrObserveData]);

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
                  <img src={Videocam} />
                  <span className="blue">4</span>
                </div>
              </div>
              <div>
                <span>
                  최근 10시간 중<br />
                  <span className="bold">감지된 위험</span>
                </span>
                <div className="icon">
                  <img src={Warning} />
                  <span className="red">3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="infoRight">
          <div className="rightBox">
            <div className="areaCardWrap">{cardSkeletonMap}</div>
            {/*<div className="areaCardWrap">{areaCardsMap}</div>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaInfo;
