import React from 'react';
import '../style/DesignSystem.scss';
import '../style/components/VideoPopup.scss';

const VideoPopup = ({ closeVideoPopup }) => {
  return (
    <div className="videoPopupContainer">
      <div className="videoPopupBox">
        <div className="videoPopupTitle">
          H1공장크레인_CAM2_20220715_13:00.mp4
        </div>
        <div className="video">
          <video />
        </div>
        <div className="bottomBtnBox">
          <button className="btnR normalPrimary" onClick={closeVideoPopup}>
            취소
          </button>
          <button className="btnR defaultPrimary">확인</button>
        </div>
      </div>
    </div>
  );
};

export default VideoPopup;
