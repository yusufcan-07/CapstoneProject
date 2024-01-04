/*Dashboard.jsx*/
import Stock from "../Components/Stock";
import React, { useRef, useState, useEffect, useContext } from "react";
import Watchlist from "../Components/Watchlist";
import placeholderImage from "../Assets/chart.png";
import TemplateChart from "../Components/TemplateChart";
import { db } from "../Config/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { UserContext } from "../Config/UserContext";
const Dashboard = () => {
  const elementRef = useRef(null);
  const [arrowDisable, setArrowDisable] = useState(true);
  const { isAuth, setIsAuth, profile, setProfile } = useContext(UserContext);
  const [portfolioData, setPortfolioData] = useState([]);
  const [loading, setLoading] = useState(true);
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
  const fetchTradesFromFirebase = async () => {
    try {
      const tradesCollectionRef = collection(
        db,
        `${profile.email}/tradeHistory/trades`
      );
      const tradesSnapshot = await getDocs(tradesCollectionRef);
      const tradesList = tradesSnapshot.docs.map((doc) => doc.data());
      return tradesList;
    } catch (error) {
      console.error("Error fetching trades from Firebase: ", error);
      return []; // Return an empty array in case of error
    }
  };
  // Fetch trades from Firebase and calculate portfolio data
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false); // Set loading state to false after 5 seconds
    }, 1000);
    const getTrades = async () => {
      if (isAuth) {
        // Ensure that the user is authenticated
        const trades = await fetchTradesFromFirebase();
        const calculatedPortfolioData = trades.map((trade) => {
          const totalAmount = trade.livePrice * trade.amount;
          const totalReturn = (
            (trade.livePrice / trade.buyPrice - 1) *
            100
          ).toFixed(2); // Rounded to two decimals
          return {
            ...trade,
            totalAmount: Number(totalAmount),
            returnRate: Number(totalReturn),
            // Assuming you want to use the stockName as the name for the Stock component
            name: trade.stockName,
            price: trade.livePrice,
          };
        });
        setPortfolioData(calculatedPortfolioData);
      }
    };

    getTrades();
    return () => clearTimeout(timer);
  }, [isAuth]);
  const renderPortfolio = () => {
    if (loading && isAuth) {
      return (
        <div className="text-center text-2xl p-4">
          Loading your portfolio...
        </div>
      );
    }

    // Once loading is complete, check for authentication
    if (!isAuth && !loading) {
      return (
        <div className="text-red-500 text-2xl font-bold">
          Please login or register to view your portfolio.
        </div>
      );
    }

    // If authenticated and portfolio is empty
    if (portfolioData.length === 0 && !loading) {
      return (
        <div className="text-center p-4">
          Your portfolio is empty. Start adding trades!
        </div>
      );
    }
    return portfolioData.map((stock, index) => (
      <Stock
        key={index}
        name={stock.name}
        price={stock.price}
        totalAmount={stock.totalAmount}
        returnRate={stock.returnRate}
      />
    ));
  };
  return (
    <div className="container mx-auto mt-4 flex flex-col">
      <h1 className="text-2xl font-bold ">Kullanıcı Portföyü</h1>
      <div className="w-full h-full rounded-md  p-8 border-2 bg-white mt-12 flex flex-row items-center justify-between">
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
          {renderPortfolio()}
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
