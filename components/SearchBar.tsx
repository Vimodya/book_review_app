import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery) {
      onSearch(searchQuery); // Pass the search query to the parent component
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search for items..."
        className="hidden sm:block md:w-[250px] lg:w-[500px] px-4 py-2 rounded-l-md text-xs border border-gray-300 focus:outline-none"
      />
      <button
        onClick={handleSearchSubmit}
        className="px-4 py-2 bg-[#a58a72] text-white rounded-r-md"
      >
        <FiSearch size={18} />
      </button>
    </div>
  );
}
