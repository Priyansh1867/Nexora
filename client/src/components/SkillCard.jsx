import {
  TrendingUp,
  Star,
} from "lucide-react";

function SkillCard({
  skill,
  level = "Intermediate",
  progress = 75,
  isBookmarked = false,
  onBookmarkToggle,
}) {
  return (
    <div className="rounded-[24px] border border-[#EDF1F4] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#172033]">
          {skill}
        </h3>

        <button
          onClick={onBookmarkToggle}
          type="button"
          className="focus:outline-none cursor-pointer"
          title={isBookmarked ? "Remove Bookmark" : "Bookmark Skill"}
        >
          <Star
            size={18}
            className={`transition duration-200 hover:scale-110 ${
              isBookmarked 
                ? "fill-yellow-500 text-yellow-500" 
                : "text-gray-400 hover:text-yellow-500"
            }`}
          />
        </button>
      </div>

      <p className="mt-2 text-sm text-[#428475]">
        {level}
      </p>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-sm">
          <span>Progress</span>

          <span>{progress}%</span>
        </div>

        <div className="h-2 rounded-full bg-[#E8EDF0]">
          <div
            className="h-full rounded-full bg-[#428475]"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[#428475]">
        <TrendingUp size={16} />
        Improving
      </div>
    </div>
  );
}

export default SkillCard;