import React, { useState, useEffect, useContext } from "react";
import placeholderImage from "../Assets/chart.png";
import "../index.css";
import WatchlistPlusButton from "./Buttons/Watchlist_plus_button";
import { fetchStockPrice } from "../Config/price_fetcher";
import stockData from "../Assets/stocks.json";

const Watchlist = ({ stocks, onAddStock }) => {
  const [startY, setStartY] = useState(0);
  const [startScrollTop, setStartScrollTop] = useState(0);
  const [livePrices, setLivePrices] = useState({});
  const handleMouseMove = (e) => {
    const deltaY = e.clientY - startY;
    e.target.scrollTop = startScrollTop - deltaY;
  };
  useEffect(() => {
    const fetchLivePrices = async () => {
      const prices = {};
      for (let stock of stocks) {
        try {
          const livePrice = await fetchStockPrice(stock.symbol);
          prices[stock.symbol] = livePrice;
        } catch (error) {
          console.error("Error fetching live price for:", stock.symbol, error);
          prices[stock.symbol] = stock.price; // Fallback to the original price in case of an error
        }
      }
      setLivePrices(prices);
    };

    fetchLivePrices();
  }, [stocks]);
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md mt-4 w-80 watchlist-container"
      onMouseMove={handleMouseMove}
    >
      <div className="flex items-center justify-between mb-4 ">
        <h2 className="text-2xl font-semibold ">İzleme Listem</h2>
        <WatchlistPlusButton onAddStock={onAddStock}></WatchlistPlusButton>
      </div>
      <div>
        <ul className="watchlist-scroll-container">
          {stocks.map((stock, index) => {
            const stockInfo = stockData.find(
              (sData) => sData.stockCode === stock.symbol
            );
            const livePrice = livePrices[stock.symbol] || stock.price;
            const pctChange = ((livePrice - stock.price) / stock.price) * 100;
            const pctChangeClass =
              pctChange === 0
                ? "text-gray-500"
                : pctChange < 0
                ? "text-red-500"
                : "text-green-500";
            return (
              // This return statement was missing
              <li
                key={stock.id}
                className={`mb-2 p-2 flex items-center justify-between ${
                  index !== stocks.length - 1 ? "border-b" : ""
                }`}
              >
                <div className="flex items-center">
                  <img
                    src={stockInfo ? stockInfo.stockImage : placeholderImage}
                    alt={`${stock.name} Logo`}
                    className="w-8 h-8 mr-2"
                  />
                  <div>
                    <div className="font-semibold">{stock.symbol}</div>
                    <div>{stock.name}</div>
                  </div>
                </div>
                <div className="flex flex-col text-right">
                  <div className="font-semibold">{stock.price}₺</div>
                  <div className={pctChangeClass}>{pctChange.toFixed(2)}%</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Watchlist;
