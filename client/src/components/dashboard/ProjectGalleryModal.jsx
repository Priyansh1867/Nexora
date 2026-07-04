import { useState, useEffect } from "react";
import { X, FolderKanban, Plus, Github, ExternalLink, Loader2 } from "lucide-react";
import { showToast } from "../../utils/toast";


function ProjectGalleryModal({ onClose }) {
  const [projects, setProjects] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [github, setGithub] = useState("");
  const [demo, setDemo] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("nexora_shared_projects");
    if (saved) {
      setProjects(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !author.trim()) {
      showToast("Please fill in the project title, description, and your name!", "error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newProj = {
        title: title.trim(),
        description: description.trim(),
        github: github.trim() || "#",
        demo: demo.trim() || "#",
        author: author.trim(),
      };

      const updated = [newProj, ...projects];
      localStorage.setItem("nexora_shared_projects", JSON.stringify(updated));
      setProjects(updated);
      
      // Reset form
      setTitle("");
      setDescription("");
      setGithub("");
      setDemo("");
      setAuthor("");
      setShowAddForm(false);
      setLoading(false);
      showToast("Project shared successfully! It is now live for everyone on the platform.");
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-[32px] bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EDF1F4] bg-[#F8FAFB] px-8 py-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#EEF8F4] flex items-center justify-center text-[#428475]">
              <FolderKanban size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#428475]">
                Shared Project Showcase
              </span>
              <h2 className="text-lg font-bold text-[#172033]">Browse Student Projects</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-1.5 rounded-xl bg-[#428475] hover:bg-[#1A312C] text-white text-xs font-bold px-4 py-2.5 transition cursor-pointer shadow-sm"
            >
              <Plus size={16} />
              {showAddForm ? "View Projects" : "Upload Project"}
            </button>

            <button
              onClick={onClose}
              className="rounded-xl bg-white p-2.5 text-gray-500 border border-gray-200 transition hover:bg-red-50 hover:text-red-500 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-8">
          {showAddForm ? (
            /* Upload Project Form */
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5">
              <div className="text-center pb-4">
                <h3 className="text-xl font-bold text-[#172033]">Share Your Masterpiece</h3>
                <p className="text-xs text-gray-500 mt-1">Publish your project links so that students can check them out and collaborate.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Your Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Jha"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full h-11 rounded-xl border border-gray-200 px-4 text-xs outline-none focus:border-[#428475]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Project Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nexora Chat Engine"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-11 rounded-xl border border-gray-200 px-4 text-xs outline-none focus:border-[#428475]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Description / Abstract <span className="text-red-500">*</span></label>
                <textarea
                  rows={4}
                  required
                  placeholder="What does your project do? What technologies did you use?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 p-4 text-xs outline-none focus:border-[#428475] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2">GitHub Repository URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="w-full h-11 rounded-xl border border-gray-200 px-4 text-xs outline-none focus:border-[#428475]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Live Demo URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={demo}
                    onChange={(e) => setDemo(e.target.value)}
                    className="w-full h-11 rounded-xl border border-gray-200 px-4 text-xs outline-none focus:border-[#428475]"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 h-11 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 h-11 rounded-xl bg-[#428475] hover:bg-[#1a312c] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    "Publish Project"
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Browse Projects Grid */
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((proj, idx) => (
                <div
                  key={proj.title + idx}
                  className="bg-[#F8FAFB]/50 rounded-[24px] border border-gray-150 p-6 flex flex-col justify-between hover:border-[#428475] hover:bg-white hover:shadow-lg transition duration-200"
                >
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="font-extrabold text-[#172033] text-base leading-tight">
                        {proj.title}
                      </h4>
                      <span className="text-[10px] bg-[#EEF8F4] text-[#428475] font-bold px-2 py-0.5 rounded-full uppercase shrink-0">
                        by {proj.author}
                      </span>
                    </div>

                    <p className="mt-3.5 text-xs text-gray-500 leading-relaxed line-clamp-3">
                      {proj.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex gap-4">
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 h-10 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition flex items-center justify-center gap-1.5"
                    >
                      <Github size={14} />
                      Code Repository
                    </a>

                    <a
                      href={proj.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 h-10 rounded-xl bg-[#16332D] text-white hover:bg-[#214740] text-xs font-bold transition flex items-center justify-center gap-1.5"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default ProjectGalleryModal;
