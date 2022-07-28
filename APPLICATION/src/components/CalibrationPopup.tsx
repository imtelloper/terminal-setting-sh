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

  const heightWeightInput = (e, setData) => {
    /* 숫자 3자리 이상 누르면 자동으로 키에 맞게 소숫점을 붙여주는 로직 */
    let textHeight = e.currentTarget.value.toString();
    let firstNums;
    let secondNums;
    let floatNum;
    /* input value의 마지막 값이 '.' 일때 처리  */
    if (textHeight.substr(textHeight.length - 1, 1) === '.') {
      textHeight = textHeight.substr(0, textHeight.length - 1);
    }

    /* input value length가 5보다 클때 */
    if (textHeight.length > 5) {
      firstNums = textHeight.substr(0, 3);
      secondNums = textHeight.substr(4, 1);
      floatNum = parseFloat(`${firstNums}.${secondNums}`);
      /* input value length가 4보다 클때 */
    } else if (textHeight.length > 4) {
      firstNums = textHeight.substr(0, 2);
      secondNums = textHeight.substr(3, 1);
      const thirdNums = textHeight.substr(4, 1);
      floatNum = parseFloat(`${firstNums + secondNums}.${thirdNums}`);
      /* input value length가 4와 같고 3번째 자리 숫자가 0일때 */
    } else if (textHeight.length === 4 && textHeight.substr(2, 1) === '0') {
      firstNums = textHeight.substr(0, 3);
      secondNums = textHeight.substr(3, 1);
      floatNum = parseFloat(`${firstNums}.${secondNums}`);
      /* input value length가 3이하 일때 */
    } else if (textHeight.length <= 3) {
      firstNums = textHeight.substr(0, 2);
      secondNums = textHeight.substr(2, 1);

      /* 몸무게의 경우 */
      /* input value 처음 2자리가 10보다 크고 세번째 숫자가 0일때 */
      if (parseInt(firstNums, 10) > 10 && secondNums === '0') {
        floatNum = parseFloat(`${firstNums}.${secondNums}`);
        /* input value 처음 2자리가 10보다 크고 세번째 숫자가 0이 아닐때 */
      } else if (
        parseInt(firstNums, 10) > 10 &&
        textHeight.substr(2, 1) !== '0'
      ) {
        floatNum = parseFloat(`${firstNums}.${secondNums}`);
      } else {
        floatNum = parseFloat(firstNums + secondNums);
      }

      /* 숫자가 NaN일때 에러 처리 */
      floatNum.toString() === 'NaN' && (e.currentTarget.value = '');
      /* input value가 300보다 클때 */
    } else if (parseInt(textHeight, 10) > 300) {
      firstNums = textHeight.substr(0, 3);
      secondNums = textHeight.substr(3, 1);
      floatNum = parseFloat(`${firstNums}.${secondNums}`);
    }
    if (floatNum > 270) {
      setData('');
    } else {
      /* 마지막 결과 값이 NaN과 undefiend가 아닐때 */
      // eslint-disable-next-line no-lonely-if
      if (floatNum.toString() !== 'NaN' && floatNum !== undefined) {
        e.currentTarget.value = floatNum.toString();
        setData(floatNum);
      } else if (floatNum.toString() === 'NaN') {
        setData('');
      }
    }
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
            <button className="checkBtn" onClick={handleUpdateBaseLine}>
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalibrationPopup;
