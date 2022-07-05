import React, { useEffect, useMemo, useState } from 'react';
import '../style/pages/SettingPage.scss';
import { AiFillFolderOpen, AiFillSetting, AiFillTool } from 'react-icons/ai';
import { GoDeviceCameraVideo, GoGraph, GoRocket } from 'react-icons/go';
import Api from '../api/Api';
import { camPort1Ip, camPort2Ip, camPort3Ip, camPort4Ip } from './ObservePage';
import { cssValue } from 'react-spinners/helpers';

type CamSettingType = {
  area: string;
  camPort: string;
  savingPath: string;
  camName: string;
  computeDevice: string;
  sensingModel: string;
  threshold: number;
  imgSaveSwitch: boolean;
  messageSwitch: boolean;
  kakaoSwitch: boolean;
};

const camDummyData: Array<CamSettingType> = [
  {
    area: 'H1 공장 크레인',
    camPort: 'cam1',
    savingPath: '/home/',
    camName: 'H1 공장 크레인 좌측 상단 캠',
    computeDevice: 'CPU',
    sensingModel: 'small',
    threshold: 70,
    imgSaveSwitch: false,
    messageSwitch: false,
    kakaoSwitch: false,
  },
  {
    area: 'H1 공장 크레인',
    camPort: 'cam2',
    savingPath: '/home/',
    camName: 'H1 공장 크레인 우측 상단 캠',
    computeDevice: 'CPU',
    sensingModel: 'small',
    threshold: 70,
    imgSaveSwitch: false,
    messageSwitch: false,
    kakaoSwitch: false,
  },
  {
    area: 'H1 공장 크레인',
    camPort: 'cam3',
    savingPath: '/home/',
    camName: 'H1 공장 크레인 왼쪽 상단 캠',
    computeDevice: 'CPU',
    sensingModel: 'small',
    threshold: 70,
    imgSaveSwitch: false,
    messageSwitch: false,
    kakaoSwitch: false,
  },
  {
    area: 'H1 공장 크레인',
    camPort: 'cam4',
    savingPath: '/home/',
    camName: 'H1 공장 크레인 왼쪽 상단 캠',
    computeDevice: 'CPU',
    sensingModel: 'small',
    threshold: 70,
    imgSaveSwitch: false,
    messageSwitch: false,
    kakaoSwitch: false,
  },
];

/*
tracker들을 가져와서 area를 고유값으로 select option에 셋팅
tracker들이 cam이 1개일지, 2개일지 모르니 각 해당 구역의 cam만큼만 설정할 수 있도록 해야함
*/

