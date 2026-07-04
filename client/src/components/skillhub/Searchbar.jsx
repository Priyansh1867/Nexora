import { useState } from "react";
import { Search } from "lucide-react";

function SearchBar({ searchQuery = "", onSearchChange, onSearchSubmit }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearchSubmit) {
      onSearchSubmit(searchQuery);
    }
  };

  return (
    <section className="rounded-[28px] border border-[#EDF1F4] bg-white p-6 shadow-sm">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search courses, technologies, or YouTube playlists..."
            className="h-14 w-full rounded-2xl border border-[#E5E7EB] pl-14 pr-5 outline-none transition focus:border-[#428475] text-sm"
          />
        </div>

        <button
          type="button"
          onClick={() => onSearchSubmit && onSearchSubmit(searchQuery)}
          className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#428475] text-white px-8 font-bold transition hover:bg-[#1a312c] cursor-pointer shadow-md text-sm shrink-0"
        >
          <Search size={18} />
          Search
        </button>
      </div>
    </section>
  );
}

export default SearchBar;