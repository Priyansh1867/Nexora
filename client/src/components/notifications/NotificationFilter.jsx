import { useState } from "react";

const filters = [
  "All",
  "Unread",
  "Projects",
  "Teams",
  "Messages",
  "Achievements",
  "System",
];

function NotificationFilter() {
  const [active, setActive] = useState("All");

  return (
    <section className="flex flex-wrap gap-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActive(filter)}
          className={`rounded-full px-6 py-3 text-sm font-semibold transition ${
            active === filter
              ? "bg-[#428475] text-white shadow-lg"
              : "border border-[#E5E7EB] bg-white hover:border-[#428475] hover:text-[#428475]"
          }`}
        >
          {filter}
        </button>
      ))}
    </section>
  );
}

export default NotificationFilter;