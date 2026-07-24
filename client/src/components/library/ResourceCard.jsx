import {
  Bookmark,
  Download,
  Eye,
  FileText,
  Star,
  Users,
} from "lucide-react";
import { showToast } from "../../utils/toast";

function ResourceCard({
  title,
  category,
  author,
  downloads,
  rating,
  pages,
  bookmarked = false,
  onPreview,
  fileUrl,
  onBookmarkToggle,
}) {
  return (
    <div
      className="
      group
      flex
      flex-col
      justify-between
      rounded-[24px]
      border
      border-[#EDF1F4]
      bg-white
      p-6
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-[#428475]/30
      hover:shadow-lg
      "
    >
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF8F4] text-[#428475]">
              <FileText size={24} />
            </div>
            <span className="rounded-full bg-gray-50 border border-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
              {category}
            </span>
          </div>

          <button
            onClick={onBookmarkToggle}
            className="transition hover:scale-110 cursor-pointer p-2"
          >
            <Bookmark
              size={20}
              className={
                bookmarked
                  ? "fill-[#428475] text-[#428475]"
                  : "text-gray-300 hover:text-gray-400"
              }
            />
          </button>
        </div>

        <h2 className="mt-5 text-xl font-bold text-[#172033] leading-snug line-clamp-2">
          {title}
        </h2>

        <p className="mt-2 text-sm text-gray-500 font-medium">
          Uploaded by {author}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500">
          <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg">
            <FileText size={14} className="text-gray-400" />
            {pages} Pages
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            {rating}
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg">
            <Users size={14} className="text-gray-400" />
            {downloads.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3 pt-4 border-t border-gray-100">
        <button
          onClick={onPreview}
          className="flex flex-1 items-center justify-center rounded-xl bg-[#EEF8F4] py-3 text-[#428475] transition hover:bg-[#e0f3eb] cursor-pointer"
        >
          <Eye size={20} />
        </button>

        <button
          onClick={() => {
            if (fileUrl) {
              const link = document.createElement("a");
              const backendBaseUrl = `http://${window.location.hostname}:5000`;
              link.href = fileUrl.startsWith("/") ? `${backendBaseUrl}${fileUrl}` : fileUrl;
              link.setAttribute("download", title + ".pdf");
              link.setAttribute("target", "_blank");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            } else {
              showToast("No download file available. Opening detail panel instead.", "error");
              if (onPreview) onPreview();
            }
          }}
          className="flex flex-1 items-center justify-center rounded-xl bg-[#16332D] py-3 text-white transition hover:bg-[#214740] shadow-sm cursor-pointer"
        >
          <Download size={20} />
        </button>
      </div>
    </div>
  );
}

export default ResourceCard;