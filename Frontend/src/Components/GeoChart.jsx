import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import { Pie } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const disasterData = {
  labels: ["Floods", "Cyclones", "Landslides", "Earthquakes", "Other"],
  datasets: [
    {
      data: [40, 25, 15, 10, 10],
      backgroundColor: [
        "#8884d8",
        "#82ca9d", 
        "#ffc658",
        "#ff6666",
        "#66b3ff"
      ],
      borderColor: [
        "#7771c4",
        "#6fb589",
        "#e6b24f",
        "#e65c5c",
        "#5c9ee6"
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        padding: 20,
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: (context) => {
          const value = context.raw;
          return `${context.label}: ${value}%`;
        }
      }
    },
    title: {
      display: true,
      text: 'Distribution of Natural Disasters',
      font: {
        size: 16
      },
      padding: {
        top: 10,
        bottom: 20
      }
    }
  }
};

const GeoChart = () => {
  return (
    <div className="h-64">
      <Pie data={disasterData} options={options} />
    </div>
  );
};

export default GeoChart;