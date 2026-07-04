import {
  CalendarDays,
  ChevronRight,
  Flame,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

const events = [];

const communities = [
  "React Developers",
  "AI Builders",
  "Open Source India",
  "UI/UX Community",
];

function RightSidebar({ streak = 0, lessonsCount = 0, onStartPostgres }) {
  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 18 },
    },
  };

  const handleJoinCommunity = () => {
    window.location.href = "/chat";
  };

  // 1 module = 1 lesson completed. weekly target is 5 lessons.
  const progressPercent = Math.min(100, Math.round((lessonsCount / 5) * 100));

  return (
    <motion.aside
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="hidden w-[340px] shrink-0 border-l border-[#EDF1F4] bg-white xl:flex xl:flex-col"
    >
      <div className="space-y-7 overflow-y-auto p-6">
        
        {/* Streak */}
        <motion.section
          variants={sectionVariants}
          whileHover={{ y: -2 }}
          className="rounded-[26px] bg-gradient-to-br from-[#16332D] to-[#428475] p-6 text-white shadow-md shadow-[#16332D]/10"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/15 p-3">
              <Flame size={22} className="text-orange-400 fill-orange-400 animate-pulse" />
            </div>

            <div>
              <p className="text-sm text-emerald-100 font-semibold uppercase tracking-wider">
                Current Streak
              </p>

              <h2 className="text-3xl font-black">
                {streak} Days
              </h2>
            </div>
          </div>

          <div className="mt-6 h-2 rounded-full bg-white/20 relative overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(100, (streak / 30) * 100)}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="h-full rounded-full bg-white"
            />
          </div>

          <p className="mt-4 text-xs text-emerald-50/90 font-medium leading-relaxed">
            {streak > 0 ? "You're building consistent learning habits!" : "Start watching lectures to activate your streak!"}
          </p>
        </motion.section>

        {/* Upcoming Events */}
        <motion.section
          variants={sectionVariants}
          className="rounded-[26px] border border-[#EDF1F4] p-6 bg-white"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays
                size={18}
                className="text-[#428475]"
              />

              <h3 className="font-bold text-[#172033] text-sm">
                Upcoming Events
              </h3>
            </div>

            <button 
              onClick={() => window.location.href = "/team-finder"}
              className="text-[#428475] hover:text-[#16332D] transition-colors cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {events.length === 0 ? (
              <div className="text-center py-6 text-[10px] text-gray-400 font-semibold bg-[#F8FAFB] rounded-2xl border border-dashed border-[#EDF1F4]">
                No upcoming events.
              </div>
            ) : (
              events.map((event) => (
                <div
                  key={event.title}
                  className="rounded-2xl bg-[#F8FAFB] border border-[#EDF1F4]/40 p-4 transition-all duration-200 hover:bg-[#EEF8F4]/20 hover:border-[#428475]/10"
                >
                  <h4 className="font-bold text-[#172033] text-xs">
                    {event.title}
                  </h4>

                  <p className="mt-1 text-[10px] text-[#4B5563] font-semibold">
                    {event.time}
                  </p>
                </div>
              ))
            )}
          </div>
        </motion.section>

        {/* AI Suggestion */}
        <motion.section
          variants={sectionVariants}
          className="rounded-[26px] border border-[#EDF1F4] p-6 bg-[#EEF8F4]/30 border-dashed border-[#428475]/30"
        >
          <div className="flex items-center gap-2">
            <Sparkles
              size={18}
              className="text-[#428475]"
            />

            <h3 className="font-bold text-[#16332D] text-sm">
              AI Suggestions
            </h3>
          </div>

          <div className="mt-6 rounded-2xl bg-white border border-[#428475]/10 p-5 shadow-sm">
            <p className="font-extrabold text-[#16332D] text-sm">
              Learn PostgreSQL
            </p>

            <p className="mt-2 text-xs leading-relaxed text-[#4B5563] font-medium">
              Based on your current stack, PostgreSQL will improve your backend database queries and prepare you for production.
            </p>

            <button 
              onClick={onStartPostgres}
              className="mt-5 rounded-xl bg-[#16332D] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#428475] hover:shadow-md cursor-pointer"
            >
              Start Learning
            </button>
          </div>
        </motion.section>

        {/* Communities */}
        <motion.section
          variants={sectionVariants}
          className="rounded-[26px] border border-[#EDF1F4] p-6 bg-white"
        >
          <div className="flex items-center gap-2">
            <Users
              size={18}
              className="text-[#428475]"
            />

            <h3 className="font-bold text-[#172033] text-sm">
              Communities
            </h3>
          </div>

          <div className="mt-6 space-y-3">
            {communities.map((community) => (
              <button
                key={community}
                onClick={() => handleJoinCommunity(community)}
                className="flex w-full items-center justify-between rounded-2xl border border-[#EDF1F4] bg-[#F8FAFB] px-4 py-3 font-semibold text-[#374151] transition hover:border-[#428475] hover:bg-white cursor-pointer text-xs"
              >
                <span>
                  {community}
                </span>

                <ChevronRight size={18} className="text-gray-400 group-hover:text-[#428475]" />
              </button>
            ))}
          </div>
        </motion.section>

        {/* Weekly Goal */}
        <motion.section
          variants={sectionVariants}
          className="rounded-[26px] border border-[#EDF1F4] bg-[#FFF9EC] p-6 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Trophy
              size={20}
              className="text-yellow-600 fill-yellow-600/10 animate-bounce"
            />

            <h3 className="font-bold text-[#7A5C16] text-sm">
              Weekly Goal
            </h3>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-[#876F37] font-semibold">
            Finish 5 learning modules and contribute to one project this week.
          </p>

          <div className="mt-5 h-2 rounded-full bg-yellow-200/50 relative overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              className="h-full rounded-full bg-yellow-600"
            />
          </div>

          <div className="mt-3 flex justify-between text-xs font-bold text-[#7A5C16]">
            <span>{progressPercent}%</span>
            <span>{lessonsCount} / 5 modules</span>
          </div>
        </motion.section>

      </div>
    </motion.aside>
  );
}

export default RightSidebar;