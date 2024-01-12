/*Stock.jsx*/
import React from "react";
import placeholderImage from "../Assets/chart.png"; // Default placeholder image for stocks
import stockData from "../Assets/stocks.json";
const Stock = ({ name, totalAmount, returnRate }) => {
  const stockInfo = stockData.find((stock) => stock.stockCode === name);
  const logoUrl = stockInfo.stockImage;

  return (
    <div className="shrink-0 w-60  rounded-lg p-4  mr-4 items-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center ">
          <img
            src={logoUrl || placeholderImage}
            alt={`${name} Logo`}
            className="w-8 h-8 mr-2 rounded-full"
          />

          <div className="text-gray-800 font-bold text-sm mb-1">{name}</div>
        </div>

        {/* Third Column: Placeholder Image as Chart */}
        <div className="flex flex-col items-center ml-4">
          <img
            src={placeholderImage}
            alt="Placeholder Chart"
            className="w-18 h-12 mb-2 rounded-md"
          />
        </div>
      </div>

      <div className=" flex items-center text-md mb-2 justify-between">
        Toplam Değer:
        <span
          className={
            returnRate < 0
              ? "text-red-500 font-semibold pr-6"
              : "text-green-500 font-semibold pr-6"
          }
        >
          {totalAmount.toFixed(1)}₺
        </span>
      </div>

      {/* Second Column: Stock Name, Total Amount, and Return Rate */}

      <div className="flex items-center text-md mb-2 justify-between ">
        Toplam Getiri:{" "}
        <span
          className={
            returnRate < 0
              ? "text-red-500 font-semibold pr-6"
              : "text-green-500 font-semibold pr-6"
          }
        >
          {returnRate}%
        </span>
      </div>
    </div>
  );
};

export default Stock;
