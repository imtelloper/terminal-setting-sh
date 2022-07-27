import React from 'react';
import '../style/components/ImgPopup.scss';

const ImgPopup = ({ openImgPopup }) => {
  return (
    <div className="imgPopupContainer">
      <div className="imgPopupBox">
        <div className="imgPopupTitle">
          H1공장크레인_CAM2_20220715_13:00.mp4
        </div>
        <div className="img">
          <img />
        </div>
        <div className="bottomBtnBox">
          <button className="btnR defaultPrimary" onClick={openImgPopup}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default ImgPopup;
