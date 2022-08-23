import React, { useEffect } from 'react';
import { useSWRState } from '../fetcher/useSWRState';
import Api from '../api/Api';

const ObserveCamTabs = ({ setCamTabState, camTabState, videoFrameState }) => {
  const { data: swrState, mutate: setSwrState } = useSWRState();

  const setCurTabValues = (camNum: number) => {
    const camTabs = Array.from(document.querySelectorAll('.safetyContents'));
    camTabs.forEach((ele: HTMLElement) => (ele.style.display = 'none'));
    const safetyContents = document.querySelector(
      `#safetyContent${camNum}`
    ) as HTMLTableSectionElement;
    if (safetyContents) safetyContents.style.display = 'block';
    console.log('🌊🌊🌊🌊🌊camNum', camNum);
    setCamTabState(camNum);
  };

  const visibilityCamInfo = (e) => {
    const target = e.currentTarget;
    const dType = parseInt(target.getAttribute('datatype'), 10);
    setCurTabValues(dType);
  };

  /* cam1, 2, 3, 4 tab */
  const getTabEles = videoFrameState
    .filter((obj) => obj?.ip?.length > 0)
    .map((obj, idx) => (
      <div className="safetyTabBox" key={idx}>
        <input
          className="safetyTab"
          id={`safetyTab${idx + 1}`}
          datatype={(idx + 1).toString()}
          type="radio"
          name="tabs"
          defaultChecked={idx === 0 && true}
          onChange={visibilityCamInfo}
        />
        <label
          className={`safeLabel safetyLabel${idx + 1}`}
          htmlFor={`safetyTab${idx + 1}`}
        >
          {`Cam${idx + 1}`}
        </label>
      </div>
    ));

  useEffect(() => {
    Api.tracker
      .findData({
        area: swrState?.curTrackerArea,
        camPort: `cam${camTabState}`,
      })
      .then((tracker) => {
        console.log('🍋🍋🍋🍋🍋🍋tracker', tracker);
        // console.log('🍋🍋🍋🍋🍋🍋tracker', tracker[0].camPort);
        // console.log('🍋🍋🍋🍋🍋🍋tracker', tracker[0]._id);

        /* DetailViewPage에서 사용하기 위함 */
        setSwrState({
          ...swrState,
          curTrackerId: tracker[0]._id,
          curCamPort: tracker[0].camPort,
          curCamCalibImg: tracker[0].calibImg,
          curCamBaseLine: tracker[0].baseLine,
          curCamDangerLine: tracker[0].dangerLine,
          curCamIp: tracker[0].ip,
          curCamName: tracker[0].camName,
        })
          .finally(() => {
            /* 재렌더링 됐을때 cam1으로 설정되는것 막기 위함. */
            const tabNum = parseInt(tracker[0].camPort.at(3), 10);
            setCurTabValues(tabNum);
            const otherTabs = document.querySelectorAll('.safeLabel');
            otherTabs.forEach((ele) => {
              (ele as HTMLLabelElement).style.color = '#979797';
              (ele as HTMLLabelElement).style.borderBottom = 'none';
            });
            const targetTab = document.querySelector(
              `.safetyLabel${tabNum}`
            ) as HTMLLabelElement;
            if (targetTab) {
              targetTab.style.borderBottom = '4px solid #3366FF';
              targetTab.style.color = '#3366FF';
            }
          })
          .catch((err) => console.error(err));
      })
      // .finally(() => setCurTabValues(parseInt(swrState.curCamPort.at(3), 10)))
      .catch((err) => console.error(err));
  }, [camTabState]);

  // useEffect(() => {
  //   console.log('swrState.질투나curCamIp.at(3)', swrState.curCamPort);
  //   console.log(
  //     'swrState.질투나curCamIp.at(3)',
  //     parseInt(swrState.curCamPort.at(3), 10)
  //   );
  //   setCurTabValues(parseInt(swrState.curCamPort.at(3), 10));
  // }, [swrState]);

  return <>{getTabEles}</>;
};

export default ObserveCamTabs;
