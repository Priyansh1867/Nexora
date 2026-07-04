import { useEffect, useState } from "react";
import {
  Home,
  User,
  BookOpen,
  Users,
  Bell,
  Settings,
  Trophy,
  UserPlus,
  MoreVertical,
  Library,
  MessageCircle,
  Share2,
  X,
  Check,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import { useAuth } from "../../context/AuthContext";
import courseService from "../../services/courseService";
import profileService from "../../services/profileService";

function Sidebar({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  const { user } = useAuth();
  
  const [milestone, setMilestone] = useState({ completed: 0, total: 5 });
  const [profileCompletion, setProfileCompletion] = useState(40);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    role: "Student",
    avatar_url: "",
  });

  const loadSidebarData = async () => {
    try {
      // 1. Fetch course progress to dynamically calculate milestone progress
      const progressList = await courseService.getCourseProgress();
      const sumCompleted = progressList.reduce((sum, item) => sum + (item.completed_lessons?.length || 0), 0);
      const completedVal = Math.min(5, sumCompleted);
      setMilestone({ completed: completedVal, total: 5 });

      // 2. Fetch profile details for completion and metadata
      const data = await profileService.getProfile();
      setProfileDetails({
        role: data.title || "Developer",
        avatar_url: data.avatar_url || "",
      });

      // Calculate profile completion score
      let percentage = 40;
      if (data.resume_url) percentage += 20;
      if (data.github) percentage += 20;
      if (data.bio && data.bio.trim().length > 0) percentage += 20;
      setProfileCompletion(percentage);
    } catch (e) {
      console.error("Failed to load sidebar metadata details:", e);
    }
  };

  useEffect(() => {
    if (user) {
      loadSidebarData();
    }
  }, [user]);

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden animate-in fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`
          w-[280px] md:w-[300px]
          h-screen
          bg-[#16332D]
          text-white
          flex
          flex-col
          px-5 md:px-6
          py-6 md:py-7
          shadow-2xl
          border-r border-[#1F4039]
          shrink-0
          fixed md:relative
          z-50 md:z-0
          transition-transform duration-300
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          left-0 top-0
        `}
      >
        {/* Mobile Close Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white md:hidden cursor-pointer"
        >
          <X size={20} />
        </button>
        {/* Logo Link to Dashboard/Home */}
        <div
          onClick={() => window.location.href = "/dashboard"}
          className="mb-6 flex items-center gap-4 cursor-pointer hover:opacity-90 transition group"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF8F4] shadow-md group-hover:scale-105 transition">
            <span className="text-2xl font-black text-[#16332D]">
              N
            </span>
          </div>

          <div>
            <h1 className="text-xl font-black tracking-tight group-hover:text-[#3BBD8A] transition">
              Nexora
            </h1>

            <p className="mt-0.5 text-xs text-emerald-100/70 font-semibold leading-relaxed">
              Student Growth &
              <br />
              Collaboration Platform
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2.5">
          <SidebarItem
            to="/dashboard"
            title="Home"
            icon={<Home size={19} />}
            colorClass="text-emerald-400"
          />

          <SidebarItem
            to="/profile"
            title="Profile"
            icon={<User size={19} />}
            colorClass="text-sky-400"
          />

          <SidebarItem
            to="/skill-hub"
            title="SkillHub"
            icon={<BookOpen size={19} />}
            colorClass="text-amber-400"
          />

          <SidebarItem
            to="/team-finder"
            title="Team Finder"
            icon={<Users size={19} />}
            colorClass="text-violet-400"
          />

          <SidebarItem
            to="/library"
            title="Library"
            icon={<Library size={19} />}
            colorClass="text-teal-400"
          />

          <SidebarItem
            to="/chat"
            title="Chat"
            icon={<MessageCircle size={19} />}
            colorClass="text-pink-400"
          />

          <SidebarItem
            to="/settings"
            title="Settings"
            icon={<Settings size={19} />}
            colorClass="text-slate-400"
          />
        </nav>

        {/* Milestone */}
        <div className="mt-4 rounded-[24px] border border-[#2B4A44] bg-[#1F4039] p-6 shadow-inner">
          <div className="flex items-center gap-3">
            <Trophy
              size={18}
              className="text-yellow-400"
            />

            <h3 className="font-bold text-emerald-50 text-xs">
              Your Next Milestone
            </h3>
          </div>

          <p className="mt-4 text-xs font-semibold text-emerald-100/80">
            Complete 5 skill sessions
          </p>

          <div className="mt-5 h-2 rounded-full bg-[#122A25] overflow-hidden">
            <div 
              className="h-full rounded-full bg-[#3BBD8A] transition-all duration-500" 
              style={{ width: `${(milestone.completed / milestone.total) * 100}%` }}
            />
          </div>

          <div className="mt-4 flex justify-between items-center text-xs font-bold text-emerald-200">
            <span>{milestone.completed} / {milestone.total}</span>

            <button
              onClick={() => window.location.href = "/skill-hub"}
              className="text-[#3BBD8A] font-bold transition hover:underline cursor-pointer"
            >
              View →
            </button>
          </div>
        </div>

        {/* Invite Card */}
        <div className="mt-3 rounded-[24px] border border-[#2B4A44] bg-[#1F4039] p-6 shadow-inner">
          <div className="flex items-center gap-3">
            <UserPlus
              size={18}
              className="text-yellow-400"
            />

            <h3 className="font-bold text-emerald-50 text-xs">
              Invite Friends
            </h3>
          </div>

          <p className="mt-4 text-xs font-semibold text-emerald-100/80 leading-relaxed">
            Build your network and grow together.
          </p>

          <button
            onClick={() => setShowInviteModal(true)}
            className="mt-5 text-[#3BBD8A] font-bold text-xs transition hover:underline cursor-pointer flex items-center gap-1"
          >
            Invite Now →
          </button>
        </div>

        {/* Profile summary footer card */}
        <div className="mt-auto rounded-[24px] border border-[#2B4A44] bg-[#1F4039] p-5 shadow-md">
          <div className="flex justify-between">
            <div className="flex gap-3">
              
              {/* Avatar photo display */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#428475] font-black shadow-md overflow-hidden border border-[#2B4A44]">
                {profileDetails.avatar_url ? (
                  <img
                    src={`http://localhost:5000${profileDetails.avatar_url}`}
                    alt={user?.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initial
                )}
              </div>

              <div>
                <h4 className="font-bold text-emerald-50 text-sm">
                  {user?.name || "Student"}
                </h4>

                <p className="text-[10px] text-emerald-100/80 font-medium">
                  {profileDetails.role}
                </p>

                <p className="mt-1 text-[10px] font-bold text-emerald-400">
                  ● Available
                </p>
              </div>
            </div>

            <button 
              onClick={() => window.location.href = "/profile"}
              className="transition text-emerald-200 hover:text-white cursor-pointer"
            >
              <MoreVertical size={18} />
            </button>
          </div>

          <div className="mt-5 hidden md:block">
            <div className="flex justify-between text-[11px] font-bold text-emerald-100">
              <span>Profile Completion</span>
              <span>{profileCompletion}%</span>
            </div>

            <div className="mt-2 h-2 rounded-full bg-[#122A25] overflow-hidden">
              <div 
                className="h-full rounded-full bg-[#3BBD8A] transition-all duration-500" 
                style={{ width: `${profileCompletion}%` }}
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Invite Friends Shareable Modal Overlay */}
      {showInviteModal && (
        <InviteModal onClose={() => setShowInviteModal(false)} />
      )}
    </>
  );
}

