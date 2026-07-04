import {
  ArrowRight,
  Bookmark,
  Star,
  TrendingUp,
} from "lucide-react";

function FeaturedCard({
  title,
  description,
  category,
  author,
  rating,
  image,
  onReadClick,
  isBookmarked,
  onBookmarkToggle,
}) {
  return (
    <div
      className="
      overflow-hidden
      rounded-[32px]
      border
      border-[#EDF1F4]
      bg-white
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      "
    >
      <div className="grid lg:grid-cols-[340px_1fr]">
        <div className="h-[280px] bg-[#EEF8F4]">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <TrendingUp
                size={80}
                className="text-[#428475]"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between p-8">
          <div>
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[#EEF8F4] px-4 py-2 text-sm font-semibold text-[#428475]">
                {category}
              </span>

              <button
                onClick={onBookmarkToggle}
                className="transition hover:scale-110 cursor-pointer"
              >
                <Bookmark
                  size={22}
                  className={isBookmarked ? "fill-[#428475] text-[#428475]" : "text-gray-400"}
                />
              </button>
            </div>

            <h2 className="mt-7 text-3xl font-bold text-[#172033] leading-tight">
              {title}
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              {description}
            </p>
          </div>

          <div>
            <div className="mt-8 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Author
                </p>

                <h4 className="mt-1 font-semibold text-[#172033]">
                  {author}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <Star
                  size={18}
                  className="fill-yellow-400 text-yellow-400"
                />

                <span className="font-semibold">
                  {rating}
                </span>
              </div>
            </div>

            <button
              onClick={onReadClick}
              className="mt-8 flex items-center gap-2 rounded-xl bg-[#16332D] px-6 py-3 font-semibold text-white transition hover:bg-[#214740] cursor-pointer"
            >
              Read Now

              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedCard;