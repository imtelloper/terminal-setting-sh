import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
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
import { useSWRState } from '../fetcher/useSWRState';
import { flushSync } from 'react-dom';
import { camDummyData } from '../initDatas/camSettingDummyData';

/*
tracker들을 가져와서 area를 고유값으로 select option에 셋팅
tracker들이 cam이 1개일지, 2개일지 모르니 각 해당 구역의 cam만큼만 설정할 수 있도록 해야함
*/
const SettingPage = () => {
  const [camSettingState, setCamSettingState] =
    useState<Array<CamSettingType>>(camDummyData);
  const { data: swrState, mutate: setSwrState } = useSWRState();
  const [camAreasState, setCamAreasState] = useState<Array<string>>([]);
  const [curCamAreaState, setCurCamAreaState] = useState('');
  const [isPending, startTransition] = useTransition();

  const initSettingUI = () => {
    camSettingState.forEach((obj) => {
      const computeDeviceMove = document.querySelector(
        `.${obj.camPort}computeDeviceMove`
      ) as HTMLSpanElement;
      const imgSaveSwitchMove = document.querySelector(
        `.${obj.camPort}imgSaveSwitchMove`
      ) as HTMLSpanElement;
      const kakaoSwitchMove = document.querySelector(
        `.${obj.camPort}kakaoSwitchMove`
      ) as HTMLSpanElement;
      const messageSwitchMove = document.querySelector(
        `.${obj.camPort}messageSwitchMove`
      ) as HTMLSpanElement;

      // console.log('obj.computeDevice', obj.computeDevice);
      // console.log('obj.imgSaveSwitch', obj.imgSaveSwitch);
      // console.log('obj.kakaoSwitch', obj.kakaoSwitch);
      // console.log('obj.messageSwitch', obj.messageSwitch);
      if (!computeDeviceMove) return;
      obj.computeDevice === 'CPU'
        ? (computeDeviceMove.style.transform = 'translateX(-60%)')
        : (computeDeviceMove.style.transform = 'translateX(40%)');
      obj.imgSaveSwitch === true
        ? (imgSaveSwitchMove.style.transform = 'translateX(-60%)')
        : (imgSaveSwitchMove.style.transform = 'translateX(40%)');
      obj.kakaoSwitch === true
        ? (kakaoSwitchMove.style.transform = 'translateX(-60%)')
        : (kakaoSwitchMove.style.transform = 'translateX(40%)');
      obj.messageSwitch === true
        ? (messageSwitchMove.style.transform = 'translateX(-60%)')
        : (messageSwitchMove.style.transform = 'translateX(40%)');
    });
  };

  const handleSelectCamArea = (e) => {
    const target = e.currentTarget;
    const { value } = target;
    console.log('handleSelectCamArea target', target);
    console.log('handleSelectCamArea value', value);
    (
      document.querySelector('#settingAreaTitle') as HTMLSpanElement
    ).textContent = value;
    flushSync(() => setCurCamAreaState(value));
  };

  const handleChangeValue = (e) => {
    const target = e.currentTarget;
    const { value } = target;
    const dType = target.getAttribute('datatype');
    let inputVal = value;
    console.log('handleChangeValue value', value);
    console.log('handleChangeValue datatype', dType);
    const isSwitch = dType.includes('Switch');
    const trackerId = target.closest('section').getAttribute('itemID');
    console.log('🍋🍋🍋🍋 trackerId', trackerId);
    if (dType === 'savingPath' && target.files) {
      const inputItemId = target.getAttribute('itemID');
      const splitedFilePath = target.files[0].path.split('/');
      splitedFilePath.pop();
      const absoluteFilePath = splitedFilePath.join('/');
      console.log('absoluteFilePath!!!', absoluteFilePath);
      console.log('inputItemId', inputItemId);
      (document.querySelector(`#${inputItemId}`) as HTMLInputElement).value =
        absoluteFilePath;
      inputVal = absoluteFilePath;
    }

    if (dType === 'camName') {
      const camNameInputItemId = target.getAttribute('itemID');
      inputVal = (
        document.querySelector(`#${camNameInputItemId}`) as HTMLInputElement
      ).value;
    }
    console.log('isSwitch', isSwitch);
    /* 각 swtich input일 시 */
    isSwitch && (inputVal === 'on' ? (inputVal = true) : (inputVal = false));
    console.log('inputVal', inputVal);

    Api.tracker
      .modifyOneData(trackerId, {
        [dType]: inputVal,
      })
      .finally(() => {
        const camIdx = camSettingState.findIndex(
          (obj) => obj._id === trackerId
        );
        console.log(camIdx);
        const newCamSetting = camSettingState;
        newCamSetting[camIdx][dType] = inputVal;
        flushSync(() => setCamSettingState([...newCamSetting]));
        // flushSync(() => setCamSettingState(newCamSetting));
      })
      .catch((err) => console.error(err));
  };

  /* INIT EFFECT */
  useEffect(() => {
    /* init cam setting data */
    Api.tracker
      .getAllDatas()
      .then((res) => {
        console.log('Api.tracker.getAllDatas res', res, typeof res);
        if (typeof res !== 'string') {
          setCamSettingState(res);
          const camStateKeys: Array<string> = res.map((obj) => obj.area);
          console.log('camStateKeys', camStateKeys);
          const settingAreasState: Array<string> = [...new Set(camStateKeys)];
          console.log('settingAreasState', settingAreasState);
          setCamAreasState(settingAreasState);
          const settingAreaTitle = document.querySelector(
            '#settingAreaTitle'
          ) as HTMLSpanElement;
          settingAreaTitle.textContent = settingAreasState[0];
          const settingCamAreaSelect = document.querySelector(
            '#settingCamAreaSelect'
          ) as HTMLSelectElement;
          settingCamAreaSelect.value = settingAreasState[0];

          setCurCamAreaState(settingAreasState[0]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    console.log('camSettingState', camSettingState);

    const areaFilteredData = camSettingState?.filter(
      (obj) => obj.area === 'H2 로봇'
    );
    console.log('areaFilteredData', areaFilteredData);

    if (camSettingState?.length > 0) {
      console.log('🍊🍊🍊');
      initSettingUI();
    }
  }, [camSettingState]);

  /* 구역 선택에서 바뀔때마다 Api 호출 및 셋팅 */
  useEffect(() => {
    Api.tracker
      .findData({ area: curCamAreaState })
      .then((res) => {
        console.log('🧥🧥🧥', res);
        flushSync(() => setCamSettingState([...res]));
        // flushSync(() => setCamSettingState(res));
      })
      // .finally(() => initSettingUI())
      .catch((err) => console.error(err));
  }, [curCamAreaState]);

  const camSettingMap = useMemo(() => {
    return camSettingState?.map((data, idx) => (
      <section id={`content${idx + 1}`} key={idx} itemID={data._id}>
        <div className="contentBox">
          <div className="content">
            <Folder style={{ fontSize: '24px' }} />
            <span>저장폴더</span>
            <input
              id={`savingPathInput${idx + 1}`}
              type="text"
              defaultValue={data.savingPath}
            />
            <input
              id={`inputFilePath${idx + 1}`}
              itemID={`savingPathInput${idx + 1}`}
              type="file"
              className="btnR defaultPrimary inputFilePath"
              datatype="savingPath"
              onChange={handleChangeValue}
              // @ts-ignore
              webkitdirectory=""
            />
            <label id="inputFilePathLabel" htmlFor={`inputFilePath${idx + 1}`}>
              선택
            </label>
          </div>
          <div className="content">
            <PhotoCamera style={{ fontSize: '24px' }} />
            <span>카메라 이름</span>
            <input id={`camNameInput${idx + 1}`} defaultValue={data.camName} />
            <button
              datatype="camName"
              itemID={`camNameInput${idx + 1}`}
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
                className="inputSwitchOn"
                datatype="computeDevice"
                type="radio"
                id={`${data._id}1`}
                name="radio"
                onChange={handleChangeValue}
                value="CPU"
              />
              <label htmlFor={`${data._id}1`}>CPU</label>
              <input
                className="inputSwitchOff"
                datatype="computeDevice"
                type="radio"
                id={`${data._id}2`}
                name="radio"
                onChange={handleChangeValue}
                value="GPU"
              />
              <label htmlFor={`${data._id}2`}>GPU</label>
              <span className={`move ${data.camPort}computeDeviceMove`} />
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
                className="inputSwitchOn"
                datatype="imgSaveSwitch"
                type="radio"
                id={`${data._id}3`}
                name="imgRadio"
                onChange={handleChangeValue}
                value="on"
              />
              <label htmlFor={`${data._id}3`}>ON</label>
              <input
                className="inputSwitchOff"
                datatype="imgSaveSwitch"
                type="radio"
                id={`${data._id}4`}
                name="imgRadio"
                onChange={handleChangeValue}
                value="off"
              />
              <label htmlFor={`${data._id}4`}>OFF</label>
              <span className={`move ${data.camPort}imgSaveSwitchMove`} />
            </div>
          </div>
          <div className="content">
            <Textsms />
            <span>문자 알람</span>
            <div className="messageToggle">
              <input
                className="inputSwitchOn"
                datatype="messageSwitch"
                type="radio"
                id={`${data._id}5`}
                name="messageRadio"
                onChange={handleChangeValue}
                value="on"
              />
              <label htmlFor={`${data._id}5`}>ON</label>
              <input
                className="inputSwitchOff"
                datatype="messageSwitch"
                type="radio"
                id={`${data._id}6`}
                name="messageRadio"
                onChange={handleChangeValue}
                value="off"
              />
              <label htmlFor={`${data._id}6`}>OFF</label>
              <span className={`move ${data.camPort}messageSwitchMove`} />
            </div>
          </div>
          <div className="content">
            <img src={KakaoIcon} alt="" />
            <span>카카오톡 알림</span>
            <div className="kakaoToggle">
              <input
                className="inputSwitchOn"
                datatype="kakaoSwitch"
                type="radio"
                id={`${data._id}7`}
                name="kakaoRadio"
                onChange={handleChangeValue}
                value="on"
              />
              <label htmlFor={`${data._id}7`}>ON</label>
              <input
                className="inputSwitchOff"
                datatype="kakaoSwitch"
                type="radio"
                id={`${data._id}8`}
                name="kakaoRadio"
                onChange={handleChangeValue}
                value="off"
              />
              <label htmlFor={`${data._id}8`}>OFF</label>
              <span className={`move ${data.camPort}kakaoSwitchMove`} />
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
          <div className="titleLeft">
            <span>Settings</span>
            <span>/</span>
            <span id="settingAreaTitle" />
          </div>
          <div className="titleRight">
            <span>구역 선택</span>
            <select
              id="settingCamAreaSelect"
              onChange={handleSelectCamArea}
              defaultValue={camAreasState[2]}
            >
              {camAreasState.map((area, key) => (
                <option key={key}>{area}</option>
              ))}
            </select>
          </div>
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