/* Standalone Invite Dialog Modal Component */
function InviteModal({ onClose }) {
  const [copied, setCopied] = useState(false);
  const inviteLink = `${window.location.protocol}//${window.location.host}/register`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Error copying link:", err));
  };

  const shareText = encodeURIComponent("Hey! Join me on Nexora – the professional Student Growth & Collaboration Platform! Connect and build projects together here:");

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[30px] p-8 max-w-md w-full shadow-2xl border border-gray-100 text-center relative animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 p-1.5 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition cursor-pointer"
        >
          <X size={16} />
        </button>

        {/* Header Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF8F4] text-[#428475] border-4 border-[#F8FAFB] mb-5 shadow-sm">
          <Share2 size={26} />
        </div>

        <h3 className="text-2xl font-bold text-[#172033]">
          Invite Your Friends
        </h3>

        <p className="mt-3 text-xs text-gray-500 leading-relaxed">
          Invite fellow student builders to collaborate on projects, study playlists together, and grow your networks.
        </p>

        {/* Link Input Box */}
        <div className="mt-6 flex items-center gap-2 bg-[#F8FAFB] p-2 rounded-2xl border border-[#EDF1F4]">
          <input
            type="text"
            readOnly
            value={inviteLink}
            className="bg-transparent border-none outline-none text-xs font-semibold text-gray-600 flex-1 px-3 select-all"
          />
          <button
            onClick={handleCopy}
            className="bg-[#428475] hover:bg-[#16332D] text-white font-bold text-[10px] px-4.5 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-1"
          >
            {copied ? (
              <>
                <Check size={12} />
                Copied!
              </>
            ) : (
              "Copy Link"
            )}
          </button>
        </div>

        {/* Social Share Grid */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <a
            href={`https://api.whatsapp.com/send?text=${shareText}%20${inviteLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#EEF8F4]/30 hover:bg-[#EEF8F4]/60 border border-[#428475]/10 text-[#428475] transition group text-[10px] font-bold"
          >
            <span className="text-lg mb-1 group-hover:scale-110 transition">💬</span>
            WhatsApp
          </a>

          <a
            href={`https://twitter.com/intent/tweet?text=Join%20me%20on%20Nexora!&url=${inviteLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#EEF8F4]/30 hover:bg-[#EEF8F4]/60 border border-[#428475]/10 text-[#428475] transition group text-[10px] font-bold"
          >
            <span className="text-lg mb-1 group-hover:scale-110 transition">🐦</span>
            Twitter / X
          </a>

          <a
            href={`mailto:?subject=Join%20me%20on%20Nexora!&body=Hey%2C%20Join%20me%20on%20Nexora!%20Connect%20and%20collaborate%20on%20courses%20and%20projects.%20Sign%20up%20here%3A%20${inviteLink}`}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#EEF8F4]/30 hover:bg-[#EEF8F4]/60 border border-[#428475]/10 text-[#428475] transition group text-[10px] font-bold"
          >
            <span className="text-lg mb-1 group-hover:scale-110 transition">✉️</span>
            Email Share
          </a>
        </div>

        {/* Cancel button */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-gray-50 hover:bg-gray-100 text-gray-500 font-bold rounded-xl transition cursor-pointer text-xs"
        >
          Close
        </button>

      </div>
    </div>
  );
}

export default Sidebar;