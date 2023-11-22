import ApexChart from "../Components/PortfolioChart";

// import PortfolioChart from "../Components/PortfolioChart";
export default function Portfolio() {
  return (
    <div>
      <div
        className="content"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h1>Portfolio</h1>
        <div style={{ marginLeft: "auto", width: "60%" }}>
          <ApexChart />
        </div>
      </div>
      <div>{/* Trades as a table */}</div>
    </div>
  );
}
