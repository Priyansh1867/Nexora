import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import profileService from "../../services/profileService";

function OnlineUsers() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        // Fetch real registered users (excluding current user)
        const profiles = await profileService.getAllProfiles();
        const formatted = profiles.slice(0, 5).map((p) => ({
          name: p.name || "Student",
          role: p.title || "Member",
        }));
        // Always show current user first
        const currentUserEntry = user ? [{ name: user.name || "You", role: "You" }] : [];
        setUsers([...currentUserEntry, ...formatted]);
      } catch (err) {
        // Fallback: just show current user
        if (user) {
          setUsers([{ name: user.name || "You", role: "You" }]);
        }
      }
    };

    if (user) {
      loadUsers();
    }
  }, [user]);

  if (users.length === 0) {
    return (
      <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-7 shadow-sm">
        <h2 className="text-xl font-bold text-[#172033] mb-4">Online Now</h2>
        <p className="text-sm text-gray-400 text-center py-4">No users online yet.</p>
      </section>
    );
  }

  return (
    <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-7 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-bold text-[#172033]">
          Online Now
        </h2>

        <span className="rounded-full bg-[#EEF8F4] px-3 py-1 text-sm font-semibold text-[#428475]">
          {users.length}
        </span>

      </div>

      <div className="space-y-4">

        {users.map((u, idx) => (
          <div
            key={u.name + idx}
            className="flex items-center gap-4 rounded-2xl bg-[#F8FAFB] p-4"
          >

            <div className="relative">

              <div className={`flex h-12 w-12 items-center justify-center rounded-full font-bold text-white ${idx === 0 ? "bg-[#16332D]" : "bg-[#428475]"}`}>
                {u.name.charAt(0).toUpperCase()}
              </div>

              <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />

            </div>

            <div>

              <h4 className="font-semibold text-[#172033]">
                {u.name} {idx === 0 ? "(You)" : ""}
              </h4>

              <p className="text-sm text-gray-500">
                {u.role}
              </p>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default OnlineUsers;