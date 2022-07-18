import React, { useEffect, useState } from 'react';
import '../style/pages/DetailViewPage.scss';
import '../style/DesignSystem.scss';
import DangerZonePopup from '../components/DangerZonePopup';
import { IoIosWarning } from 'react-icons/io';
import CalibrationPopup from '../components/CalibrationPopup';
import { MdDangerous, MdModeEdit, MdOutlineTaskAlt } from 'react-icons/md';
import { Feedback, Tune } from '@material-ui/icons';

const DetailViewPage = () => {
  const [isOpenDangerZoneState, setIsOpenDangerZoneState] = useState(false);
  const [isOpenCalibrationState, setIsOpenCalibrationState] = useState(false);

  const openDangerZonePopup = () => {
    setIsOpenDangerZoneState(!isOpenDangerZoneState);
  };

  const closeDangerZonePopup = () => {
    setIsOpenDangerZoneState(!isOpenDangerZoneState);
  };

  const openCalibrationPopup = () => {
    setIsOpenCalibrationState(!isOpenCalibrationState);
  };

  const closeCalibrationPopup = () => {
    setIsOpenCalibrationState(!isOpenCalibrationState);
  };

  return (
    <div className="detailViewContainer">
      <div className="detailLeft">
        <div className="leftBox">
          <div className="titleBox">
            <span className="subTitle">Place</span>
            <span className="mainTitle">H1 공장 크레인</span>
          </div>
          <div className="detailTabWrap">
            <div className="detailTabBox">
              <input
                className="menuTab"
                id="menuTab1"
                type="radio"
                name="tabs"
                defaultChecked
              />
              <label className="label1" htmlFor="menuTab1">
                실시간 영상
              </label>
              <input
                className="menuTab"
                id="menuTab2"
                type="radio"
                name="tabs"
              />
              <label className="label2" htmlFor="menuTab2">
                이력조회
              </label>
              <select>
                <option>Group 1</option>
                <option>Group 2</option>
                <option>Group 3</option>
                <option>Group 4</option>
              </select>
              <div className="tabContent realTimeBox">
                <div className="realTimeContent">
                  {/* className : 색상별 green yellow red inactive */}
                  <div className="alarmTxt green">
                    <MdOutlineTaskAlt style={{ fontSize: '32px' }} />
                    <span>안전합니다.</span>
                  </div>

                  {/* <div className="alarmTxt yellow"> */}
                  {/*  <Feedback style={{ fontSize: '32px' }}/> */}
                  {/*  <span>작업자 진입 확인</span> */}
                  {/* </div> */}

                  {/* <div className="alarmTxt red"> */}
                  {/*  <MdDangerous style={{ fontSize: '32px' }} /> */}
                  {/*  <span>작업자 위험 반경 진입</span> */}
                  {/* </div> */}

                  {/* <div className="alarmTxt inactive"> */}
                  {/*  <HighlightOff style={{ fontSize: '32px' }} /> */}
                  {/*  <span>비활성화 되었습니다.</span> */}
                  {/* </div> */}

                  <div className="sensingBox">
                    <span>
                      1차 감지<p>7</p>
                    </span>
                    <span>
                      2차 감지<p>8</p>
                    </span>
                  </div>
                </div>
                <div className="realTimeBox">
                  <span>안전펜스 가동시간</span>
                  <span>1일 19시간 58분</span>
                </div>
              </div>
              <div className="tabContent historyBox">
                <div className="sensingBox">
                  <span>
                    1차 감지<p>7</p>
                  </span>
                  <span>
                    2차 감지<p>8</p>
                  </span>
                </div>
                <div className="historyTimeBox">
                  <div>
                    <span>생성시간</span>
                    <span>
                      2022-05-28<span>14:10:18</span>
                    </span>
                  </div>
                  <div>
                    <span>가동 시간</span>
                    <span>32분</span>
                  </div>
                </div>

                <div className="alertBox">
                  <div className="alertContent">
                    <p>
                      <span>
                        <MdDangerous
                          style={{ fontSize: '20px', color: '#ff530d' }}
                        />
                        <span className="red">RED 2차 감지</span>
                      </span>
                      <span>2022-05-28</span>
                      <span>14:10:18</span>
                    </p>
                    <p>
                      <span>
                        <Feedback
                          style={{ fontSize: '20px', color: '#ffca2b' }}
                        />
                        <span className="yellow">YELLOW 2차 감지</span>
                      </span>
                      <span>2022-05-28</span>
                      <span>14:10:18</span>
                    </p>
                    <p>
                      <span>
                        <Feedback
                          style={{ fontSize: '20px', color: '#ffca2b' }}
                        />
                        <span className="yellow">YELLOW 2차 감지</span>
                      </span>
                      <span>2022-05-28</span>
                      <span>14:10:18</span>
                    </p>
                    <p>
                      <span>
                        <Feedback
                          style={{ fontSize: '20px', color: '#ffca2b' }}
                        />
                        <span className="yellow">YELLOW 2차 감지</span>
                      </span>
                      <span>2022-05-28</span>
                      <span>14:10:18</span>
                    </p>
                    <p>
                      <span>
                        <Feedback
                          style={{ fontSize: '20px', color: '#ffca2b' }}
                        />
                        <span className="yellow">YELLOW 2차 감지</span>
                      </span>
                      <span>2022-05-28</span>
                      <span>14:10:18</span>
                    </p>
                    <p>
                      <span>
                        <Feedback
                          style={{ fontSize: '20px', color: '#ffca2b' }}
                        />
                        <span className="yellow">YELLOW 2차 감지</span>
                      </span>
                      <span>2022-05-28</span>
                      <span>14:10:18</span>
                    </p>
                    <p>
                      <span>
                        <Feedback
                          style={{ fontSize: '20px', color: '#ffca2b' }}
                        />
                        <span className="yellow">YELLOW 2차 감지</span>
                      </span>
                      <span>2022-05-28</span>
                      <span>14:10:18</span>
                    </p>
                    <p>
                      <span>
                        <Feedback
                          style={{ fontSize: '20px', color: '#ffca2b' }}
                        />
                        <span className="yellow">YELLOW 2차 감지</span>
                      </span>
                      <span>2022-05-28</span>
                      <span>14:10:18</span>
                    </p>
                    <p>
                      <span>
                        <Feedback
                          style={{ fontSize: '20px', color: '#ffca2b' }}
                        />
                        <span className="yellow">YELLOW 2차 감지</span>
                      </span>
                      <span>2022-05-28</span>
                      <span>14:10:18</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="settingBtnBox">
              <button>
                <MdModeEdit style={{ fontSize: '38px' }} />
                <span>영역 재설정</span>
              </button>
              <button onClick={openCalibrationPopup}>
                <Tune style={{ fontSize: '38px' }} />
                <span>Calibration 설정</span>
              </button>
              <button onClick={openDangerZonePopup}>
                <MdDangerous style={{ fontSize: '38px' }} />
                <span>위험구간 설정</span>
              </button>
            </div>

            <div className="bottomBtnBox">
              <button className="iconR normal">취소</button>
              <button className="iconR defaultPrimary">확인</button>
            </div>
          </div>

          {isOpenDangerZoneState && (
            <DangerZonePopup
              openDangerZonePopup={openDangerZonePopup}
              closeDangerZonePopup={closeDangerZonePopup}
            />
          )}
          {isOpenCalibrationState && (
            <CalibrationPopup
              openCalibrationPopup={openCalibrationPopup}
              closeCalibrationPopup={closeCalibrationPopup}
            />
          )}
        </div>
      </div>

      <div className="detailRight">
        <div className="rightBox">
          <div className="iframeBox">
            <div className="iframeTitle">CAM2</div>
            <canvas className="polygonCanvas" typeof="coordinate3" />
            <iframe
              title="stream1"
              // src={streamUrl ??"http://127.0.0.1:8000/api/stream/area/"}
              src="http://192.168.0.30:81/"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailViewPage;
