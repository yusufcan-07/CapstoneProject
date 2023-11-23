import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

export default function DonutChart() {
  ChartJS.register(ArcElement, Tooltip, Legend);

  var stockData = {
    labels: ["DOHOL", "ASELS", "IZENR", "TATEN", "ENERY"],
    prices: [10, 25, 15, 15, 35],
  };

  return (
    <div>
      <Doughnut
        data={{
          labels: stockData.labels,
          datasets: [
            {
              label: "%",
              data: stockData.prices,
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
