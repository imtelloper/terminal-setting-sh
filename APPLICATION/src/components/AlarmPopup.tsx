import React from 'react';
import '../style/DesignSystem.scss';
import '../style/components/AlarmPopup.scss';

const AlarmPopup = ({ openAlarmPopup }) => {
  return (
    <div className="removeAlarmPopupContainer" onClick={openAlarmPopup}>
      <div className="popupBox">
        <span className="icon" />
        <span className="txt">모든 항목을 다운 받으시겠습니까?</span>
        <div className="btnBox">
          <button className="btnR normalPrimary" onClick={openAlarmPopup}>
            CANCEL
          </button>
          <button className="btnR defaultPrimary">OK</button>
        </div>
      </div>
    </div>
  );
};

export default AlarmPopup;
