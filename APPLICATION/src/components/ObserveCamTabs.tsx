import React, { useEffect } from 'react';
import { useSWRState } from '../fetcher/useSWRState';
import Api from '../api/Api';

const ObserveCamTabs = ({ setCamTabState, camTabState }) => {
  const { data: swrState, mutate: setSwrState } = useSWRState();
  const visibilityCamInfo = (e) => {
    const target = e.currentTarget;
    const dType = target.getAttribute('datatype');
    const camTabs = Array.from(document.querySelectorAll('.safetyContents'));
    camTabs.forEach((ele: HTMLElement) => {
      ele.style.display = 'none';
    });

    const safetyContents = document.querySelector(
      `#safetyContent${dType}`
    ) as HTMLTableSectionElement;
    if (safetyContents) safetyContents.style.display = 'block';
    // console.log('🌊🌊🌊🌊🌊dType', dType);
    setCamTabState(parseInt(dType, 10));
  };

  /* cam1, 2, 3, 4 tab */
  const getTabEles = () => {
    const tabArr = [];
    for (let i = 0; i < 4; i++) {
      tabArr.push(
        <div className="safetyTabBox" key={i}>
          <input
            className="safetyTab"
            id={`safetyTab${i + 1}`}
            datatype={(i + 1).toString()}
            type="radio"
            name="tabs"
            defaultChecked={i === 0 && true}
            onChange={visibilityCamInfo}
          />
          <label className="safeLabel" htmlFor={`safetyTab${i + 1}`}>
            {`Cam${i + 1}`}
          </label>
        </div>
      );
    }
    return tabArr;
  };

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
        });
      })
      .catch((err) => console.error(err));
  }, [camTabState]);

  return <>{getTabEles()}</>;
};

export default ObserveCamTabs;
