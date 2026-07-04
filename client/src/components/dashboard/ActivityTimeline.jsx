import { useState, useEffect } from "react";
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  FolderGit2,
  GitPullRequest,
  Trophy,
} from "lucide-react";

const DEFAULT_ACTIVITIES = [];

const iconMap = {
  BookOpen: <BookOpen size={18} />,
  FolderGit2: <FolderGit2 size={18} />,
  GitPullRequest: <GitPullRequest size={18} />,
  CheckCircle2: <CheckCircle2 size={18} />,
  Trophy: <Trophy size={18} />,
};

function ActivityTimeline() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const loadLogs = () => {
      const saved = localStorage.getItem("nexora_activity_log");
      if (saved) {
        setActivities(JSON.parse(saved));
      } else {
        localStorage.setItem("nexora_activity_log", JSON.stringify(DEFAULT_ACTIVITIES));
        setActivities(DEFAULT_ACTIVITIES);
      }
    };

    loadLogs();

    // Listen to local changes
    window.addEventListener("storage", loadLogs);
    return () => window.removeEventListener("storage", loadLogs);
  }, []);

  return (
    <section className="rounded-[28px] border border-[#EDF1F4] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[#428475]">
            Recent Activity
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#172033]">
            Your learning timeline
          </h2>

          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[#667085]">
            Keep track of everything you've achieved across your learning,
            projects and collaboration journey.
          </p>
        </div>

        <button 
          onClick={() => window.location.href = "/profile"}
          className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] px-5 py-3 text-sm font-semibold text-[#172033] transition hover:border-[#428475] hover:text-[#428475] cursor-pointer"
        >
          View All
          <ArrowUpRight size={16} />
        </button>
      </div>

      <div className="relative mt-10 ml-5 border-l-2 border-dashed border-[#D7E1E7]">
        {activities.map((activity, index) => (
          <div
            key={activity.id + "-" + index}
            className={`relative pl-10 ${
              index !== activities.length - 1 ? "pb-8" : ""
            }`}
          >
            <div
              className={`absolute -left-[22px] flex h-10 w-10 items-center justify-center rounded-full border-4 border-white shadow ${activity.color}`}
            >
              {iconMap[activity.iconName] || iconMap.BookOpen}
            </div>

            <div className="rounded-3xl border border-[#EDF1F4] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#428475] hover:shadow-xl bg-white">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#172033]">
                    {activity.title}
                  </h3>

                  <p className="mt-2 text-[15px] leading-7 text-[#667085]">
                    {activity.description}
                  </p>
                </div>

                <span className="whitespace-nowrap rounded-full bg-[#EEF8F4] px-4 py-2 text-sm font-semibold text-[#428475]">
                  {activity.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ActivityTimeline;