import { useState, useEffect, useRef } from "react";
import {
  Search,
  Bell,
  MessageCircle,
  Sun,
  Moon,
  ChevronDown,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import profileService from "../../services/profileService";

const DEFAULT_NOTIFICATIONS = [];

const MOCK_NOTIFS_POOL = [];

function Navbar() {
  const { user } = useAuth();
  const [isDark, setIsDark] = useState(false);
  const [showBell, setShowBell] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [notifications, setNotifications] = useState([]);
  
  const searchContainerRef = useRef(null);

  const [searchResults, setSearchResults] = useState({
    pages: [],
    courses: [],
    users: [],
    projects: [],
  });

  const loadHeaderData = async () => {
    try {
      const data = await profileService.getProfile();
      if (data.avatar_url) {
        setAvatarUrl(data.avatar_url);
      }
    } catch (err) {
      console.error("Failed to load header avatar:", err);
    }
  };

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    
    // Listen to theme changes from other components (like Settings page)
    const handleThemeChangeExternal = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    window.addEventListener("nexora_theme_changed", handleThemeChangeExternal);

    if (user) {
      loadHeaderData();
    }

    return () => {
      window.removeEventListener("nexora_theme_changed", handleThemeChangeExternal);
    };
  }, [user]);

  // Load notifications from local storage
  useEffect(() => {
    const saved = localStorage.getItem("nexora_notifications");
    if (saved) {
      setNotifications(JSON.parse(saved));
    } else {
      localStorage.setItem("nexora_notifications", JSON.stringify(DEFAULT_NOTIFICATIONS));
      setNotifications(DEFAULT_NOTIFICATIONS);
    }
  }, []);

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Simulate real-time notifications arriving every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (MOCK_NOTIFS_POOL.length === 0) return;
      const randomNotif = MOCK_NOTIFS_POOL[Math.floor(Math.random() * MOCK_NOTIFS_POOL.length)];
      
      setNotifications((prev) => {
        const newNotif = {
          id: Date.now(),
          title: randomNotif.title,
          description: randomNotif.description,
          read: false,
          time: "Just now",
        };
        const updated = [newNotif, ...prev];
        localStorage.setItem("nexora_notifications", JSON.stringify(updated));
        return updated;
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults({ pages: [], courses: [], users: [], projects: [] });
      return;
    }
    const q = query.toLowerCase();

    const allPages = [
      { name: "Home / Dashboard", path: "/dashboard", desc: "View your student overview, journey progress and pending tasks." },
      { name: "Profile Details", path: "/profile", desc: "Manage your biography, upload resume and set skill badges." },
      { name: "SkillHub Learning Pathways", path: "/skill-hub", desc: "Explore playlists, design custom engineered roadmaps." },
      { name: "Team Finder Collabs", path: "/team-finder", desc: "Find teammates, create study groups and accept invitations." },
      { name: "Library Player", path: "/library", desc: "Resume course lectures, play connected playlists." },
      { name: "Study Chat Room", path: "/chat", desc: "Communicate with study partners and group communities." },
      { name: "Settings Console", path: "/settings", desc: "Configure appearance themes, alerts and sign out." },
    ];

    const allCourses = [
      { name: "React JS Complete Guide", desc: "Learn modern React hooks, Redux and state management.", path: "/skill-hub" },
      { name: "Node JS Masterclass", desc: "Backend API development with Express and middleware pipelines.", path: "/skill-hub" },
      { name: "PostgreSQL Relational Database", desc: "SQL query structures, table indexing and relation management.", path: "/skill-hub" },
      { name: "Git & GitHub Workflows", desc: "Branching policies, merge requests and repository management.", path: "/skill-hub" },
      { name: "Docker Containers Guide", desc: "Containerize web application microservices with dockerfiles.", path: "/skill-hub" },
      { name: "Python for Data Science", desc: "Data wrangling with pandas, numpy and scikit-learn models.", path: "/skill-hub" },
    ];

    const allUsers = [
      { name: "Team Finder", role: "Discover Study Partners", skills: "Browse all registered users and skills", path: "/team-finder" },
    ];

    const allProjects = [
      { title: "Project Gallery", desc: "View all shared student projects on the platform.", link: "/dashboard" },
    ];

    setSearchResults({
      pages: allPages.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)),
      courses: allCourses.filter(c => c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)),
      users: allUsers.filter(u => u.name.toLowerCase().includes(q) || u.skills.toLowerCase().includes(q)),
      projects: allProjects.filter(p => p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)),
    });
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchVal(val);
    performSearch(val);
    setShowSearch(true);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowSearch(false);
    }
  };

  const handleClearSearch = () => {
    setSearchVal("");
    setShowSearch(false);
    setSearchResults({ pages: [], courses: [], users: [], projects: [] });
  };

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("nexora_theme", "Dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("nexora_theme", "Light");
    }
    // Fire event to sync settings page cards in real time
    window.dispatchEvent(new Event("nexora_theme_changed"));
  };

  const handleMarkAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem("nexora_notifications", JSON.stringify(updated));
  };

  const handleToggleRead = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: !n.read } : n
    );
    setNotifications(updated);
    localStorage.setItem("nexora_notifications", JSON.stringify(updated));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <header className="h-24 bg-white border-b border-[#EDF1F4] flex items-center justify-between px-8 relative z-50">
      
      {/* Search Input Container */}
      <div ref={searchContainerRef} className="w-[560px] relative">
        <Search
          size={18}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={searchVal}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
          onFocus={() => setShowSearch(true)}
          placeholder="Search builders, skills, projects (Type query)..."
          className="w-full h-14 rounded-2xl border border-[#E6EBEF] pl-14 pr-20 outline-none focus:border-[#428475] transition text-sm bg-white"
        />
        {searchVal && (
          <button
            onClick={handleClearSearch}
            className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X size={16} />
          </button>
        )}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#98A2B3] text-[10px] font-bold bg-[#F8FAFB] px-2 py-1 rounded-md border border-[#EDF1F4]">
          ESC
        </div>

        {/* Global Search Results Dropdown Overlay */}
        {showSearch && searchVal.trim() && (
          <div className="absolute left-0 right-0 mt-3 bg-white border border-[#EDF1F4] rounded-2xl shadow-2xl p-5 max-h-[400px] overflow-y-auto z-[999] animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between border-b border-[#EDF1F4] pb-2 mb-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Search Matches</span>
              <button
                onClick={() => setShowSearch(false)}
                className="text-xs font-bold text-[#428475] hover:underline cursor-pointer"
              >
                Close
              </button>
            </div>

            {/* Results items */}
            {searchResults.pages.length === 0 &&
             searchResults.courses.length === 0 &&
             searchResults.users.length === 0 &&
             searchResults.projects.length === 0 ? (
               <div className="text-center py-8 text-xs text-gray-400 font-semibold bg-[#F8FAFB] rounded-xl border border-dashed border-[#EDF1F4]">
                 No matching website results found for "{searchVal}".
               </div>
            ) : (
              <div className="space-y-4">
                {/* Pages */}
                {searchResults.pages.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1.5">Pages</h4>
                    <div className="space-y-1">
                      {searchResults.pages.map((p) => (
                        <div
                          key={p.path}
                          onClick={() => {
                            window.location.href = p.path;
                            setShowSearch(false);
                          }}
                          className="p-2.5 rounded-xl hover:bg-[#EEF8F4]/40 border border-transparent hover:border-[#428475]/10 cursor-pointer transition text-left"
                        >
                          <p className="text-xs font-bold text-[#172033]">{p.name}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">{p.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Courses */}
                {searchResults.courses.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1.5">Courses & Skills</h4>
                    <div className="space-y-1">
                      {searchResults.courses.map((c) => (
                        <div
                          key={c.name}
                          onClick={() => {
                            window.location.href = c.path;
                            setShowSearch(false);
                          }}
                          className="p-2.5 rounded-xl hover:bg-[#EEF8F4]/40 border border-transparent hover:border-[#428475]/10 cursor-pointer transition text-left"
                        >
                          <p className="text-xs font-bold text-[#172033]">{c.name}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">{c.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Study Partners */}
                {searchResults.users.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-1.5">Study Partners</h4>
                    <div className="space-y-1">
                      {searchResults.users.map((u) => (
                        <div
                          key={u.name}
                          onClick={() => {
                            window.location.href = u.path;
                            setShowSearch(false);
                          }}
                          className="p-2.5 rounded-xl hover:bg-[#EEF8F4]/40 border border-transparent hover:border-[#428475]/10 cursor-pointer transition text-left"
                        >
                          <p className="text-xs font-bold text-[#172033]">{u.name} — <span className="text-[10px] text-[#428475]">{u.role}</span></p>
                          <p className="text-[10px] text-gray-500 mt-0.5">Skills: {u.skills}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {searchResults.projects.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-black text-pink-600 uppercase tracking-widest mb-1.5">Projects Showcase</h4>
                    <div className="space-y-1">
                      {searchResults.projects.map((pr) => (
                        <div
                          key={pr.title}
                          onClick={() => {
                            window.location.href = pr.link;
                            setShowSearch(false);
                          }}
                          className="p-2.5 rounded-xl hover:bg-[#EEF8F4]/40 border border-transparent hover:border-[#428475]/10 cursor-pointer transition text-left"
                        >
                          <p className="text-xs font-bold text-[#172033]">{pr.title}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">{pr.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-5">

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowBell(!showBell)}
            title="Notifications"
            className="w-14 h-14 rounded-2xl bg-[#F8FAFB] flex items-center justify-center relative cursor-pointer transition hover:bg-[#EEF8F4] hover:text-[#428475]"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold shadow-md">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showBell && (
            <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-[#EDF1F4] bg-white p-5 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between border-b border-[#EDF1F4] pb-3 mb-3">
                <span className="font-extrabold text-[#172033] text-sm">Notifications</span>
                
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-[10px] text-[#428475] font-extrabold hover:underline cursor-pointer uppercase tracking-wider"
                  >
                    Mark read
                  </button>
                )}

                <button
                  onClick={() => setShowBell(false)}
                  className="p-1 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {notifications.length === 0 ? (
                  <div className="text-center py-6 text-xs text-gray-400 font-semibold bg-[#F8FAFB] rounded-xl border border-dashed border-[#EDF1F4]">
                    No notifications yet.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => handleToggleRead(notif.id)}
                      className={`p-3 rounded-xl border transition cursor-pointer relative group ${
                        notif.read
                          ? "bg-white border-gray-100 hover:bg-[#F8FAFB]"
                          : "bg-[#EEF8F4]/30 border-[#428475]/10 hover:bg-[#EEF8F4]/40"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <p className={`text-xs font-bold text-[#172033] ${!notif.read ? "text-[#428475]" : ""}`}>
                          {notif.title}
                        </p>
                        {!notif.read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 block shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1 leading-normal">
                        {notif.description}
                      </p>
                      <span className="text-[9px] text-gray-400 font-bold block mt-2 text-right">
                        {notif.time}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Chat shortcut button */}
        <button
          onClick={() => window.location.href = "/chat"}
          title="Open Chat"
          className="w-14 h-14 rounded-2xl bg-[#F8FAFB] flex items-center justify-center cursor-pointer transition hover:bg-[#EEF8F4] hover:text-[#428475]"
        >
          <MessageCircle size={20} />
        </button>

        {/* Profile Identity Avatar */}
        <div
          onClick={() => window.location.href = "/profile"}
          title="Edit Profile"
          className="flex items-center gap-4 ml-2 cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-full bg-[#428475] text-white flex items-center justify-center font-bold transition group-hover:scale-105 overflow-hidden border border-[#EDF1F4]/10">
            {avatarUrl ? (
              <img
                src={`http://localhost:5000${avatarUrl}`}
                alt={user?.name}
                className="h-full w-full object-cover"
              />
            ) : (
              initial
            )}
          </div>

          <div className="hidden md:block">
            <h4 className="font-bold text-sm group-hover:text-[#428475] transition text-[#172033]">
              {user?.name || "Student"}
            </h4>
            <p className="text-xs text-gray-400 mt-0.5">
              Active Member
            </p>
          </div>

          <ChevronDown size={16} className="text-gray-400 group-hover:text-[#428475] transition hidden md:block" />
        </div>

      </div>

    </header>
  );
}

export default Navbar;