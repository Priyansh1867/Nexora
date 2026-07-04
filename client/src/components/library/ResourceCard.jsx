import {
  Bookmark,
  Download,
  Eye,
  FileText,
  Star,
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
      rounded-[30px]
      border
      border-[#EDF1F4]
      bg-white
      overflow-hidden
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      "
    >
      <div className="flex h-52 items-center justify-center bg-[#EEF8F4]">
        <FileText
          size={70}
          className="text-[#428475]"
        />
      </div>

      <div className="p-7">
        <div className="flex items-start justify-between">
          <span className="rounded-full bg-[#EEF8F4] px-4 py-2 text-sm font-semibold text-[#428475]">
            {category}
          </span>

          <button
            onClick={onBookmarkToggle}
            className="transition hover:scale-110 cursor-pointer"
          >
            <Bookmark
              size={20}
              className={
                bookmarked
                  ? "fill-[#428475] text-[#428475]"
                  : "text-gray-400"
              }
            />
          </button>
        </div>

        <h2 className="mt-6 text-2xl font-bold text-[#172033] leading-8">
          {title}
        </h2>

        <p className="mt-2 text-gray-500">
          By {author}
        </p>

        <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
          <span>{pages} Pages</span>

          <div className="flex items-center gap-2">
            <Star
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />

            {rating}
          </div>
        </div>

        <div className="mt-3 text-sm text-gray-500">
          {downloads.toLocaleString()} Downloads
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onPreview}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] py-3 font-semibold transition hover:border-[#428475] cursor-pointer"
          >
            <Eye size={18} />

            Preview
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
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#16332D] py-3 font-semibold text-white transition hover:bg-[#214740] cursor-pointer"
          >
            <Download size={18} />

            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResourceCard;