import React from "react";
import stationView from './StationOverView.module.css'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function DailyActivities(){


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: 'true',
        text: 'Chart',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: 'New Orders',
        data: [355, 390, 300, 350, 390, 180, 355],
        borderColor: '#1175ae',
        backgroundColor: '#1175ae',
      },
      {
        label: 'In Progress',
        data: [255, 190, 30, 450, 690, 280, 455],
        borderColor: '#C98209',
        backgroundColor: '#C98209',
      },
      
      {
        label: 'Completed',
        data: [55, 19, 300, 140, 69, 680, 155],
        borderColor: '#0FA958',
        backgroundColor: '#0FA958',
      },
      {
        label: 'Canceled',
        data: [25, 10, 2, 30, 5, 20, 14],
        borderColor: '#FF0000',
        backgroundColor: '#FF0000',
      },
    ],
  };

  return (
    <Card
      variant="outlined"
      sx={{
        pb: 0,
      }}
      className={stationView.cardTaineer}
    >
      <CardContent className={stationView.cardTainer}>
      {/* <CardContent
        sx={{
          pb: "0 !important",
        }}
      > */}
        <h1>Station Daily Overview</h1>
        <Line options={options} data={data} className={stationView.lineChart}/>

      {/* </CardContent> */}
      </CardContent>
    </Card>
  );
};

export default DailyActivities;
