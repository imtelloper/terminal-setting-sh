import React, { useState, useEffect, useRef } from 'react';
import '../style/components/DangerZonePopup.scss';
// import dangerZoneImg from '../images/dangerImg.png';
// import { MdDesignServices } from 'react-icons/md';
// import { Undo } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import CalibrationPopup from './CalibrationPopup';
import Api from '../api/Api';
import { useSWRState } from '../fetcher/useSWRState';

const DangerZonePopup = ({ setIsOpenDangerZoneState }) => {
  const navigate = useNavigate();
  const { data: swrState, mutate: setSwrState } = useSWRState();
  const [yellowTextState, setYellowTextState] = useState('');
  const [greenTextState, setGreenTextState] = useState('');
  const inputGreenRef = useRef(null);
  const inputYellowRef = useRef(null);

  const handleYellowText = (e) => {
    setYellowTextState(e.currentTarget.value);
  };

  const handleGreenText = (e) => {
    setGreenTextState(e.currentTarget.value);
  };

  useEffect(() => {
    const focusElement = document.activeElement.id;
    console.log('focusElement', focusElement);
  }, [document.activeElement.id]);

  useEffect(() => {
    // input박스에 숫자 입력시 input버튼 및 확인버튼 활성화
    const checkBtnEl = document.querySelector('.checkBtn');
    yellowTextState.length > 0 && greenTextState.length > 0
      ? checkBtnEl?.classList.add('btnActive')
      : checkBtnEl?.classList.remove('btnActive');
  }, [yellowTextState, greenTextState]);

  const yellowGreenZoneActive = (color, isActive) => {
    const inputEl = document.querySelector(`.${color}Input`);
    const zoneImgEl = document.querySelector('.dangerZoneImg');
    if (isActive) {
      inputEl?.classList.add('btnBoxActive');
      zoneImgEl?.classList.add(`${color}ZoneImg`);
    } else {
      inputEl?.classList.remove('btnBoxActive');
      zoneImgEl?.classList.remove(`${color}ZoneImg`);
    }
  };

  /* INIT EFFECT */
  useEffect(() => {
    inputGreenRef.current && inputGreenRef.current.focus();
    yellowGreenZoneActive('green', true);
  }, []);

  const handleUpdateBaseLine = () => {
    Api.tracker
      .modifyOneData(swrState.curTrackerId, {
        dangerLine: `${yellowTextState}&${greenTextState}`,
      })
      .finally(() => {
        setIsOpenDangerZoneState(false);
      })
      .catch((err) => console.error(err));
  };

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
                    datatype="dangerZone"
                    onClick={() => setIsOpenDangerZoneState(false)}
                  >
                    CALIBRATION 세팅 필요
                  </button>
                </div>
                <div className="rightCon">
                  <span>Green Zone</span>
                  <input
                    id="greenNumInput"
                    className="greenInput"
                    type="text"
                    placeholder="00.0"
                    onChange={handleGreenText}
                    value={greenTextState}
                    ref={inputGreenRef}
                    onClick={() => {
                      yellowGreenZoneActive('green', true);
                      yellowGreenZoneActive('yellow', false);
                    }}
                  />
                  <label htmlFor="greenNumInput" className="numLabel">
                    m
                  </label>
                </div>
                <div className="rightCon">
                  <span>Yellow Zone</span>
                  <input
                    id="yellowNumInput"
                    className="yellowInput"
                    type="text"
                    placeholder="00.0"
                    onChange={handleYellowText}
                    value={yellowTextState}
                    ref={inputYellowRef}
                    onClick={() => {
                      yellowGreenZoneActive('yellow', true);
                      yellowGreenZoneActive('green', false);
                    }}
                  />
                  <label htmlFor="yellowNumInput" className="numLabel">
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
                  datatype="dangerZone"
                  onClick={() => setIsOpenDangerZoneState(false)}
                >
                  취소
                </button>
                <button className="checkBtn" onClick={handleUpdateBaseLine}>
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DangerZonePopup;
