import React, { useEffect, useState } from 'react';
import '../style/DesignSystem.scss';
import '../style/components/CalibrationPopup.scss';
import { Undo } from '@material-ui/icons';
import { MdDesignServices } from 'react-icons/md';
import { useSWRState } from '../fetcher/useSWRState';

const CalibrationPopup = ({ openClosePopup }) => {
  const { data: swrState, mutate: setSwrState } = useSWRState();

  const [numState, setNumState] = useState('');

  /* 기준선 그리기 */
  const handleBg = () => {
    const alarmBox = document.querySelector('.alarmBox');
    alarmBox.classList.add('alarmBoxActive');
  };

  const handleNum = (e) => {
    setNumState(e.currentTarget.value);
  };

  useEffect(() => {
    // input박스에 숫자 입력시 활성화
    const numInputEl = document.querySelector('.numInput');
    const numLabelEl = document.querySelector('.numLabel');
    const checkBtnEl = document.querySelector('.contentBox .checkBtn');
    if (numState.length > 0) {
      numInputEl?.classList.add('inputActive');
      numLabelEl?.classList.add('labelActive');
      checkBtnEl?.classList.add('btnActive');
    } else {
      numInputEl?.classList.remove('inputActive');
      numLabelEl?.classList.remove('labelActive');
      checkBtnEl?.classList.remove('btnActive');
    }
    console.log('😆swrState', swrState);
  }, []);

  return (
    <div className="calibrationZoneContainer">
      <div className="calibrationBox">
        <div className="calibrationTitle">Calibration 설정</div>
        <div className="contentBox">
          <div className="canvas">
            <canvas />
          </div>
          <div className="alarmBox">
            <span>기준선을 그려 주세요.</span>
            <button className="iconBtnR defaultPrimary">
              <span className="iconR">
                <MdDesignServices style={{ fontSize: '24px' }} />
              </span>
              <span className="txt" onClick={handleBg}>
                기준선 그리기
              </span>
            </button>
          </div>
          <div className="settingBox">
            <button>
              <Undo />
              <span>다시 그리기</span>
            </button>
            <div>
              <span>기준선 길이</span>
              <input
                id="numInput"
                className="numInput"
                type="text"
                placeholder="00.0"
                onChange={handleNum}
                value={numState}
              />
              <label htmlFor="numInput" className="numLabel">
                m
              </label>
            </div>
          </div>
          <div className="bottomBtnBox">
            <button
              className="btnR normalPrimary"
              datatype="calibration"
              onClick={openClosePopup}
            >
              취소
            </button>
            <button className="checkBtn" onChange={handleNum}>
              확인
            </button>
          </div>
        </div>
        {/* <div className="contentBox"> */}
        {/*  <div className="left"> */}
        {/*    <canvas /> */}
        {/*  </div> */}
        {/*  <div className="right"> */}
        {/*    <p>기준선을 생성하여 길이를 입력해주세요</p> */}
        {/*    <ul> */}
        {/*      <li> */}
        {/*        <span>기준선</span> */}
        {/*        <div className="border" /> */}
        {/*        <button onClick={handleClick}>생성</button> */}
        {/*      </li> */}

        {/*      {isOpenState && ( */}
        {/*        <> */}
        {/*          <div className="addInputBox"> */}
        {/*            <span>기준선 길이</span> */}
        {/*            <div className="inputBox"> */}
        {/*              <input type="text" /> */}
        {/*              <span>m</span> */}
        {/*            </div> */}
        {/*          </div> */}
        {/*          <div className="bottomBtnBox"> */}
        {/*            <button>확인</button> */}
        {/*            <button onClick={handleClick}>취소</button> */}
        {/*          </div> */}
        {/*        </> */}
        {/*      )} */}
        {/*    </ul> */}
        {/*    <button className="closeBtn" onClick={closeCalibrationPopup}> */}
        {/*      닫기 */}
        {/*    </button> */}
        {/*  </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default CalibrationPopup;
