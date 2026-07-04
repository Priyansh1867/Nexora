import { useState, useEffect } from "react";
import {
  BookOpen,
  Clock3,
  PlayCircle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import courseService from "../../services/courseService";
import CoursePlayerModal from "../library/CoursePlayerModal";

const baseCourses = [
  {
    id: 1,
    title: "React 19 Complete Guide",
    category: "Frontend",
    progress: 0,
    duration: "4 Lectures",
    lessons: "React 19 Playlist",
    color: "from-sky-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Node.js & Express Masterclass",
    category: "Backend",
    progress: 0,
    duration: "4 Lectures",
    lessons: "Backend Playlist",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 3,
    title: "PostgreSQL for Developers",
    category: "Database",
    progress: 0,
    duration: "4 Lectures",
    lessons: "Database Playlist",
    color: "from-indigo-500 to-violet-500",
  },
];

function LibraryCard() {
  const [courses, setCourses] = useState(baseCourses);
  const [activeCourseId, setActiveCourseId] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const progressData = await courseService.getCourseProgress();
        setCourses((prev) =>
          prev.map((course) => {
            const progObj = progressData.find((p) => p.course_id === course.id);
            return {
              ...course,
              progress: progObj ? progObj.progress : 0,
            };
          })
        );
      } catch (err) {
        console.error("Failed to fetch course progress:", err);
      }
    };
    fetchProgress();
  }, []);

  return (
    <section className="rounded-[28px] border border-[#EDF1F4] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF8F4] px-4 py-2 text-sm font-semibold text-[#428475]">
            <BookOpen size={16} />
            Learning Library
          </div>

          <h2 className="mt-4 text-3xl font-bold text-[#172033]">
            Continue where you left off
          </h2>

          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[#667085]">
            Track your active courses, monitor your progress and keep learning
            every day.
          </p>
        </div>

        <button
          onClick={() => window.location.href = "/library"}
          className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] px-5 py-3 text-sm font-semibold text-[#172033] transition hover:border-[#428475] hover:text-[#428475] cursor-pointer"
        >
          View Library
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3 items-stretch">
        {courses.map((course) => (
          <div
            key={course.id}
            className="h-full flex flex-col overflow-hidden rounded-[26px] border border-[#EEF2F5] transition-all duration-300 hover:-translate-y-1 hover:border-[#428475] hover:shadow-xl bg-white"
          >
            <div
              onClick={() => setActiveCourseId(course.id)}
              className={`h-40 bg-gradient-to-br ${course.color} flex items-center justify-center cursor-pointer hover:opacity-90 transition`}
            >
              <PlayCircle
                size={58}
                className="text-white"
                strokeWidth={1.6}
              />
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="rounded-full bg-[#EEF8F4] px-3 py-1 text-xs font-semibold text-[#428475]">
                  {course.category}
                </span>

                <h3 className="mt-4 text-xl font-bold leading-relaxed text-[#172033]">
                  {course.title}
                </h3>
              </div>

              <div>
                <div className="mt-6 flex items-center justify-between text-sm text-[#667085]">
                  <div className="flex items-center gap-2">
                    <Clock3 size={16} />
                    {course.duration}
                  </div>

                  <div>{course.lessons}</div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#EEF2F5]/70 pt-5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs font-bold text-[#667085] mb-1.5">
                    <span>Progress</span>
                    <span className="text-[#428475]">{course.progress}%</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#EDF1F4]">
                    <div
                      className="h-full rounded-full bg-[#428475] transition-all"
                      style={{
                        width: `${course.progress}%`,
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => setActiveCourseId(course.id)}
                  className="shrink-0 flex items-center justify-center gap-1.5 rounded-xl bg-[#16332D] hover:bg-[#428475] px-4 py-2.5 text-xs font-bold text-white transition duration-200 cursor-pointer shadow-sm"
                >
                  {course.progress === 100 ? (
                    <>
                      <CheckCircle2 size={14} />
                      Completed
                    </>
                  ) : (
                    <>
                      <PlayCircle size={14} />
                      Continue
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeCourseId && (
        <CoursePlayerModal
          courseId={activeCourseId}
          onClose={() => setActiveCourseId(null)}
          onProgressUpdate={(courseId, newProgress) => {
            setCourses((prev) =>
              prev.map((c) =>
                c.id === Number(courseId) ? { ...c, progress: newProgress } : c
              )
            );
          }}
        />
      )}
    </section>
  );
}

export default LibraryCard;