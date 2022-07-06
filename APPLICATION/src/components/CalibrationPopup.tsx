import React, { useState } from 'react';
import '../style/components/CalibrationPopup.scss';

const CalibrationPopup = () => {
  const [isOpenState, setIsOpenState] = useState(false);

  const handleClick = (e) => {
    const target = e.currentTarget;
    console.log(target);
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
                <li>
                  <span>기준선 길이</span>
                  <div className="inputBox">
                    <input type="text" />
                    <span>m</span>
                  </div>
                  <div className="bottomBtnBox">
                    <button>확인</button>
                    <button>취소</button>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalibrationPopup;
