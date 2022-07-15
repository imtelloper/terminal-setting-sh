import React, { useEffect, useMemo, useState } from 'react';
import '../style/pages/ObserveCamInfo.scss';
import { useNavigate } from 'react-router-dom';
import { flushSync } from 'react-dom';
import Delete from '../images/delete.png';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Feedback, HighlightOff } from '@material-ui/icons';
import { MdDangerous, MdOutlineTaskAlt } from 'react-icons/md';

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

  const groupBoxComponent = (camInfoStateInfo, idx) => (
    <div className="observeCamInfoContainer">
      <div className="observeBox">
        <div className="groupBox">
          <span className="groupName">{`Group${idx}`}</span>
          <div className="switchToggle">
            <input
              datatype="messageSwitch"
              type="radio"
              id="radio1"
              name="messageRadio"
              value="on"
              defaultChecked
            />
            <label htmlFor="radio1">ON</label>
            <input
              datatype="messageSwitch"
              type="radio"
              id="radio2"
              name="messageRadio"
              value="off"
            />
            <label htmlFor="radio2">OFF</label>
            <span className="move" />
          </div>
        </div>
        <div className="btnBox">
          {/* className : 색상별 green yellow red inactive */}
          <div className="alarmTxt green">
            <MdOutlineTaskAlt style={{ fontSize: '32px' }} />
            <span>안전합니다.</span>
          </div>

          {/* <div className="alarmTxt yellow"> */}
          {/*  <Feedback style={{ fontSize: '32px' }}/> */}
          {/*  <span>작업자 진입 확인</span> */}
          {/* </div> */}

          {/*<div className="alarmTxt red">*/}
          {/*  <MdDangerous style={{ fontSize: '32px' }} />*/}
          {/*  <span>작업자 위험 반경 진입</span>*/}
          {/*</div>*/}

          {/*<div className="alarmTxt inactive">*/}
          {/*  <HighlightOff style={{ fontSize: '32px' }} />*/}
          {/*  <span>비활성화 되었습니다.</span>*/}
          {/*</div>*/}

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
          <div>
            <button onClick={saveParameter}>저장</button>
            <button onClick={callParameter}>불러오기</button>
            <button onClick={handleErrorReset}>상태 리셋</button>
            <button onClick={handleDelete}>
              <img src={Delete} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const camInfosMap = useMemo(() => {
    return camInfoState.map((info, idx) => (
      <section
        id={`safetyContent${idx + 1}`}
        className="safetyContents"
        key={idx}
      >
        <div className="safetyContentBox">
          {videoFrameState[idx]?.firstCanvas?.visible &&
            groupBoxComponent(info, 1)}

          {videoFrameState[idx]?.secondCanvas?.visible &&
            groupBoxComponent(info, 2)}

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
        </div>
      </section>
    ));
  }, [camInfoState, videoFrameState]);

  useEffect(() => {
    const camTabs = Array.from(document.querySelectorAll('.safetyContents'));
    camTabs.forEach((ele: HTMLElement, idx) => {
      if (idx !== 0) {
        ele.style.display = 'none';
      }
    });
  }, []);

  return <>{camInfosMap}</>;
};

export default ObserveCamInfo;
