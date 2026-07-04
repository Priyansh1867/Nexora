import { useState, useEffect, useCallback } from "react";
import { X, Play, CheckCircle2, Circle, Trophy, Search, Loader2 } from "lucide-react";
import courseService from "../../services/courseService";

const coursePlaylists = {
  1: { title: "React 19 Complete Guide", searchDefault: "React 19 Tutorial" },
  2: { title: "Node.js & Express Masterclass", searchDefault: "NodeJS Express Tutorial" },
  3: { title: "PostgreSQL for Developers", searchDefault: "PostgreSQL Database Tutorial" },
};

function CoursePlayerModal({ courseId, onClose, onProgressUpdate, initialQuery }) {
  const playlist = coursePlaylists[courseId] || { 
    title: initialQuery ? `Custom Study: ${initialQuery}` : "Custom Study Course", 
    searchDefault: initialQuery || "Software Engineering Tutorial" 
  };
  const [lessons, setLessons] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [searchQuery, setSearchQuery] = useState(playlist.searchDefault);
  const [completedIds, setCompletedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load progress from DB
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const progressList = await courseService.getCourseProgress();
        const courseProg = progressList.find((c) => c.course_id === Number(courseId));
        if (courseProg && courseProg.completed_lessons) {
          setCompletedIds(courseProg.completed_lessons);
        }
      } catch (err) {
        console.error("Failed to load course progress:", err);
      }
    };
    loadProgress();
  }, [courseId]);

  // Search YouTube
  const handleSearch = useCallback(async (queryStr) => {
    if (!queryStr.trim()) return;
    setLoading(true);
    try {
      const results = await courseService.searchYouTube(queryStr);
      setLessons(results);
      if (results.length > 0) {
        setActiveLesson(results[0]);
      } else {
        setActiveLesson(null);
      }
    } catch (err) {
      console.error("Failed to search YouTube:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Search automatically on mount
  useEffect(() => {
    setSearchQuery(playlist.searchDefault);
    handleSearch(playlist.searchDefault);
  }, [playlist.searchDefault, handleSearch]);

  const handleToggleComplete = async (lessonId) => {
    if (saving || !lessons.length) return;

    setSaving(true);
    let updatedCompleted = [...completedIds];
    if (completedIds.includes(lessonId)) {
      updatedCompleted = updatedCompleted.filter((id) => id !== lessonId);
    } else {
      updatedCompleted.push(lessonId);
    }

    // Progress = ratio of completed search results
    const progressPercent = Math.round(
      (lessons.filter(l => updatedCompleted.includes(l.videoId)).length / lessons.length) * 100
    );

    try {
      setCompletedIds(updatedCompleted);
      await courseService.updateCourseProgress(courseId, progressPercent, updatedCompleted);
      if (onProgressUpdate) {
        onProgressUpdate(courseId, progressPercent);
      }
    } catch (err) {
      console.error("Failed to save course progress:", err);
    } finally {
      setSaving(false);
    }
  };

  const completedCount = lessons.filter(l => completedIds.includes(l.videoId)).length;
  const currentProgress = lessons.length
    ? Math.round((completedCount / lessons.length) * 100)
    : 0;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchQuery);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="flex h-[90vh] w-[95vw] max-w-6xl flex-col overflow-hidden rounded-[32px] bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EDF1F4] bg-[#F8FAFB] px-8 py-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#428475]">
              Dynamic Playlist Player
            </span>
            <h2 className="text-xl font-bold text-[#172033] mt-1">{playlist.title}</h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-[#EEF8F4] px-4 py-2 rounded-2xl border border-[#428475]/10">
              <Trophy size={18} className="text-[#428475]" />
              <span className="text-sm font-bold text-[#428475]">{currentProgress}% Done</span>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl bg-white p-2.5 text-gray-500 border border-gray-200 transition hover:bg-red-50 hover:text-red-500 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content body */}
        <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
          {/* Left side: YouTube Video Player */}
          <div className="flex-1 bg-black flex flex-col justify-center relative">
            {activeLesson ? (
              <iframe
                title={activeLesson.title}
                src={`https://www.youtube.com/embed/${activeLesson.videoId}?autoplay=1&rel=0`}
                className="absolute inset-0 h-full w-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-500 p-8">
                {loading ? (
                  <>
                    <Loader2 className="animate-spin text-[#428475] mb-4" size={48} />
                    <span className="text-lg font-medium">Searching live YouTube playlists...</span>
                  </>
                ) : (
                  <span className="text-lg font-medium">No video selected. Search above to find lectures!</span>
                )}
              </div>
            )}
          </div>

          {/* Right side: Playlist videos and search bar */}
          <div className="w-full lg:w-[400px] border-l border-[#EDF1F4] bg-white flex flex-col overflow-hidden">
            {/* Search Input block */}
            <div className="p-5 border-b border-[#EDF1F4] bg-[#F8FAFB]/50 space-y-3">
              <h3 className="font-bold text-[#172033] text-sm">YouTube Search</h3>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search tutorials e.g. React 19..."
                  className="w-full h-11 rounded-xl border border-gray-200 pl-10 pr-4 text-sm outline-none focus:border-[#428475]"
                />
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <button
                onClick={() => handleSearch(searchQuery)}
                className="w-full h-10 rounded-xl bg-[#428475] hover:bg-[#1A312C] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
                Search Tutorials
              </button>
            </div>

            {/* Video List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
              {loading && lessons.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-gray-400 text-sm">
                  <Loader2 size={24} className="animate-spin text-[#428475] mb-2" />
                  Loading playlist...
                </div>
              ) : lessons.length === 0 ? (
                <div className="text-center py-10 text-gray-400 text-sm">
                  No video lectures loaded.
                </div>
              ) : (
                lessons.map((lesson, index) => {
                  const isCompleted = completedIds.includes(lesson.videoId);
                  const isActive = activeLesson && lesson.videoId === activeLesson.videoId;

                  return (
                    <div
                      key={lesson.videoId}
                      className={`flex flex-col gap-2.5 p-3.5 rounded-2xl border transition ${
                        isActive
                          ? "border-[#428475] bg-[#EEF8F4]/30"
                          : "border-[#EDF1F4] hover:bg-gray-50"
                      }`}
                    >
                      <div
                        onClick={() => setActiveLesson(lesson)}
                        className="flex items-start gap-2.5 cursor-pointer"
                      >
                        <div
                          className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isActive
                              ? "bg-[#428475] text-white"
                              : "bg-[#F8FAFB] text-[#428475] border border-[#EDF1F4]"
                          }`}
                        >
                          <Play size={12} className={isActive ? "fill-white" : ""} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] text-gray-400 font-bold block">
                            Lecture {index + 1}
                          </span>
                          <h4 className="text-xs font-bold text-[#172033] leading-relaxed truncate" title={lesson.title}>
                            {lesson.title}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-[#EDF1F4]/60 pt-2 mt-1">
                        <span className="text-[10px] text-gray-400 font-bold">
                          Progress Check:
                        </span>

                        <button
                          onClick={() => handleToggleComplete(lesson.videoId)}
                          disabled={saving}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold transition border cursor-pointer ${
                            isCompleted
                              ? "bg-[#EEF8F4] text-[#428475] border-[#428475]/20"
                              : "bg-white text-gray-600 border-gray-200 hover:border-[#428475] hover:text-[#428475]"
                          }`}
                        >
                          {isCompleted ? (
                            <>
                              <CheckCircle2 size={11} />
                              Completed
                            </>
                          ) : (
                            <>
                              <Circle size={11} />
                              Done
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursePlayerModal;
