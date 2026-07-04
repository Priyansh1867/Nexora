import {
  ArrowRight,
  BookOpen,
  Clock3,
  PlayCircle,
  Star,
} from "lucide-react";

function CourseCard({
  title,
  instructor,
  category,
  duration,
  rating,
  students,
  lessons,
  image,
  onStart,
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
        onClick={onStart}
        className="relative h-52 bg-[#EEF8F4] cursor-pointer hover:opacity-90 transition"
      >
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <PlayCircle
              size={52}
              className="text-[#428475]"
            />
          </div>
        )}

        <span className="absolute left-5 top-5 rounded-full bg-[#16332D] px-4 py-2 text-xs font-semibold text-white">
          {category}
        </span>
      </div>

      <div className="p-7">
        <h3 className="text-2xl font-bold text-[#172033] leading-8">
          {title}
        </h3>

        <p className="mt-2 text-gray-500">
          {instructor}
        </p>

        <div className="mt-6 flex flex-wrap gap-5 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Clock3 size={16} />
            {duration}
          </div>

          <div className="flex items-center gap-2">
            <BookOpen size={16} />
            {lessons} Lessons
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Star
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />

              <span className="font-semibold">
                {rating}
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              {students} Students
            </p>
          </div>

          <button
            onClick={onStart}
            className="flex items-center gap-2 font-semibold text-[#428475] transition hover:gap-3 cursor-pointer"
          >
            Start

            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;