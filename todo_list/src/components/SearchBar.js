// src/components/SearchBar.js
import React from "react";

function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search tasks..."
      className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
    />
  );
}

export default SearchBar;
