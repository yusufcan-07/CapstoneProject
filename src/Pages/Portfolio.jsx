import ApexChart from "../Components/PortfolioChart";
import DonutChart from "../Components/DonutChart";
import PortfolioPlusButton from "../Components/Buttons/Portfolio_plus_button";
import { useState, useEffect, useContext } from "react";
import { db } from "../Config/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { UserContext } from "../Config/UserContext";
import { fetchStockPrice } from "../Config/price_fetcher";
export default function Portfolio() {
  const { isAuth, setIsAuth, profile, setProfile, loading } =
    useContext(UserContext);
  const [tradeHistoryData, setTradeHistoryData] = useState([]);
  const [livePrices, setLivePrices] = useState({});
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
  const updateLivePrices = async () => {
    const prices = {};
    for (let trade of tradeHistoryData) {
      try {
        const price = await fetchStockPrice(trade.stockName);
        prices[trade.stockName] = price;
      } catch (error) {
        console.error(
          "Error fetching price for stock:",
          trade.stockName,
          error
        );
        prices[trade.stockName] = "Error"; // Handle as needed for your UI
      }
    }
    setLivePrices(prices);
  };
  useEffect(() => {
    if (!loading && profile && profile.uid) {
      console.log("Profile is loaded, UID: ", profile.uid);
      loadTradeData();
    }
  }, [profile, loading]);
  useEffect(() => {
    if (tradeHistoryData.length > 0) {
      updateLivePrices();
    }
  }, [tradeHistoryData]);

  return (
    <div className="content">
      <h1 className="text-3xl font-bold mb-4">Kullanıcı Portföyu</h1>
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
          {isAuth ? (
            <DonutChart tradeHistoryData={tradeHistoryData} />
          ) : (
            <p className="text-red-500 text-2xl font-bold">
              Please login or register to add your trades!
            </p>
          )}
        </div>
        <div className="border-2 rounded-md m-4 p-2" style={{ flex: "1" }}>
          <ApexChart
            tradeHistoryData={tradeHistoryData}
            livePrices={livePrices}
          />
        </div>
      </div>

      <div className="m-4 p-2 border-2 rounded-md">
        <div className="flex items-center justify-between m-4">
          <h2 className="text-lg font-bold">İşlem Geçmişi</h2>
          {isAuth ? (
            <PortfolioPlusButton onAddTrade={handleAddTrade} />
          ) : (
            <p className="text-red-500"></p>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex font-bold p-3 m-3 border-2 border-black">
            <div className="flex-1 text-center">Hisse Kodu</div>
            <div className="flex-1 text-center">Lot Sayısı</div>
            <div className="flex-1 text-center">Alış Fiyatı</div>
            <div className="flex-1 text-center">Canlı Fiyat</div>
            <div className="flex-1 text-center">Kar/Zarar</div>
            <div className="flex-1 text-center">Yüzdelik Değişim</div>
            <div className="flex-1 text-center">Tarih</div>
          </div>
          {tradeHistoryData.map((trade, index) => {
            const livePrice = livePrices[trade.stockName] || "Loading...";
            const profitLoss = (
              (livePrice - trade.buyPrice) *
              trade.amount
            ).toFixed(2);
            const percentChange = (
              (livePrice / trade.buyPrice - 1) * 100 || 0
            ).toFixed(1);

            return (
              <div
                key={index}
                className="flex items-center border-black border-2 p-3 m-3 rounded-full"
                style={{ backgroundColor: "#f5f7f9" }}
              >
                <div className="flex-1 text-center">{trade.stockName}</div>
                <div className="flex-1 text-center">{trade.amount}</div>
                <div className="flex-1 text-center">{trade.buyPrice}₺</div>
                <div className="flex-1 text-center">{livePrice}₺</div>
                <div
                  className={`flex-1 text-center ${
                    (livePrice - trade.buyPrice) * trade.amount === 0
                      ? "text-gray-500"
                      : (livePrice - trade.buyPrice) * trade.amount > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {((livePrice - trade.buyPrice) * trade.amount).toFixed(1)}₺
                </div>
                <div
                  className={`flex-1 text-center ${
                    (livePrice / trade.buyPrice - 1) * 100 === 0
                      ? "text-gray-500"
                      : ((livePrice / trade.buyPrice - 1) * 100).toFixed(1) > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {((livePrice / trade.buyPrice - 1) * 100).toFixed(1)}%
                </div>
                <div className="flex-1 text-center">{trade.dateTime}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
