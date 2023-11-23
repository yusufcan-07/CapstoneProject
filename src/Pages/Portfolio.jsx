import ApexChart from "../Components/PortfolioChart";

export default function Portfolio() {
  // Dummy trade history data
  const tradeHistoryData = [
    {
      stockName: "Stock A",
      amount: 10,
      buyPrice: 100,
      livePrice: 120,
      profitLoss: 200,
      dateTime: "2023-01-01 12:30",
    },
    {
      stockName: "Stock B",
      amount: 15,
      buyPrice: 150,
      livePrice: 140,
      profitLoss: -50,
      dateTime: "2023-01-02 14:45",
    },
    // Add more trade history data as needed
  ];

  return (
    <div className="content">
      <div>
        <h1 className="text-3xl font-bold mb-4">Portfolio</h1>
        <div style={{ marginLeft: "auto", width: "60%" }}>
          <ApexChart />
        </div>
      </div>
      <div style={{ backgroundColor: "#c3e5fe" }}>
        <h2 className="text-lg font-bold mb-4 pb-4">Trade History</h2>
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
            >
              <div className="flex-1 text-center">{trade.stockName}</div>
              <div className="flex-1 text-center">{trade.amount}</div>
              <div className="flex-1 text-center">${trade.buyPrice}</div>
              <div className="flex-1 text-center">${trade.livePrice}</div>
              <div
                className={`flex-1 text-center ${
                  trade.profitLoss >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                ${trade.profitLoss}
              </div>
              <div
                className={`flex-1 text-center ${
                  trade.profitLoss >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {((trade.livePrice / trade.buyPrice - 1) * 100).toFixed(2)}%
              </div>
              <div className="flex-1 text-center">{trade.dateTime}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
