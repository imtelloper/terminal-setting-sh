import React, { useEffect, useState } from 'react';
import { BiDownload, BiExport } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { flushSync } from 'react-dom';

type Props = {
  videoFrameState: Array<any>;
  setVideoFrameState: React.Dispatch<any>;
};

// eslint-disable-next-line react/prop-types
const ObserveCamInfo = ({ videoFrameState, setVideoFrameState }) => {
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

  const handleDelete = () => {
    console.log('handleDelete');
  };

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

  const createCanvas = (e) => {
    const target = e.currentTarget;
    const dType = parseInt(target.getAttribute('datatype'), 10);
    const newArr = videoFrameState;
    newArr[dType].yellowCanvasVisible = true;
    flushSync(() => setVideoFrameState([]));
    flushSync(() => setVideoFrameState(newArr));
  };

  const camInfosMap = camInfoState.map((info, idx) => (
    <section
      id={`safetyContent${idx + 1}`}
      className="safetyContents"
      key={idx}
    >
      <div className="safetyContentBox">
        <div className="groupBox">
          <span className="groupName">{`Group${idx + 1}`}</span>
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
          Safety Level : <span className="safeLevel">{info.safetyLevel}</span>
        </p>
        <p>감지 수 : {info.sensingCnt}</p>
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
          <button
            className="safetyBtn safetyResetBtn"
            onClick={handleErrorReset}
          >
            Error Reset
          </button>
        </div>
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
          <button className="bottomBtn">Recording</button>
          <button
            className="bottomBtn"
            onClick={() => {
              navigate('/detail');
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
