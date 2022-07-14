import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../style/pages/SettingPage.scss';
import '../style/DesignSystem.scss';
import Api from '../api/Api';
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
    imgSaveSwitch: true,
    messageSwitch: false,
    kakaoSwitch: false,
  },
  {
    area: 'H1 공장 크레인',
    camPort: 'cam2',
    savingPath: '/home/',
    camName: 'H1 공장 크레인 우측 상단 캠',
    computeDevice: 'CPU',
    sensingModel: 'nano',
    threshold: 80,
    imgSaveSwitch: false,
    messageSwitch: true,
    kakaoSwitch: false,
  },
  {
    area: 'H1 공장 크레인',
    camPort: 'cam3',
    savingPath: '/home/',
    camName: 'H1 공장 크레인 왼쪽 상단 캠',
    computeDevice: 'CPU',
    sensingModel: 'small',
    threshold: 90,
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
    threshold: 100,
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
    let inputVal = value;
    console.log('handleChangeValue file', target.files);
    console.log('handleChangeValue file', target.files[0].path);
    console.log('handleChangeValue file', target.files[0].name);
    console.log('handleChangeValue value', value);
    console.log('handleChangeValue datatype', dType);
    if (dType === 'savingPath' && target.files) {
      const splitedFilePath = target.files[0].path.split('/');
      splitedFilePath.pop();
      const absoluteFilePath = splitedFilePath.join('/');
      console.log(absoluteFilePath);
      (document.querySelector('#savingPathInput') as HTMLInputElement).value =
        absoluteFilePath;
    }

    dType === 'camName' &&
      (inputVal = (document.querySelector('#camNameInput') as HTMLInputElement)
        .value);
    console.log(
      (document.querySelector('#camNameInput') as HTMLInputElement).value
    );
    Api.tracker.modifyOneData('62c796f09715acf6931d4e6b', {
      [dType]: inputVal,
    });
  };

  useEffect(() => {
    Api.tracker
      .getAllDatas()
      .then((res) => {
        console.log('Api.tracker.getAllDatas res', res, typeof res);

        typeof res !== 'string' && setCamSettingState(res);
      })
      .catch((err) => console.error(err));

    // Api.tracker
    //   .saveData({
    //     area: 'H3 프레스',
    //     camPort: 'cam2',
    //     camName: '프레스캠2',
    //     computeDevice: 'string',
    //     savingPath: 'string',
    //     sensingModel: 'string',
    //     calibImg: 'string',
    //     baseLine: 0,
    //     dangerLine: 'string',
    //     sensingGroup1: 'string',
    //     sensingGroup2: 'string',
    //     threshold: 0,
    //     imgSaveSwitch: true,
    //     messageSwitch: true,
    //     kakaoSwitch: true,
    //   })
    //   .then((res) => {
    //     console.log('saveData res', res);
    //   });
  }, []);

  useEffect(() => {
    console.log('camSettingState', camSettingState);
    const camStateKeys = camSettingState.map((obj) => obj.area);
    console.log('camStateKeys', camStateKeys);
    const settingAreasState = [...new Set(camStateKeys)];
    console.log('settingAreasState', settingAreasState);
    const areaFilteredData = camSettingState.filter(
      (obj) => obj.area === 'H2 로봇'
    );
    console.log('areaFilteredData', areaFilteredData);
  }, [camSettingState]);

  const modifyTrackerData = (objectId, data) => {
    Api.tracker
      .modifyOneData(objectId, data)
      .then((res) => {
        console.log('Api.tracker.modifyOneData res', res);
      })
      .catch((err) => console.error(err));
  };

  /* 어느 구역에서 몇번째 카메라인지 구역 설정 필요 */

  const handleChangeTrackerData = (e) => {
    const target = e.currentTarget;
    const dType = target.getAttribute('datatype');
    console.log(target.parentNode);
    console.log(target.parentElement.parentElement);
    console.log('dType', dType);
    // Api.tracker.modifyOneData({});
    console.log(
      (document.querySelector('#camNameInput') as HTMLInputElement).value
    );
  };

  const camSettingMap = useMemo(() => {
    return camSettingState?.map((data, idx) => (
      <section id={`content${idx + 1}`} key={idx}>
        <div className="contentBox">
          <div className="content">
            <Folder style={{ fontSize: '24px' }} />
            <span>저장폴더</span>
            <input
              id="savingPathInput"
              type="text"
              defaultValue={data.savingPath}
            />
            <input
              id="inputFilePath"
              type="file"
              className="btnR defaultPrimary"
              datatype="savingPath"
              onChange={handleChangeValue}
              // @ts-ignore
              webkitdirectory=""
            />
            <label id="inputFilePathLabel" htmlFor="inputFilePath">
              선택
            </label>
          </div>
          <div className="content">
            <PhotoCamera style={{ fontSize: '24px' }} />
            <span>카메라 이름</span>
            <input id="camNameInput" defaultValue={data.camName} />
            <button
              datatype="camName"
              className="btnR defaultPrimary"
              onClick={handleChangeValue}
            >
              적용
            </button>
          </div>
          <div className="content">
            <Memory style={{ fontSize: '24px' }} />
            <span>연산장치</span>
            <div className="toggle">
              <input
                datatype="computeDevice"
                type="radio"
                id="radio1"
                name="radio"
                onChange={handleChangeValue}
                value="CPU"
              />
              <label htmlFor="radio1">CPU</label>
              <input
                datatype="computeDevice"
                type="radio"
                id="radio2"
                name="radio"
                onChange={handleChangeValue}
                value="GPU"
                defaultChecked
              />
              <label htmlFor="radio2">GPU</label>
              <span className="move" />
            </div>
          </div>
          <div className="content">
            <MdViewInAr style={{ fontSize: '24px' }} />
            <span>감지모델</span>
            <select
              onChange={handleChangeValue}
              defaultValue={data.sensingModel}
              datatype="sensingModel"
            >
              <option>nano</option>
              <option>small</option>
              <option>medium</option>
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
              <option>60</option>
              <option>70</option>
              <option>80</option>
              <option>90</option>
              <option>100</option>
            </select>
            <button className="btnR defaultPrimary">선택</button>
          </div>
          <div className="content">
            <PermMedia style={{ fontSize: '24px' }} />
            <span>알람 이미지 저장</span>
            <div className="imgSaveToggle">
              <input
                datatype="imgSaveSwitch"
                type="radio"
                id="radio3"
                name="imgRadio"
                onChange={handleChangeValue}
                value="on"
              />
              <label htmlFor="radio3">ON</label>
              <input
                datatype="imgSaveSwitch"
                type="radio"
                id="radio4"
                name="imgRadio"
                onChange={handleChangeValue}
                value="off"
                defaultChecked
              />
              <label htmlFor="radio4">OFF</label>
              <span className="move" />
            </div>
          </div>
          <div className="content">
            <Textsms />
            <span>문자 알람</span>
            <div className="messageToggle">
              <input
                datatype="messageSwitch"
                type="radio"
                id="radio5"
                name="messageRadio"
                onChange={handleChangeValue}
                value="on"
              />
              <label htmlFor="radio5">ON</label>
              <input
                datatype="messageSwitch"
                type="radio"
                id="radio6"
                name="messageRadio"
                onChange={handleChangeValue}
                value="off"
                defaultChecked
              />
              <label htmlFor="radio6">OFF</label>
              <span className="move" />
            </div>
          </div>
          <div className="content">
            <img src={KakaoIcon} alt="" />
            <span>카카오톡 알림</span>
            <div className="kakaoToggle">
              <input
                datatype="kakaoSwitch"
                type="radio"
                id="radio7"
                name="kakaoRadio"
                onChange={handleChangeValue}
                value="on"
              />
              <label htmlFor="radio7">ON</label>
              <input
                datatype="kakaoSwitch"
                type="radio"
                id="radio8"
                name="kakaoRadio"
                onChange={handleChangeValue}
                value="off"
                defaultChecked
              />
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
