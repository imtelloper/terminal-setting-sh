import React from "react";
import '../style/components/DangerZonePopup.scss';

const dangerZonePopup = ({ openPopup ,closePopup }) => {
  return (
    <div className="dangerZoneContainer">
      <div className="dangerZoneBox">
        <div className="title">위험구간 설정</div>
        <div className="contentBox">
          <span>Green Zone 영역을 기준으로 Yellow, Red Zone의 크기를 설정합니다.</span>
          <div className="content">
            <ul>
              <li>Green Zone: 14200px</li>
              <li>Yellow Zone: <input />%</li>
              <li>Red Zone: <input />%</li>
            </ul>
            <div className="box">
              <div/>
              <div/>
              <div/>
            </div>
          </div>
          <div className="bottomBtnBox">
            <button>확인</button>
            <button onClick={closePopup}>취소</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dangerZonePopup;
