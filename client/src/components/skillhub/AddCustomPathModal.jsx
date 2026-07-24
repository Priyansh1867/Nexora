import { useState } from "react";
import { X, Sparkles, Loader2, Target } from "lucide-react";
import courseService from "../../services/courseService";

function AddCustomPathModal({ onClose, onAddSuccess }) {
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!goal.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Call the AI backend to generate roadmap
      const generatedSteps = await courseService.generateRoadmap(goal);
      onAddSuccess(goal, generatedSteps);
    } catch (err) {
      console.error("AI Roadmap Generation Error:", err);
      setError(
        err.response?.data?.message ||
        "Failed to generate roadmap. Please check your Gemini API key in the backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#172033]/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#428475] to-[#214740] text-white shadow-lg">
            <Sparkles size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#172033]">
              AI Roadmap
            </h2>
            <p className="text-sm font-medium text-gray-500">
              Generate a custom learning path
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-bold text-[#172033]">
              <Target size={16} className="text-[#428475]" />
              Your Career Goal
            </label>
            <input
              type="text"
              placeholder="e.g. Full Stack Web3 Developer, Data Scientist..."
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full rounded-2xl border-2 border-gray-200 bg-gray-50 px-5 py-4 text-sm font-medium text-[#172033] outline-none transition focus:border-[#428475] focus:bg-white"
              disabled={loading}
              autoFocus
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 p-4 text-xs font-semibold text-red-500 border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !goal.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#172033] py-4 text-sm font-bold text-white transition hover:bg-[#2A3B5C] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xl shadow-[#172033]/20"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Generating with AI...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate Roadmap
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCustomPathModal;
