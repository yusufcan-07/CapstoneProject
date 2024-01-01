import ApexChart from "../Components/PortfolioChart";
import DonutChart from "../Components/DonutChart";
import PortfolioPlusButton from "../Components/Buttons/Portfolio_plus_button";
import { useState, useEffect, useContext } from "react";
import { db } from "../Config/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { UserContext } from "../Config/UserContext";
export default function Portfolio() {
  const { isAuth, setIsAuth, profile, setProfile, loading } =
    useContext(UserContext);
  const [tradeHistoryData, setTradeHistoryData] = useState([]);
  const handleAddTrade = async (newTrade) => {
    console.log(
      "Adding new trade for UID: ",
      profile.uid,
      "Trade data: ",
      newTrade
    ); // Log the UID and trade
    const tradesCollectionRef = collection(
      db,
      `${profile.email}/tradeHistory/trades`
    );
    await addDoc(tradesCollectionRef, newTrade);
    setTradeHistoryData([...tradeHistoryData, newTrade]);
  };

  const loadTradeData = async () => {
    console.log("Loading trade data for UID: ", profile.uid);
    const tradesCollectionRef = collection(
      db,
      `${profile.email}/tradeHistory/trades`
    );
    const q = query(tradesCollectionRef);
    const querySnapshot = await getDocs(q);
    const trades = [];
    querySnapshot.forEach((doc) => {
      trades.push(doc.data());
    });
    setTradeHistoryData(trades);
  };
  useEffect(() => {
    if (!loading && profile && profile.uid) {
      console.log("Profile is loaded, UID: ", profile.uid);
      loadTradeData();
    }
  }, [profile, loading]);

  return (
    <div className="content">
      <h1 className="text-3xl font-bold mb-4">Portfolio</h1>
      <div className="flex">
        <div
          className="border-2 rounded-md m-4 p-2"
          style={{
            flex: "0.5",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DonutChart tradeHistoryData={tradeHistoryData} />
        </div>
        <div className="border-2 rounded-md m-4 p-2" style={{ flex: "1" }}>
          <ApexChart tradeHistoryData={tradeHistoryData} />
        </div>
      </div>

      <div className="m-4 p-2 border-2 rounded-md">
        <div className="flex items-center justify-between m-4">
          <h2 className="text-lg font-bold">Trade History</h2>
          <PortfolioPlusButton onAddTrade={handleAddTrade} />
        </div>
        <div className="flex flex-col">
          <div className="flex font-bold p-3 m-3 border-2 border-black">
            <div className="flex-1 text-center">Stock Name</div>
            <div className="flex-1 text-center">Amount</div>
            <div className="flex-1 text-center">Buy Price</div>
            <div className="flex-1 text-center">Live Price</div>
            <div className="flex-1 text-center">Profit/Loss</div>
            <div className="flex-1 text-center">Percentage</div>
            <div className="flex-1 text-center">Date and Time</div>
          </div>
          {tradeHistoryData.map((trade, index) => (
            <div
              key={index}
              className="flex items-center border-black border-2 p-3 m-3 rounded-full"
              style={{ backgroundColor: "#f5f7f9" }}
            >
              <div className="flex-1 text-center">{trade.stockName}</div>
              <div className="flex-1 text-center">{trade.amount}</div>
              <div className="flex-1 text-center">${trade.buyPrice}</div>
              <div className="flex-1 text-center">${trade.livePrice}</div>
              <div
                className={`flex-1 text-center ${
                  (trade.livePrice - trade.buyPrice) * trade.amount === 0
                    ? "text-gray-500"
                    : (trade.livePrice - trade.buyPrice) * trade.amount > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                ${(trade.livePrice - trade.buyPrice) * trade.amount}
              </div>
              <div
                className={`flex-1 text-center ${
                  (trade.livePrice / trade.buyPrice - 1) * 100 === 0
                    ? "text-gray-500"
                    : ((trade.livePrice / trade.buyPrice - 1) * 100).toFixed(
                        1
                      ) > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {((trade.livePrice / trade.buyPrice - 1) * 100).toFixed(1)}%
              </div>
              <div className="flex-1 text-center">{trade.dateTime}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
