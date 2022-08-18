import React, { useState, useEffect } from 'react';
import '../style/pages/AllListCheck.scss';
import {
  CalendarToday,
  Delete,
  Image,
  ViewHeadline,
  ViewList,
} from '@material-ui/icons';
import { MdDownload, MdGridView, MdWorkspaces } from 'react-icons/md';
import VideoPopup from '../components/VideoPopup';
import AlarmPopup from '../components/AlarmPopup';
import { useNavigate } from 'react-router-dom';
import NewCamRegisterPopup from '../components/NewCamRegisterPopup';

const AllListCheckPage = () => {
  const navigation = useNavigate();
  const [isNewCamRegisterPopupOpenState, setIsNewCamRegisterPopupOpenState] =
    useState(false);

  const handleActive = (e) => {
    const target = e.currentTarget;
    target.classList.toggle('switchBtnActive');
  };

  const newCamRegisterPopup = () => {
    setIsNewCamRegisterPopupOpenState(!isNewCamRegisterPopupOpenState);
  };

  const dataLists = [
    {
      camGroup: 'H1 공장 크레인',
      camNum: 1,
      camName: 'H1 공장 크레인 기둥 옆',
      ip: '192.168.02',
      arithmetic: 'CPU',
      sensing: 'Small',
      threshold: '70',
      saveFolder: 'C:/Users/Download/Folder',
      alarmImgSave: 'ON',
      messageAlarm: 'OFF',
      kakaoAlarm: 'ON',
    },
    {
      camGroup: 'H1 공장 크레인',
      camNum: 1,
      camName: 'H1 공장 크레인 기둥 옆',
      ip: '192.168.02',
      arithmetic: 'CPU',
      sensing: 'Small',
      threshold: '70',
      saveFolder: 'C:/Users/Download/Folder',
      alarmImgSave: 'ON',
      messageAlarm: 'OFF',
      kakaoAlarm: 'ON',
    },
    {
      camGroup: 'H1 공장 크레인',
      camNum: 1,
      camName: 'H1 공장 크레인 기둥 옆',
      ip: '192.168.02',
      arithmetic: 'CPU',
      sensing: 'Small',
      threshold: '70',
      saveFolder: 'C:/Users/Download/Folder',
      alarmImgSave: 'ON',
      messageAlarm: 'OFF',
      kakaoAlarm: 'ON',
    },
    {
      camGroup: 'H1 공장 크레인',
      camNum: 1,
      camName: 'H1 공장 크레인 기둥 옆',
      ip: '192.168.02',
      arithmetic: 'CPU',
      sensing: 'Small',
      threshold: '70',
      saveFolder: 'C:/Users/Download/Folder',
      alarmImgSave: 'ON',
      messageAlarm: 'OFF',
      kakaoAlarm: 'ON',
    },
    {
      camGroup: 'H1 공장 크레인',
      camNum: 1,
      camName: 'H1 공장 크레인 기둥 옆',
      ip: '192.168.02',
      arithmetic: 'CPU',
      sensing: 'Small',
      threshold: '70',
      saveFolder: 'C:/Users/Download/Folder',
      alarmImgSave: 'ON',
      messageAlarm: 'OFF',
      kakaoAlarm: 'ON',
    },
    {
      camGroup: 'H1 공장 크레인',
      camNum: 1,
      camName: 'H1 공장 크레인 기둥 옆',
      ip: '192.168.02',
      arithmetic: 'CPU',
      sensing: 'Small',
      threshold: '70',
      saveFolder: 'C:/Users/Download/Folder',
      alarmImgSave: 'ON',
      messageAlarm: 'OFF',
      kakaoAlarm: 'ON',
    },
    {
      camGroup: 'H1 공장 크레인',
      camNum: 1,
      camName: 'H1 공장 크레인 기둥 옆',
      ip: '192.168.02',
      arithmetic: 'CPU',
      sensing: 'Small',
      threshold: '70',
      saveFolder: 'C:/Users/Download/Folder',
      alarmImgSave: 'ON',
      messageAlarm: 'OFF',
      kakaoAlarm: 'ON',
    },
    {
      camGroup: 'H1 공장 크레인',
      camNum: 1,
      camName: 'H1 공장 크레인 기둥 옆',
      ip: '192.168.02',
      arithmetic: 'CPU',
      sensing: 'Small',
      threshold: '70',
      saveFolder: 'C:/Users/Download/Folder',
      alarmImgSave: 'ON',
      messageAlarm: 'OFF',
      kakaoAlarm: 'ON',
    },
    {
      camGroup: 'H1 공장 크레인',
      camNum: 1,
      camName: 'H1 공장 크레인 기둥 옆',
      ip: '192.168.02',
      arithmetic: 'CPU',
      sensing: 'Small',
      threshold: '70',
      saveFolder: 'C:/Users/Download/Folder',
      alarmImgSave: 'ON',
      messageAlarm: 'OFF',
      kakaoAlarm: 'ON',
    },
  ];

  return (
    <div className="allListCheckWrap">
      <div className="allListCheckContainer">
        <div className="allListCheckTitleBox">
          <div className="allListCheckTitle">
            전체 CAM 리스트 확인
          </div>
          <div className="allListCheckTitleCon">
            <div className="allListCheckLeft">
              <div className="allListCheckLeftCon">
                <MdWorkspaces style={{ fontSize: '24px' }} />
                <span>캠 그룹 선택</span>
                <select className="nameSelect">
                  <option>모두</option>
                  {/* <option>H2 공장 크레인</option> */}
                </select>
              </div>
              <div className="allListCheckLeftCon">
                <select className="arraySelect">
                  <option>새로운 순</option>
                  <option>오래된 순</option>
                </select>
              </div>
            </div>
            <div className="allListCheckRight">
              <button className="btnR normalPrimary">
                <Delete style={{ fontSize: '24px' }} />
              </button>
              <button className="btnR normalPrimary">
                <span className="txt" onClick={newCamRegisterPopup}>새 카메라 등록</span>
              </button>
            </div>
          </div>
        </div>

        <div className="allListCheckConWrap listView">
          <div className="allListCheckContent">
            <ul className="allListCheckBox">
              <li className="allListCheckInput">
                <input type="checkbox" name="checkInput" />
              </li>
              <li>캠그룹</li>
              <li>캠번호</li>
              <li>캠이름</li>
              <li>캠 IP</li>
              <li>연산장치 선택</li>
              <li>감지모델 선택</li>
              <li>THRESHOLD</li>
              <li>저장 폴더</li>
              <li>알람 이미지 저장</li>
              <li>문자 알림</li>
              <li>카카오톡 알림</li>
            </ul>
            {dataLists.map((list, idx) => (
              <ul className="allListCheckBox" key={idx}>
                <li className="allListCheckInput">
                  <input
                    type="checkbox"
                    name="checkInput"
                    className="allListCheckList"
                  />
                </li>
                <li>{list.camGroup}</li>
                <li>CAM{list.camNum}</li>
                <li>{list.camName}</li>
                <li>{list.ip}</li>
                <li>{list.arithmetic}</li>
                <li>{list.sensing}</li>
                <li>{list.threshold}</li>
                <li>{`${list.saveFolder.slice(0, 17)}...`}</li>
                <li className="allListAlarmImgSave allListSwitchBtn">
                  {/* 버튼 ON 상태일 때 switchBtnActive 추가 */}
                  <button className="switchBtnActive" onClick={handleActive}>
                    ON
                  </button>
                </li>
                <li className="allListMessageAlarm allListSwitchBtn">
                  <button onClick={handleActive}>OFF</button>
                </li>
                <li className="allListKakaoAlarm allListSwitchBtn">
                  <button onClick={handleActive}>OFF</button>
                </li>
              </ul>
            ))}
          </div>
        </div>
        {isNewCamRegisterPopupOpenState && (
          <NewCamRegisterPopup
            setIsNewCamRegisterPopupOpenState={
              setIsNewCamRegisterPopupOpenState
            }
          />
        )}
        {/* {isOpenPopupState && <VideoPopup openVideoPopup={openVideoPopup} />} */}
        {/* {alarmPopupState && <AlarmPopup openAlarmPopup={openAlarmPopup} />} */}
      </div>
    </div>
  );
};

export default AllListCheckPage;
