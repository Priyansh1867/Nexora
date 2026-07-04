import {
  Award,
  Bell,
  BookOpen,
  CalendarDays,
  Clock3,
  Flame,
} from "lucide-react";

function RightSidebar({ streak = 3, events = [] }) {
  return (
    <aside className="flex w-full flex-col gap-6 xl:w-[360px]">
      
      {/* Daily Streak */}
      <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-7 shadow-sm">
        <div className="flex items-center gap-3">
          <Flame
            size={22}
            className="text-[#F59E0B]"
          />
          <h2 className="text-xl font-bold">
            Daily Streak
          </h2>
        </div>

        <h1 className="mt-6 text-5xl font-bold text-[#172033]">
          {streak} Days
        </h1>

        <p className="mt-2 text-gray-500 text-xs">
          Keep learning every day to grow your streak!
        </p>

        <div className="mt-6 h-3 rounded-full bg-[#EEF1F3] overflow-hidden">
          <div 
            className="h-full rounded-full bg-[#428475] transition-all duration-500" 
            style={{ width: `${Math.min(100, (streak / 10) * 100)}%` }}
          />
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-7 shadow-sm">
        <div className="flex items-center gap-3">
          <CalendarDays
            size={20}
            className="text-[#428475]"
          />
          <h2 className="text-xl font-bold">
            Upcoming
          </h2>
        </div>

        <div className="mt-7 space-y-5">
          {events.length === 0 ? (
            <div className="text-center py-6 text-xs text-gray-400 font-semibold bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              No upcoming events scheduled.
            </div>
          ) : (
            events.map((evt) => (
              <Event
                key={evt.id || evt.title}
                icon={evt.icon || <BookOpen size={18} />}
                title={evt.title}
                time={evt.time}
              />
            ))
          )}
        </div>
      </section>

      {/* Latest Updates */}
      <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-7 shadow-sm">
        <div className="flex items-center gap-3">
          <Bell
            size={20}
            className="text-[#428475]"
          />
          <h2 className="text-xl font-bold">
            Latest Updates
          </h2>
        </div>

        <div className="mt-7 space-y-4">
          <Update text="New React 19 course launched." />
          <Update text="Node.js roadmap updated." />
          <Update text="AI Career Track added." />
        </div>
      </section>

    </aside>
  );
}

function Event({ icon, title, time }) {
  return (
    <div className="flex gap-4 rounded-2xl bg-[#F8FAFB] p-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF8F4] text-[#428475]">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-[#172033] text-sm">
          {title}
        </h4>
        <p className="mt-1 text-xs text-gray-500">
          {time}
        </p>
      </div>
    </div>
  );
}

function Update({ text }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-[#F8FAFB] p-4">
      <div className="mt-1.5 h-2 w-2 rounded-full bg-[#428475]" />
      <p className="text-xs leading-5 text-gray-600">
        {text}
      </p>
    </div>
  );
}

export default RightSidebar;