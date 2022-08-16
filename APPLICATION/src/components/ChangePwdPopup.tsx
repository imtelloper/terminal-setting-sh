import React, { useEffect, useState } from 'react';
import '../style/DesignSystem.scss';
import '../style/components/ChangePwdPopup.scss';
import LoginAlarmPopup from './LoginAlarmPopup';

const ChangePwdPopupPopup = ({
  setIsChangePwdPopupOpenState,
  changePwdPopup,
}) => {
  const [nowPwdState, setNowPwdState] = useState('');
  const [changePwdState, setChangePwdState] = useState('');
  const [checkPwdState, setCheckPwdState] = useState('');
  const [alarmTxtState, setAlarmTxtState] = useState(false);

  const handleNowPwd = (e) => {
    setNowPwdState(e.currentTarget.value);
    console.log(e.currentTarget.value, '현재 패스워드');
  };

  const handleChangePwd = (e) => {
    setChangePwdState(e.currentTarget.value);
    console.log(e.currentTarget.value, '변경 패스워드');
  };

  const handleCheckPwd = (e) => {
    setCheckPwdState(e.currentTarget.value);
    console.log(e.currentTarget.value, '변경 패스워드 확인');
  };

  //현재 패스워드, 변경 패스워드, 변경 패스워드 확인 모두 성공하면 '패스워드가 변경되었습니다'
  //현재 패스워드가 틀리면 '현재 패스워드가 일치 하지 않습니다'
  //변경 패스워드 & 변경 패스워드 확인 다르면 '변경 패스워드가 일치 하지 않습니다'

  return (
    <div className="changePwdContainer">
      <div className="changePwdBox">
        <div className="changePwdTitle">Password 변경</div>
        <div className="changePwdContentBox">
          <div className="changePwdContent">
            <div className="changePwdCon">
              <span>현재 패스워드</span>
              <input type="text" onChange={handleNowPwd} value={nowPwdState} />
            </div>
            <div className="changePwdCon">
              <span>변경 패스워드</span>
              <input
                type="text"
                onChange={handleChangePwd}
                value={changePwdState}
              />
            </div>
            <div className="changePwdCon">
              <span>변경 패스워드 확인</span>
              <input
                type="text"
                onChange={handleCheckPwd}
                value={checkPwdState}
              />
            </div>
          </div>
          <div className="changePwdBtnBox">
            <div className="changePwdButtons">
              <button
                className="btnR normalGhost"
                onClick={() => setIsChangePwdPopupOpenState(false)}
              >
                취소
              </button>
              <button className="btnR defaultPrimary" onClick={changePwdPopup}>
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
      {}
    </div>
  );
};

export default ChangePwdPopupPopup;
