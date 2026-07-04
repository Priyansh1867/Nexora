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
      rounded-[28px]
      border
      border-[#EDF1F4]
      bg-white
      p-7
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      "
    >
      <div className="flex items-center justify-between">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl text-white"
          style={{
            backgroundColor: color,
          }}
        >
          <Flame size={28} />
        </div>

        <div className="rounded-full bg-[#EEF8F4] px-3 py-2 text-sm font-semibold text-[#428475]">
          +{growth}%
        </div>
      </div>

      <h3 className="mt-7 text-2xl font-bold text-[#172033]">
        {title}
      </h3>

      <p className="mt-2 text-gray-500">
        {learners.toLocaleString()} Learners
      </p>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#428475]">
          <TrendingUp size={18} />

          Trending
        </div>

        <button
          className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          bg-[#EEF8F4]
          transition
          hover:scale-105
          "
        >
          <ArrowUpRight
            size={20}
            className="text-[#428475]"
          />
        </button>
      </div>
    </div>
  );
}

export default TrendingSkillCard;