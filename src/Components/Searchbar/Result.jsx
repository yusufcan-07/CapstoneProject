import "./Searchbar.css";

export default function Result({ result }) {
  return (
    <div className="result flex items-center" onClick={(e) => alert(`You selected ${result.stockName}!`)}>
      <img
        src={result.stockImage}
        alt={result.stockName}
        className="rounded-full"
        width={64}
        height={64}
      />
      <span className="stock-name p-2">{result.stockName}</span>
    </div>
  );
}
