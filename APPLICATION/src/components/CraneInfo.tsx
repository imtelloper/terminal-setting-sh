import React, { useState } from 'react';
import Robot from '../images/robot.png';
import Crane from '../images/crane.png';
import '../style/components/CraneInfo.scss';

type AreaCard = {
  title: string;
  imgSrc: string;
  zoneState: string;
  camName: string;
  camState: string;
  alarmMessage: string;
};
const CraneInfo = () => {
  const [areaCardsState, setAreaCardsState] = useState<Array<AreaCard>>([
    {
      title: 'H1 공장 크레인',
      imgSrc: Crane,
      zoneState: 'Green Zone',
      camName: 'Cam(2)',
      camState: 'Active',
      alarmMessage: '없음',
    },
    {
      title: 'H2 공장 크레인',
      imgSrc: Crane,
      zoneState: 'Yellow Zone',
      camName: 'Cam(4)',
      camState: 'Active',
      alarmMessage: '작업자 진입 확인',
    },
    {
      title: 'H3 공장 크레인',
      imgSrc: Crane,
      zoneState: 'Red Zone',
      camName: 'Cam(4)',
      camState: 'Active',
      alarmMessage: '작업자 위험 반경 진입!',
    },
    {
      title: 'H4 공장 로봇',
      imgSrc: Robot,
      zoneState: 'Yellow Zone',
      camName: 'Cam(4)',
      camState: 'Active',
      alarmMessage: '작업자 진입 확인',
    },
  ]);
  let count = 20;
  window.onscroll = function (e) {
    // console.log(window.innerHeight, window.scrollY, document.body.offsetHeight);
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setTimeout(function () {
        const addContent = document.createElement('div');
        addContent.classList.add('craneBox');
        addContent.innerHTML = `<h3>H${++count} 공장 크레인</h3>
          <div className="craneContent">
            <div className="craneImgContent">
              <img src={Crane} />
              <div className="craneZone craneZoneGreen">
                Green Zone
              </div>
            </div>
            <div className="craneTextContent">
              <p className="camContent">Cam(2):<span>Active</span></p>
              <p>Alarms:</p><p>없음</p>
            </div>
          </div>`;
        document.querySelector('section').appendChild(addContent);
        // document.querySelector("section").createElement(addContent);
      }, 1000);
    }
  };

  const areaCardsMap = areaCardsState.map((card) => (
    <div className="craneBox">
      <h3>{card.title}</h3>
      <div className="craneContent">
        <div className="craneImgContent">
          <img src={card.imgSrc} />
          <div className="craneZone craneZoneGreen">{card.zoneState}</div>
        </div>
        <div className="craneTextContent">
          <p className="camContent">
            {card.camName}:<span>{card.camState}</span>
          </p>
          <p>Alarms:</p>
          <p>{card.alarmMessage}</p>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="craneInfoContainer">
      <section>{areaCardsMap}</section>
    </div>
  );
};

export default CraneInfo;
