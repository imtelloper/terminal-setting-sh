import React, { useEffect, useState } from 'react';
import '../style/DesignSystem.scss';
import '../style/components/NewCamRegisterPopup.scss';

const NewCamRegisterPopup = ({ setIsNewCamRegisterPopupOpenState }) => {
  return (
    <div className="newCamContainer">
      <div className="newCamBox">
        <div className="newCamTitle">새 카메라 등록</div>
        <div className="newCamContentBox">
          <div className="newCamContent">
            <div className="newCamCon">
              <span>구역 이름</span>
              <input type="text" />
            </div>
            <div className="newCamCon">
              <span>카메라 번호</span>
              <input type="text" />
            </div>
            <div className="newCamCon">
              <span>카메라 이름</span>
              <input type="text" />
            </div>
          </div>
          <div className="newCamBtnBox">
            <div className="newCamButtons">
              <button
                className="btnR normalGhost"
                onClick={() => {
                  setIsNewCamRegisterPopupOpenState(false)
                }}
              >
                취소
              </button>
              <button className="btnR defaultPrimary">확인</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCamRegisterPopup;
