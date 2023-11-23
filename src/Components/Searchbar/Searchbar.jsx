import { useState } from "react";
import { Search } from "lucide-react";
import "./Searchbar.css";
import stockData from "../../Assets/stocks.json";

export default function SearchBar({ setSearchResults }) {
  const [input, setInput] = useState("");
  function fetchData(value) {
    const results = stockData.filter((data) => {
      return (
        value &&
        data &&
        data.stockCode &&
        data.stockName.toLowerCase().includes(value)
      );
    });
    setSearchResults(results);
  }

  function handleChange(value) {
    setInput(value);
    fetchData(value);
  }

  return (
    <div className="input-wrapper">
      <Search size={22} />
      <input
        placeholder="Search for various stocks"
        className="input"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}

/*

<div className="bg-[#F5F7F9] h-10 w-1/4 ml-10 rounded-lg flex items-center text-[#959798] space-x-2">
        <button>
          <Search size={22} />
        </button>
        <input
          className="bg-[#F5F7F9] w-full text-black"
          type="text"
          placeholder="Search for various stocks"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

*/
