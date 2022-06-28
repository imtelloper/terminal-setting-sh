import React, { useEffect, useState } from 'react';
import { BiDownload, BiExport } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { flushSync } from 'react-dom';
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
}) => {
  const navigate = useNavigate();
  const [camInfoState, setCamInfoState] = useState([
    { safetyLevel: 'Green', sensingCnt: 0 },
    { safetyLevel: 'Red', sensingCnt: 1 },
    { safetyLevel: 'Yellow', sensingCnt: 2 },
    { safetyLevel: 'Green', sensingCnt: 3 },
  ]);

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

  // 녹화
  const handleRecordVideo = () => {
    Api.stream.startRecordVideo();
  };

  const groupBoxComponent = (camInfoStateInfo, idx) => (
    <>
      <div className="groupBox">
        <span className="groupName">{`Group${parseInt(idx, 10) + 1}`}</span>
        <span className="saveParameter" onClick={saveParameter}>
          <BiDownload />
          파라미터 저장
        </span>
        <span className="callParameter" onClick={callParameter}>
          <BiExport />
          파라미터 불러오기
        </span>
      </div>
      <p>
        Safety Level :{' '}
        <span className="safeLevel">{camInfoStateInfo.safetyLevel}</span>
      </p>
      <p>감지 수 : {camInfoStateInfo.sensingCnt}</p>
      <div className="safetyBtnBox">
        <button
          className="safetyBtn safetyActiveBtn"
          datatype="false"
          onClick={handleActive}
        >
          Inactive
        </button>
        <button className="safetyBtn safetyDeleteBtn" onClick={handleDelete}>
          Delete
        </button>
        <button className="safetyBtn safetyResetBtn" onClick={handleErrorReset}>
          Error Reset
        </button>
      </div>
    </>
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

        <div className="safetyCreateBtnBox">
          <button
            className="safetyCreateBtn"
            datatype={idx.toString()}
            onClick={createCanvas}
          >
            생성
          </button>
        </div>
        <div className="bottomBtnBox">
          <button className="bottomBtn" onClick={handleRecordVideo}>
            Recording
          </button>
          <button
            className="bottomBtn"
            onClick={() => {
              // navigate('/detail');
              Api.stream.stopRecordVideo();
            }}
          >
            설정
          </button>
        </div>
      </div>
    </section>
  ));

  return <>{camInfosMap}</>;
};

export default ObserveCamInfo;
