/*Dashboard.jsx*/
import Stock from "../Components/Stock";
import React, { useRef, useState } from "react";
import Watchlist from "../Components/Watchlist";
import placeholderImage from "../Assets/chart.png";
import TemplateChart from "../Components/TemplateChart";

const stocksData = [
  {
    //TODO logoUrl koymak araştırılacak
    id: 1,
    logoUrl: { placeholderImage },
    symbol: "A",
    name: "Stock A",
    price: 100,
    totalAmount: 3000,
    returnRate: 50,
    miniChart: <div>Mini Chart A</div>,
  },
  {
    id: 2,
    logoUrl: { placeholderImage },
    symbol: "A",
    name: "Stock B",
    price: 150,
    totalAmount: 3000,
    returnRate: 50,
    miniChart: <div>Mini Chart A</div>,
  },
  {
    id: 3,
    logoUrl: { placeholderImage },
    symbol: "A",
    name: "Stock C",
    price: 150,
    totalAmount: 3000,
    returnRate: 50,
    miniChart: <div>Mini Chart A</div>,
  },
  {
    id: 4,
    logoUrl: { placeholderImage },
    symbol: "A",
    name: "Stock D",
    price: 150,
    totalAmount: 3000,
    returnRate: 50,
    miniChart: <div>Mini Chart A</div>,
  },
  {
    id: 5,
    logoUrl: { placeholderImage },
    symbol: "A",
    name: "Stock E",
    price: 150,
    totalAmount: 3000,
    returnRate: 50,
    miniChart: <div>Mini Chart A</div>,
  },
  {
    id: 6,
    logoUrl: { placeholderImage },
    symbol: "A",
    name: "Stock F",
    price: 150,
    totalAmount: 3000,
    returnRate: 50,
    miniChart: <div>Mini Chart A</div>,
  },
  {
    id: 7,
    logoUrl: { placeholderImage },
    symbol: "A",
    name: "Stock G",
    price: 150,
    totalAmount: 3000,
    returnRate: 50,
    miniChart: <div>Mini Chart A</div>,
  },
  {
    id: 8,
    logoUrl: { placeholderImage },
    symbol: "A",
    name: "Stock H",
    price: 150,
    totalAmount: 3000,
    returnRate: 50,
    miniChart: <div>Mini Chart A</div>,
  },
  {
    id: 9,
    logoUrl: { placeholderImage },
    symbol: "A",
    name: "Stock I",
    price: 150,
    totalAmount: 3000,
    returnRate: 50,
    miniChart: <div>Mini Chart A</div>,
  },
  // Add more stock data as needed
];

const Dashboard = () => {
  const elementRef = useRef(null);
  const [arrowDisable, setArrowDisable] = useState(true);
  const [watchlistStocks, setWatchlistStocks] = useState([
    {
      id: 1,
      logo: { placeholderImage },
      name: "AAPL",
      symbol: "AAPL",
      price: 150.25,
      pct: -1.1,
    },
    {
      id: 2,
      logo: { placeholderImage },
      name: "TSLA",
      symbol: "TSLA",
      price: 150.25,
      pct: 0.1,
    },
    {
      id: 3,
      logo: { placeholderImage },
      name: "AMZN",
      symbol: "AMZN",
      price: 15000.25,
      pct: -0.1,
    },
    {
      id: 4,
      logo: { placeholderImage },
      name: "GOOG",
      symbol: "GOOG",
      price: 1500.25,
      pct: -20.1,
    },
    {
      id: 5,
      logo: { placeholderImage },
      name: "MSFT",
      symbol: "MSFT",
      price: 150.25,
      pct: 30.1,
    },
    // Add more stocks as needed
  ]);
  const handleAddStock = (stockName, stockPrice) => {
    const newStock = {
      id: watchlistStocks.length + 1,
      name: stockName,
      symbol: "DEF", // Default to "DEF" if no name is provided
      price: stockPrice,
      pct: 0, // Default percentage to 0
    };
    setWatchlistStocks([...watchlistStocks, newStock]);
  };
  const handleHorizantalScroll = (element, speed, distance, step) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
      if (element.scrollLeft === 0) {
        setArrowDisable(true);
      } else {
        setArrowDisable(false);
      }
    }, speed);
  };

  return (
    <div className="container mx-auto mt-4 flex flex-col">
      <h1 className="text-2xl font-bold ">My Stock Portfolio</h1>
      <div className="w-full h-full rounded-md  p-8 border-2 bg-white mt-12 flex flex-row items-center">
        <div className="items-center mr-4">
          <button
            className="text-3xl text-gray-500 bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center p-1 pb-2 pr-2"
            onClick={() => {
              handleHorizantalScroll(elementRef.current, 25, 100, -10);
            }}
            disabled={arrowDisable}
            style={{ lineHeight: 1 }} // Set line height to 0 to ensure centering
          >
            {"<"}
          </button>
        </div>

        <div className="flex portfolio-scroll-container" ref={elementRef}>
          {stocksData.map((stock, index) => (
            <Stock
              key={index}
              name={stock.name}
              price={stock.price}
              totalAmount={stock.totalAmount}
              returnRate={stock.returnRate}
              miniChart={stock.miniChart}
            />
          ))}
        </div>
        <div className="items-center ml-4">
          <button
            className="text-3xl text-gray-500 bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center p-1 pb-2 pl-1"
            // Toggle the modal state when the button is clicked
            onClick={() => {
              handleHorizantalScroll(elementRef.current, 25, 100, 10);
            }}
            style={{ lineHeight: 1 }}
          >
            {">"}
          </button>
        </div>
      </div>
      <div className="flex flex-row ">
        <div className=" w-full h-full rounded-md  p-8 border-2 bg-white mt-4 mr-4 flex-0 ">
          {/* <img
            src={placeholderImage}
            alt="Placeholder Chart"
            className="w-full h-200px "
          /> */}
          <TemplateChart></TemplateChart>
        </div>

        <div className=" w-full h-full rounded-md  p-8 border-2 bg-white mt-4 ml-4 flex-1 ">
          <Watchlist stocks={watchlistStocks} onAddStock={handleAddStock} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
