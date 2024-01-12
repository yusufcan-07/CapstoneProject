import React, { useEffect, useState } from "react";
import stocks from "../Assets/stocks.json"; // Assuming stocks.json is in the same directory

export default function Bot() {
  const [analysisData, setAnalysisData] = useState({});

  useEffect(() => {
    const fetchDataForStock = async (stockCode) => {
      try {
        const response = await fetch(
          `https://scanner.tradingview.com/symbol?symbol=BIST:${stockCode}&fields=open,close,EMA20,MACD.macd,MACD.signal`
        );
        const data = await response.json();
        setAnalysisData((prevData) => ({
          ...prevData,
          [stockCode]: data,
        }));
      } catch (error) {
        console.error(`Error fetching data for ${stockCode}:`, error);
      }
    };

    // Fetch data for each stock code
    stocks.forEach((stock) => {
      fetchDataForStock(stock.stockCode);
    });
  }, []);

  const calculateEMA = (stock) => {
    const { open, close, EMA20 } = analysisData[stock.stockCode] || {};

    if (open && close && EMA20) {
      if (EMA20 > Math.min(open, close) && EMA20 < Math.max(open, close)) {
        if (open < close) {
          return "Buy";
        } else {
          return "Sell";
        }
      }
    }
    return "N/A";
  };

  const calculateMACD = (stock) => {
    const stockData = analysisData[stock.stockCode];
    try {
      if (!stockData) {
        console.error("Stock data not found");
      } else if (!stockData.MACD) {
        console.error("MACD property not found in stock data");
      } else {
        console.log(stockData);
        console.log(stockData.MACD);
        console.log(stockData.MACD.macd);
      }
    } catch (e) {
      console.error(e);
    }

    if (
      stockData &&
      stockData.MACD &&
      stockData.MACD.macd !== undefined &&
      stockData.MACD.signal !== undefined
    ) {
      if (stockData.MACD.macd > stockData.MACD.signal) {
        return "Buy";
      } else {
        return "Sell";
      }
    }
    return "N/A";
  };

  return (
    <div className="content">
      <table className="stock-table">
        <thead>
          <tr>
            <th>Stock Code</th>
            <th>RSI</th>
            <th>MACD</th>
            <th>EMA</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={index}>
              <td>{stock.stockCode}</td>
              <td>{stock.RSI}</td>
              <td>{calculateMACD(stock)}</td>
              <td>{calculateEMA(stock)}</td>
              <td>{}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
