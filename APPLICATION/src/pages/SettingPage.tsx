import React, { useEffect, useMemo, useState } from 'react';
import '../style/pages/SettingPage.scss';
import '../style/DesignSystem.scss';
import Api from '../api/Api';
// import { camPort1Ip, camPort2Ip, camPort3Ip, camPort4Ip } from './ObservePage';
// import { cssValue } from 'react-spinners/helpers';
import {
  Folder,
  Memory,
  PermMedia,
  PhotoCamera,
  Textsms,
} from '@material-ui/icons';
import { MdViewInAr } from 'react-icons/md';
import KakaoIcon from '../images/kakao_icon.png';
import Datathresholding from '../images/data_thresholding.png';

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
      console.log('Api.tracker.getAllDatas res', res, typeof res);

      typeof res !== 'string' && setCamSettingState(res);
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
    return camSettingState?.map((data, idx) => (
      <section id={`content${idx + 1}`} key={idx}>
        <div className="contentBox">
          <div className="content">
            <Folder style={{ fontSize: '24px' }} />
            <span>저장폴더</span>
            <input defaultValue={data.savingPath} />
            <button
              className="btnR defaultPrimary"
              onClick={handleChangeTrackerData}
            >
              선택
            </button>
          </div>
          <div className="content">
            <PhotoCamera style={{ fontSize: '24px' }} />
            <span>카메라 이름</span>
            <input defaultValue={data.camName} />
            <button
              className="btnR defaultPrimary"
              onClick={handleChangeTrackerData}
            >
              적용
            </button>
          </div>
          <div className="content">
            <Memory style={{ fontSize: '24px' }} />
            <span>연산장치</span>
            <div className="toggle">
              <input type="radio" id="radio1" name="radio" defaultChecked />
              <label htmlFor="radio1">CPU</label>
              <input type="radio" id="radio2" name="radio" />
              <label htmlFor="radio2">GPU</label>
              <span className="move" />
            </div>
            {/* <div className="toggleBtnBox"> */}
            {/*  <input */}
            {/*    type="radio" */}
            {/*    id="toggleBtn1" */}
            {/*    name="toggleBtn" */}
            {/*    defaultChecked */}
            {/*  /> */}
            {/*  <label className="toggleBtn" htmlFor="toggleBtn1"> */}
            {/*    CPU */}
            {/*  </label> */}
            {/*  <input type="radio" id="toggleBtn2" name="toggleBtn" /> */}
            {/*  <label className="toggleBtn" htmlFor="toggleBtn2"> */}
            {/*    GPU */}
            {/*  </label> */}
            {/*  <span className="slider" /> */}
            {/* </div> */}
            {/* <input */}
            {/*  id="toolTab7" */}
            {/*  type="radio" */}
            {/*  name="toolTabs" */}
            {/*  datatype="computeDevice" */}
            {/*  onChange={handleChangeValue} */}
            {/*  value="GPU" */}
            {/*  // checked={data.computeDevice === 'GPU' && true} */}
            {/* /> */}
            {/* <label htmlFor="toolTab7">GPU</label> */}
            {/* <div /> */}
            {/* <input */}
            {/*  id="toolTab8" */}
            {/*  type="radio" */}
            {/*  name="toolTabs" */}
            {/*  onChange={handleChangeValue} */}
            {/*  datatype="computeDevice" */}
            {/*  value="CPU" */}
            {/*  // defaultChecked={data.computeDevice === 'CPU' && true} */}
            {/*  // checked={data.computeDevice === 'CPU' && true} */}
            {/* /> */}
            {/* <label htmlFor="toolTab8">CPU</label> */}
          </div>
          <div className="content">
            <MdViewInAr style={{ fontSize: '24px' }} />
            <span>감지모델</span>
            <select
              onChange={handleChangeValue}
              defaultValue={data.sensingModel}
              datatype="sensingModel"
            >
              <option>Small</option>
              <option>Big</option>
            </select>
            <button className="btnR defaultPrimary">선택</button>
          </div>
          <div className="content">
            {/* <DataThresholdingIcon /> */}
            <img src={Datathresholding} alt="" />
            <span>Threshold</span>
            <select
              onChange={handleChangeValue}
              defaultValue={data.threshold}
              datatype="threshold"
            >
              <option>50</option>
              <option>70</option>
              <option>100</option>
            </select>
            <button className="btnR defaultPrimary">선택</button>
          </div>
          <div className="content">
            <PermMedia style={{ fontSize: '24px' }} />
            <span>알람 이미지 저장</span>
            {/* <div className="saveToggleBtnBox"> */}
            {/*  <input */}
            {/*    type="radio" */}
            {/*    id="saveToggleBtn1" */}
            {/*    name="saveToggleBtn" */}
            {/*    defaultChecked */}
            {/*  /> */}
            {/*  <label className="saveToggleBtn" htmlFor="saveToggleBtn1"> */}
            {/*    ON */}
            {/*  </label> */}
            {/*  <input type="radio" id="saveToggleBtn2" name="saveToggleBtn" /> */}
            {/*  <label className="toggleBtn" htmlFor="saveToggleBtn2"> */}
            {/*    OFF */}
            {/*  </label> */}
            {/*  <div className="slider2" /> */}
            {/* </div> */}
            <div className="imgSaveToggle">
              <input type="radio" id="radio3" name="imgRadio" defaultChecked />
              <label htmlFor="radio3">ON</label>
              <input type="radio" id="radio4" name="imgRadio" />
              <label htmlFor="radio4">OFF</label>
              <span className="move" />
            </div>
          </div>
          <div className="content">
            <Textsms />
            <span>문자 알람</span>
            {/* <div className="messageToggleBtnBox"> */}
            {/*  <input */}
            {/*    type="radio" */}
            {/*    id="messageToggleBtn1" */}
            {/*    name="messageToggleBtn" */}
            {/*    defaultChecked */}
            {/*  /> */}
            {/*  <label className="messageToggleBtn" htmlFor="messageToggleBtn1"> */}
            {/*    ON */}
            {/*  </label> */}
            {/*  <input */}
            {/*    type="radio" */}
            {/*    id="messageToggleBtn2" */}
            {/*    name="messageToggleBtn" */}
            {/*  /> */}
            {/*  <label className="toggleBtn" htmlFor="messageToggleBtn2"> */}
            {/*    OFF */}
            {/*  </label> */}
            {/*  <div className="slider2" /> */}
            {/* </div> */}
            <div className="messageToggle">
              <input
                type="radio"
                id="radio5"
                name="messageRadio"
                defaultChecked
              />
              <label htmlFor="radio5">ON</label>
              <input type="radio" id="radio6" name="messageRadio" />
              <label htmlFor="radio6">OFF</label>
              <span className="move" />
            </div>
          </div>
          <div className="content">
            <img src={KakaoIcon} alt="" />
            <span>카카오톡 알림</span>
            {/* <div className="kakaoToggleBtnBox"> */}
            {/*  <input */}
            {/*    type="radio" */}
            {/*    id="kakaoToggleBtn1" */}
            {/*    name="kakaoToggleBtn" */}
            {/*    defaultChecked */}
            {/*  /> */}
            {/*  <label className="kakaoToggleBtn" htmlFor="kakaoToggleBtn1"> */}
            {/*    ON */}
            {/*  </label> */}
            {/*  <input type="radio" id="kakaoToggleBtn2" name="kakaoToggleBtn" /> */}
            {/*  <label className="toggleBtn" htmlFor="kakaoToggleBtn2"> */}
            {/*    OFF */}
            {/*  </label> */}
            {/*  <div className="slider2" /> */}
            {/* </div> */}
            <div className="kakaoToggle">
              <input
                type="radio"
                id="radio7"
                name="kakaoRadio"
                defaultChecked
              />
              <label htmlFor="radio7">ON</label>
              <input type="radio" id="radio8" name="kakaoRadio" />
              <label htmlFor="radio8">OFF</label>
              <span className="move" />
            </div>
          </div>
        </div>
      </section>
    ));
  }, [camSettingState]);

  return (
    <div className="settingWrap">
      <div className="settingContainer">
        <div className="settingTitle">
          <span>Settings</span>
        </div>
        <div className="settingBox">
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
      </div>
    </div>
  );
};

export default SettingPage;