const SettingPage = () => {
  const [camSettingState, setCamSettingState] =
    useState<Array<CamSettingType>>(camDummyData);
  const [toggleState, setToggleState] = useState({
    alarmState: false,
    messageState: false,
    kakaoAlarmState: false,
  });

  // toolBtn 클릭 색상 변경
  const [currentClick, setCurrentClick] = useState(null);
  const [prevClick, setPrevClick] = useState(null);
  // 밑에 세개
  const [urlState, setUrlState] = useState([]);
  const [videoSrcState, setVideoSrcState] = useState([]);
  const [captureSrcState, setCaptureSrcState] = useState('');

  const getClick = (e) => {
    setCurrentClick(e.target.id);
    console.log(e.target.id);
  };

  useEffect(() => {
    if (currentClick !== null) {
      const current = document.getElementById(currentClick);
      current.style.fontWeight = 'bold';
    }

    if (prevClick !== null) {
      const prev = document.getElementById(prevClick);
      prev.style.fontWeight = 'lighter';
    }
    setPrevClick(currentClick);
  }, [currentClick]);

  // on, off 버튼
  const toggleClick = (e) => {
    const target = e.currentTarget;
    const dType = target.getAttribute('datatype');
    setToggleState({
      ...toggleState,
      [dType]: !toggleState[dType],
    });
  };

  const handleChangeValue = (e) => {
    const target = e.currentTarget;
    const { value } = target;
    const dType = target.getAttribute('datatype');
    console.log('handleChangeValue value', value);
    console.log('handleChangeValue datatype', dType);
  };

  useEffect(() => {
    Api.tracker.getAllDatas().then((res) => {
      console.log('Api.tracker.getAllDatas res', res);
      setCamSettingState(res);
    });
  }, []);

  useEffect(() => {
    console.log('camSettingState', camSettingState);
  }, [camSettingState]);

  const modifyTrackerData = (objectId, data) => {
    Api.tracker.modifyOneData(objectId, data).then((res) => {
      console.log('Api.tracker.modifyOneData res', res);
    });
  };

  /* 어느 구역에서 몇번째 카메라인지 구역 설정 필요 */

  const handleChangeTrackerData = (e) => {
    const target = e.currentTarget;
    console.log(target.parentNode);
    console.log(target.parentElement.parentElement);
    // Api.tracker.modifyOneData({});
  };

  const camSettingMap = useMemo(() => {
    return camSettingState.map((data, idx) => (
      <section id={`content${idx + 1}`} key={idx}>
        <div>
          <AiFillFolderOpen />
          <span>저장폴더 :</span>
          <input defaultValue={data.savingPath} />
          <button onClick={handleChangeTrackerData}>선택</button>
        </div>
        <div>
          <GoDeviceCameraVideo />
          <span>카메라 이름 :</span>
          <input defaultValue={data.camName} />
          <button onClick={handleChangeTrackerData}>적용</button>
        </div>
        <div className="bottomCon">
          <div>
            <div>
              <AiFillTool />
              <span>연산장치 :</span>
              <div className="toolBtnBox">
                <input
                  id="toolTab7"
                  type="radio"
                  name="toolTabs"
                  datatype="computeDevice"
                  onChange={handleChangeValue}
                  value="GPU"
                  // checked={data.computeDevice === 'GPU' && true}
                />
                <label htmlFor="toolTab7">GPU</label>
                <div />
                <input
                  id="toolTab8"
                  type="radio"
                  name="toolTabs"
                  onChange={handleChangeValue}
                  datatype="computeDevice"
                  value="CPU"
                  // defaultChecked={data.computeDevice === 'CPU' && true}
                  // checked={data.computeDevice === 'CPU' && true}
                />
                <label htmlFor="toolTab8">CPU</label>
              </div>
            </div>
            <div>
              <GoRocket />
              <span>감지모델 :</span>
              <select
                onChange={handleChangeValue}
                defaultValue={data.sensingModel}
                datatype="sensingModel"
              >
                <option>Small</option>
                <option>Big</option>
              </select>
              <button>선택</button>
            </div>
            <div>
              <GoGraph />
              <span>Threshold :</span>
              <select
                onChange={handleChangeValue}
                defaultValue={data.threshold}
                datatype="threshold"
              >
                <option>50</option>
                <option>70</option>
                <option>100</option>
              </select>
              <button>선택</button>
            </div>
          </div>
          <div>
            <div>
              <span>알람 이미지 저장:</span>
              <button className="on">ON</button>
              <button className="off">OFF</button>
            </div>
            <div>
              <span>문자 알람:</span>
              <button className="on">ON</button>
              <button className="off">OFF</button>
            </div>
            <div>
              <span>카카오톡 알림:</span>
              <button className="on">ON</button>
              <button className="off">OFF</button>
            </div>
          </div>
        </div>
      </section>
    ));
  }, [camSettingState]);

  return (
    <div className="settingMain">
      <div className="settingTitle">
        <AiFillSetting />
        <span>Settings</span>
      </div>
      <input
        className="tabInput"
        id="tab1"
        type="radio"
        name="tabs"
        defaultChecked
      />
      <label htmlFor="tab1">Cam1</label>

      <input className="tabInput" id="tab2" type="radio" name="tabs" />
      <label htmlFor="tab2">Cam2</label>

      <input className="tabInput" id="tab3" type="radio" name="tabs" />
      <label htmlFor="tab3">Cam3</label>

      <input className="tabInput" id="tab4" type="radio" name="tabs" />
      <label htmlFor="tab4">Cam4</label>

      {camSettingMap}
    </div>
  );
};

export default SettingPage;
