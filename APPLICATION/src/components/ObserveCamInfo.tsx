import React, { useEffect, useMemo, useState } from 'react';
import '../style/DesignSystem.scss';
import '../style/pages/ObserveCamInfo.scss';
import { useNavigate } from 'react-router-dom';
import { flushSync } from 'react-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Feedback, HighlightOff, Delete } from '@material-ui/icons';
import { MdDangerous, MdOutlineTaskAlt } from 'react-icons/md';
import Api from '../api/Api';
import Loading from './Loading';
import { useSWRState } from '../fetcher/useSWRState';

type Props = {
  videoFrameState: Array<any>;
  setVideoFrameState: React.Dispatch<any>;
};

const ObserveCamInfo = ({
  videoFrameState,
  setVideoFrameState,
  getObserveState,
  setNewVideoSrcState,
}) => {
  const navigate = useNavigate();
  const [camInfoState, setCamInfoState] = useState([]);
  const [ipState, setIpState] = useState('');
  const [loadingState, setLoadingState] = useState(false);
  const { data: swrState, mutate: setSwrState } = useSWRState();

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
  const handleDelete = (e) => {
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
    Api.observe
      .deleteOneData(observeId)
      .then((res) => console.log('observe.deleteOneData done sir', res))
      .finally(() => setLoadingState(false))
      .catch((err) => console.error(err));

    /* 감지 데이터 좌표값 초기화 */
    Api.tracker
      .modifyOneData(trackerId, {
        [`sensingGroup${groupNum}`]: '',
      })
      .then((res) => console.log('tracker.modifyOneData done sir', res))
      .finally(() => setLoadingState(false))
      .catch((err) => console.error(err));

    Api.stream.initGroupSensingCnt(swrState.curCamIp, groupNum);
  };

  // 그룹안 상태 리셋
  const handleErrorReset = () => {
    console.log('handleErrorReset');
    const newArr = videoFrameState;
    newArr[0].secondCanvas.visible = true;
    newArr[1].secondCanvas.visible = true;
    newArr[2].secondCanvas.visible = true;
    newArr[3].secondCanvas.visible = true;
    flushSync(() => setVideoFrameState([...newArr]));
  };

  // 생성
  const createCanvas = (e) => {
    console.log('createCanvas');
    const target = e.currentTarget;
    const dType = parseInt(target.getAttribute('datatype'), 10);
    console.log('현재 캠 스테이트 dType', dType);
    const newArr = videoFrameState;
    console.log(
      '그룹1 first 비지블 스테이트',
      newArr[dType].firstCanvas.visible
    );
    console.log(
      '그룹1 second 비지블 스테이트',
      newArr[dType].secondCanvas.visible
    );
    // 첫번째 그룹이 있다면 두번째 그룹 생성
    if (newArr[dType].firstCanvas.visible === false)
      newArr[dType].firstCanvas.visible = true;
    else newArr[dType].secondCanvas.visible = true;

    flushSync(() => setVideoFrameState([...newArr]));
  };

  /* INIT EFFECT */
  useEffect(() => {
    const camTabs = Array.from(document.querySelectorAll('.safetyContents'));
    camTabs.forEach((ele: HTMLElement, idx) => {
      if (idx !== 0) ele.style.display = 'none';
    });
    console.log('swrState', swrState);
  }, []);

  useEffect(() => {
    // console.log('ObserveCamInfo');
    // console.log('🌸getObserveState', getObserveState);

    const newCamInfoState = [{}, {}, {}, {}];
    /* getObserveState 가공 후 camInfoState에 셋팅 */
    getObserveState.forEach((obj) => {
      const { camPort, groupNum } = obj;
      const camIndex = parseInt(camPort.at(-1), 10) - 1;

      newCamInfoState[camIndex] = {
        ...newCamInfoState[camIndex],
        [groupNum]: obj,
      };
    });

    // console.log('🪴🪴🪴🪴☘️ newCamInfoState', newCamInfoState);
    newCamInfoState.length > 0 && setCamInfoState(newCamInfoState);
  }, [getObserveState]);

  useEffect(() => {
    // console.log('love dive 🌝🌝🌝🌝🌝 camInfoState', camInfoState);
    camInfoState?.forEach((obj, idx) => {
      const camNum = idx + 1;
      const group1 = obj[1];
      const group2 = obj[2];
      // console.log('love dive 🌝🌝🌝🌝🌝 camInfoState obj', obj);
      // console.log('🌷love dive obj[1]', obj[1]);
      // console.log('🌷love dive obj[2]', obj[2]);
      // console.log('🌷love dive obj[1].observeSwitch', obj[1]?.observeSwitch);
      // console.log('🌷love dive obj[2].observeSwitch', obj[2]?.observeSwitch);

      const group1Ele = document.querySelector(
        `.cam${camNum}ObserveSwitch1`
      ) as HTMLSpanElement;

      const group2Ele = document.querySelector(
        `.cam${camNum}ObserveSwitch2`
      ) as HTMLSpanElement;

      // console.log('🎄🎄🎄 group1Ele', group1Ele);
      // console.log('🎄🎄🎄 group2Ele', group2Ele);

      if (group1Ele) {
        group1?.observeSwitch === true
          ? (group1Ele.style.transform = 'translateX(-60%)')
          : (group1Ele.style.transform = 'translateX(40%)');
      }

      if (group2Ele) {
        group2?.observeSwitch === true
          ? (group2Ele.style.transform = 'translateX(-60%)')
          : (group2Ele.style.transform = 'translateX(40%)');
      }
    });
  }, [camInfoState]);

  const groupBoxComponent = (stateInfo, stateIdx, groupNum) => (
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
              itemID={stateInfo?.[groupNum]?._id}
            />
            <label htmlFor={`toggleOnRadio${stateIdx}`}>ON</label>
            <input
              datatype="messageSwitch"
              type="radio"
              id={`toggleOffRadio${stateIdx}`}
              name="messageRadio"
              value="off"
              onChange={handleActive}
              itemID={stateInfo?.[groupNum]?._id}
            />
            <label htmlFor={`toggleOffRadio${stateIdx}`}>OFF</label>
            <span
              className={`move ${stateInfo?.[groupNum]?.camPort}ObserveSwitch${groupNum}`}
            />
          </div>
        </div>
        <div className="btnBox">
          {/* className : 색상별 green yellow red inactive 추가 */}
          <div
            className={`alarmTxt ${stateInfo?.[
              groupNum
            ]?.safetyLevel?.toLowerCase()}`}
          >
            {/* <MdOutlineTaskAlt style={{ fontSize: '32px' }} /> */}
            {/* 작업자 진입 확인 / 작업자 위험 반경 진입 / 비활성화 되었습니다. */}
            <div className="btnBoxContent">
              {stateInfo?.[groupNum]?.safetyLevel === 'Green' ? (
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
              ) : stateInfo?.[groupNum]?.safetyLevel === 'Yellow' ? (
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
              1차 감지<p>{stateInfo?.[groupNum]?.yellowCnt}</p>
            </span>
            <span>
              2차 감지<p>{stateInfo?.[groupNum]?.redCnt}</p>
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
              name={stateInfo?.[groupNum]?._id}
              datatype={groupNum}
            >
              <Delete />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  /* getObserveState를 가공하여 4개의 캠 셋트로 만들고 다시 해야된다. */
  const camInfosMap = useMemo(() => {
    return camInfoState?.map((info, idx) => (
      <section
        id={`safetyContent${idx + 1}`}
        className="safetyContents"
        key={idx}
      >
        {loadingState ? (
          <Loading />
        ) : (
          <div className="safetyContentBox">
            {/* {(() => { */}
            {/*  console.log('🌟info', info); */}
            {/*   console.log('🌟idx', idx); */}
            {/* })()} */}
            {videoFrameState[idx]?.firstCanvas?.visible &&
              groupBoxComponent(info, idx + 1, 1)}

            {videoFrameState[idx]?.secondCanvas?.visible &&
              groupBoxComponent(info, idx + 1, 2)}

            <div className="safetyCreateBtnBox">
              <button
                className="safetyCreateBtn btnL defaultPrimary"
                datatype={idx.toString()}
                onClick={createCanvas}
              >
                그룹 생성하기
              </button>
            </div>
          </div>
        )}
      </section>
    ));
  }, [camInfoState, videoFrameState]);

  return <>{camInfosMap}</>;
};

export default ObserveCamInfo;
