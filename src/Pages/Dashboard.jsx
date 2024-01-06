/*Dashboard.jsx*/
import Stock from "../Components/Stock";
import React, { useRef, useState, useEffect, useContext } from "react";
import Watchlist from "../Components/Watchlist";
import placeholderImage from "../Assets/chart.png";
import TemplateChart from "../Components/TemplateChart";
import { db } from "../Config/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { UserContext } from "../Config/UserContext";
import { fetchStockPrice } from "../Config/price_fetcher";
const Dashboard = () => {
  const elementRef = useRef(null);
  const [arrowDisable, setArrowDisable] = useState(true);
  const { isAuth, setIsAuth, profile, setProfile } = useContext(UserContext);
  const [portfolioData, setPortfolioData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [watchlistStocks, setWatchlistStocks] = useState([]);
  const handleWatchlistAddStock = async (stockName, stockPrice) => {
    const newStock = {
      name: stockName,
      symbol: stockName,
      price: stockPrice,
    };
    try {
      const docRef = await addDoc(
        collection(db, `${profile.email}/watchlist/stocks`),
        newStock
      );
      setWatchlistStocks((prevWatchlist) => [
        ...prevWatchlist,
        { ...newStock, id: docRef.id },
      ]);
    } catch (error) {
      console.error("Error adding stock to Firebase: ", error);
    }
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
      const tradesList = await Promise.all(
        tradesSnapshot.docs.map(async (doc) => {
          const trade = doc.data();
          const livePrice = await fetchStockPrice(trade.stockName);
          return {
            ...trade,
            livePrice: livePrice || trade.buyPrice, // Fallback to buyPrice if livePrice is not available
          };
        })
      );
      return tradesList;
    } catch (error) {
      console.error("Error fetching trades from Firebase: ", error);
      return []; // Return an empty array in case of error
    }
  };

  const fetchWatchlistFromFirebase = async () => {
    try {
      const watchlistCollectionRef = collection(
        db,
        `${profile.email}/watchlist/stocks`
      );
      const watchlistSnapshot = await getDocs(watchlistCollectionRef);
      const watchlist = await Promise.all(
        watchlistSnapshot.docs.map(async (doc) => {
          const stock = doc.data();
          const livePrice = await fetchStockPrice(stock.symbol);
          return {
            id: doc.id,
            ...stock,
            livePrice: livePrice || stock.price, // Fallback to stored price if livePrice is not available
          };
        })
      );
      setWatchlistStocks(watchlist);
    } catch (error) {
      console.error("Error fetching watchlist from Firebase: ", error);
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
    if (isAuth) {
      fetchWatchlistFromFirebase();
    }
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
        <div className="text-center p-4 text-2xl">
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
  const renderWatchlist = () => {
    if (loading && isAuth) {
      return <div className="text-center  p-4">Loading your Watchlist...</div>;
    }
    if (!isAuth && !loading) {
      return (
        <div className="text-red-500  font-bold">
          Please login or register to view your watchlist.
        </div>
      );
    }
    if (portfolioData.length === 0 && !loading) {
      return (
        <div className="text-center p-4 ">
          Your Watchlist is empty. Start adding stocks!
        </div>
      );
    }
    return (
      <Watchlist
        stocks={watchlistStocks}
        onAddStock={handleWatchlistAddStock}
      />
    );
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
          {renderWatchlist()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
