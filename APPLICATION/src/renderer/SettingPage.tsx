import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiClock } from 'react-icons/fi';
import { IoIosHelpCircleOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useSWRState } from '../fetcher/useSWRState';
import '../style/SettingPage.scss';
import { Simulate } from 'react-dom/test-utils';
import input = Simulate.input;

const Setting = () => {
  const navigate = useNavigate();
  const { data: swrState, mutate: setSwrState } = useSWRState();
  const [inputState, setInputState] = useState(swrState?.addTempDelay);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputState(parseInt(value));
  };

  const handleInputCreate = () => {
    setSwrState({
      ...swrState,
      addTempDelay:inputState,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleInputCreate();
      console.log('Setting inputState', inputState);
      console.log('Setting typeof inputState', typeof inputState);
      console.log('Setting 변경 성공!!!!!!!!!!!!!!!!!!');
    }
  };

  // @ts-ignore
  return (
    <div className="setting">
      <div className="backPage">
        <FiArrowLeft
          size="40px"
          onClick={() => {
            navigate('/main');
          }}
        />
        <span>Settings</span>
        <div
          className="helpCircle"
          data-tooltip="DB에서 데이터를 가져오는 시간을 설정할 수 있습니다."
        >
          <IoIosHelpCircleOutline size="30px" />
        </div>
      </div>

      <div className="inputContainer">
        <div className="settingTimeInputBox">
          <div className="settingTime">
            <FiClock size="20px" />
          </div>
          <p data-tooltip="입력창에 사용자가 원하는 시간을(ms) 입력하고 Enter키를 누르면 시간이 적용됩니다.">
            User Setup Data Import Time
          </p>
        </div>

        <div className="settingTimeInputBox">
          <input
            type="number"
            value={inputState && Number(inputState)}
            onKeyPress={handleKeyPress}
            onChange={handleInputChange}
            placeholder="Please enter a number"
          />
          <div className="resetButton" onClick={handleInputCreate}>
            Set Time
          </div>
          <div
            className="resetButton"
            onClick={handleInputCreate}
            data-tooltip="시간을 다시 설정하고 싶을 때 누릅니다. 입력창이 Reset 되는 버튼입니다."
          >
            Reset
          </div>
        </div>
        <div
          className="dataTimeInfo"
          data-tooltip={`현재 설정 되어있는 시간은 ${Number(
            swrState?.addTempDelay
          )}(ms)입니다.`}
        >
          The currently setup data import time is{' '}
          {swrState?.addTempDelay ? Number(swrState?.addTempDelay) : 0} ms.
        </div>
      </div>
    </div>
  );
};

export default Setting;
