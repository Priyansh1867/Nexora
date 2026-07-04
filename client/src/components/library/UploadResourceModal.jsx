import { useState } from "react";
import { X, FileText, Loader2 } from "lucide-react";
import libraryService from "../../services/libraryService";
import { showToast } from "../../utils/toast";

function UploadResourceModal({ onClose, onUploadSuccess }) {
  const [branch, setBranch] = useState("");
  const [uploadTitle, setUploadTitle] = useState("");
  const [category, setCategory] = useState("Notes");
  const [pdfFile, setPdfFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!pdfFile || !branch.trim()) {
      showToast("Please fill in the branch and select a file!", "error");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", pdfFile);
    formData.append("title", uploadTitle || pdfFile.name.replace(/\.[^/.]+$/, ""));
    // Store branch and category combined in the category field for neat display tags
    formData.append("category", `${branch.trim()} - ${category}`);
    formData.append("type", "PDF");
    formData.append("description", `Branch: ${branch.trim()}`);

    try {
      await libraryService.addResource(formData);
      showToast("PDF notes uploaded successfully!");
      if (onUploadSuccess) onUploadSuccess();
      onClose();
    } catch (err) {
      console.error("Upload error:", err);
      showToast(err.response?.data?.message || "Failed to upload file", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="flex w-full max-w-lg flex-col overflow-hidden rounded-[32px] bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EDF1F4] bg-[#F8FAFB] px-8 py-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#EEF8F4] flex items-center justify-center text-[#428475]">
              <FileText size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#428475]">
                Share Knowledge
              </span>
              <h2 className="text-lg font-bold text-[#172033]">Upload Study Resource</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-white p-2.5 text-gray-500 border border-gray-200 transition hover:bg-red-50 hover:text-red-500 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleUpload} className="p-8 space-y-5">
          
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
              1. Branch Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Computer Science, Mechanical, Civil"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full h-12 rounded-xl border border-gray-200 px-4 text-xs outline-none focus:border-[#428475] bg-[#F8FAFB] focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
              2. Note Title
            </label>
            <input
              type="text"
              placeholder="e.g. React Hooks Cheat Sheet (Defaults to file name)"
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
              className="w-full h-12 rounded-xl border border-gray-200 px-4 text-xs outline-none focus:border-[#428475] bg-[#F8FAFB] focus:bg-white transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
                3. Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-12 rounded-xl border border-gray-200 px-3 text-xs outline-none focus:border-[#428475] bg-[#F8FAFB] focus:bg-white cursor-pointer"
              >
                <option value="Notes">Notes</option>
                <option value="Research Papers">Research Papers</option>
                <option value="E-Books">E-Books</option>
                <option value="Roadmaps">Roadmaps</option>
                <option value="Interview Prep">Interview Prep</option>
                <option value="Case Studies">Case Studies</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
                4. Select PDF <span className="text-red-500">*</span>
              </label>
              <div className="relative h-12 rounded-xl border border-gray-200 bg-[#F8FAFB] hover:bg-gray-50 flex items-center px-4 cursor-pointer overflow-hidden transition">
                <input
                  type="file"
                  accept=".pdf"
                  required
                  onChange={(e) => setPdfFile(e.target.files[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer h-full w-full"
                />
                <span className="text-xs text-gray-500 truncate">
                  {pdfFile ? pdfFile.name : "Choose PDF..."}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#EDF1F4] pt-6 mt-6 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-12 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="flex-1 h-12 rounded-xl bg-[#428475] hover:bg-[#1A312C] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Uploading...
                </>
              ) : (
                "Upload PDF"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default UploadResourceModal;
