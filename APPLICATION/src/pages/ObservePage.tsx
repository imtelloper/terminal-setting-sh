import NavBar from 'components/NavBar';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import '../style/pages/ObservePage.scss';
import { BiDownload, BiExport } from 'react-icons/bi';

const ObservePage = () => {
  const camWidth = 512;
  const camHeight = 384;
  const [streamUrl, setStreamUrl] = useState(
    'http://127.0.0.1:8000/api/stream/area/456,307,658,329,536,486,332,469'
  );

  const [pointsState, setPointsState] = useState({
    coordinate1: [],
    coordinate2: [],
    coordinate3: [],
    coordinate4: [],
  });

  const squaredPolar = (point, centre) => {
    return [
      Math.atan2(point[1] - centre[1], point[0] - centre[0]),
      (point[0] - centre[0]) ** 2 + (point[1] - centre[1]) ** 2, // Square of distance
    ];
  };

  const polySort = (canvasType) => {
    const pointArray = pointsState[canvasType];
    const centre = [
      pointArray.reduce((sum, p) => sum + p[0], 0) / pointArray.length,
      pointArray.reduce((sum, p) => sum + p[1], 0) / pointArray.length,
    ];
    pointArray.forEach((point) => point.push(...squaredPolar(point, centre)));
    pointArray.sort((a, b) => a[2] - b[2] || a[3] - b[3]);
    pointArray.forEach((point) => (point.length -= 2));
    setPointsState({ ...pointsState, [canvasType]: pointArray });
  };

  const draw = (canvas, ctx) => {
    const pointArray = pointsState[canvas.getAttribute('typeof')];
    console.log('draw ctx', ctx);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#42f593';
    ctx.lineWidth = 4;
    if (!pointArray.length) return;
    for (const [x, y] of pointArray) {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI, true);
      ctx.fillStyle = '#42f593';
      ctx.fill();
    }
    ctx.beginPath();
    ctx.moveTo(...pointArray[0]);
    for (const [x, y] of pointArray.slice(1)) ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();
  };

  const canvasClick = (e) => {
    const canvas = e.currentTarget;
    const ctx = canvas?.getContext('2d');
    const canvasType = canvas?.getAttribute('typeof');
    let x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop - 56;
    if (canvasType === 'coordinate2') {
      x -= 1024;
    }
    const pointArray = pointsState[canvasType];
    const match = pointArray?.findIndex(
      ([x0, y0]) => Math.abs(x0 - x) + Math.abs(y0 - y) <= 6
    );
    if (match < 0) pointArray.push([x, y]);
    else pointArray.splice(match, 1); // delete point when user clicks near it.
    flushSync(() =>
      setPointsState({ ...pointsState, [canvasType]: pointArray })
    );
    flushSync(() => polySort(canvasType));
    flushSync(() => draw(canvas, ctx));
  };

  return (
    <>
      <NavBar />
      <div id="observeContainer" className="observeContainer">
        <div className="leftSafetyBox">
          <p className="SafetyTitle">H1 공장 크레인</p>
          <input
            className="safetyTab"
            id="safetyTab1"
            type="radio"
            name="tabs"
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="safeLabel" htmlFor="safetyTab1">
            Cam1
          </label>

          <input
            className="safetyTab"
            id="safetyTab2"
            type="radio"
            name="tabs"
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="safeLabel" htmlFor="safetyTab2">
            Cam2
          </label>

          <input
            className="safetyTab"
            id="safetyTab3"
            type="radio"
            name="tabs"
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="safeLabel" htmlFor="safetyTab3">
            Cam3
          </label>

          <input
            className="safetyTab"
            id="safetyTab4"
            type="radio"
            name="tabs"
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="safeLabel" htmlFor="safetyTab4">
            Cam4
          </label>

          <section id="safetyContent1">
            <div className="safetyContentBox">
              <div className="groupBox">
                <span className="groupName">Group1</span>
                <span className="saveParameter">
                  <BiDownload />
                  파라미터 저장
                </span>
                <span className="callParameter">
                  <BiExport />
                  파라미터 불러오기
                </span>
              </div>
              <p>
                Safety Level : <span className="safeLevel">Green</span>
              </p>
              <p>감지 수 : 0</p>
              <div className="safetyBtnBox">
                <button className="safetyBtn safetyActiveBtn">Active</button>
                <button className="safetyBtn safetyDeleteBtn">Delete</button>
                <button className="safetyBtn safetyResetBtn">
                  Error Reset
                </button>
              </div>
              <div className="bottomBtnBox">
                <button className="safetyCreateBtn">생성</button>
              </div>
            </div>
          </section>
          <section id="safetyContent2">
            <div className="safetyContentBox">
              <div className="groupBox">
                <span className="groupName">Group2</span>
                <span className="saveParameter">
                  <BiDownload />
                  파라미터 저장
                </span>
                <span className="callParameter">
                  <BiExport />
                  파라미터 불러오기
                </span>
              </div>
              <p>
                Safety Level : <span className="safeLevel">Green</span>
              </p>
              <p>감지 수 : 0</p>
              <div className="safetyBtnBox">
                <button className="safetyBtn safetyActiveBtn">Active</button>
                <button className="safetyBtn safetyDeleteBtn">Delete</button>
                <button className="safetyBtn safetyResetBtn">
                  Error Reset
                </button>
              </div>
              <div className="bottomBtnBox">
                <button className="safetyCreateBtn">생성</button>
              </div>
            </div>
          </section>
          <section id="safetyContent3">
            <div className="safetyContentBox">
              <div className="groupBox">
                <span className="groupName">Group3</span>
                <span className="saveParameter">
                  <BiDownload />
                  파라미터 저장
                </span>
                <span className="callParameter">
                  <BiExport />
                  파라미터 불러오기
                </span>
              </div>
              <p>
                Safety Level : <span className="safeLevel">Green</span>
              </p>
              <p>감지 수 : 0</p>
              <div className="safetyBtnBox">
                <button className="safetyBtn safetyActiveBtn">Active</button>
                <button className="safetyBtn safetyDeleteBtn">Delete</button>
                <button className="safetyBtn safetyResetBtn">
                  Error Reset
                </button>
              </div>
              <div className="bottomBtnBox">
                <button className="safetyCreateBtn">생성</button>
              </div>
            </div>
          </section>
          <section id="safetyContent4">
            <div className="safetyContentBox">
              <div className="groupBox">
                <span className="groupName">Group4</span>
                <span className="saveParameter">
                  <BiDownload />
                  파라미터 저장
                </span>
                <span className="callParameter">
                  <BiExport />
                  파라미터 불러오기
                </span>
              </div>
              <p>
                Safety Level : <span className="safeLevel">Green</span>
              </p>
              <p>감지 수 : 0</p>
              <div className="safetyBtnBox">
                <button className="safetyBtn safetyActiveBtn">Active</button>
                <button className="safetyBtn safetyDeleteBtn">Delete</button>
                <button className="safetyBtn safetyResetBtn">
                  Error Reset
                </button>
              </div>
              <div className="bottomBtnBox">
                <button className="safetyCreateBtn">생성</button>
              </div>
            </div>
          </section>
        </div>
        <div className="rightSafetyBox">
          <div className="iframeContainer">
            <div className="iframeBox">
              <canvas
                className="polygonCanvas polygonCanvas1"
                width={camWidth}
                height={camHeight}
                onClick={canvasClick}
                typeof="coordinate1"
              />
              <iframe
                title="stream1"
                // src={streamUrl ?? 'http://127.0.0.1:8000/api/stream/area/'}
                src="http://192.168.0.7:81/"
                width={camWidth}
                height={camHeight}
              />
            </div>
            <div className="iframeBox">
              <canvas
                className="polygonCanvas polygonCanvas1"
                width={camWidth}
                height={camHeight}
                onClick={canvasClick}
                typeof="coordinate1"
              />
              <iframe
                title="stream1"
                // src={streamUrl ?? 'http://127.0.0.1:8000/api/stream/area/'}
                src="http://192.168.0.24:81/"
                width={camWidth}
                height={camHeight}
              />
            </div>
            {/* <div className="iframeBox"> */}
            {/*   <canvas */}
            {/*     className="polygonCanvas polygonCanvas1" */}
            {/*     width={camWidth} */}
            {/*     height={camHeight} */}
            {/*     onClick={canvasClick} */}
            {/*     typeof="coordinate1" */}
            {/*   /> */}
            {/*   <iframe */}
            {/*     title="stream1" */}
            {/*     src={streamUrl ?? 'http://127.0.0.1:8000/api/stream/area/'} */}
            {/*     // src="http://127.0.0.1:8000/api/stream/" */}
            {/*     width={camWidth} */}
            {/*     height={camHeight} */}
            {/*   /> */}
            {/* </div> */}
            {/* <div className="iframeBox"> */}
            {/*   <canvas */}
            {/*     className="polygonCanvas polygonCanvas1" */}
            {/*     width={camWidth} */}
            {/*     height={camHeight} */}
            {/*     onClick={canvasClick} */}
            {/*     typeof="coordinate1" */}
            {/*   /> */}
            {/*   <iframe */}
            {/*     title="stream1" */}
            {/*     src={streamUrl ?? 'http://127.0.0.1:8000/api/stream/area/'} */}
            {/*     // src="http://127.0.0.1:8000/api/stream/" */}
            {/*     width={camWidth} */}
            {/*     height={camHeight} */}
            {/*   /> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ObservePage;
