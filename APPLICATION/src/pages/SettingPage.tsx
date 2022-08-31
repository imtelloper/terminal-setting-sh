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
  ArrowDropDown,
  Folder,
  Memory,
  PermMedia,
  PhotoCamera,
  Textsms,
} from '@material-ui/icons';
import { MdViewInAr, MdWorkspaces } from 'react-icons/md';
import KakaoIcon from '../images/kakao_icon.png';
import Datathresholding from '../images/data_thresholding.png';
import { useSWRState } from '../fetcher/useSWRState';
import { flushSync } from 'react-dom';
import { camDummyData } from '../initDatas/camSettingDummyData';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

/*
tracker들을 가져와서 area를 고유값으로 select option에 셋팅
tracker들이 cam이 1개일지, 2개일지 모르니 각 해당 구역의 cam만큼만 설정할 수 있도록 해야함
*/
const SettingPage = () => {
  const { data: swrState, mutate: setSwrState } = useSWRState();
  const [isPending, startTransition] = useTransition();
  const navigation = useNavigate();
  const [camSettingState, setCamSettingState] =
    useState<Array<CamSettingType>>(camDummyData);
  const [camAreasState, setCamAreasState] = useState<Array<string>>([]);
  const [curCamAreaState, setCurCamAreaState] = useState('');
  const [loadingState, setLoadingState] = useState(false);

  const setSwtichSpanLabel = (obj, className: string) => {
    const targetMove = document.querySelector(
      `.${obj.camPort}${className}Move`
    ) as HTMLSpanElement;
    const targetMoveLabel = targetMove.parentNode.querySelectorAll('label');
    const onOff = obj[className] === true || obj[className] === 'CPU';
    // console.log('obj[className]', `${obj[className]} : ${onOff}`);
    onOff
      ? (targetMove.style.transform = 'translateX(-60%)') &&
        (targetMoveLabel[0].style.color = 'white') &&
        (targetMoveLabel[1].style.color = '#979797')
      : (targetMove.style.transform = 'translateX(40%)') &&
        (targetMoveLabel[1].style.color = 'white') &&
        (targetMoveLabel[0].style.color = '#979797');
  };

  /** camSettingState(각 카메라 셋팅값)가 바뀔때마다 호출 및 셋팅
   * 연산장치, 알람 이미지 저장, 문자 알람, 카카오톡 알림 버튼 UI 바꿔줌
   * */
  const initSettingUI = () => {
    camSettingState.forEach((obj) => {
      setSwtichSpanLabel(obj, 'computeDevice');
      setSwtichSpanLabel(obj, 'imgSaveSwitch');
      setSwtichSpanLabel(obj, 'kakaoSwitch');
      setSwtichSpanLabel(obj, 'messageSwitch');
    });
  };

  /* 구역 선택 클릭 메서드 */
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

  /* 카메라 이름 change */
  const handleCameNameChange = (e) => {
    const target = e.currentTarget;
    const newState = camSettingState;
    const idx = target.getAttribute('datatype');
    newState[idx].camName = target.value;
    setCamSettingState([...newState]);
  };

  /*
   * 각 input값 바뀔때마다 실행
   * savingPath
   * camName
   * computeDevice
   * sensingModel
   * threshold
   * imgSaveSwitch
   * messageSwitch
   * kakaoSwitch
   * */
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
    /* 저장폴더 선택시 */
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

    /* 카메라 이름 정할시 */
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

    setLoadingState(true);
    /* 수정사항 DB 반영 */
    Api.tracker
      .modifyOneData(trackerId, { [dType]: inputVal })
      .then(() => {
        const camIdx = camSettingState.findIndex(
          (obj) => obj._id === trackerId
        );
        console.log(camIdx);
        const newCamSetting = camSettingState;
        newCamSetting[camIdx][dType] = inputVal;
        flushSync(() => setCamSettingState([...newCamSetting]));
      })
      .finally(() => setLoadingState(false))
      .catch((err) => console.error(err));
  };

  /* INIT EFFECT */
  useEffect(() => {
    /* init cam setting data */
    /* 전체 tracker 데이터 다 가져오기(tracker는 데이터가 한정적이라 전체 가져오기해도 문제X) */
    Api.tracker
      .getAllDatas()
      .then((res) => {
        console.log('🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷 START 🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷');
        console.log('Api.tracker.getAllDatas res', res);
        if (typeof res !== 'string') {
          setCamSettingState(res);
          /* 구역 이름만 추출 */
          const camAreas: Array<string> = res.map((obj) => obj.area);
          const settingAreasState: Array<string> = [...new Set(camAreas)];
          console.log('settingAreasState', settingAreasState);
          /* 각 구역 이름들 셋팅 */
          setCamAreasState(settingAreasState);

          /* 왼쪽 상단 구역 이름 바꿔주기, 구역 선택 셋팅 */
          const settingAreaTitle = document.querySelector(
            '#settingAreaTitle'
          ) as HTMLSpanElement;
          const settingCamAreaSelect = document.querySelector(
            '#settingCamAreaSelect'
          ) as HTMLSelectElement;
          settingAreaTitle.textContent = settingAreasState[0];
          settingCamAreaSelect.value = settingAreasState[0];

          /* 현재 구역 이름 셋팅 */
          setCurCamAreaState(settingAreasState[0]);
        }
        console.log('🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷 END 🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷');
      })
      .catch((err) => console.error(err));
  }, []);

  /* 각 카메라 셋팅 스테이트가 바뀌면 UI도 바꿔주기 */
  useEffect(() => {
    console.log('camSettingState', camSettingState);
    if (camSettingState?.length > 0) {
      console.log('🍊🍊🍊🍊🍊🍊🍊🍊🍊INIT SETTING UI🍊🍊🍊🍊🍊🍊🍊🍊🍊');
      initSettingUI();
    }
  }, [camSettingState]);

  /* 구역 선택에서 바뀔때마다 Api 호출 및 셋팅 */
  useEffect(() => {
    /* 현재구역의 이름과 같은 구역을 tracker table에서 가져오기 */
    Api.tracker
      .findData({ area: curCamAreaState })
      .then((res) => {
        console.log('🧥🧥🧥', res);
        /* 해당 구역의 tracker 데이터들 가져와서 셋팅 */
        flushSync(() => setCamSettingState([...res]));
      })
      // .finally(() => initSettingUI())
      .catch((err) => console.error(err));
  }, [curCamAreaState]);

  const camSettingMap = useMemo(() => {
    return camSettingState?.map((data, idx) => (
      <section id={`content${idx + 1}`} key={idx} itemID={data._id}>
        <div className="contentBox">
          {/* 👉🏻 저장폴더 선택 */}
          <div className="content">
            <Folder style={{ fontSize: '24px' }} />
            <span>저장폴더</span>
            <input
              id={`savingPathInput${idx + 1}`}
              type="text"
              // defaultValue={data.savingPath}
              value={data.savingPath}
              onChange={() => {}}
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
            <label
              id="inputFilePathLabel"
              htmlFor={`inputFilePath${idx + 1}`}
              className="contentLabel"
            >
              선택
            </label>
          </div>
          {/* 👉🏻 카메라 이름 */}
          <div className="content">
            <PhotoCamera style={{ fontSize: '24px' }} />
            <span>카메라 이름</span>
            <input
              id={`camNameInput${idx + 1}`}
              value={data.camName}
              datatype={idx.toString()}
              onChange={handleCameNameChange}
            />
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <label
              className="contentLabel"
              datatype="camName"
              itemID={`camNameInput${idx + 1}`}
              onClick={handleChangeValue}
            >
              적용
            </label>
          </div>
          {/* 👉🏻 연산장치 */}
          <div className="content">
            <Memory style={{ fontSize: '24px' }} />
            <span className={`${data.camPort}computeDevice`}>연산장치</span>
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
          {/* 👉🏻 감지모델 */}
          <div className="content">
            <MdViewInAr style={{ fontSize: '24px' }} />
            <span className="contentName">감지모델</span>
            <select
              onChange={handleChangeValue}
              datatype="sensingModel"
              value={data.sensingModel}
            >
              <option>nano</option>
              <option>small</option>
              <option>medium</option>
            </select>
            <span className="arrowIcon">
              <ArrowDropDown />
            </span>
          </div>
          {/* 👉🏻 Threshold */}
          <div className="content">
            {/* <DataThresholdingIcon /> */}
            <img src={Datathresholding} alt="" />
            <span className="contentName">Threshold</span>
            <select
              onChange={handleChangeValue}
              value={data.threshold}
              datatype="threshold"
            >
              <option>10</option>
              <option>20</option>
              <option>30</option>
              <option>40</option>
              <option>50</option>
              <option>60</option>
              <option>70</option>
              <option>80</option>
              <option>90</option>
              <option>100</option>
            </select>
            <span className="arrowIcon">
              <ArrowDropDown />
            </span>
          </div>
          {/* 👉🏻 알람 이미지 저장 */}
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
          {/* 👉🏻 문자 알람 */}
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
          {/* 👉🏻 카카오톡 알림 */}
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
            <span className="titleRightName">구역 선택</span>
            <select
              id="settingCamAreaSelect"
              onChange={handleSelectCamArea}
              defaultValue={camAreasState[2]}
            >
              {camAreasState.map((area, key) => (
                <option key={key}>{area}</option>
              ))}
            </select>
            <span className="arrowIcon">
              <ArrowDropDown />
            </span>
          </div>
        </div>
        <div className="settingBox">
          {/* ❗❗❗ 1차 버전 출시 후 주석 풀고 구현 ❗❗❗️ */}
          {/* 캠 구역 이름 변경, 전체 CAM 리스트 확인 */}
          {/* <div className="settingBoxTop"> */}
          {/*  <div className="settingBoxTopLeft"> */}
          {/*    <MdWorkspaces style={{ fontSize: '24px' }} /> */}
          {/*    <span>캠 구역 이름 변경</span> */}
          {/*    <input type="text" /> */}
          {/*    <button className="btnR defaultPrimary">확인</button> */}
          {/*  </div> */}
          {/*  <div className="settingBoxTopRight"> */}
          {/*    <button */}
          {/*      className="btnR normalPrimary" */}
          {/*      onClick={() => { */}
          {/*        navigation('/allListCheck'); */}
          {/*      }} */}
          {/*    > */}
          {/*      전체 CAM 리스트 확인 */}
          {/*    </button> */}
          {/*  </div> */}
          {/* </div> */}

          <input
            className="tabInput"
            id="tab1"
            type="radio"
            name="tabs"
            defaultChecked
          />
          <label htmlFor="tab1" className="tabLabel">
            Cam1
          </label>
          <input className="tabInput" id="tab2" type="radio" name="tabs" />
          <label htmlFor="tab2" className="tabLabel">
            Cam2
          </label>
          <input className="tabInput" id="tab3" type="radio" name="tabs" />
          <label htmlFor="tab3" className="tabLabel">
            Cam3
          </label>
          <input className="tabInput" id="tab4" type="radio" name="tabs" />
          <label htmlFor="tab4" className="tabLabel">
            Cam4
          </label>
          {/* {loadingState ? <Loading /> : camSettingMap} */}
          {camSettingMap}
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
