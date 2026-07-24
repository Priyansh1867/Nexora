import { useState } from "react";
import {
  Filter,
  Search,
  SlidersHorizontal,
} from "lucide-react";

function SearchBar({ onSearch, onCategoryClick, onFilterClick }) {
  const [query, setQuery] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      if (onSearch) onSearch(query.trim());
    }
  };

  const handleSearchClick = () => {
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  return (
    <section className="rounded-[28px] border border-[#EDF1F4] bg-white p-6 shadow-sm">

      <div className="flex flex-col gap-5 lg:flex-row">

        <div className="relative flex-1">

          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search and play YouTube playlists dynamically (e.g. React 19, Python, NodeJS)..."
            className="h-14 w-full rounded-2xl border border-[#E5E7EB] pl-14 pr-24 outline-none transition focus:border-[#428475]"
          />

          <button
            onClick={handleSearchClick}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#428475] text-white rounded-xl text-xs font-bold transition hover:bg-[#1A312C] cursor-pointer"
          >
            Search
          </button>

        </div>

        <button 
          onClick={onCategoryClick}
          className="flex h-14 items-center gap-2 rounded-2xl border border-[#E5E7EB] px-6 font-semibold transition hover:border-[#428475] cursor-pointer">

          <Filter size={18} />

          Category

        </button>

        <button 
          onClick={onFilterClick}
          className="flex h-14 items-center gap-2 rounded-2xl border border-[#E5E7EB] px-6 font-semibold transition hover:border-[#428475] cursor-pointer">

          <SlidersHorizontal size={18} />

          Filters

        </button>

      </div>

    </section>
  );
}

export default SearchBar;