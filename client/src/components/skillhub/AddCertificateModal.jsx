import { useState } from "react";
import { X, Award, Loader2 } from "lucide-react";
import { showToast } from "../../utils/toast";

function AddCertificateModal({ onClose, onAddSuccess }) {
  const [title, setTitle] = useState("");
  const [organization, setOrganization] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [credentialId, setCredentialId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !organization.trim()) {
      showToast("Please fill in the certificate title and organization!", "error");
      return;
    }

    setLoading(true);
    // Simulate slight loading delay for premium feel
    setTimeout(() => {
      const newCert = {
        title: title.trim(),
        organization: organization.trim(),
        issueDate: issueDate.trim() || "July 2026",
        credentialId: credentialId.trim() || `NX-${Math.floor(100000 + Math.random() * 900000)}`,
      };

      // Retrieve existing certs from local storage
      const saved = localStorage.getItem("nexora_certificates");
      const currentCerts = saved ? JSON.parse(saved) : [];
      const updated = [newCert, ...currentCerts];
      localStorage.setItem("nexora_certificates", JSON.stringify(updated));

      showToast("Certificate added successfully!");
      if (onAddSuccess) onAddSuccess(updated);
      onClose();
      setLoading(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="flex w-full max-w-lg flex-col overflow-hidden rounded-[32px] bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EDF1F4] bg-[#F8FAFB] px-8 py-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#EEF8F4] flex items-center justify-center text-[#428475]">
              <Award size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#428475]">
                Achievements
              </span>
              <h2 className="text-lg font-bold text-[#172033]">Add Certificate</h2>
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
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
              Certificate Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. React Professional Developer, AWS Solutions Architect"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-12 rounded-xl border border-gray-200 px-4 text-xs outline-none focus:border-[#428475] bg-[#F8FAFB] focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
              Issuing Organization <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Meta, AWS, Coursera, Udemy"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="w-full h-12 rounded-xl border border-gray-200 px-4 text-xs outline-none focus:border-[#428475] bg-[#F8FAFB] focus:bg-white transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
                Issue Date
              </label>
              <input
                type="text"
                placeholder="e.g. July 2026"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full h-12 rounded-xl border border-gray-200 px-4 text-xs outline-none focus:border-[#428475] bg-[#F8FAFB] focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
                Credential ID
              </label>
              <input
                type="text"
                placeholder="e.g. AWS-SEC-9981"
                value={credentialId}
                onChange={(e) => setCredentialId(e.target.value)}
                className="w-full h-12 rounded-xl border border-gray-200 px-4 text-xs outline-none focus:border-[#428475] bg-[#F8FAFB] focus:bg-white transition"
              />
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
              disabled={loading}
              className="flex-1 h-12 rounded-xl bg-[#428475] hover:bg-[#1A312C] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Certificate"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddCertificateModal;
