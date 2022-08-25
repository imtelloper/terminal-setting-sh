import React from 'react';
import '../style/DesignSystem.scss';
import '../style/components/AlarmPopup.scss';
import { MdArrowCircleDown } from 'react-icons/md';

const DownAlarmPopup = ({ openDownAlarmPopup }) => {
  return (
    <div className="alarmPopupContainer" onClick={openDownAlarmPopup}>
      <div className="popupBox">
        {/*  복구 선택시 팝업 */}
        {/* <span className="icon"> */}
        {/*  <Replay style={{ fontSize: '60px', color: '#979797' }}/> */}
        {/* </span> */}
        {/* <span className="txt">모든 항목을 복구 하시겠습니까?</span> */}
        {/* <span className="txt">선택된 항목을 복구 하시겠습니까?</span> */}

        {/* 다운로드 선택시 팝업 */}
        <span className="icon">
          <MdArrowCircleDown style={{ fontSize: '60px', color: '#979797' }} />
        </span>
        <span className="txt">모든 항목을 다운 받으시겠습니까?</span>
        {/* <span className="txt">선택된 항목을 다운 받으시겠습니까?</span> */}
        <div className="btnBox">
          <button className="btnR normalGhost" onClick={openDownAlarmPopup}>
            CANCEL
          </button>
          <button className="btnR defaultPrimary">OK</button>
        </div>
      </div>
    </div>
  );
};

export default DownAlarmPopup;
