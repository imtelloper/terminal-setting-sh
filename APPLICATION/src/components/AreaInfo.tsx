import React, { useState } from 'react';
import Robot from '../images/robot.png';
import Crane from '../images/crane.png';
import '../style/components/AreaInfo.scss';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { getFetcher } from '../fetcher/fetcher';

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

const AreaInfo = () => {
  const navigate = useNavigate();
  const [areaCardsState, setAreaCardsState] = useState<Array<AreaCard>>([
    {
      title: 'H1 공장 크레인',
      imgSrc: Crane,
      zoneState: 'Green Zone',
      zoneColor: 'areaZone areaZoneGreen',
      camName: 'Cam(2)',
      camState: 'Active',
      alrmColor: '',
      alarmMessage: '없음',
      firstName: '1차 감지',
      firstState: '0',
      secondName: '2차 감지',
      secondState: '0',
    },
    {
      title: 'H2 공장 크레인',
      imgSrc: Crane,
      zoneState: 'Yellow Zone',
      zoneColor: 'areaZone areaZoneYellow',
      camName: 'Cam(4)',
      camState: 'Active',
      alrmColor: 'confirmColor',
      alarmMessage: '작업자 진입 확인',
      firstName: '1차 감지',
      firstState: '1',
      secondName: '2차 감지',
      secondState: '0',
    },
    {
      title: 'H3 공장 크레인',
      imgSrc: Crane,
      zoneState: 'Red Zone',
      zoneColor: 'areaZone areaZoneYellow',
      camName: 'Cam(4)',
      camState: 'Active',
      alrmColor: 'dangerColor',
      alarmMessage: '작업자 위험 반경 진입!',
      firstName: '1차 감지',
      firstState: '2',
      secondName: '2차 감지',
      secondState: '1',
    },
    {
      title: 'H4 공장 로봇',
      imgSrc: Robot,
      zoneState: 'Yellow Zone',
      zoneColor: 'areaZone areaZoneYellow',
      camName: 'Cam(4)',
      camState: 'Active',
      alrmColor: 'confirmColor',
      alarmMessage: '작업자 진입 확인',
      firstName: '1차 감지',
      firstState: '2',
      secondName: '2차 감지',
      secondState: '0',
    },
    {
      title: 'H5 공장 로봇',
      imgSrc: Robot,
      zoneState: 'Green Zone',
      zoneColor: 'areaZone areaZoneGreen',
      camName: 'Cam(2)',
      camState: 'Active',
      alrmColor: '',
      alarmMessage: '없음',
      firstName: '1차 감지',
      firstState: '0',
      secondName: '2차 감지',
      secondState: '0',
    },
    {
      title: 'H6 공장 로봇',
      imgSrc: Robot,
      zoneState: 'Yellow Zone',
      zoneColor: 'areaZone areaZoneYellow',
      camName: 'Cam(4)',
      camState: 'Active',
      alrmColor: 'confirmColor',
      alarmMessage: '작업자 진입 확인',
      firstName: '1차 감지',
      firstState: '1',
      secondName: '2차 감지',
      secondState: '0',
    },
    {
      title: 'H7 공장 로봇',
      imgSrc: Crane,
      zoneState: 'Green Zone',
      zoneColor: 'areaZone areaZoneGreen',
      camName: 'Cam(2)',
      camState: 'Active',
      alrmColor: '',
      alarmMessage: '없음',
      firstName: '1차 감지',
      firstState: '0',
      secondName: '2차 감지',
      secondState: '0',
    },
    {
      title: 'H8 공장 로봇',
      imgSrc: Crane,
      zoneState: 'Red Zone',
      zoneColor: 'areaZone areaZoneRed',
      camName: 'Cam(4)',
      camState: 'Active',
      alrmColor: 'dangerColor',
      alarmMessage: '작업자 위험 반경 진입!',
      firstName: '1차 감지',
      firstState: '3',
      secondName: '2차 감지',
      secondState: '1',
    },
    {
      title: 'H9 공장 로봇',
      imgSrc: Crane,
      zoneState: 'Red Zone',
      zoneColor: 'areaZone areaZoneRed',
      camName: 'Cam(4)',
      camState: 'Active',
      alrmColor: 'dangerColor',
      alarmMessage: '작업자 위험 반경 진입!',
      firstName: '1차 감지',
      firstState: '1',
      secondName: '2차 감지',
      secondState: '1',
    },
  ]);
  const { data: swrObserveData, error } = useSWR<Array<Observe>>(
    '/api/observe/0/5',
    getFetcher,
    {
      refreshInterval: 1000,
    }
  );

  let count = 20;
  window.onscroll = (e) => {
    // console.log(window.innerHeight, window.scrollY, document.body.offsetHeight);
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
            // <div className="detectContent">
            //   <p>1차 감지: <span>0</span></p>
            //   <p>2차 감지: <span>0</span></p>
            // </div>
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

  const areaCardsMap = swrObserveData?.map((card, idx) => (
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
          <div className="areaZone areaZoneRed">{card.camSafetyLevel1}</div>
        </div>
        <div className="areaTextContent">
          <p className="camContent">
            {card.camName}:<span>{card.camSensing1}</span>
          </p>
          <p>Alarms:</p>
          <p className={card.alrmColor}>{card.alarmMessage}</p>
          <div className="detectContent">
            <p>{card.firstName}: <span>{card.firstState}</span></p>
            <p>{card.secondName}: <span>{card.secondState}</span></p>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="areaInfoContainer">
      <section>{areaCardsMap}</section>
    </div>
  );
};

export default AreaInfo;
