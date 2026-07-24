import { useState, useEffect } from "react";
import {
  BookOpen,
  ArrowRight,
} from "lucide-react";
import courseService from "../../services/courseService";
import CoursePlayerModal from "../library/CoursePlayerModal";
import ContinueCard from "../skillhub/ContinueCard";

const baseCourses = [
  {
    id: 1,
    title: "React 19 Complete Guide",
    category: "Frontend",
    progress: 0,
    duration: "4 Lectures",
    instructor: "John Anderson",
    image: "/images/categories/category_frontend_1784799053689.jpg",
  },
  {
    id: 2,
    title: "Node.js & Express Masterclass",
    category: "Backend",
    progress: 0,
    duration: "4 Lectures",
    instructor: "Sarah Wilson",
    image: "/images/categories/category_database_1784799077589.jpg",
  },
  {
    id: 3,
    title: "PostgreSQL for Developers",
    category: "Database",
    progress: 0,
    duration: "4 Lectures",
    instructor: "Michael Brown",
    image: "/images/categories/category_devops_1784799119435.jpg",
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
          <ContinueCard
            key={course.id}
            title={course.title}
            instructor={course.instructor}
            progress={course.progress}
            duration={course.duration}
            image={course.image}
            onContinue={() => setActiveCourseId(course.id)}
          />
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