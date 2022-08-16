import React from 'react';
import '../style/DesignSystem.scss';
import '../style/components/ForgetPwdPopup.scss';

const ForgetPwdPopup = ({ setIsForgetPwdPopupOpenState, forgetPwdPopup }) => {

  //이메일 입력시 '입력하신 이메일로 패스워드를 보냈습니다'

  return (
    <div className="forgetPwdContainer">
      <div className="forgetPwdBox">
        <div className="forgetPwdTitle">Password 찾기</div>
        <div className="forgetPwdContentBox">
          <div className="forgetPwdContent">
            <span>E-mail</span>
            <input type="text" />
          </div>
          <div className="forgetPwdBtnBox">
            <div className="forgetPwdButtons">
              <button
                className="btnR normalGhost"
                onClick={() => setIsForgetPwdPopupOpenState(false)}
              >
                취소
              </button>
              <button className="btnR defaultPrimary" onClick={forgetPwdPopup}>
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPwdPopup;
