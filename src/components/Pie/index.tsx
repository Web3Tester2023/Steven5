import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import ReactEcharts from "echarts-for-react";

const myData = [
  { title: "65% Presale", value: 65, color: "#4285F4" },
  { title: "20% liquidity", value: 20, color: "#EA4335" },
  { title: "5% Marketing", value: 5, color: "#FBBC04" },
  { title: "5% Reward", value: 5, color: "#34A853" },
  { title: "2% Team", value: 2, color: "#FF6D01" },
  { title: "2% SCHOLARSHIP FUND", value: 2, color: "#4F6D9F" },
  { title: "1% Development ", value: 1, color: "#46BDC6" },
];

const Chart = () => {
  const options = {
    toolbox: {
      show: true,
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: [
        "Presale",
        "liquidity & cex",
        "Marketing",
        "Rewards",
        "Team",
        "SCHOLARSHIP FUND",
        "Development",
      ],
      textStyle: {
        color: ["#FFFFFF"],
        fontSize: 16,
      },
    },
    color: [
      "#4285F4",
      "#EA4335",
      "#FBBC04",
      "#34A853",
      "#FF6D01",
      "#4F6D9F",
      "#46BDC6",
    ],
    series: [
      {
        name: "TOKEN ALLOCATION",
        type: "pie",
        radius: "60%",
        center: ["70%", "60%"],
        data: [
          { value: 65, name: "Presale" },
          { value: 20, name: "liquidity & cex" },
          { value: 5, name: "Marketing" },
          { value: 5, name: "Rewards" },
          { value: 2, name: "Team" },
          { value: 2, name: "SCHOLARSHIP FUND" },
          { value: 1, name: "Development" },
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.9)",
          },
        },
        startAngle: 90,
      },
    ],
  };
  return (
    <div className="w-full min-w-[300px] xs:min-w-[500px] sm:min-w-[600px]  lg:min-w-[800px] ">
      <ReactEcharts
        option={options}
        style={{ width: "100%", minHeight: "500px" }}
      />
    </div>
  );
};

export default Chart;
