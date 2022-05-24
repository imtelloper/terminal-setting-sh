import React, {useEffect, useRef, useState} from "react";
import "../styles/pages/Main.scss";
import axios from "axios";
import ReactPlayer from "react-player";
import {flushSync} from "react-dom";

const Main = () => {
  const [streamUrl, setStreamUrl] = useState('http://127.0.0.1:8000/api/stream/');
  const [pointsState, setPointsState] = useState([]);
  function squaredPolar(point, centre) {
    return [
      Math.atan2(point[1]-centre[1], point[0]-centre[0]),
      (point[0]-centre[0])**2 + (point[1]-centre[1])**2 // Square of distance
    ];
  }
  function polySort() {
    let pointArray = pointsState
    let centre = [
      pointArray.reduce((sum, p) => sum + p[0], 0) / pointArray.length,
      pointArray.reduce((sum, p) => sum + p[1], 0) / pointArray.length
    ]
    pointArray.forEach(point => point.push(...squaredPolar(point, centre)));
    pointArray.sort((a,b) => a[2] - b[2] || a[3] - b[3]);
    pointArray.forEach(point => point.length -= 2);
    setPointsState(pointArray)
  }
  function draw(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!pointsState.length) return;
    for (let [x, y] of pointsState) {
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI, true);
      ctx.fill();
    }
    ctx.beginPath();
    // @ts-ignore
    ctx.moveTo(...pointsState[0]);
    for (let [x, y] of pointsState.slice(1)) ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();
  }

  const canvasClick = (e) =>{
    let canvas = e.currentTarget;
    let ctx = canvas?.getContext("2d");
    let x = e.clientX - canvas.offsetLeft;
    let y = e.clientY - canvas.offsetTop - 56;
    let pointArray = pointsState
    let match = pointArray.findIndex(([x0, y0]) => Math.abs(x0-x) + Math.abs(y0-y) <= 6);
    if (match < 0) pointArray.push([x, y]);
    else pointArray.splice(match, 1); // delete point when user clicks near it.
    flushSync(()=> setPointsState(pointArray))
    flushSync(()=> polySort())
    flushSync(()=> draw(canvas, ctx))
  }


  const [pointsState2, setPointsState2] = useState([]);
  function squaredPolar2(point, centre) {
    return [
      Math.atan2(point[1]-centre[1], point[0]-centre[0]),
      (point[0]-centre[0])**2 + (point[1]-centre[1])**2 // Square of distance
    ];
  }
  function polySort2() {
    let pointArray = pointsState2
    let centre = [
      pointArray.reduce((sum, p) => sum + p[0], 0) / pointArray.length,
      pointArray.reduce((sum, p) => sum + p[1], 0) / pointArray.length
    ]
    pointArray.forEach(point => point.push(...squaredPolar2(point, centre)));
    pointArray.sort((a,b) => a[2] - b[2] || a[3] - b[3]);
    pointArray.forEach(point => point.length -= 2);
    setPointsState2(pointArray)
  }
  function draw2(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!pointsState2.length) return;
    for (let [x, y] of pointsState2) {
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI, true);
      ctx.fill();
    }
    ctx.beginPath();
    // @ts-ignore
    ctx.moveTo(...pointsState2[0]);
    for (let [x, y] of pointsState2.slice(1)) ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();
  }

  const canvasClick2 = (e) =>{
    let canvas = e.currentTarget;
    let ctx = canvas?.getContext("2d");
    let x = e.clientX - canvas.offsetLeft;
    let y = e.clientY - canvas.offsetTop - 56;
    console.log('canvasClick2 x',x);
    console.log('canvasClick2 y',y);
    let pointArray = pointsState2
    let match = pointArray.findIndex(([x0, y0]) => Math.abs(x0-x) + Math.abs(y0-y) <= 6);
    if (match < 0) pointArray.push([x, y]);
    else pointArray.splice(match, 1); // delete point when user clicks near it.
    flushSync(()=> setPointsState2(pointArray))
    flushSync(()=> polySort2())
    flushSync(()=> draw2(canvas, ctx))
  }

  return (
    <div className="mainContainer">
      hi
      <canvas id="polygonCanvas" width={1024} height={768} style={{border: "1px solid #000"}} onClick={canvasClick}></canvas>
      <canvas id="polygonCanvas2" width={1024} height={768} style={{border: "1px solid #000"}} onClick={canvasClick2}></canvas>
      <button onClick={()=>{
        console.log('test')
        console.log(pointsState);
        // setStreamUrl('https://aboooks.tistory.com/205')
      }}>page</button>
      <button onClick={()=>{
        console.log('test')
        setStreamUrl('http://127.0.0.1:8000/api/stream/')
      }}>stream</button>
      <iframe src={streamUrl ?? 'http://127.0.0.1:8000/api/stream/'} width={640} height={440}></iframe>
    </div>
  );
};

export default Main;
