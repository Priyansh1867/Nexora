import {
  ArrowRight,
  Clock3,
  Play,
} from "lucide-react";

function ContinueCard({
  title,
  instructor,
  progress,
  duration,
  image,
  onContinue,
}) {
  return (
    <div
      className="
      overflow-hidden
      rounded-[30px]
      border
      border-[#EDF1F4]
      bg-white
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      "
    >
      <div
        onClick={onContinue}
        className="relative h-48 bg-[#EEF8F4] cursor-pointer hover:opacity-90 transition"
      >
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Play
              size={42}
              className="text-[#428475]"
            />
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent duplicate triggers since container is clickable
            onContinue();
          }}
          className="
          absolute
          bottom-5
          right-5
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-white
          shadow-lg
          transition
          hover:scale-105
          cursor-pointer
          "
        >
          <Play
            size={20}
            className="fill-[#428475] text-[#428475]"
          />
        </button>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-[#172033] line-clamp-2 leading-snug">
          {title}
        </h3>

        <p className="mt-2 text-gray-500">
          {instructor}
        </p>

        <div className="mt-6">
          <div className="mb-2 flex justify-between text-sm">
            <span>Progress</span>

            <span>{progress}%</span>
          </div>

          <div className="h-2 rounded-full bg-[#E7ECEF]">
            <div
              className="h-full rounded-full bg-[#428475]"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-gray-500">
            <Clock3 size={16} />
            <span className="whitespace-nowrap">{duration}</span>
          </div>

          <button
            onClick={onContinue}
            className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#428475] transition hover:gap-2 cursor-pointer"
          >
            <span className="whitespace-nowrap">Continue</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContinueCard;