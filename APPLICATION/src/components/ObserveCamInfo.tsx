import React, { useEffect, useState } from 'react';
import '../style/pages/ObserveCamInfo.scss';
import { BiDownload, BiExport } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { flushSync } from 'react-dom';
import Api from '../api/Api';
import Delete from '../images/delete.png';
import { AiOutlinePlusCircle } from 'react-icons/ai';

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
}) => {
  const navigate = useNavigate();
  const [camInfoState, setCamInfoState] = useState([
    { safetyLevel: 'Green', sensingCnt: 0 },
    { safetyLevel: 'Red', sensingCnt: 1 },
    { safetyLevel: 'Yellow', sensingCnt: 2 },
    { safetyLevel: 'Green', sensingCnt: 3 },
  ]);
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
  const handleDelete = () => {
    console.log('handleDelete');
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
    console.log('그룹1 비지블 스테이트', newArr[dType].firstCanvas.visible);
    // 첫번째 그룹이 있다면 두번째 그룹 생성
    if (newArr[dType].firstCanvas.visible === false) {
      newArr[dType].firstCanvas.visible = true;
    } else {
      newArr[dType].secondCanvas.visible = true;
    }

    flushSync(() => setVideoFrameState([]));
    flushSync(() => setVideoFrameState(newArr));
  };

  const groupBoxComponent = (camInfoStateInfo, idx) => (
    <div className="observeCamInfoContainer">
      <div className="observeBox">
        <div className="groupBox">
          <span className="groupName">{`Group${parseInt(idx, 10) + 1}`}</span>
          <button className="switchBtn on">ON</button>
          {/* <button className="switchBtn off">OFF</button> */}
        </div>
        <div className="btnBox">
          {/* className : green yellow red inactive => alarmTxt에 추가해주시면 됩니다! */}
          <div className="alarmTxt green">안전합니다.</div>
          <div className="sensingBox">
            <span>
              1차 감지<p>{camInfoStateInfo.sensingCnt}</p>
            </span>
            <span>
              2차 감지<p>{camInfoStateInfo.sensingCnt}</p>
            </span>
          </div>
        </div>
        <div className="safetyBtnBox">
          <button className="saveParameter" onClick={saveParameter}>
            설정 저장
          </button>
          <button className="callParameter" onClick={callParameter}>
            설정 불러오기
          </button>
          <button
            className="safetyBtn safetyResetBtn"
            onClick={handleErrorReset}
          >
            에러 리셋
          </button>
          <button className="safetyBtn safetyDeleteBtn" onClick={handleDelete}>
            <img src={Delete} />
          </button>
        </div>
      </div>
    </div>
  );

  const camInfosMap = camInfoState.map((info, idx) => (
    <section
      id={`safetyContent${idx + 1}`}
      className="safetyContents"
      key={idx}
    >
      <div className="safetyContentBox">
        {videoFrameState[idx]?.firstCanvas?.visible &&
          groupBoxComponent(info, idx)}

        {videoFrameState[idx]?.secondCanvas?.visible &&
          groupBoxComponent(info, idx + 1)}

        {camInfoState.length === idx + 1 && (
          <div className="safetyCreateBtnBox">
            <button
              className="safetyCreateBtn"
              datatype={idx.toString()}
              onClick={createCanvas}
            >
              <span>
                <AiOutlinePlusCircle />
              </span>
              <span>ADD</span>
            </button>
          </div>
        )}
      </div>
    </section>
  ));

  return <>{camInfosMap}</>;
};

export default ObserveCamInfo;
