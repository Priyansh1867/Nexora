import {
  ArrowUpRight,
  Flame,
  TrendingUp,
} from "lucide-react";

function TrendingSkillCard({
  title,
  learners,
  growth,
  color = "#428475",
}) {
  return (
    <div
      className="
      rounded-3xl
      border
      border-[#EDF1F4]
      bg-white
      p-6
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      flex
      flex-col
      justify-between
      h-full
      "
    >
      <div className="flex items-center justify-between">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shrink-0"
          style={{
            backgroundColor: color,
          }}
        >
          <Flame size={24} />
        </div>

        <div className="rounded-full bg-[#EEF8F4] px-3 py-1.5 text-xs font-bold text-[#428475] shrink-0">
          +{growth}%
        </div>
      </div>

      <div className="mt-6 mb-2">
        <h3 className="text-xl font-bold text-[#172033] truncate" title={title}>
          {title}
        </h3>
        <p className="mt-1.5 text-sm font-medium text-gray-500">
          {learners.toLocaleString()} Learners
        </p>
      </div>

      <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm font-bold text-[#428475]">
          <TrendingUp size={16} />
          Trending
        </div>

        <button
          className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-[#EEF8F4]
          transition
          hover:scale-105
          hover:bg-[#428475]
          hover:text-white
          text-[#428475]
          group
          "
        >
          <ArrowUpRight
            size={18}
            className="transition-colors group-hover:text-white"
          />
        </button>
      </div>
    </div>
  );
}

export default TrendingSkillCard;