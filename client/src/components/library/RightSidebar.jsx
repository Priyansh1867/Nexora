import { useState, useEffect } from "react";
import {
  BookOpen,
  Bookmark,
  Clock3,
  Download,
  Flame,
  Star,
  TrendingUp,
} from "lucide-react";
import libraryService from "../../services/libraryService";
import courseService from "../../services/courseService";

function RightSidebar({ onUploadSuccess }) {
  // Dynamic Stats states
  const [completedCount, setCompletedCount] = useState(0);
  const [resourcesCount, setResourcesCount] = useState(0);
  const [streakDays, setStreakDays] = useState(3);

  const loadStats = async () => {
    try {
      const prog = await courseService.getCourseProgress();
      const sumCompleted = prog.reduce((sum, item) => sum + (item.completed_lessons?.length || 0), 0);
      setCompletedCount(sumCompleted);
      setStreakDays(3 + sumCompleted); // Streak increases with lessons watched!

      const resources = await libraryService.getResources();
      setResourcesCount(resources.length);
    } catch (e) {
      console.error("Failed to load statistics:", e);
    }
  };

  useEffect(() => {
    loadStats();
  }, [onUploadSuccess]);

  return (
    <aside className="flex w-full flex-col gap-6 xl:w-[360px]">

      <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-7 shadow-sm">
        <div className="flex items-center gap-3">
          <Flame size={22} className="text-[#F59E0B]" />
          <h2 className="text-xl font-bold">Learning Streak</h2>
        </div>

        <h1 className="mt-7 text-5xl font-bold text-[#172033]">{streakDays}</h1>
        <p className="mt-2 text-gray-500">Consecutive learning days</p>

        <div className="mt-6 h-3 rounded-full bg-[#EEF1F3] overflow-hidden">
          <div 
            className="h-full rounded-full bg-[#428475] transition-all duration-500" 
            style={{ width: `${Math.min(100, (streakDays / 10) * 100)}%` }}
          />
        </div>
      </section>

      <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-7 shadow-sm">
        <div className="flex items-center gap-3">
          <TrendingUp size={20} className="text-[#428475]" />
          <h2 className="text-xl font-bold">Statistics</h2>
        </div>

        <div className="mt-7 space-y-4">
          <Stat
            icon={<BookOpen size={18} />}
            title="Resources Available"
            value={12 + resourcesCount}
          />
          <Stat
            icon={<Download size={18} />}
            title="Lectures Watched"
            value={completedCount}
          />
          <Stat
            icon={<Bookmark size={18} />}
            title="Study Hours"
            value={`${(completedCount * 0.5).toFixed(1)}h`}
          />
          <Stat
            icon={<Star size={18} />}
            title="Uploaded Notes"
            value={resourcesCount}
          />
        </div>
      </section>

    </aside>
  );
}

function Stat({ icon, title, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-[#F8FAFB] p-4">
      <div className="flex items-center gap-3">
        <div className="text-[#428475]">{icon}</div>
        <span className="font-medium text-[#172033] text-xs">{title}</span>
      </div>
      <span className="font-bold text-[#428475] text-xs">{value}</span>
    </div>
  );
}

export default RightSidebar;