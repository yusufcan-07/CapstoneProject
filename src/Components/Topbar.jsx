import { Search, Bell, ChevronDown } from "lucide-react";
import SearchBar from "./Searchbar/Searchbar";
import { React, useState, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import SearchResults from "./Searchbar/SearchResult";
import { useContext } from "react";
import { UserContext } from "../Config/UserContext";

export default function Topbar() {
  const { profile } = useContext(UserContext);

  const [searchResults, setSearchResults] = useState([]);

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <div className="bg-[#FFFFFF] w-full topbar-height fixed top-0 left-0 shadow-md p-4 ">
      <div className="ml-80 flex place-content-between">
        <div>
          <SearchBar setSearchResults={setSearchResults} />
          <SearchResults searchResults={searchResults} />
        </div>
        <div className="flex space-x-2">
          <div className="mt-2">
            <Bell size={24} />
          </div>
          <Avatar
            {...(profile
              ? { src: profile.photoURL }
              : stringAvatar(profile.displayName || "User"))}
          />
          <div className="flex ml-4 mx-2 mt-2">
            {profile ? profile.displayName : "User"}
            <ChevronDown size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}
