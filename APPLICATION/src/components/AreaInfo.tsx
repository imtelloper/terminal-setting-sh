import React, { useEffect, useState } from 'react';
import Robot from '../images/robot.png';
import Crane from '../images/crane.png';
import '../style/components/AreaInfo.scss';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { getFetcher } from '../fetcher/fetcher';
import axios from 'axios';

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
};
const dummyData = [
  {
    activate: true,
    alarms: '없음',
    area: 'H1공장크레인',
    camCoordinate1: null,
    camCoordinate2: null,
    camName: null,
    camPort: 'cam1',
    camSafetyLevel: 'Green',
    camSensing1: null,
    camSensing2: null,
    computeDevice: null,
    createdAt: '2022-06-28T00:12:52+00:00',
    date: '2022-06-28',
    savingPath: null,
    sensingModel: null,
  },
  {
    activate: true,
    alarms: '없음',
    area: 'H1공장크레인',
    camCoordinate1: null,
    camCoordinate2: null,
    camName: null,
    camPort: 'cam2',
    camSafetyLevel: 'Green',
    camSensing1: null,
    camSensing2: null,
    computeDevice: null,
    createdAt: '2022-06-28T00:12:52+00:00',
    date: '2022-06-28',
    savingPath: null,
    sensingModel: null,
  },
  {
    activate: true,
    alarms: '없음',
    area: 'H1공장크레인',
    camCoordinate1: null,
    camCoordinate2: null,
    camName: null,
    camPort: 'cam3',
    camSafetyLevel: 'Green',
    camSensing1: null,
    camSensing2: null,
    computeDevice: null,
    createdAt: '2022-06-28T00:12:52+00:00',
    date: '2022-06-28',
    savingPath: null,
    sensingModel: null,
  },
  {
    activate: true,
    alarms: '없음',
    area: 'H1공장크레인',
    camCoordinate1: null,
    camCoordinate2: null,
    camName: null,
    camPort: 'cam4',
    camSafetyLevel: 'Green',
    camSensing1: null,
    camSensing2: null,
    computeDevice: null,
    createdAt: '2022-06-28T00:12:52+00:00',
    date: '2022-06-28',
    savingPath: null,
    sensingModel: null,
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
      <h3>{card.area}</h3>
      <div className="areaContent">
        <div className="areaImgContent">
          <img src={Crane} />
          <div className={`areaZone areaZone${card.camSafetyLevel}`}>
            {card.camSafetyLevel}
          </div>
        </div>
        <div className="areaTextContent">
          <p className="camContent">
            {card.camPort}:<span>{card.activate ? 'Active' : 'Deactive'}</span>
          </p>
          <p>Alarms:</p>
          <p className="dangerColor">{card.alarms}</p>
          <div className="detectContent">
            <p>
              1차 감지: <span>{card.camSensing1}</span>
            </p>
            <p>
              2차 감지: <span>{card.camSensing2}</span>
            </p>
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
      <section>{areaCardsMap}</section>
    </div>
  );
};

export default AreaInfo;
