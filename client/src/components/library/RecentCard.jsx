import {
  Calendar,
  Clock3,
  FileText,
} from "lucide-react";

function RecentCard({
  title,
  category,
  uploadedBy,
  uploadDate,
  readTime,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="
      rounded-[28px]
      border
      border-[#EDF1F4]
      bg-white
      p-6
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-lg
      cursor-pointer
      "
    >
      <div className="flex items-start gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF8F4]">
          <FileText
            size={28}
            className="text-[#428475]"
          />
        </div>

        <div className="flex-1">
          <span className="rounded-full bg-[#EEF8F4] px-3 py-1 text-xs font-semibold text-[#428475]">
            {category}
          </span>

          <h3 className="mt-4 text-xl font-bold text-[#172033]">
            {title}
          </h3>

          <p className="mt-2 text-gray-500">
            Uploaded by {uploadedBy}
          </p>

          <div className="mt-6 flex flex-wrap gap-5 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar size={16} />

              {uploadDate}
            </div>

            <div className="flex items-center gap-2">
              <Clock3 size={16} />

              {readTime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentCard;