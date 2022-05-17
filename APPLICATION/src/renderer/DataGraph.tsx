import React, { PureComponent } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { IoIosHelpCircleOutline } from "react-icons/io";
import "../style/DataGraph.scss";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ResponsiveLine } from '@nivo/line';
import LineGraph from "../components/LineGraph";


// const data = [
//   {
{/*     name: "2022-04-20", */}
{/*     temperature: 11, */}
{/*     weatherTemp: 20 */}
{/*   }, */}
//   {
//     name: "2022-04-21",
{/*     temperature: 15, */}
//     weatherTemp: 21
//   },
//   {
//     name: "2022-04-22",
//     temperature: 5,
//     weatherTemp: 19
//   },
//   {
//     name: "2022-04-23",
//     temperature: 10,
//     weatherTemp: 18
//   },
//   {
//     name: "2022-04-24",
//     temperature: 9,
//     weatherTemp: 10
//   },
//   {
//     name: "2022-04-25",
//     temperature: 10,
//     weatherTemp: 12
//   },
//   {
//     name: "2022-04-26",
//     temperature: 15,
//     weatherTemp: 16
//   }
// ];

const DataGraph = () => {
  const navigate = useNavigate();

  return (
    <div className="graphPageContainer">
      <div className="graphTopContainer">
        <div className="backPage">
          <FiArrowLeft size="40px" onClick={() => {
            navigate("/main");
          }} />
        </div>
        <span className="dataGraphTitle">Data Graph</span>
        <div className="helpCircle" data-tooltip="DB에서 가져온 데이터를 그래프로 볼 수 있습니다.">
          <IoIosHelpCircleOutline size="30px" />
        </div>
      </div>
      <div className="graphContainer">
        <LineGraph />
        {/* <ResponsiveContainer width="100%" aspect={3} background-color="#000"> */}
        {/*   <LineChart data={data} margin={{ right: 100, left:50, top:50}}> */}
        {/*     <CartesianGrid /> */}
        {/*     <XAxis dataKey="name" */}
        {/*            interval={"preserveStartEnd"} /> */}
        {/*     <YAxis></YAxis> */}
        {/*     <Legend /> */}
        {/*     <Tooltip /> */}
        {/*     <Line dataKey="temperature" */}
        {/*           stroke="#8665F1" activeDot={{ r: 8 }} /> */}
        {/*     <Line dataKey="weatherTemp" */}
        {/*           stroke="#2DAAF0" activeDot={{ r: 8 }} /> */}
        {/*   </LineChart> */}
        {/* </ResponsiveContainer> */}
      </div>
    </div>
  );
};

export default DataGraph;
