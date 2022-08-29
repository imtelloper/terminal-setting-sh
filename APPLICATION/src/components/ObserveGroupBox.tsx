import React, { useEffect, useState } from 'react';
import { MdDangerous, MdOutlineTaskAlt } from 'react-icons/md';
import { Delete, Feedback } from '@material-ui/icons';
import Api from '../api/Api';
import { useSWRState } from '../fetcher/useSWRState';
import axios from 'axios';
import useSWR from 'swr';
import Loading from './Loading';

const ObserveGroupBox = ({
  stateInfo,
  stateIdx,
  groupNum,
  videoFrameState,
  setNewVideoSrcState,
  swrTrackerMutate,
}) => {
  const { data: swrState, mutate: setSwrState } = useSWRState();
  const [loadingState, setLoadingState] = useState({
    delete: false,
    stateReset: false,
  });
  const observeId = stateInfo?.[groupNum]?._id;

  const swrIntervalMilliSec = 300;

  const observeOneFetcher = (url: string) =>
    axios.get(url).then((res) => res.data);

  const { data: swrObserveOneData, error } = useSWR(
    observeId ? `/api/observe/${observeId}` : null,
    observeOneFetcher,
    { refreshInterval: swrIntervalMilliSec }
  );

  const redCnt = swrObserveOneData?.redCnt;
  const yellowCnt = swrObserveOneData?.yellowCnt;
  const observeSwitch = swrObserveOneData?.observeSwitch;
  const safetyLevel = swrObserveOneData?.safetyLevel;

  useEffect(() => {
    // console.log('❤️swrState',swrState);
    // console.log('swrObserveOneData', swrObserveOneData);
    // console.log('safetyLevel', safetyLevel);
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
    setLoadingState({ ...loadingState, delete: true });

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

    const targetState = videoFrameState[targetIdx];

    /*
    현재는 group2가 있는데도 불구하고 1을 삭제하면 에러가남.
    추후에 개별적 삭제 가능하도록 수정 필요
    */
    if (groupNum === '1' && targetState.secondCanvas.visible === true) {
      alert('Group2부터 삭제해주세요.');
      return;
    }

    if (targetState) {
      let { frameSrc } = targetState;
      frameSrc = `${frameSrc.split(':81')[0]}:81`;
      setNewVideoSrcState(targetIdx, frameSrc);
    }
    console.log('targetState', targetState);

    /* 해당 옵저브 데이터 삭제 */
    await Api.observe
      .deleteOneData(observeId)
      .then((res) => console.log('observe.deleteOneData done sir', res))
      .finally(() => setLoadingState({ ...loadingState, delete: false }))
      .catch((err) => console.error(err));

    /* 감지 데이터 좌표값 초기화 */
    await Api.tracker
      .modifyOneData(trackerId, {
        [`sensingGroup${groupNum}`]: '',
      })
      .then((res) => console.log('tracker.modifyOneData done sir', res))
      .finally(() => setLoadingState({ ...loadingState, delete: false }))
      .catch((err) => console.error(err));

    await Api.stream.initGroupSensingCnt(swrState.curCamIp, groupNum);
    swrTrackerMutate();
  };

  // 그룹안 상태 리셋
  const handleErrorReset = (e) => {
    console.log('handleErrorReset');
    setLoadingState({ ...loadingState, stateReset: true });
    const target = e.currentTarget;
    const dType = target.getAttribute('datatype');
    console.log('handleErrorReset dType', dType);

    Api.observe
      .modifyOneData(dType, { yellowCnt: 0, redCnt: 0 })
      .finally(() => setLoadingState({ ...loadingState, stateReset: false }))
      .catch((err) => console.error(err));
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
          {/* ON | OFF */}
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

        {/* Alarm Box */}
        <div className="btnBox">
          {/* className : 색상별 green yellow red inactive 추가 */}
          <div className={`alarmTxt ${safetyLevel?.toLowerCase()}`}>
            {/* <MdOutlineTaskAlt style={{ fontSize: '32px' }} /> */}
            {/* 작업자 진입 확인 / 작업자 위험 반경 진입 / 비활성화 되었습니다. */}
            <div className="btnBoxContent">
              {safetyLevel === 'Green' ? (
                <>
                  <div className="btnBoxLine green" />
                  <span className="btnBoxTxt green">
                    <p>
                      <MdOutlineTaskAlt style={{ fontSize: '32px' }} />
                    </p>
                    안전합니다
                  </span>
                  <div className="btnBoxLine green" />
                </>
              ) : safetyLevel === 'Yellow' ? (
                <>
                  <div className="btnBoxLine yellow" />
                  <span className="btnBoxTxt yellow">
                    <p>
                      <Feedback style={{ fontSize: '32px' }} />
                    </p>
                    작업자 진입 확인
                  </span>
                  <div className="btnBoxLine yellow" />
                </>
              ) : (
                <>
                  <div className="btnBoxLine red" />
                  <span className="btnBoxTxt red">
                    <p>
                      <MdDangerous style={{ fontSize: '32px' }} />
                    </p>
                    작업자 위험 반경 진입
                  </span>
                  <div className="btnBoxLine red" />
                </>
              )}
            </div>
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

        {loadingState.stateReset ? (
          <Loading />
        ) : (
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
              <button
                className="btnR normalPrimary"
                onClick={handleErrorReset}
                datatype={stateInfo?.[groupNum]?._id}
              >
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
        )}
      </div>
    </div>
  );
};

export default ObserveGroupBox;
