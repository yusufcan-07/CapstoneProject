import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
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
  );
}
