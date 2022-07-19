import React, { useState, useEffect } from 'react';
import '../style/components/DangerZonePopup.scss';
import dangerZoneImg from '../images/dangerImg.png';
import { MdDesignServices } from 'react-icons/md';
import { Undo } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import CalibrationPopup from './CalibrationPopup';

const dangerZonePopup = ({ closeDangerZonePopup }) => {
  const navigate = useNavigate();
  const [isOpenCalibrationState, setIsOpenCalibrationState] = useState(false);
  const [yellowTextState, setYellowTextState] = useState('');
  const [greenTextState, setGreenTextState] = useState('');

  const openCalibrationPopup = () => {
    setIsOpenCalibrationState(!isOpenCalibrationState);
  };

  const closeCalibrationPopup = () => {
    setIsOpenCalibrationState(!isOpenCalibrationState);
  };

  const handleYellowText = (e) => {
    setYellowTextState(e.currentTarget.value);
  };

  const handleGreenText = (e) => {
    setGreenTextState(e.currentTarget.value);
  };

  // input박스에 숫자 입력시 input버튼 및 확인버튼 활성화
  const yellowInputEl = document.querySelector('.yellowInput');
  const greenInputEl = document.querySelector('.greenInput');
  const checkBtnEl = document.querySelector('.checkBtn');
  const zoneImgEl = document.querySelector('.dangerZoneImg');

  if (yellowTextState.length > 0) {
    yellowInputEl?.classList.add('btnBoxActive');
    zoneImgEl?.classList.add('yellowZoneImg');
  } else {
    yellowInputEl?.classList.remove('btnBoxActive');
    zoneImgEl?.classList.remove('yellowZoneImg');
  }

  if (greenTextState.length > 0) {
    greenInputEl?.classList.add('btnBoxActive');
    zoneImgEl?.classList.add('greenZoneImg');
  } else {
    greenInputEl?.classList.remove('btnBoxActive');
    zoneImgEl?.classList.remove('greenZoneImg');
  }


  yellowTextState.length > 0 && greenTextState.length > 0
    ? checkBtnEl?.classList.add('btnActive')
    : checkBtnEl?.classList.remove('btnActive');

  return (
    <>
      <div className="dangerZoneContainer">
        <div className="dangerBox">
          <div className="dangerTitle">위험구간 설정</div>
          <div className="contentBox">
            <div className="contentBoxTop">
              <div className="left">
                <div className="dangerZoneImg" />
              </div>
              <div className="right">
                <div className="rightCon">
                  <span>Calibration</span>
                  <button
                    className="settingAlarm"
                    onClick={openCalibrationPopup}
                  >
                    CALIBRATION 세팅 필요
                  </button>
                </div>
                <div className="rightCon">
                  <span>Green Zone</span>
                  <input
                    id="numInput"
                    className="greenInput"
                    type="text"
                    placeholder="00.0"
                    onChange={handleGreenText}
                    value={greenTextState}
                  />
                  <label htmlFor="numInput" className="numLabel">
                    m
                  </label>
                </div>
                <div className="rightCon">
                  <span>Yellow Zone</span>
                  <input
                    id="numInput"
                    className="yellowInput"
                    type="text"
                    placeholder="00.0"
                    onChange={handleYellowText}
                    value={yellowTextState}
                  />
                  <label htmlFor="numInput" className="numLabel">
                    m
                  </label>
                </div>
              </div>
            </div>
            <div className="contentBoxBottom">
              <div className="txtBox">
                <span>1. Calibration 설정이 먼저 되어 있어야 합니다.</span>
                <span>
                  2. Calibration 설정을 기준으로 Yellow Zone과 Green Zone의
                  반경범위를 설정합니다.
                </span>
              </div>
              <div className="bottomBtnBox">
                <button
                  className="btnR normalPrimary"
                  onClick={closeDangerZonePopup}
                >
                  취소
                </button>
                <button className="checkBtn">확인</button>
              </div>
            </div>
          </div>
          {isOpenCalibrationState && (
            <CalibrationPopup
              openCalibrationPopup={openCalibrationPopup}
              closeCalibrationPopup={closeCalibrationPopup}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default dangerZonePopup;
