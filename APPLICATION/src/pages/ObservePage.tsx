import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import '../style/pages/ObservePage.scss';

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
    <div id="observeContainer" className="observeContainer">
      <button
        onClick={() => {
          console.log('test');
          console.log('pointsState', pointsState);
          setStreamUrl(
            `http://127.0.0.1:8000/api/stream/area/${pointsState.coordinate1.join(
              ','
            )}`
          );
          console.log(
            `http://127.0.0.1:8000/api/stream/area/${pointsState.coordinate1.join(
              ','
            )}`
          );
        }}
      >
        page
      </button>
      <button
        onClick={() => {
          console.log('test');
          setStreamUrl('http://127.0.0.1:8000/api/stream/');
        }}
      >
        stream
      </button>

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
  );
};

export default ObservePage;
