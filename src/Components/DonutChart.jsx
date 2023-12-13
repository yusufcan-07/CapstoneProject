import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

export default function DonutChart({ tradeHistoryData }) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  // Extract labels and prices from tradeHistoryData
  const labels = tradeHistoryData.map((trade) => trade.stockName);
  const prices = tradeHistoryData.map((trade) => trade.amount);

  return (
    <div>
      <Doughnut
        data={{
          labels: labels,
          datasets: [
            {
              label: "%",
              data: prices,
              backgroundColor: [
                "rgba(202, 240, 248, 1)",
                "rgba(72, 202, 228, 1)",
                "rgba(144, 224, 239, 1)",
                "rgba(173, 232, 244, 1)",
                "rgba(0, 134, 176, 1)",
              ],
              borderColor: [
                "rgba(202, 240, 248, 1)",
                "rgba(72, 202, 228, 1)",
                "rgba(144, 224, 239, 1)",
                "rgba(173, 232, 244, 1)",
                "rgba(0, 134, 176, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
}
