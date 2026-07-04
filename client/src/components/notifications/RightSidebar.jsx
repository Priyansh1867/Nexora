import {
  Bell,
  CalendarDays,
  ChevronRight,
  Sparkles,
  Users,
} from "lucide-react";

function RightSidebar() {
  return (
    <aside className="flex w-full flex-col gap-6 xl:w-[360px]">

      <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-7 shadow-sm">

        <div className="flex items-center gap-3">

          <Bell
            size={20}
            className="text-[#428475]"
          />

          <h2 className="text-xl font-bold">
            Today
          </h2>

        </div>

        <div className="mt-7 space-y-4">

          <Stat title="Unread" value="—" />

          <Stat title="Mentions" value="—" />

          <Stat title="Invitations" value="—" />

        </div>

      </section>

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

        <div className="mt-7 py-6 text-center text-gray-400 text-xs font-semibold">
          No upcoming events scheduled yet.
        </div>

      </section>

      <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-7 shadow-sm">

        <div className="flex items-center gap-3">

          <Users
            size={20}
            className="text-[#428475]"
          />

          <h2 className="text-xl font-bold">
            Quick Stats
          </h2>

        </div>

        <div className="mt-7 space-y-4">

          <Stat title="Connections" value="—" />

          <Stat title="Projects" value="—" />

          <Stat title="Messages" value="—" />

        </div>

      </section>

      <section className="rounded-[30px] bg-gradient-to-br from-[#16332D] to-[#428475] p-7 text-white shadow-xl">

        <Sparkles size={28} />

        <h2 className="mt-6 text-2xl font-bold">
          Stay Connected
        </h2>

        <p className="mt-3 leading-7 text-white/80">
          Never miss important updates,
          collaboration requests
          and project activities.
        </p>

        <button
          onClick={() => { window.location.href = "/team-finder"; }}
          className="mt-7 flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-[#16332D] transition hover:scale-105 cursor-pointer"
        >

          Find Team

          <ChevronRight size={18} />

        </button>

      </section>

    </aside>
  );
}

function Stat({
  title,
  value,
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-[#F8FAFB] p-4">

      <span className="font-medium text-[#172033]">
        {title}
      </span>

      <span className="font-bold text-[#428475]">
        {value}
      </span>

    </div>
  );
}

export default RightSidebar;