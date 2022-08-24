import React from 'react';
import '../style/DesignSystem.scss';
import '../style/components/AlarmPopup.scss';
import { Delete } from '@material-ui/icons';

const RemoveAlarmPopup = ({ openRemoveAlarmPopup }) => {
  return (
    <div className="alarmPopupContainer" onClick={openRemoveAlarmPopup}>
      <div className="popupBox">
        {/*  삭제 선택시 팝업 */}
        <span className="icon">
          <Delete style={{ fontSize: '60px', color: '#979797' }} />
        </span>
        <span className="txt">모든 항목을 삭제 하시겠습니까?</span>
        {/* <span className="txt">선택된 항목을 삭제 하시겠습니까?</span> */}

        <div className="btnBox">
          <button className="btnR normalGhost" onClick={openRemoveAlarmPopup}>
            CANCEL
          </button>
          <button className="btnR defaultPrimary">OK</button>
        </div>
      </div>
    </div>
  );
};

export default RemoveAlarmPopup;
