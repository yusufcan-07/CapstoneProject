import "./Searchbar.css";
import Result from "./Result";

export default function SearchResults({ searchResults }) {
  return (
    <div className="search-results">
      {searchResults.map((result, id) => {
        return <Result result={result} key={id} />;
      })}
    </div>
  );
}


