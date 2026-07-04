import { useEffect, useState } from "react";
import {
  Briefcase,
  GraduationCap,
  Globe,
  Loader2,
} from "lucide-react";
import profileService from "../../services/profileService";
import { useAuth } from "../../context/AuthContext";
import { showToast } from "../../utils/toast";

function AccountSettings() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    college: "",
    role: "",
    portfolio: "",
    experience: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await profileService.getProfile();
        setProfile({
          college: data.college || "",
          role: data.title || "",
          portfolio: data.portfolio || "",
          experience: "",
        });
      } catch (err) {
        console.error("Failed to load profile in settings:", err);
      }
    };
    if (user) {
      loadProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await profileService.updateProfile({
        college: profile.college,
        title: profile.role,
        portfolio: profile.portfolio,
      });
      setLoading(false);
      showToast("Academic and professional details updated successfully!");
    } catch (err) {
      console.error(err);
      setLoading(false);
      showToast("Failed to update profile.", "error");
    }
  };

  return (
    <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-8 shadow-sm">
      
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#172033]">
            Account Details
          </h2>
          <p className="mt-2 text-xs text-gray-500">
            Academic and professional credentials details.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="rounded-2xl bg-[#16332D] hover:bg-[#214740] px-6 py-3 text-xs font-bold text-white transition flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
        >
          {loading ? <Loader2 size={12} className="animate-spin" /> : null}
          Save Details
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field
          icon={<GraduationCap size={16} />}
          label="College / Institute"
          name="college"
          value={profile.college}
          onChange={handleChange}
        />

        <Field
          icon={<Briefcase size={16} />}
          label="Job Role / Title"
          name="role"
          value={profile.role}
          onChange={handleChange}
        />

        <Field
          icon={<Globe size={16} />}
          label="Portfolio Website Link"
          name="portfolio"
          value={profile.portfolio}
          onChange={handleChange}
        />

        <Field
          icon={<Briefcase size={16} />}
          label="Experience Level"
          name="experience"
          value={profile.experience}
          onChange={handleChange}
        />
      </div>

    </section>
  );
}

function Field({ icon, label, name, value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-gray-700 uppercase">
        {label}
      </label>

      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>

        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="h-12 w-full rounded-xl border border-[#E5E7EB] pl-12 pr-4 outline-none focus:border-[#428475] text-xs bg-white focus:bg-white transition"
        />
      </div>
    </div>
  );
}

export default AccountSettings;