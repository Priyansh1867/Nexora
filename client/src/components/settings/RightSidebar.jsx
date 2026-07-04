import { useEffect, useState } from "react";
import {
  CheckCircle2,
  ShieldCheck,
  User,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import profileService from "../../services/profileService";

function RightSidebar() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    role: "Developer",
    college: "Nexora Student",
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await profileService.getProfile();
        setProfile({
          role: data.title || "Developer",
          college: data.college || "Nexora Student",
        });
      } catch (err) {
        console.error("Failed to load profile details in settings sidebar:", err);
      }
    };
    if (user) {
      loadProfile();
    }
  }, [user]);

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <aside className="flex w-full flex-col gap-6 xl:w-[360px]">
      
      {/* Profile summary */}
      <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-7 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#428475] text-3xl font-bold text-white shadow-sm">
            {initial}
          </div>
          <h2 className="mt-5 text-2xl font-bold text-[#172033]">
            {user?.name || "Student"}
          </h2>
          <p className="mt-2 text-[#428475] text-xs font-semibold text-center">
            {profile.role} • {profile.college}
          </p>
        </div>
      </section>

      {/* Completion */}
      <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-7 shadow-sm">
        <div className="flex items-center gap-3">
          <CheckCircle2
            size={20}
            className="text-[#428475]"
          />
          <h2 className="text-xl font-bold">
            Profile Status
          </h2>
        </div>

        <div className="mt-7">
          <div className="flex justify-between text-xs font-bold text-gray-500">
            <span>Completion Score</span>
            <span>92%</span>
          </div>

          <div className="mt-3 h-3 rounded-full bg-[#EEF1F3] overflow-hidden">
            <div className="h-full w-[92%] rounded-full bg-[#428475]" />
          </div>
        </div>
      </section>

      {/* Security summary */}
      <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-7 shadow-sm">
        <div className="flex items-center gap-3">
          <ShieldCheck
            size={20}
            className="text-[#428475]"
          />
          <h2 className="text-xl font-bold">
            Security Status
          </h2>
        </div>

        <div className="mt-7 space-y-4">
          <Item title="Email Verified" />
          <Item title="Phone Verified" />
          <Item title="2FA Disabled" />
          <Item title="Password Updated" />
        </div>
      </section>

    </aside>
  );
}

function Item({ title }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-[#F8FAFB] p-4 border border-[#EDF1F4]/40">
      <User
        size={18}
        className="text-[#428475]"
      />
      <span className="font-semibold text-xs text-[#172033]">
        {title}
      </span>
    </div>
  );
}

export default RightSidebar;