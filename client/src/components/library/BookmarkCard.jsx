import {
  BookmarkCheck,
  Clock3,
  ExternalLink,
  Trash2,
} from "lucide-react";

function BookmarkCard({
  title,
  category,
  author,
  savedOn,
  onOpen,
  onRemove,
}) {
  return (
    <div
      className="
      rounded-[30px]
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
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF8F4]">
            <BookmarkCheck
              size={30}
              className="text-[#428475]"
            />
          </div>

          <div>
            <span className="rounded-full bg-[#EEF8F4] px-3 py-1 text-xs font-semibold text-[#428475]">
              {category}
            </span>

            <h3 className="mt-3 text-xl font-bold text-[#172033]">
              {title}
            </h3>

            <p className="mt-2 text-gray-500">
              {author}
            </p>
          </div>
        </div>

        <button
          onClick={onRemove}
          className="rounded-xl p-2 transition hover:bg-red-50 hover:text-red-500 cursor-pointer"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock3 size={16} />

          Saved {savedOn}
        </div>

        <button
          onClick={onOpen}
          className="flex items-center gap-2 rounded-xl bg-[#16332D] px-5 py-3 font-semibold text-white transition hover:bg-[#214740] cursor-pointer"
        >
          Open

          <ExternalLink size={17} />
        </button>
      </div>
    </div>
  );
}

export default BookmarkCard;