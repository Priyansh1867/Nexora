import { ArrowRight, Clock3, PlayCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

function ContinueJourney({ courses = [], onCourseSelect }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="h-full flex flex-col justify-between bg-white rounded-[28px] border border-[#EDF1F4] shadow-[0_8px_30px_rgba(0,0,0,0.02)] p-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div>
          <p className="text-[#428475] text-[15px] font-bold uppercase tracking-wider">
            Continue Journey
          </p>

          <h2 className="mt-3 text-[28px] font-black text-[#172033] tracking-tight">
            Resume Your Study Path
          </h2>

          <p className="mt-3 max-w-[560px] leading-relaxed text-[#4B5563] text-xs font-semibold">
            Track your ongoing playlists and click any incompleted course milestone to continue learning where you left off.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {courses.map((course) => {
          const isCompleted = course.progress === 100;
          return (
            <div
              key={course.id}
              onClick={() => onCourseSelect && onCourseSelect(course.id)}
              className={`flex flex-col sm:flex-row gap-5 items-center bg-[#F8FAFB] border border-[#EDF1F4]/60 p-5 rounded-[24px] cursor-pointer hover:border-[#428475]/35 hover:bg-white hover:shadow-md transition duration-200`}
            >
              <div className="w-12 h-12 rounded-xl bg-[#10141F] flex items-center justify-center text-2xl shadow-inner shrink-0">
                {course.id === 1 ? "⚛️" : course.id === 2 ? "🟢" : "🐘"}
              </div>

              <div className="flex-1 w-full">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-extrabold text-[#172033]">
                      {course.title}
                    </h3>
                    <span className="inline-flex mt-1.5 px-3 py-0.5 rounded-full bg-[#EEF8F4] border border-[#428475]/10 text-[#428475] text-[10px] font-bold uppercase tracking-wider">
                      {course.category}
                    </span>
                  </div>

                  <span className="text-lg font-black text-[#172033]">
                    {course.progress}%
                  </span>
                </div>

                <div className="mt-4 h-2 rounded-full bg-[#E8EDF1] overflow-hidden relative">
                  <div
                    className="h-full rounded-full bg-[#428475]"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                <div className="mt-3 flex justify-between items-center text-xs font-bold text-gray-500">
                  <span>
                    {course.id === 1 ? "React 19 Playlist" : course.id === 2 ? "Backend Playlist" : "Database Playlist"}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCourseSelect && onCourseSelect(course.id);
                    }}
                    className="text-[#428475] hover:underline flex items-center gap-1 cursor-pointer font-bold"
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 size={12} /> Completed
                      </>
                    ) : (
                      <>
                        Continue <ArrowRight size={12} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-5 border-t border-[#EDF1F4] flex flex-wrap justify-between items-center gap-4 text-xs font-semibold text-gray-400">
        <div className="flex gap-2 items-center text-[#4B5563]">
          <Clock3 size={16} className="text-[#428475]" />
          <span>Keep your daily learning streak alive today</span>
        </div>
      </div>
    </motion.section>
  );
}

export default ContinueJourney;