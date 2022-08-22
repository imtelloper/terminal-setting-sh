import React from 'react';
import '../style/components/LogoutPopup.scss';

const LogoutPopup = ({ setLogoutPopupState }) => {
  return (
    <div className="loginAlarmContainer">
      <div className="loginAlarmBox">
        <div className="loginAlarmTxt">
          로그아웃 하시겠습니까?
        </div>
        <div className="loginAlarmBtn">
          <button className="btnR normalGhost" onClick={() => {setLogoutPopupState(false)}}>CANCEL</button>
          <button className="btnR defaultPrimary">OK</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
