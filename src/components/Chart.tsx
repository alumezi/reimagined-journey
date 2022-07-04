import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

export const options = {
  responsive: true,
  legend: { display: false },
};

const buildData = (data: any, selected: string) => {
  return {
    labels: data.map((item) => item.date),
    datasets: [
      {
        fill: true,
        label: selected,
        data: data.map((item) => item.value),
        borderColor: 'rgb(186,53,235)',
        backgroundColor: 'rgba(53,83,235,0.2)',
      },
    ],
  };
};

const Chart = ({ selected, data }) => {
  return (
    <ChartWrapper>
      <Line options={options} data={buildData(data, selected)} />
    </ChartWrapper>
  );
};

const ChartWrapper = styled.div`
  width: 600px;
  height: 300px;
`;

export default Chart;
