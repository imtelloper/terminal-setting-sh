import React, { useState } from 'react';
import Robot from '../images/robot.png';
import Crane from '../images/crane.png';
import '../style/components/AreaInfo.scss';
import { useNavigate } from 'react-router-dom';

type AreaCard = {
  title: string;
  imgSrc: string;
  zoneState: string;
  zoneColor: string;
  camName: string;
  camState: string;
  alrmColor: string;
  alarmMessage: string;
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
    },
  ]);
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
  const areaCardsMap = areaCardsState.map((card, idx) => (
    <div
      className="areaCardBox"
      key={card.title}
      onClick={goObservePage}
      datatype={idx.toString()}
    >
      <h3>{card.title}</h3>
      <div className="areaContent">
        <div className="areaImgContent">
          <img src={card.imgSrc} />
          <div className={card.zoneColor}>{card.zoneState}</div>
        </div>
        <div className="areaTextContent">
          <p className="camContent">
            {card.camName}:<span>{card.camState}</span>
          </p>
          <p>Alarms:</p>
          <p className={card.alrmColor}>{card.alarmMessage}</p>
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
