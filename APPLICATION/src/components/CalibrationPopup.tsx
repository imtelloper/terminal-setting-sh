import React, { useState } from 'react';
import '../style/components/CalibrationPopup.scss';

const CalibrationPopup = ({ openCalibrationPopup, closeCalibrationPopup }) => {
  const [isOpenState, setIsOpenState] = useState(false);

  const handleClick = (e) => {
    const target = e.currentTarget;
    setIsOpenState(!isOpenState);
  };

  return (
    <div className="calibrationZoneContainer">
      <div className="calibrationBox">
        <div className="calibrationTitle">Calibration 설정</div>
        <div className="contentBox">
          <div className="left">
            <canvas />
          </div>
          <div className="right">
            <p>기준선을 생성하여 길이를 입력해주세요</p>
            <ul>
              <li>
                <span>기준선</span>
                <div className="border" />
                <button onClick={handleClick}>생성</button>
              </li>

              {isOpenState && (
                <>
                  <div className="addInputBox">
                    <span>기준선 길이</span>
                    <div className="inputBox">
                      <input type="text" />
                      <span>m</span>
                    </div>
                  </div>
                  <div className="bottomBtnBox">
                    <button>확인</button>
                    <button onClick={handleClick}>취소</button>
                  </div>
                </>
              )}
            </ul>
            <button className="closeBtn" onClick={closeCalibrationPopup}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalibrationPopup;
