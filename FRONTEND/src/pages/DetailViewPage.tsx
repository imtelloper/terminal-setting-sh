import React, { useEffect, useState } from 'react';
import '../style/pages/DetailViewPage.scss';
import DangerZonePopup from '../components/DangerZonePopup';
import { IoIosWarning } from 'react-icons/io';

const DetailViewPage = () => {
  const [isOpenState, setIsOpenState] = useState(false);

  const openPopup = () => {
    setIsOpenState(!isOpenState);
  };

  const closePopup = () => {
    setIsOpenState(!isOpenState);
  };

  return (
    <div className="detailViewContainer">
      <div className="leftCon">
        <div className="title">H3 공장 크레인</div>
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
        <div className="realTimeBox">
          <select>
            <option>Group 1</option>
            <option>Group 2</option>
            <option>Group 3</option>
            <option>Group 4</option>
          </select>
          <ul>
            <li>
              <span>Safety Level: </span>
              <span className="green">Green</span>
            </li>
            <li>
              <span>안전펜스 가동시간: </span>
              <span className="bold">32분</span>
            </li>
            <li>
              <span>총 감지수: </span>
              <span className="bold">3</span>
            </li>
            <li>
              <span>영역 재설정</span>
              <button>설정</button>
            </li>
            <li>
              <span>위험구간 설정</span>
              <button onClick={openPopup}>설정</button>
            </li>
          </ul>

          <div className="bottomBtnBox">
            <button>확인</button>
            <button>취소</button>
          </div>
        </div>

        <div className="recordBox">
          <p>
            <span>생성시간: </span>
            <span>2022-05-28 14:10:18</span>
          </p>
          <p>
            <span>가동 시간: </span>
            <span>32분</span>
          </p>
          <p>
            <span>총 감지 수: </span>
            <span>3회</span>
          </p>
          <div className="alertBox">
            <p>
              <span><IoIosWarning /></span>
              <span className="red">Red</span>
              <span>2022-05-28 14:10:18</span>
            </p>
            <p>
              <span><IoIosWarning /></span>
              <span className="red">Red</span>
              <span>2022-05-28 14:10:18</span>
            </p>
            <p>
              <span><IoIosWarning /></span>
              <span className="yellow">Yellow</span>
              <span>2022-05-28 14:10:18</span>
            </p>
          </div>
        </div>
      </div>

      {isOpenState && <DangerZonePopup openPopup={openPopup} closePopup={closePopup}/>}

      <div className="iframeBox">
        <canvas
          className="polygonCanvas"
          typeof="coordinate3"
        />
        <iframe
          title="stream1"
          // src={streamUrl ??"http://127.0.0.1:8000/api/stream/area/"}
          src="http://192.168.0.30:81/"
        />
      </div>
    </div>
  );
};

export default DetailViewPage;
