import { useState, useEffect } from "react";
import { X, Users, Clock3, MessageSquare, Send, Heart, Link, Github } from "lucide-react";
import teamService from "../../services/teamService";
import { useAuth } from "../../context/AuthContext";
import { showToast } from "../../utils/toast";

function ProjectDetailModal({ project, onClose, onRefresh }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);

  useEffect(() => {
    if (project?.id) {
      fetchComments();
    }
  }, [project]);

  const fetchComments = async () => {
    try {
      const data = await teamService.getComments(project.id);
      setComments(data);
    } catch (err) {
      console.error("Failed to load comments", err);
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      await teamService.addComment(project.id, newComment.trim());
      setNewComment("");
      fetchComments();
      if (onRefresh) onRefresh();
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to post comment", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinTeam = async () => {
    setJoinLoading(true);
    try {
      await teamService.joinTeam(project.id);
      showToast(`Requested to join ${project.title}!`);
      if (onRefresh) onRefresh();
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to join team", "error");
    } finally {
      setJoinLoading(false);
    }
  };

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="flex w-full max-w-5xl max-h-[90vh] flex-col overflow-hidden rounded-[32px] bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200 relative">
        
        {/* Header Image if present */}
        {project.cover_image_url && (
          <div className="h-48 w-full bg-gray-100 relative shrink-0">
            <img src={project.cover_image_url} alt={project.title} className="w-full h-full object-cover" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-xl bg-black/50 backdrop-blur p-2.5 text-white hover:bg-black/70 cursor-pointer transition z-10"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Header without Image */}
        {!project.cover_image_url && (
          <div className="flex items-center justify-between border-b border-[#EDF1F4] bg-[#F8FAFB] px-8 py-5 shrink-0">
            <h2 className="text-xl font-bold text-[#172033] line-clamp-1">{project.title}</h2>
            <button
              onClick={onClose}
              className="rounded-xl bg-white p-2.5 text-gray-500 border border-gray-200 transition hover:bg-red-50 hover:text-red-500 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex flex-col lg:flex-row overflow-y-auto flex-grow h-full bg-[#F8FAFB]">
          
          {/* Main Content (Left) */}
          <div className="flex-1 p-8 bg-white border-r border-[#EDF1F4]">
            {project.cover_image_url && (
               <h2 className="text-3xl font-bold text-[#172033] mb-4">{project.title}</h2>
            )}

            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
              <span className="bg-[#EEF8F4] text-[#428475] px-3 py-1 rounded-full font-bold">
                {project.stage}
              </span>
              <div className="flex items-center gap-1.5 font-medium">
                <Users size={16} /> {project.membersCount}/{project.teamSize} Members
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Clock3 size={16} /> {project.duration}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-[#172033] mb-3">About the Project</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {project.description}
              </p>
            </div>

            {project.skills?.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#172033] mb-3">Looking for Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map(s => (
                    <span key={s} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.tech_stack?.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#172033] mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map(s => (
                    <span key={s} className="px-4 py-2 bg-[#EEF8F4] text-[#428475] rounded-xl text-sm font-semibold border border-[#d3ece1]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4 mt-12">
              {project.demo_link && (
                <a href={project.demo_link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-100 font-semibold hover:bg-gray-200 transition text-[#172033]">
                  <Link size={18} /> Live Demo
                </a>
              )}
              {project.github_link && (
                <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-100 font-semibold hover:bg-gray-200 transition text-[#172033]">
                  <Github size={18} /> Repository
                </a>
              )}
              {project.looking_for_teammates && (
                <button 
                  onClick={handleJoinTeam}
                  disabled={joinLoading}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#428475] text-white font-semibold hover:bg-[#326a5d] transition sm:ml-auto disabled:opacity-50 cursor-pointer"
                >
                  {joinLoading ? "Requesting..." : "Request to Join"}
                </button>
              )}
            </div>

          </div>

          {/* Comments Sidebar (Right) */}
          <div className="w-full lg:w-96 flex flex-col bg-[#F8FAFB]">
            <div className="p-6 border-b border-[#EDF1F4] bg-white flex justify-between items-center shrink-0">
              <h3 className="text-lg font-bold text-[#172033] flex items-center gap-2">
                <MessageSquare size={20} className="text-[#428475]" />
                Comments ({comments.length})
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {comments.length === 0 ? (
                <div className="text-center py-10 text-gray-400 text-sm font-medium">
                  No comments yet. Be the first!
                </div>
              ) : (
                comments.map(c => (
                  <div key={c.id} className="flex gap-4">
                    {c.avatar_url ? (
                      <img src={c.avatar_url} alt={c.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#428475] text-white flex items-center justify-center font-bold shrink-0">
                        {c.name?.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#172033] text-sm">{c.name}</span>
                        <span className="text-xs text-gray-400 font-medium">
                           {new Date(c.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed break-words">{c.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 bg-white border-t border-[#EDF1F4] shrink-0">
              <form onSubmit={handlePostComment} className="flex items-end gap-3">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 max-h-32 min-h-[48px] rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-[#428475] transition resize-none bg-[#F8FAFB] focus:bg-white"
                  rows={1}
                />
                <button
                  type="submit"
                  disabled={loading || !newComment.trim()}
                  className="h-12 w-12 rounded-xl bg-[#428475] text-white flex items-center justify-center disabled:opacity-50 transition hover:bg-[#326a5d] shrink-0 cursor-pointer"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ProjectDetailModal;
