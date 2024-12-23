import React from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
  return (
    <div>
      <div className="flex items-center ">
        <input
          type="text"
          placeholder="Search for items..."
          className="hidden sm:block md:w-[250px] lg:w-[500px] px-4 py-2 rounded-l-md text-xs border border-gray-300 focus:outline-none"
        />
        <button className="px-4 py-2 bg-[#a58a72] text-white rounded-r-md">
          <FiSearch size={18} />
        </button>
      </div>
    </div>
  );
}
