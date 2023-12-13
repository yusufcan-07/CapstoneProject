import React, { useState } from "react";
import placeholderImage from "../Assets/chart.png";
import "../index.css";
import WatchlistPlusButton from "./Buttons/Watchlist_plus_button";

const Watchlist = ({ stocks, onAddStock }) => {
  const [startY, setStartY] = useState(0);
  const [startScrollTop, setStartScrollTop] = useState(0);

  const handleMouseMove = (e) => {
    const deltaY = e.clientY - startY;
    e.target.scrollTop = startScrollTop - deltaY;
  };

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md mt-4 w-80 watchlist-container"
      onMouseMove={handleMouseMove}
    >
      <div className="flex items-center justify-between mb-4 ">
        <h2 className="text-2xl font-semibold ">My Watchlist</h2>
        <WatchlistPlusButton onAddStock={onAddStock}></WatchlistPlusButton>
      </div>
      <div>
        <ul className="watchlist-scroll-container">
          {stocks.map((stock, index) => (
            <li
              key={stock.id}
              className={`mb-2 p-2 flex items-center justify-between ${
                index !== stocks.length - 1 ? "border-b" : ""
              }`}
            >
              <div className="flex items-center">
                {/* Stock Logo */}
                <img
                  src={placeholderImage} // Replace with the actual URL of the stock logo
                  alt={`${stock.name} Logo`}
                  className="w-8 h-8 mr-2"
                />
                {/* Stock Symbol and Name */}
                <div>
                  <div className="font-semibold">{stock.symbol}</div>
                  <div>{stock.name}</div>
                </div>
              </div>
              {/* Stock Price and Daily Change Percentage */}
              <div className="flex flex-col text-right">
                <div className="font-semibold">${stock.price}</div>
                <div
                  className={
                    stock.pct === 0
                      ? "text-gray-500" // Gray color for pct equal to 0
                      : stock.pct < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {stock.pct}%
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Watchlist;
