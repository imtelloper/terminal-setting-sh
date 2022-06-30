import React, { useEffect, useMemo, useState } from 'react';
import '../style/pages/SettingPage.scss';
import { AiFillFolderOpen, AiFillSetting, AiFillTool } from 'react-icons/ai';
import { GoDeviceCameraVideo, GoGraph, GoRocket } from 'react-icons/go';
import Api from '../api/Api';
import { camPort1Ip, camPort2Ip, camPort3Ip, camPort4Ip } from './ObservePage';

const SettingPage = () => {
  const [toggleState, setToggleState] = useState({
    alarmState: false,
    messageState: false,
    kakaoAlarmState: false,
  });

  // toolBtn 클릭 색상 변경
  const [currentClick, setCurrentClick] = useState(null);
  const [prevClick, setPrevClick] = useState(null);
  const [urlState, setUrlState] = useState([]);
  const [videoSrcState, setVideoSrcState] = useState([]);
  const [captureSrcState, setCaptureSrcState] = useState('');
  const getClick = (e) => {
    setCurrentClick(e.target.id);
    console.log(e.target.id);
  };

  useEffect(() => {
    Api.archive
      .findData({ fileType: 'video' })
      .then((videoRes) => {
        const urlData = [];
        videoRes.forEach((data, idx) => {
          Api.tracker.getOneData(data.trackerId).then((res) => {
            switch (res.camPort) {
              case 'cam1':
                urlData.push(
                  `http://${camPort1Ip}:81/${data.path
                    .split('/')
                    .slice(5)
                    .join('/')}`
                );
                break;
              case 'cam2':
                urlData.push(
                  `http://${camPort2Ip}:81/${data.path
                    .split('/')
                    .slice(5)
                    .join('/')}`
                );
                break;
              case 'cam3':
                urlData.push(
                  `http://${camPort3Ip}:81/${data.path
                    .split('/')
                    .slice(5)
                    .join('/')}`
                );
                break;
              case 'cam4':
                urlData.push(
                  `http://${camPort4Ip}:81/${data.path
                    .split('/')
                    .slice(5)
                    .join('/')}`
                );
                break;
              default:
                console.log('default');
            }
            videoRes.length === idx + 1 && setVideoSrcState(urlData);
          });
        });
      })
      .catch((error) => console.error(error));

    Api.archive
      .findData({ fileType: 'img' })
      .then((archiveRes) => {
        console.log('img archiveRes', archiveRes);
        const urlData = [];
        archiveRes.forEach((data, idx) => {
          Api.tracker.getOneData(data.trackerId).then((res) => {
            switch (res.camPort) {
              case 'cam1':
                urlData.push(
                  `http://${camPort1Ip}:81/${data.path
                    .split('/')
                    .slice(5)
                    .join('/')}`
                );
                break;
              case 'cam2':
                urlData.push(
                  `http://${camPort2Ip}:81/${data.path
                    .split('/')
                    .slice(5)
                    .join('/')}`
                );
                break;
              case 'cam3':
                urlData.push(
                  `http://${camPort3Ip}:81/${data.path
                    .split('/')
                    .slice(5)
                    .join('/')}`
                );
                break;
              case 'cam4':
                urlData.push(
                  `http://${camPort4Ip}:81/${data.path
                    .split('/')
                    .slice(5)
                    .join('/')}`
                );
                break;
              default:
                console.log('default');
            }
            console.log('2urlData', urlData);
            archiveRes.length === idx + 1 && setUrlState(urlData);
          });
        });
      })
      .catch((error) => console.error(error));

    if (currentClick !== null) {
      const current = document.getElementById(currentClick);
      current.style.fontWeight = 'bold';
    }

    if (prevClick !== null) {
      const prev = document.getElementById(prevClick);
      prev.style.fontWeight = 'lighter';
    }
    setPrevClick(currentClick);
  }, [currentClick]);

  // on, off 버튼
  const toggleClick = (e) => {
    const target = e.currentTarget;
    const dType = target.getAttribute('datatype');
    setToggleState({
      ...toggleState,
      [dType]: !toggleState[dType],
    });
  };

  const setCaptureImg = (e) => {
    const target = e.currentTarget;
    const dType = target.getAttribute('datatype');
    setCaptureSrcState(dType);
  };

  const urlStateMap = useMemo(() => {
    return urlState.map((src, idx) => (
      // <img src={src} alt="" width={100} height={80} key={idx}/>
      <div datatype={src} onClick={setCaptureImg}>
        {src}
      </div>
    ));
  }, [urlState]);

  return (
    <div className="settingMain">
      <p className="settingTitle">
        <AiFillSetting />
        <span>Settings</span>
      </p>
      <input
        className="tabInput"
        id="tab1"
        type="radio"
        name="tabs"
        defaultChecked
      />
      <label htmlFor="tab1">Cam1</label>

      <input className="tabInput" id="tab2" type="radio" name="tabs" />
      <label htmlFor="tab2">Cam2</label>

      <input className="tabInput" id="tab3" type="radio" name="tabs" />
      <label htmlFor="tab3">Cam3</label>

      <input className="tabInput" id="tab4" type="radio" name="tabs" />
      <label htmlFor="tab4">Cam4</label>

      <section id="content1">
        <p>
          <AiFillFolderOpen />
          <span>저장폴더 :</span>
          <input />
          <button>선택</button>
        </p>
        <p>
          <GoDeviceCameraVideo />
          <span>카메라 이름 :</span>
          <input placeholder="Cam1" />
          <button>적용</button>
        </p>
        <div className="bottomCon">
          <div>
            <p>
              <AiFillTool />
              <span>연산장치 :</span>
              <div className="toolBtnBox">
                <input
                  className="toolTab"
                  id="toolTab1"
                  type="radio"
                  name="toolTabs"
                />
                <label htmlFor="toolTab1">GPU</label>
                <div />
                <input
                  className="toolTab"
                  id="toolTab2"
                  type="radio"
                  name="toolTabs"
                />
                <label htmlFor="toolTab2">CPU</label>
              </div>
            </p>
            <p>
              <GoRocket />
              <span>감지모델 :</span>
              <select>
                <option>Small</option>
                <option>Big</option>
              </select>
              <button>선택</button>
            </p>
            <p>
              <GoGraph />
              <span>Threshold :</span>
              <select>
                <option>50</option>
                <option>70</option>
                <option>100</option>
              </select>
              <button>선택</button>
            </p>
          </div>
          <div>
            <p>
              <span>알람 이미지 저장:</span>
              <button
                className="switch"
                datatype="alarmState"
                onClick={toggleClick}
              >
                {toggleState.alarmState ? 'OFF' : 'ON'}
              </button>
            </p>
            <p>
              <span>문자 알람:</span>
              <button
                className="switch"
                datatype="messageState"
                onClick={toggleClick}
              >
                {toggleState.messageState ? 'OFF' : 'ON'}
              </button>
            </p>
            <p>
              <span>카카오톡 알림:</span>
              <button
                className="switch"
                datatype="kakaoAlarmState"
                onClick={toggleClick}
              >
                {toggleState.kakaoAlarmState ? 'OFF' : 'ON'}
              </button>
            </p>
          </div>
        </div>
      </section>
      <section id="content2">
        <p>
          <AiFillFolderOpen />
          <span>저장폴더 :</span>
          <input />
          <button>선택</button>
        </p>
        <p>
          <GoDeviceCameraVideo />
          <span>카메라 이름 :</span>
          <input placeholder="Cam2" />
          <button>적용</button>
        </p>
        <div className="bottomCon">
          <div>
            <p>
              <AiFillTool />
              <span>연산장치 :</span>
              <div className="toolBtnBox">
                <input id="toolTab3" type="radio" name="toolTabs" />
                <label htmlFor="toolTab3">GPU</label>
                <div />
                <input id="toolTab4" type="radio" name="toolTabs" />
                <label htmlFor="toolTab4">CPU</label>
              </div>
            </p>
            <p>
              <GoRocket />
              <span>감지모델 :</span>
              <select>
                <option>Small</option>
                <option>Big</option>
              </select>
              <button>선택</button>
            </p>
            <p>
              <GoGraph />
              <span>Threshold :</span>
              <select>
                <option>50</option>
                <option>70</option>
                <option>100</option>
              </select>
              <button>선택</button>
            </p>
          </div>
          <div>
            <p>
              <span>알람 이미지 저장:</span>
              <button className="on">ON</button>
              <button className="off">OFF</button>
            </p>
            <p>
              <span>문자 알람:</span>
              <button className="on">ON</button>
              <button className="off">OFF</button>
            </p>
            <p>
              <span>카카오톡 알림:</span>
              <button className="on">ON</button>
              <button className="off">OFF</button>
            </p>
          </div>
        </div>
      </section>
      <section id="content3">
        <p>
          <AiFillFolderOpen />
          <span>저장폴더 :</span>
          <input />
          <button>선택</button>
        </p>
        <p>
          <GoDeviceCameraVideo />
          <span>카메라 이름 :</span>
          <input placeholder="Cam3" />
          <button>적용</button>
        </p>
        <div className="bottomCon">
          <div>
            <p>
              <AiFillTool />
              <span>연산장치 :</span>
              <div className="toolBtnBox">
                <input id="toolTab5" type="radio" name="toolTabs" />
                <label htmlFor="toolTab5">GPU</label>
                <div />
                <input id="toolTab6" type="radio" name="toolTabs" />
                <label htmlFor="toolTab6">CPU</label>
              </div>
            </p>
            <p>
              <GoRocket />
              <span>감지모델 :</span>
              <select>
                <option>Small</option>
                <option>Big</option>
              </select>
              <button>선택</button>
            </p>
            <p>
              <GoGraph />
              <span>Threshold :</span>
              <select>
                <option>50</option>
                <option>70</option>
                <option>100</option>
              </select>
              <button>선택</button>
            </p>
          </div>
          <div>
            <p>
              <span>알람 이미지 저장:</span>
              <button className="on">ON</button>
              <button className="off">OFF</button>
            </p>
            <p>
              <span>문자 알람:</span>
              <button className="on">ON</button>
              <button className="off">OFF</button>
            </p>
            <p>
              <span>카카오톡 알림:</span>
              <button className="on">ON</button>
              <button className="off">OFF</button>
            </p>
          </div>
        </div>
      </section>
      <section id="content4">
        <p>
          <AiFillFolderOpen />
          <span>저장폴더 :</span>
          <input />
          <button>선택</button>
        </p>
        <p>
          <GoDeviceCameraVideo />
          <span>카메라 이름 :</span>
          <input placeholder="Cam4" />
          <button>적용</button>
        </p>
        <div className="bottomCon">
          <div>
            <p>
              <AiFillTool />
              <span>연산장치 :</span>
              <div className="toolBtnBox">
                <input id="toolTab7" type="radio" name="toolTabs" />
                <label htmlFor="toolTab7">GPU</label>
                <div />
                <input id="toolTab8" type="radio" name="toolTabs" />
                <label htmlFor="toolTab8">CPU</label>
              </div>
            </p>
            <p>
              <GoRocket />
              <span>감지모델 :</span>
              <select>
                <option>Small</option>
                <option>Big</option>
              </select>
              <button>선택</button>
            </p>
            <p>
              <GoGraph />
              <span>Threshold :</span>
              <select>
                <option>50</option>
                <option>70</option>
                <option>100</option>
              </select>
              <button>선택</button>
            </p>
          </div>
          <div>
            <p>
              <span>알람 이미지 저장:</span>
              <button className="on">ON</button>
              <button className="off">OFF</button>
            </p>
            <p>
              <span>문자 알람:</span>
              <button className="on">ON</button>
              <button className="off">OFF</button>
            </p>
            <p>
              <span>카카오톡 알림:</span>
              <button className="on">ON</button>
              <button className="off">OFF</button>
            </p>
          </div>
        </div>
      </section>
      <img src={captureSrcState} alt="" width={512} height={384} />
      <div className="urlStateMap">
        {urlStateMap}
      </div>
      <div className="urlStateMap">
        {videoSrcState.map(src => (<div>{src}</div>))}
      </div>

    </div>
  );
};

export default SettingPage;
