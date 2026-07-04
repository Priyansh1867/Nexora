import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Pin,
  Users,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import profileService from "../../services/profileService";

function RightSidebar() {
  return (
    <aside className="flex w-[340px] flex-col gap-6">
      <OnlineSection />
      <PinnedSection />
      <ScheduleSection />
    </aside>
  );
}

function OnlineSection() {
  const { user } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const loadTeammates = async () => {
      try {
        const data = await profileService.getAllProfiles();
        setOnlineUsers(data.map(item => item.name.charAt(0).toUpperCase()));
      } catch (err) {
        console.error("Failed to load online users in chat sidebar:", err);
      }
    };
    if (user) {
      loadTeammates();
    }
  }, [user]);

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-7 shadow-sm">
      <div className="flex items-center gap-3">
        <Users
          size={20}
          className="text-[#428475]"
        />
        <h2 className="text-xl font-bold">
          Team Online
        </h2>
      </div>

      <div className="mt-6 flex -space-x-3 flex-wrap gap-y-2">
        {/* Always show current user */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-[#428475] font-semibold text-white shadow-sm" title="You (Online)">
          {initial}
        </div>
        {/* Show other users online status */}
        {onlineUsers.slice(0, 4).map((initialChar, idx) => (
          <div
            key={idx}
            className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-[#EEF8F4] font-semibold text-[#428475] shadow-sm"
          >
            {initialChar}
          </div>
        ))}
      </div>
    </section>
  );
}

function PinnedSection() {
  return (
    <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-7 shadow-sm">
      <div className="flex items-center gap-3">
        <Pin
          size={20}
          className="text-[#428475]"
        />
        <h2 className="text-xl font-bold">
          Pinned Threads
        </h2>
      </div>

      <div className="mt-6 text-center py-6 text-[10px] text-gray-400 font-semibold bg-[#F8FAFB] rounded-2xl border border-dashed border-[#EDF1F4]">
        No pinned threads yet.
      </div>
    </section>
  );
}

function ScheduleSection() {
  return (
    <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-7 shadow-sm">
      <div className="flex items-center gap-3">
        <CalendarDays
          size={20}
          className="text-[#428475]"
        />
        <h2 className="text-xl font-bold">
          Upcoming Schedule
        </h2>
      </div>

      <div className="mt-6 text-center py-6 text-[10px] text-gray-400 font-semibold bg-[#F8FAFB] rounded-2xl border border-dashed border-[#EDF1F4]">
        No upcoming sprints.
      </div>
    </section>
  );
}

export default RightSidebar;