import React from 'react';
import '../style/DesignSystem.scss';
import '../style/components/LoginAlarmPopup.scss';

const LoginAlarmPopup = () => {
  return (
    <div className="loginAlarmContainer">
      <div className="loginAlarmBox">
        <div className="loginAlarmTxt">
          입력하신 ID 혹은 패스워드가 일치하지 않습니다.
          {/* 패스워드가 변경되었습니다. */}
          {/* 현재 패스워드가 일치 하지 않습니다. */}
          {/* 입력하신 이메일로 패스워드를 보냈습니다. */}
          {/* 변경 패스워드가 일치 하지 않습니다. */}
        </div>
        <div className="loginAlarmBtn">
          <button className="btnR defaultPrimary">OK</button>
        </div>
      </div>
    </div>
  );
};

export default LoginAlarmPopup;
4
