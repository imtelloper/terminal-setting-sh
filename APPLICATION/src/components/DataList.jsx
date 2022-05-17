import React, { useEffect, useState } from "react";
import "../style/DataList.scss";
import { PuffLoader } from "react-spinners";
import { css } from "styled-components";

const DataList = (props) => {
  const { currentPage, datas, loading } = props;
  let [color, setColor] = useState("#8665F1");

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const dataList = datas.map(
    ({ temperature, humidity, weatherTemp, weather, ip, timeStamp }, idx) => (
      <div className="dataListContainer" key={idx}>
        <div className="idxContainer">
          {(currentPage * 10) - 9 + idx}
        </div>
        <div id={`temperatureId${idx}`} className="tempContainer">
          {temperature.toFixed(1) + "°C"}
        </div>
        <div className="humiContainer">
          {humidity.toFixed(1) + "%"}
        </div>
        <div id={`weatherTempId${idx}`} className="weatherTempContainer">
          {weatherTemp + "°C"}
        </div>
        <div className="weatherContainer">
          {weather}
        </div>
        <div className="locationContainer">
          {ip}
        </div>
        <div className="timeContainer">
          {timeStamp.replace("T", " ")}
        </div>
      </div>
    )
  );

  useEffect(() => {
    document.querySelectorAll(".dataListContainer").forEach((ele) => {
      const changeTempColor = (className) => {
        const tempEle = ele.querySelector(className);
        const tempValue = Number(tempEle.textContent.slice(0, -2));
        if (tempValue <= 0) tempEle.style.color = "#17B9EE";
        else if (0 < tempValue && tempValue <= 15) tempEle.style.color = "#5bbf67";
        else if (15 < tempValue && tempValue <= 20) tempEle.style.color = "#ffc400";
        else if (21 < tempValue && tempValue <= 29) tempEle.style.color = "#ff8400";
        else if (tempValue > 30) tempEle.style.color = "#f80f0f";
      };
      changeTempColor(".tempContainer");
      changeTempColor(".weatherTempContainer");
      const changeHumiColor = (className) => {
        const humiEle = ele.querySelector(className)
        const humiValue = Number(humiEle.textContent.slice(0, -2));
        if (humiEle <= 0) humiEle.style.color = "#035592";
        else if (0 < humiValue && humiValue <= 15) humiEle.style.color = "#3CD4F8FF";
        else if (15 < humiValue && humiValue <= 21) humiEle.style.color = "#00b2ff";
        else if (21 < humiValue && humiValue <= 31) humiEle.style.color = "#0095ff";
        else if (31 < humiValue && humiValue <= 41) humiEle.style.color = "#318cff";
        else if (41 < humiValue && humiValue <= 50) humiEle.style.color = "#0059ff";
        else if (humiValue > 50) humiEle.style.color = "#0051ff";
      }
      changeHumiColor(".humiContainer")
    });
  }, [datas]);

  return (
    <>
      <div className="spinnerBox">
      {loading &&
        <PuffLoader color={color} loading={loading} css={override} size={60}/>
      }
      </div>
      <ul>
        {dataList}
      </ul>
    </>
  );
};

export default DataList;
