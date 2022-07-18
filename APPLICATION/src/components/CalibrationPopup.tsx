import React, { useState } from 'react';
import '../style/components/CalibrationPopup.scss';
import { Undo } from '@material-ui/icons';
import { MdDesignServices } from 'react-icons/md';

const CalibrationPopup = ({ openCalibrationPopup, closeCalibrationPopup }) => {
  // const [isOpenState, setIsOpenState] = useState(false);
  //
  // const handleClick = (e) => {
  //   const target = e.currentTarget;
  //   setIsOpenState(!isOpenState);
  // };

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
              <span className="txt">기준선 그리기</span>
            </button>
          </div>
          <div className="settingBox">
            <button>
              <Undo />
              다시 그리기
            </button>
            <div>
              <input type="text" placeholder="00.0 m" />
            </div>
          </div>
          <div className="bottomBtnBox">
            <button onClick={closeCalibrationPopup}>취소</button>
            <button>확인</button>
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
