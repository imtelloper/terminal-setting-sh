import React, { useEffect, useMemo, useState } from 'react';
import '../style/DesignSystem.scss';
import '../style/pages/ObserveCamInfo.scss';
import { useNavigate } from 'react-router-dom';
import { flushSync } from 'react-dom';
import Delete from '../images/delete.png';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Feedback, HighlightOff } from '@material-ui/icons';
import { MdDangerous, MdOutlineTaskAlt } from 'react-icons/md';
import Api from '../api/Api';

type Props = {
  videoFrameState: Array<any>;
  setVideoFrameState: React.Dispatch<any>;
};

// eslint-disable-next-line react/prop-types
const ObserveCamInfo = ({
  videoFrameState,
  setVideoFrameState,
  camTabState,
  recordState,
  setRecordState,
  getObserveState,
  setNewVideoSrcState,
}) => {
  const navigate = useNavigate();
  const [camInfoState, setCamInfoState] = useState([]);
  const [ipState, setIpState] = useState('');

  const saveParameter = () => {
    console.log('saveParameter');
  };

  const callParameter = () => {
    console.log('callParameter');
  };

  const handleActive = (e) => {
    console.log('handleActive');
    const target = e.currentTarget as HTMLButtonElement;
    const dType = target.getAttribute('datatype');
    console.log('dType', dType);
    JSON.parse(dType)
      ? ((target.textContent = 'Inactive'),
        target.setAttribute('datatype', 'false'))
      : ((target.textContent = 'Active'),
        target.setAttribute('datatype', 'true'));

    const newArr = videoFrameState;
    newArr[3].frameSrc = 'http://192.168.0.30:81/api/stream/';
    flushSync(() => setVideoFrameState([]));
    flushSync(() => setVideoFrameState(newArr));
  };

  // 그룹안 삭제
  const handleDelete = (e) => {
    console.log('handleDelete');
    const target = e.currentTarget;
    const trackerId = target.getAttribute('itemID');
    const groupNum = target.getAttribute('datatype');
    Api.tracker.modifyOneData(trackerId, {
      [`sensingGroup${groupNum}`]: '',
    });
    /* 현재 비디오 스테이트 url 기본 url로 변경 */
    const targetIdx = videoFrameState.findIndex(
      (obj) => obj.trackerId === trackerId
    );
    let { frameSrc } = videoFrameState[targetIdx];
    frameSrc = `${frameSrc.split(':81')[0]}:81`;
    setNewVideoSrcState(targetIdx, frameSrc);
    // 해당 옵저브 데이터 삭제 필요
  };

  // 그룹안 리셋
  const handleErrorReset = () => {
    console.log('handleErrorReset');
    const newArr = videoFrameState;
    newArr[0].secondCanvas.visible = true;
    newArr[1].secondCanvas.visible = true;
    newArr[2].secondCanvas.visible = true;
    newArr[3].secondCanvas.visible = true;
    flushSync(() => setVideoFrameState([]));
    flushSync(() => setVideoFrameState(newArr));
  };

  // 생성
  const createCanvas = (e) => {
    console.log('createCanvas');
    const target = e.currentTarget;
    const dType = parseInt(target.getAttribute('datatype'), 10);
    console.log('현재 캠 스테이트 dType', dType);
    const newArr = videoFrameState;
    console.log(
      '그룹1 first 비지블 스테이트',
      newArr[dType].firstCanvas.visible
    );
    console.log(
      '그룹1 second 비지블 스테이트',
      newArr[dType].secondCanvas.visible
    );
    // 첫번째 그룹이 있다면 두번째 그룹 생성
    if (newArr[dType].firstCanvas.visible === false) {
      newArr[dType].firstCanvas.visible = true;
    } else {
      newArr[dType].secondCanvas.visible = true;
    }

    flushSync(() => setVideoFrameState([]));
    flushSync(() => setVideoFrameState(newArr));
  };

  const groupBoxComponent = (stateInfo, stateIdx, groupNum) => (
    <div className="observeCamInfoContainer">
      <div className="observeBox">
        <div className="groupBox">
          <span className="groupName">{`Group${groupNum}`}</span>
          <div className="switchToggle">
            <input
              datatype="messageSwitch"
              type="radio"
              id={`toggleOnRadio${stateIdx}`}
              name="messageRadio"
              value="on"
              defaultChecked
            />
            <label htmlFor={`toggleOnRadio${stateIdx}`}>ON</label>
            <input
              datatype="messageSwitch"
              type="radio"
              id={`toggleOffRadio${stateIdx}`}
              name="messageRadio"
              value="off"
            />
            <label htmlFor={`toggleOffRadio${stateIdx}`}>OFF</label>
            <span className="move" />
          </div>
        </div>
        <div className="btnBox">
          {/* className : 색상별 green yellow red inactive */}
          <div className="alarmTxt green">
            <MdOutlineTaskAlt style={{ fontSize: '32px' }} />
            {/* 작업자 진입 확인 / 작업자 위험 반경 진입 / 비활성화 되었습니다. */}
            <span>안전합니다.</span>
          </div>

          <div className="sensingBox">
            <span>
              1차 감지<p>{stateInfo?.[groupNum]?.yellowCnt}</p>
            </span>
            <span>
              2차 감지<p>{stateInfo?.[groupNum]?.redCnt}</p>
            </span>
          </div>
        </div>
        <div className="safetyBtnBox">
          <div>
            <button
              className="btnR normalPrimary"
              onClick={saveParameter}
              datatype={stateInfo?.[groupNum]?.trackerId}
            >
              저장
            </button>
            <button className="btnR normalPrimary" onClick={callParameter}>불러오기</button>
            <button className="btnR normalPrimary" onClick={handleErrorReset}>상태 리셋</button>
            <button
              className="btnR normalPrimary"
              onClick={handleDelete}
              itemID={stateInfo?.[groupNum]?.trackerId}
              datatype={groupNum}
            >
              <img src={Delete} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    // console.log('ObserveCamInfo');
    // console.log('🌸getObserveState', getObserveState);
    const newCamInfoState = [{}, {}, {}, {}];
    getObserveState.forEach((obj) => {
      const { camPort, groupNum } = obj;
      const camIndex = parseInt(camPort.at(-1), 10) - 1;
      newCamInfoState[camIndex] = {
        ...newCamInfoState[camIndex],
        [groupNum]: obj,
      };
    });

    // console.log('🪴🪴🪴🪴☘️ newCamInfoState', newCamInfoState);
    newCamInfoState.length > 0 && setCamInfoState(newCamInfoState);
  }, [getObserveState]);

  // useEffect(() => {
  //   console.log('love dive 🌝🌝🌝🌝🌝 camInfoState', camInfoState);
  // }, [camInfoState]);

  /* getObserveState를 가공하여 4개의 캠 셋트로 만들고 다시 해야된다. */
  const camInfosMap = useMemo(() => {
    return camInfoState?.map((info, idx) => (
      <section
        id={`safetyContent${idx + 1}`}
        className="safetyContents"
        key={idx}
      >
        <div className="safetyContentBox">
          {videoFrameState[idx]?.firstCanvas?.visible &&
            groupBoxComponent(info, idx + 1, 1)}

          {videoFrameState[idx]?.secondCanvas?.visible &&
            groupBoxComponent(info, idx + 1, 2)}

          <div className="safetyCreateBtnBox">
            <button
              className="safetyCreateBtn btnL normalPrimary"
              datatype={idx.toString()}
              onClick={createCanvas}
            >
              그룹 생성하기
              {/*<span>*/}
              {/*  <AiOutlinePlusCircle />*/}
              {/*</span>*/}
              {/*<span>{idx + 1} ADD</span>*/}
            </button>
          </div>
        </div>
      </section>
    ));
  }, [camInfoState, videoFrameState]);

  useEffect(() => {
    const camTabs = Array.from(document.querySelectorAll('.safetyContents'));
    console.log('camTabs', camTabs);
    camTabs.forEach((ele: HTMLElement, idx) => {
      if (idx !== 0) {
        ele.style.display = 'none';
      }
    });
  }, []);

  return <>{camInfosMap}</>;
};

export default ObserveCamInfo;
