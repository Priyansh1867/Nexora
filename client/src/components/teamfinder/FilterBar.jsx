const filters = [
  "All",
  "Frontend",
  "Backend",
  "AI / ML",
  "UI / UX",
  "DevOps",
];

function FilterBar({ activeFilter = "All", onFilterChange }) {
  return (
    <section className="flex flex-wrap gap-4">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => onFilterChange && onFilterChange(filter)}
          className={`rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeFilter === filter
              ? "bg-[#428475] text-white shadow-lg"
              : "bg-white border border-[#E5E7EB] text-[#172033] hover:border-[#428475] hover:text-[#428475]"
          }`}
        >
          {filter}
        </button>
      ))}
    </section>
  );
}

export default FilterBar;