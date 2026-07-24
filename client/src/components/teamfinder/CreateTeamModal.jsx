import { useState } from "react";
import { X, Users, Loader2 } from "lucide-react";
import teamService from "../../services/teamService";
import { showToast } from "../../utils/toast";

function CreateTeamModal({ onClose, onCreateSuccess }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [skillsNeeded, setSkillsNeeded] = useState("");
  const [techStack, setTechStack] = useState("");
  const [tags, setTags] = useState("");
  const [timeline, setTimeline] = useState("6 Weeks");
  const [communicationMode, setCommunicationMode] = useState("Discord");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [stage, setStage] = useState("Planning");
  const [lookingForTeammates, setLookingForTeammates] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast("Please fill in the team name!", "error");
      return;
    }

    setLoading(true);
    try {
      const skillsArray = skillsNeeded
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const techStackArray = techStack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const tagsArray = tags
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      // Default cover image if empty
      const finalCoverImage = coverImageUrl.trim() || `https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=400`;

      await teamService.createTeam({
        name: name.trim(),
        description: description.trim(),
        skills_needed: skillsArray,
        tech_stack: techStackArray,
        tags: tagsArray,
        timeline,
        communication_mode: communicationMode,
        cover_image_url: finalCoverImage,
        stage,
        looking_for_teammates: lookingForTeammates
      });

      showToast("Team created successfully!");
      if (onCreateSuccess) onCreateSuccess();
      onClose();
    } catch (err) {
      console.error("Create team error:", err);
      showToast(err.response?.data?.message || "Failed to create team", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="flex w-full max-w-lg flex-col overflow-hidden rounded-[32px] bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EDF1F4] bg-[#F8FAFB] px-8 py-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#EEF8F4] flex items-center justify-center text-[#428475]">
              <Users size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#428475]">
                Collaborate
              </span>
              <h2 className="text-lg font-bold text-[#172033]">Create New Project</h2>
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
        <form onSubmit={handleSubmit} className="p-8 space-y-5 overflow-y-auto max-h-[70vh]">
          
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Smart Healthcare Platform, AI Bot"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 rounded-xl border border-gray-200 px-4 text-xs outline-none focus:border-[#428475] bg-[#F8FAFB] focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
              Project Description
            </label>
            <textarea
              placeholder="Briefly describe your project goals, milestones, and target audience..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-gray-200 p-4 text-xs outline-none focus:border-[#428475] bg-[#F8FAFB] focus:bg-white transition resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
                Tech Stack
              </label>
              <input
                type="text"
                placeholder="e.g. React, Node.js"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                className="w-full h-12 rounded-xl border border-gray-200 px-4 text-xs outline-none focus:border-[#428475] bg-[#F8FAFB] focus:bg-white transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
                Project Tags
              </label>
              <input
                type="text"
                placeholder="e.g. AI, Healthcare, App"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full h-12 rounded-xl border border-gray-200 px-4 text-xs outline-none focus:border-[#428475] bg-[#F8FAFB] focus:bg-white transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
                Required Roles/Skills
              </label>
              <input
                type="text"
                placeholder="e.g. UI/UX Designer, QA"
                value={skillsNeeded}
                onChange={(e) => setSkillsNeeded(e.target.value)}
                className="w-full h-12 rounded-xl border border-gray-200 px-4 text-xs outline-none focus:border-[#428475] bg-[#F8FAFB] focus:bg-white transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
                Timeline
              </label>
              <input
                type="text"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full h-12 rounded-xl border border-gray-200 px-4 text-xs outline-none focus:border-[#428475] bg-[#F8FAFB] focus:bg-white transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
                Communication Mode
              </label>
              <select
                value={communicationMode}
                onChange={(e) => setCommunicationMode(e.target.value)}
                className="w-full h-12 rounded-xl border border-gray-200 px-4 text-xs outline-none focus:border-[#428475] bg-[#F8FAFB] focus:bg-white transition"
              >
                <option value="Discord">Discord</option>
                <option value="Slack">Slack</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="In-person">In-person</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
                Project Stage
              </label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full h-12 rounded-xl border border-gray-200 px-4 text-xs outline-none focus:border-[#428475] bg-[#F8FAFB] focus:bg-white transition"
              >
                <option value="Idea">Idea</option>
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={lookingForTeammates}
                onChange={(e) => setLookingForTeammates(e.target.checked)}
                className="w-4 h-4 text-[#428475] rounded border-gray-300 focus:ring-[#428475]"
              />
              We are actively looking for teammates
            </label>
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
                  Creating...
                </>
              ) : (
                "Add Project"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateTeamModal;
