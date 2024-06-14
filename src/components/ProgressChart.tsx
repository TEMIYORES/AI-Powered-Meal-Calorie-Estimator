import React from "react";
import Chart from "react-apexcharts";

interface ProgressChartProps {
  loggedSessions: number;
  missedSessions: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({
  loggedSessions,
  missedSessions,
}) => {
  const series = [loggedSessions, missedSessions];

  const options: any = {
    chart: {
      type: "area",
      height: "100%",
      width: "100%",
    },
    labels: ["Logged Sessions", "Missed Sessions"],
    colors: ["#4f46e5", "#737373"],
    stroke: {
      curve: "smooth",
      width: 0.5,
      colors: ["#737373"],
    },
    markers: {
      size: 3,
      colors: ["#4f46e5"],
      strokeColor: ["#fff"],
      strokeWidth: 1,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        type: "vertical", // can also be 'horizontal'
        gradientToColors: ["#4f46e5", "#171717"], // the ending color for the gradient
        stops: [0, 100],
      },
    },
    grid: {
      borderColor: "#737373",
      strokeDashArray: 0,
    },

    yaxis: {
      labels: {
        style: {
          colors: "#737373",
          fontWeight: "600",
        },
      },
    },

    legend: {
      labels: {
        colors: ["#737373", "#737373"],
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  return <Chart options={options} series={series} type="donut" width="150%" />;
};

export default ProgressChart;
