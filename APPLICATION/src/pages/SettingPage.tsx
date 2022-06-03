import React from 'react';
import '../style/pages/SettingPage.scss';
import { AiFillFolderOpen, AiFillSetting, AiFillTool } from 'react-icons/ai';
import NavBar from '../components/NavBar';
import { GoDeviceCameraVideo, GoGraph, GoRocket } from 'react-icons/go';

const SettingPage = () => {
  return (
    <div className="settingMain">
      <NavBar />
      <p className="settingTitle">
        <AiFillSetting />
        Settings
      </p>
      <input className="tabInput" id="tab1" type="radio" name="tabs" />
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
        <p>
          <AiFillTool />
          <span>연산장치 :</span>
          <select>
            <option>GPU</option>
            <option>CPU</option>
          </select>
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
        <p>
          <AiFillTool />
          <span>연산장치 :</span>
          <select>
            <option>GPU</option>
            <option>CPU</option>
          </select>
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
        <p>
          <AiFillTool />
          <span>연산장치 :</span>
          <select>
            <option>GPU</option>
            <option>CPU</option>
          </select>
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
        <p>
          <AiFillTool />
          <span>연산장치 :</span>
          <select>
            <option>GPU</option>
            <option>CPU</option>
          </select>
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
      </section>
    </div>
  );
};

export default SettingPage;
