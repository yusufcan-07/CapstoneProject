import { Search, Bell, ChevronDown } from "lucide-react";
import SearchBar from "./Searchbar";
import { React, useState, useRef } from "react";
export default function Topbar() {
  const [searchResults, setSearchResults] = useState([]);


  const handleSearch = (query) => {
    // Implement your search logic here
    // You can use the 'query' to search for results and update 'searchResults' accordingly.
  };

  return (
    <div className="bg-[#FFFFFF] w-full topbar-height fixed top-0 left-0 shadow-md p-4 ">
      <div className="ml-80 flex items-center place-content-between">
        <SearchBar onSearch={handleSearch} />
        <div className="flex items-center">
          <div>
            <Bell size={24} />
          </div>
          <div className="bg-black rounded-full w-10 h-10 mx-auto my-4 ml-4" />
          <div className="flex ml-4 mx-2">
            Aurobindo Gill
            <ChevronDown size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}
