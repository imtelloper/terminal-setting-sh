import React, { useState, useEffect } from 'react';
import '../style/components/DangerZonePopup.scss';

const dangerZonePopup = ({ openDangerZonePopup, closeDangerZonePopup }) => {
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.currentTarget.value);
  };

  return (
    <div className="dangerZoneContainer">
      <div className="dangerZoneBox">
        <div className="title">위험구간 설정</div>
        <div className="contentBox">
          <span>
            Calibration 설정을 기준으로 Yellow Zone, Green Zone의 반경 범위를
            설정합니다.
          </span>
          <div className="content">
            <ul>
              <li>Calibration: 설정 필요</li>
              <li>
                Yellow Zone: <input type="text" className="yellowInput" onChange={handleTextChange} value={text}/>m
              </li>
              <li>
                Green Zone: <input type="text" className="GreenInput" onChange={handleTextChange} value={text}/>m
              </li>
            </ul>
            <div className="box">
              <div />
              <div />
              <div />
            </div>
          </div>
          {/* calibration 설정 완료 시 생성 */}
          <div className="bottomBtnBox">
            <button disabled={!text}>확인</button>
            <button disabled={!text}>취소</button>
          </div>
          <button className="closeBtn" onClick={closeDangerZonePopup}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default dangerZonePopup;
