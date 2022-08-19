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
import ObserveGroupBox from './ObserveGroupBox';

type Props = {
  videoFrameState: Array<any>;
  setVideoFrameState: React.Dispatch<any>;
};

const ObserveCamInfo = ({
  videoFrameState,
  setVideoFrameState,
  getObserveState,
  setNewVideoSrcState,
  swrTrackerMutate,
}) => {
  const navigate = useNavigate();
  const [camInfoState, setCamInfoState] = useState([]);
  const [ipState, setIpState] = useState('');
  const [loadingState, setLoadingState] = useState(false);
  const { data: swrState, mutate: setSwrState } = useSWRState();

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

  /* getObserveState를 가공하여 4개의 캠 셋트로 만들고 다시 해야된다. */
  const camInfosMap = useMemo(() => {
    return camInfoState?.map((info, idx) => {
      const fstCanvasVisible = videoFrameState[idx]?.firstCanvas?.visible;
      const secCanvasVisible = videoFrameState[idx]?.secondCanvas?.visible;
      return (
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
              {/*  // console.log('🌟idx', idx); */}
              {/* })()} */}

              {fstCanvasVisible && (
                <ObserveGroupBox
                  stateInfo={info}
                  stateIdx={idx + 1}
                  groupNum={1}
                  videoFrameState={videoFrameState}
                  setNewVideoSrcState={setNewVideoSrcState}
                  swrTrackerMutate={swrTrackerMutate}
                />
              )}

              {secCanvasVisible && (
                <ObserveGroupBox
                  stateInfo={info}
                  stateIdx={idx + 1}
                  groupNum={2}
                  videoFrameState={videoFrameState}
                  setNewVideoSrcState={setNewVideoSrcState}
                  swrTrackerMutate={swrTrackerMutate}
                />
              )}

              {(!fstCanvasVisible || !secCanvasVisible) && (
                <div className="safetyCreateBtnBox">
                  <button
                    className="safetyCreateBtn btnL defaultPrimary"
                    datatype={idx.toString()}
                    onClick={createCanvas}
                  >
                    그룹 생성하기
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      );
    });
  }, [camInfoState, videoFrameState]);

  return <>{camInfosMap}</>;
};

export default ObserveCamInfo;
