import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = ({ tradeHistoryData }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Balance",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
      },
    },
  });

  useEffect(() => {
    const cumulativeBalanceData = calculateCumulativeBalance(tradeHistoryData);

    setChartData({
      series: [
        {
          name: "Balance",
          data: cumulativeBalanceData,
        },
      ],
      options: {
        ...chartData.options,
        xaxis: {
          ...chartData.options.xaxis,
          categories: tradeHistoryData.map((trade) => trade.dateTime),
        },
      },
    });
  }, [tradeHistoryData]);

  const calculateCumulativeBalance = (tradeHistoryData) => {
    let cumulativeBalance = 0;
    return tradeHistoryData.map((trade) => {
      cumulativeBalance += trade.amount * trade.livePrice;
      return cumulativeBalance;
    });
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default ApexChart;
