import { useState } from "react";

const SearchBar = ({ onSearch, placeholder = "Search books..." }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="form-control"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              onSearch("");
            }}
            className="btn btn-secondary"
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
