import React from 'react';
import '../style/DesignSystem.scss';
import DangerZonePopup from './DangerZonePopup';

const FindPwdPopup = () => {
  const [isOpenFindPwdPopupState, setIsOpenFindPwdPopupState] = useState(false);

  return (
    <div className="findPwdContainer">
      <div className="findPwdBox">
        <div className="findPwdTitle">
          Password 찾기
        </div>
        <div className="findPwdInputBox">
          <span>E-mail</span>
          <input type="text"/>
        </div>
        <div className="findPwdBottomBtnBox">
          <button className="btnR normalPrimary">취소</button>
          <button className="btnR defaultPrimary">확인</button>
        </div>
      </div>

      {isOpenDangerZoneState && (
        <DangerZonePopup
          setIsOpenDangerZoneState={setIsOpenDangerZoneState}
        />
      )}
    </div>
  );
};

export default FindPwdPopup;
