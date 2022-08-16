import React, { useEffect, useState } from 'react';
import '../style/DesignSystem.scss';
import '../style/components/CalibrationPopup.scss';
import { Undo } from '@material-ui/icons';
import { MdDesignServices } from 'react-icons/md';
import { useSWRState } from '../fetcher/useSWRState';
import { flushSync } from 'react-dom';
import PolygonDraw from '../util/PolygonDraw';
import Api from '../api/Api';

const CalibrationPopup = ({ calibImgSrcState, setIsOpenCalibrationState }) => {
  const { data: swrState, mutate: setSwrState } = useSWRState();
  const [calibCoordState, setCalibCoordState] = useState<Array<Array<number>>>(
    []
  );
  const [numState, setNumState] = useState('');
  const camWidth = 512;
  const camHeight = 384;
  const pointSize = 3; // 다각형 점의 크기
  const lineSize = 2.5; // 다각형 선의 굵기
  const drawColor = {
    green: '#42f593',
    yellow: '#FFFA7C',
    red: '#FF374B',
  };

  /* 기준선 그리기 */
  const handleBg = () => {
    const alarmBox = document.querySelector('.alarmBox');
    alarmBox.classList.add('alarmBoxActive');
  };

  const handleNum = (e) => {
    // heightWeightInput(e, setNumState);
    setNumState(e.currentTarget.value);
  };

  const draw = (canvas, clicked = false, trackerId = '') => {
    const ctx = canvas?.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const itemID = canvas?.getAttribute('itemID');
    const redSensingPoints = [];
    if (!calibCoordState.length) return;
    for (const [x, y] of calibCoordState) {
      /* Red Zone 다각형점 찍기 */
      redSensingPoints.push([Math.round(x), Math.round(y)]);
      PolygonDraw.drawPoints(ctx, x, y, pointSize, drawColor.red);
    }

    const redSensingCoordinate = redSensingPoints.join(',');

    /* Red Zone 라인  그리기 */
    PolygonDraw.drawLines(ctx, calibCoordState, lineSize, drawColor.red);

    console.log('👗👗👗 itemID', itemID);
  };

  const polySort = () => {
    const coordinate = calibCoordState;
    const centre = [
      coordinate.reduce((sum, p) => sum + p[0], 0) / coordinate.length,
      coordinate.reduce((sum, p) => sum + p[1], 0) / coordinate.length,
    ];
    coordinate.forEach((point) =>
      point.push(...PolygonDraw.squaredPolar(point, centre))
    );
    coordinate.sort((a, b) => a[2] - b[2] || a[3] - b[3]);
    coordinate.forEach((point) => (point.length -= 2));
    setCalibCoordState([...coordinate]);
  };

  const canvasClick = (e) => {
    const canvas = e.currentTarget;
    if (calibCoordState.length > 1) {
      console.log('안되나요');
      return;
    }
    const bbox = canvas.getBoundingClientRect(); // viewport 기준으로 나의 위치 알려줌
    const x = e.clientX - bbox.left;
    const y = e.clientY - bbox.top;
    const coordinate = calibCoordState;
    const match = coordinate?.findIndex(
      ([x0, y0]) => Math.abs(x0 - x) + Math.abs(y0 - y) <= 6
    );
    if (match < 0) coordinate.push([Math.round(x), Math.round(y)]);
    else coordinate.splice(match, 1); // delete point when user clicks near it.
    let newArr = calibCoordState;
    newArr = coordinate;
    flushSync(() => setCalibCoordState([...newArr]));
    flushSync(() => polySort());
    draw(canvas);
  };

  useEffect(() => {
    console.log('😆swrState', swrState);
    console.log('calibImgSrcState', calibImgSrcState);
    (
      document.querySelector('.calibCanvasBox') as HTMLDivElement
    ).style.backgroundImage = `url("${calibImgSrcState}")`;
  }, []);

  useEffect(() => {
    // input박스에 숫자 입력시 활성화
    const numInputEl = document.querySelector('.numInput');
    const numLabelEl = document.querySelector('.numLabel');
    const checkBtnEl = document.querySelector('.contentBox .checkBtn');
    if (numState.length > 0) {
      numInputEl?.classList.add('inputActive');
      numLabelEl?.classList.add('labelActive');
      checkBtnEl?.classList.add('btnActive');
    } else {
      numInputEl?.classList.remove('inputActive');
      numLabelEl?.classList.remove('labelActive');
      checkBtnEl?.classList.remove('btnActive');
    }
  }, [numState]);

  useEffect(() => {
    console.log('🔥calibCoordState', calibCoordState);
    calibCoordState.length === 0 &&
      draw(document.querySelector('.calibCanvas'));
  }, [calibCoordState]);

  const handleUpdateBaseLine = (e) => {
    const coordinate = calibCoordState
      .map((coord) => coord.join(','))
      .join(',');
    console.log('swrState.curTrackerId', swrState.curTrackerId);
    console.log('coordinate', coordinate);
    console.log('numState', numState);
    console.log(`${coordinate}&${numState}`);
    Api.tracker
      .modifyOneData(swrState.curTrackerId, {
        baseLine: `${coordinate}&${numState}`,
      })
      .finally(() => {
        setIsOpenCalibrationState(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="calibrationZoneContainer">
      <div className="calibrationBox">
        <div className="calibrationTitle">Calibration 설정</div>
        <div className="contentBox">
          <div className="calibCanvasBox">
            {/* canvas는 반드시 width, hegiht 설정해줄것. */}
            <canvas
              className="calibCanvas"
              itemID="calibCanvas"
              width={camWidth}
              height={camHeight}
              // id={data.trackerId}
              onClick={canvasClick}
            />
          </div>

          <div className="alarmBox">
            <span>기준선을 그려 주세요.</span>
            <button className="iconBtnR defaultPrimary">
              <span className="iconR">
                <MdDesignServices style={{ fontSize: '24px' }} />
              </span>
              <span className="txt" onClick={handleBg}>
                기준선 그리기
              </span>
            </button>
          </div>

          <div className="settingBox">
            <button
              onClick={() => {
                console.log('다시 그리기!!!!!');
                flushSync(() => setCalibCoordState([]));
              }}
            >
              <Undo />
              <span>다시 그리기</span>
            </button>
            <div>
              <span>기준선 길이</span>
              <input
                id="numInput"
                className="numInput"
                type="text"
                placeholder="00.0"
                onChange={handleNum}
                value={numState}
              />
              <label htmlFor="numInput" className="numLabel">
                m
              </label>
            </div>
          </div>
          <div className="bottomBtnBox">
            <button
              className="btnR normalPrimary"
              onClick={() => setIsOpenCalibrationState(false)}
            >
              취소
            </button>
            <button className="btn checkBtn" onClick={handleUpdateBaseLine}>
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalibrationPopup;
