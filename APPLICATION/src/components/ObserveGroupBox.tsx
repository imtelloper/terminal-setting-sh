import React, { useEffect, useState } from 'react';
import { MdOutlineTaskAlt } from 'react-icons/md';
import { Delete } from '@material-ui/icons';
import Api from '../api/Api';
import { useSWRState } from '../fetcher/useSWRState';
import axios from 'axios';
import useSWR from 'swr';

const ObserveGroupBox = ({
  stateInfo,
  stateIdx,
  groupNum,
  videoFrameState,
  setNewVideoSrcState,
  swrTrackerMutate,
}) => {
  const { data: swrState, mutate: setSwrState } = useSWRState();
  const [loadingState, setLoadingState] = useState(false);
  const observeId = stateInfo?.[groupNum]?._id;

  const swrIntervalMilliSec = 300;

  const observeOneFetcher = (url: string) =>
    axios.get(url).then((res) => res.data);

  const { data: swrObserveOneData, error } = useSWR(
    observeId ? `/api/observe/${observeId}`: null,
    observeOneFetcher,
    { refreshInterval: swrIntervalMilliSec }
  );

  const redCnt = swrObserveOneData?.redCnt;
  const yellowCnt = swrObserveOneData?.yellowCnt;
  const observeSwitch = swrObserveOneData?.observeSwitch;
  const safetyLevel = swrObserveOneData?.safetyLevel;

  useEffect(() => {
    console.log('swrObserveOneData', swrObserveOneData);
    console.log('safetyLevel', safetyLevel);
  }, [swrObserveOneData]);

  const saveParameter = () => {
    console.log('saveParameter');
  };

  const callParameter = () => {
    console.log('callParameter');
  };

  // 그룹 ON | OFF
  const handleActive = (e) => {
    console.log('handleActive');
    const target = e.currentTarget;
    const { value } = target;
    const observeId = target.getAttribute('itemID');
    console.log('value', value);
    console.log('observeId', observeId);
    console.log('value === 확인 하란 말이다 ', value === 'on');
    setTimeout(() => {
      Api.observe
        .modifyOneData(observeId, {
          observeSwitch: value === 'on',
        })
        .then((res) => console.log('Api.observe.modifyOneData done sir', res))
        .catch((err) => console.error(err));
    }, 20);
  };

  // 그룹안 삭제
  const handleDelete = async (e) => {
    setLoadingState(true);
    console.log('handleDelete');
    const target = e.currentTarget;
    const trackerId = target.getAttribute('itemID');
    const groupNum = target.getAttribute('datatype');
    const observeId = target.getAttribute('name');
    console.log('handle delete trackerId', trackerId);
    console.log('handle delete groupNum', groupNum);
    console.log('handle delete observeId', observeId);

    /* 현재 비디오 스테이트 url 기본 url로 변경 */
    const targetIdx = videoFrameState.findIndex(
      (obj) => obj.trackerId === trackerId
    );

    if (videoFrameState[targetIdx]) {
      let { frameSrc } = videoFrameState[targetIdx];
      frameSrc = `${frameSrc.split(':81')[0]}:81`;
      setNewVideoSrcState(targetIdx, frameSrc);
    }

    /* 해당 옵저브 데이터 삭제 */
    await Api.observe
      .deleteOneData(observeId)
      .then((res) => console.log('observe.deleteOneData done sir', res))
      .finally(() => setLoadingState(false))
      .catch((err) => console.error(err));

    /* 감지 데이터 좌표값 초기화 */
    await Api.tracker
      .modifyOneData(trackerId, {
        [`sensingGroup${groupNum}`]: '',
      })
      .then((res) => console.log('tracker.modifyOneData done sir', res))
      .finally(() => setLoadingState(false))
      .catch((err) => console.error(err));

    await Api.stream.initGroupSensingCnt(swrState.curCamIp, groupNum);
    swrTrackerMutate();
  };

  // 그룹안 상태 리셋
  const handleErrorReset = () => {
    console.log('handleErrorReset');
  };

  useEffect(() => {
    console.log('stateInfo', stateInfo);
    console.log('observeId', observeId);
  }, [stateInfo]);

  return (
    <div className="observeCamInfoContainer">
      <div className="observeBox">
        <div className="groupBox">
          <span className="groupName">{`Group${groupNum}`}</span>
          <div className="switchToggle">
            <input
              datatype="messageSwitch"
              type="radio"
              id={`toggleOnRadio${stateIdx}`}
              name="messageRadio"
              value="on"
              onChange={handleActive}
              itemID={observeId}
            />
            <label htmlFor={`toggleOnRadio${stateIdx}`}>ON</label>
            <input
              datatype="messageSwitch"
              type="radio"
              id={`toggleOffRadio${stateIdx}`}
              name="messageRadio"
              value="off"
              onChange={handleActive}
              itemID={observeId}
            />
            <label htmlFor={`toggleOffRadio${stateIdx}`}>OFF</label>
            <span
              className={`move ${stateInfo?.[groupNum]?.camPort}ObserveSwitch${groupNum}`}
            />
          </div>
        </div>
        <div className="btnBox">
          {/* className : 색상별 green yellow red inactive */}
          <div className={`alarmTxt ${safetyLevel?.toLowerCase()}`}>
            <MdOutlineTaskAlt style={{ fontSize: '32px' }} />
            {/* 작업자 진입 확인 / 작업자 위험 반경 진입 / 비활성화 되었습니다. */}
            <span>
              {safetyLevel === 'Green'
                ? '안전합니다.'
                : safetyLevel === 'Yellow'
                ? '작업자 진입 확인'
                : '작업자 위험 반경 진입'}
            </span>
          </div>

          <div className="sensingBox">
            <span>
              1차 감지<p>{yellowCnt}</p>
            </span>
            <span>
              2차 감지<p>{redCnt}</p>
            </span>
          </div>
        </div>
        <div className="safetyBtnBox">
          <div>
            <button
              className="btnR normalPrimary"
              onClick={saveParameter}
              datatype={stateInfo?.[groupNum]?.trackerId}
            >
              저장
            </button>
            <button className="btnR normalPrimary" onClick={callParameter}>
              불러오기
            </button>
            <button className="btnR normalPrimary" onClick={handleErrorReset}>
              상태 리셋
            </button>

            {/* {(() => { */}
            {/* console.log('🌞stateInfo', stateInfo); */}
            {/* console.log('🌝groupNum', groupNum); */}
            {/* console.log('🌝🌝stateInfo?.[groupNum', stateInfo?.[groupNum]); */}
            {/* console.log( */}
            {/*   '🌝🌝🌝stateInfo?.[groupNum]?.trackerId', */}
            {/*   stateInfo?.[groupNum]?.trackerId */}
            {/* ); */}
            {/* })()} */}

            {/* 그룹 삭제 버튼 */}
            <button
              className="btnR normalPrimary"
              onClick={handleDelete}
              itemID={stateInfo?.[groupNum]?.trackerId}
              name={observeId}
              datatype={groupNum}
            >
              <Delete />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObserveGroupBox;
