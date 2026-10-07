import { useState } from "react";

function SearchBar({ onSearch }) {
    const [searchText, setSearchText] = useState("");

    const handleSearch = () => {
        if (searchText.trim() !== "") {
            onSearch(searchText);
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search for a movie..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />

            <button onClick={handleSearch}>
                Search
            </button>
        </div>
    );
}

export default SearchBar;