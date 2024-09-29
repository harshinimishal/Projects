// src/components/SortOptions.js
import React from "react";

function SortOptions({ sortOption, setSortOption }) {
  return (
    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
    >
      <option value="date">Sort by Due Date</option>
      <option value="priority">Sort by Priority</option>
    </select>
  );
}

export default SortOptions;
