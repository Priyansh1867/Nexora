import {
  Bell,
  Briefcase,
  CalendarDays,
  Clock3,
  Trophy,
  Users,
} from "lucide-react";

function RightSidebar({ meetings = [], totalProjects = 310 }) {
  return (
    <aside className="flex w-full flex-col gap-6 xl:w-[360px]">

      <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-7 shadow-sm">
        <div className="flex items-center gap-3">
          <CalendarDays
            size={20}
            className="text-[#428475]"
          />
          <h2 className="text-xl font-bold">
            Upcoming Meetings
          </h2>
        </div>

        <div className="mt-7 space-y-5">
          {meetings.length === 0 ? (
            <div className="text-center py-6 text-xs text-gray-400 font-semibold bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              No meetings scheduled.
            </div>
          ) : (
            meetings.map((meeting) => (
              <MeetingCard
                key={meeting.id || meeting.title}
                title={meeting.title}
                time={meeting.time}
              />
            ))
          )}
        </div>
      </section>

      <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-7 shadow-sm">
        <div className="flex items-center gap-3">
          <Users
            size={20}
            className="text-[#428475]"
          />
          <h2 className="text-xl font-bold">
            Community
          </h2>
        </div>

        <div className="mt-7 space-y-4">
          <Stat
            title="Active Members"
            value="2,540"
            icon={<Users size={18} />}
          />
          <Stat
            title="Projects"
            value={totalProjects}
            icon={<Briefcase size={18} />}
          />
          <Stat
            title="Hackathons"
            value="41"
            icon={<Trophy size={18} />}
          />
        </div>
      </section>

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
          <Update text="12 new teammates matched with your skills." />
          <Update text="React Hackathon registrations are open." />
          <Update text="3 new collaboration requests received." />
        </div>
      </section>

    </aside>
  );
}

function MeetingCard({ title, time }) {
  return (
    <div className="flex gap-4 rounded-2xl bg-[#F8FAFB] p-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF8F4] text-[#428475]">
        <Clock3 size={18} />
      </div>
      <div>
        <h4 className="font-semibold text-[#172033] text-sm truncate max-w-[190px]">
          {title}
        </h4>
        <p className="mt-1 text-[11px] text-gray-500">
          {time}
        </p>
      </div>
    </div>
  );
}

function Stat({ title, value, icon }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-[#F8FAFB] p-4">
      <div className="flex items-center gap-3">
        <div className="text-[#428475]">
          {icon}
        </div>
        <span className="font-medium text-[#172033] text-xs">
          {title}
        </span>
      </div>
      <span className="font-bold text-[#428475] text-xs">
        {value}
      </span>
    </div>
  );
}

function Update({ text }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-[#F8FAFB] p-4">
      <div className="mt-2 h-2 w-2 rounded-full bg-[#428475]" />
      <p className="text-xs leading-5 text-gray-600">
        {text}
      </p>
    </div>
  );
}

export default RightSidebar;