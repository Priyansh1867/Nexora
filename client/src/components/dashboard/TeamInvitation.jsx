import { useState, useEffect } from "react";
import {
  ArrowRight,
  Clock3,
  Users,
  Star,
  UserPlus,
  BriefcaseBusiness,
  Check,
  Loader2,
} from "lucide-react";
import { showToast } from "../../utils/toast";

function TeamInvitation() {
  const [invites, setInvites] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("nexora_team_invitations");
    if (saved) {
      setInvites(JSON.parse(saved));
    } else {
      localStorage.setItem("nexora_team_invitations", JSON.stringify([]));
      setInvites([]);
    }
  }, []);

  const handleJoinTeam = (id, teamName) => {
    setLoadingId(id);
    setTimeout(() => {
      setInvites((prev) =>
        prev.map((inv) =>
          inv.id === id ? { ...inv, status: "Joined" } : inv
        )
      );
      setLoadingId(null);
      showToast(`Successfully sent join request to team '${teamName}'!`);

      // Prepend to activities timeline log in localStorage
      const saved = localStorage.getItem("nexora_activity_log");
      const currentLogs = saved ? JSON.parse(saved) : [];
      const newLog = {
        id: Date.now(),
        iconName: "GitPullRequest",
        title: `Requested to Join ${teamName}`,
        description: `Sent a join request to team '${teamName}' as Frontend Developer.`,
        time: "Just now",
        color: "bg-orange-100 text-orange-700",
      };
      localStorage.setItem("nexora_activity_log", JSON.stringify([newLog, ...currentLogs]));
      
      // Dispatch storage event to update ActivityTimeline in real-time
      window.dispatchEvent(new Event("storage"));
    }, 700);
  };

  return (
    <section className="rounded-[28px] border border-[#EDF1F4] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF8F4] px-4 py-2 text-sm font-semibold text-[#428475]">
            <Users size={16} />
            Team Invitations
          </div>

          <h2 className="mt-4 text-3xl font-bold text-[#172033]">
            Teams looking for collaborators
          </h2>

          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[#667085]">
            Join active student teams, contribute to real projects and build an
            impressive portfolio together.
          </p>
        </div>

        <button 
          onClick={() => window.location.href = "/team-finder"}
          className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] px-5 py-3 text-sm font-semibold text-[#172033] transition hover:border-[#428475] hover:text-[#428475] cursor-pointer"
        >
          Explore Teams
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="mt-10 space-y-6">
        {invites.length === 0 ? (
          <div className="text-center py-10 text-xs text-gray-400 font-semibold bg-[#F8FAFB] rounded-[24px] border border-dashed border-[#EDF1F4]">
            No team invitations received yet. Explore partners in Team Finder to join active groups!
          </div>
        ) : (
          invites.map((team) => (
            <div
              key={team.id}
              className="flex flex-col gap-6 rounded-[26px] border border-[#EEF2F5] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#428475] hover:shadow-xl lg:flex-row lg:items-center lg:justify-between bg-white"
            >
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF8F4] text-[#428475]">
                  <BriefcaseBusiness size={28} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#172033]">
                    {team.team}
                  </h3>

                  <p className="mt-1 text-[#667085] text-sm">
                    Required Role:{" "}
                    <span className="font-semibold">{team.role}</span>
                  </p>

                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#667085]">
                    <div className="flex items-center gap-2 font-semibold">
                      <Users size={14} />
                      {team.members} Members
                    </div>

                    <div className="flex items-center gap-2 font-semibold">
                      <Star
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      {team.rating}
                    </div>

                    <div className="flex items-center gap-2 font-semibold">
                      <Clock3 size={14} />
                      {team.deadline}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider ${team.color}`}
                >
                  {team.role}
                </span>

                <button
                  onClick={() => team.status === "Join" && handleJoinTeam(team.id, team.team)}
                  disabled={team.status !== "Join" || loadingId === team.id}
                  className={`flex items-center gap-1.5 rounded-2xl px-6 py-3 font-bold text-xs transition cursor-pointer shadow-sm ${
                    team.status === "Joined"
                      ? "bg-[#EEF8F4] text-[#428475] border border-[#428475]/20 cursor-default"
                      : "bg-[#16332D] text-white hover:bg-[#214740]"
                  }`}
                >
                  {loadingId === team.id ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Sending...
                    </>
                  ) : team.status === "Joined" ? (
                    <>
                      <Check size={14} />
                      Joined Team
                    </>
                  ) : (
                    <>
                      <UserPlus size={14} />
                      Join Team
                    </>
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default TeamInvitation;