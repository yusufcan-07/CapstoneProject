import axios from "axios";

export async function fetchStockPrice(name) {
  const proxyUrl = "https://api.allorigins.win/get?url=";
  const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${name}.IS?region=US&lang=en-US&includePrePost=false&interval=2m&useYfid=true&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance`;
  const url = `${proxyUrl}${encodeURIComponent(yahooUrl)}`;

  try {
    const response = await axios.get(url);
    const contents = JSON.parse(response.data.contents); // assuming allorigins.win wraps the response in a contents property
    const regularMarketPrice = contents.chart.result[0].meta.regularMarketPrice;
    return regularMarketPrice;
  } catch (error) {
    console.error("Failed to fetch the stock price:", error);
    throw error; // It's often good practice to re-throw the error to allow for further handling up the call stack
  }
}
