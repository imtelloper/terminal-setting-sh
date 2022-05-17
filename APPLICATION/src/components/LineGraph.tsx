import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import data from '../renderer/data.json';

const LineGraph = () => (
// @ts-ignore
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{
      type: 'point'
    }}
    yScale={{
      type: 'linear',
      stacked: true,
      min: 'auto',
      max: 'auto'
    }}
    minY="auto"
    maxY="auto"
    stacked={true}
    curve="cardinal"
    axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'date',
      legendOffset: 40,
      legendPosition: 'middle'
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'temperature',
      legendOffset: -50,
      legendPosition: 'middle'
    }}
    pointSize={10}
    pointBorderWidth={2}
    enableDotLabel={true}
    dotLabel="y"
    dotLabelYOffset={-12}
    areaOpacity={1}
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    useMesh={true}

    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1
            }
          }
        ]
      }
    ]}
    theme={{
      grid: {
        line: {
          stroke: "#c6c2e8",
          strokeWidth: 2,
          strokeDasharray: "4 4"
        }
      }
    }}
    colors={{ scheme: 'paired' }}
  />
);

export default LineGraph;
