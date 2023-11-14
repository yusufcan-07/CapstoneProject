/*Stock.jsx*/
import React from "react";
import placeholderImage from "../Assets/chart.png"; // Default placeholder image for stocks

const Stock = ({ name, totalAmount, returnRate, logoUrl }) => {
  return (
    <div className="shrink-0 w-60  rounded-lg p-4  mr-4 items-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center ">
          {/* First Column: Stock Logo */}
          <img
            src={logoUrl || placeholderImage}
            alt="Stock Logo"
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
        Total Shares:
        <div className="font-semibold pr-5">${totalAmount}</div>
      </div>

      {/* Second Column: Stock Name, Total Amount, and Return Rate */}

      <div className="flex items-center text-md mb-2 justify-between ">
        Total Return:{" "}
        <span
          className={
            returnRate >= 0
              ? "text-green-500 font-semibold pr-6"
              : "text-red-500-font-semibold pr-6"
          }
        >
          {returnRate}%
        </span>
      </div>
    </div>
  );
};

export default Stock;
