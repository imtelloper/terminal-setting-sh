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
  const { data: swrObserveData, error } = useSWR<Array<Observe>>(
    '/api/observe/0/5',
    getFetcher,
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
          <div className="areaZone areaZoneRed">{card.camSafetyLevel}</div>
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

  return (
    <div className="areaInfoContainer">
      <section>{areaCardsMap}</section>
    </div>
  );
};

export default AreaInfo;
