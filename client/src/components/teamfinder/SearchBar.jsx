import { useState } from "react";
import { Filter, Search, SlidersHorizontal, Check } from "lucide-react";

const AVAILABLE_SKILLS = [
  "React",
  "Node.js",
  "Python",
  "JavaScript",
  "Tailwind",
  "PostgreSQL",
  "TensorFlow",
  "Machine Learning",
  "UI / UX",
  "DevOps",
];

function SearchBar({
  searchQuery = "",
  onSearchChange,
  selectedSkills = [],
  onSkillToggle,
  experienceFilter = "All",
  onExperienceChange,
  availabilityFilter = "All",
  onAvailabilityChange,
}) {
  const [showSkillsPanel, setShowSkillsPanel] = useState(false);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  return (
    <section className="rounded-[28px] border border-[#EDF1F4] bg-white p-6 shadow-sm space-y-4">
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search students, skills, colleges..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-14 w-full rounded-2xl border border-[#E5E7EB] pl-14 pr-5 outline-none transition focus:border-[#428475] text-sm"
          />
        </div>

        <button
          type="button"
          onClick={() => {
            setShowSkillsPanel(!showSkillsPanel);
            setShowFiltersPanel(false);
          }}
          className={`flex h-14 items-center gap-2 rounded-2xl border px-6 font-semibold transition cursor-pointer ${
            showSkillsPanel || selectedSkills.length > 0
              ? "border-[#428475] bg-[#EEF8F4] text-[#428475]"
              : "border-[#E5E7EB] text-[#172033] hover:border-[#428475]"
          }`}
        >
          <Filter size={18} />
          Skills {selectedSkills.length > 0 && `(${selectedSkills.length})`}
        </button>

        <button
          type="button"
          onClick={() => {
            setShowFiltersPanel(!showFiltersPanel);
            setShowSkillsPanel(false);
          }}
          className={`flex h-14 items-center gap-2 rounded-2xl border px-6 font-semibold transition cursor-pointer ${
            showFiltersPanel || experienceFilter !== "All" || availabilityFilter !== "All"
              ? "border-[#428475] bg-[#EEF8F4] text-[#428475]"
              : "border-[#E5E7EB] text-[#172033] hover:border-[#428475]"
          }`}
        >
          <SlidersHorizontal size={18} />
          Filters
        </button>
      </div>

      {/* Skills Expansion Panel */}
      {showSkillsPanel && (
        <div className="rounded-2xl bg-[#F8FAFB] p-5 border border-[#EDF1F4] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-3 border-b border-gray-200/65 pb-2">
            <span className="text-xs font-bold text-gray-500 uppercase">Filter by Skills</span>
            {selectedSkills.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  AVAILABLE_SKILLS.forEach(skill => {
                    if (selectedSkills.includes(skill)) onSkillToggle(skill);
                  });
                }}
                className="text-[11px] font-bold text-red-500 hover:underline cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {AVAILABLE_SKILLS.map((skill) => {
              const active = selectedSkills.includes(skill);
              return (
                <button
                  type="button"
                  key={skill}
                  onClick={() => onSkillToggle(skill)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                    active
                      ? "bg-[#428475] text-white border-[#428475] shadow-sm"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {active && <Check size={12} />}
                  {skill}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Filters Expansion Panel */}
      {showFiltersPanel && (
        <div className="rounded-2xl bg-[#F8FAFB] p-5 border border-[#EDF1F4] grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-200">
          <div>
            <span className="block text-xs font-bold text-gray-500 uppercase mb-3">Experience Level</span>
            <div className="flex flex-wrap gap-2">
              {["All", "Advanced", "Intermediate"].map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => onExperienceChange(lvl)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                    experienceFilter === lvl
                      ? "bg-[#428475] text-white border-[#428475]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="block text-xs font-bold text-gray-500 uppercase mb-3">Teammate Availability</span>
            <div className="flex flex-wrap gap-2">
              {["All", "Available Only"].map((av) => (
                <button
                  type="button"
                  key={av}
                  onClick={() => onAvailabilityChange(av)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                    availabilityFilter === av
                      ? "bg-[#428475] text-white border-[#428475]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default SearchBar;