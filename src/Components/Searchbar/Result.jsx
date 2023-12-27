import { useState, useEffect } from 'react';

export default function Result({ result }) {
  const [openPrice, setOpenPrice] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://scanner.tradingview.com/symbol?symbol=BIST:${result.stockCode}&fields=open`);
        const data = await response.json();
        if (data && data.open) {
          setOpenPrice(parseFloat(data.open).toFixed(2));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [result.stockCode]);

  const handleItemClick = (e) => {
    // Save result.stockName into local storage
    localStorage.setItem('selectedStockName', result.stockCode);
    // Refresh the page
    window.location.reload();
  };

  return (
    <div className="result flex items-center" onClick={handleItemClick}>
      <img
        src={result.stockImage}
        alt={result.stockName}
        className="rounded-full w-16 h-16"
      />
      <span className="stock-name p-2">{result.stockName}</span>
      <span className="ml-auto">{openPrice}</span>
    </div>
  );
}
