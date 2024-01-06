import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = ({ tradeHistoryData, livePrices }) => {
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
  const calculateCumulativeBalance = (tradeHistoryData, livePrices) => {
    let cumulativeBalance = 0;
    return tradeHistoryData.map((trade) => {
      // Check if livePrices is defined and has a key for the current stock
      const livePrice =
        livePrices && livePrices[trade.stockName]
          ? livePrices[trade.stockName]
          : trade.buyPrice; // Fallback to buyPrice if livePrice isn't available

      if (!isNaN(livePrice)) {
        cumulativeBalance += trade.amount * livePrice;
      }
      return cumulativeBalance.toFixed(1);
    });
  };

  useEffect(() => {
    const cumulativeBalanceData = calculateCumulativeBalance(
      tradeHistoryData,
      livePrices
    );

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
  }, [tradeHistoryData, livePrices]);

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
