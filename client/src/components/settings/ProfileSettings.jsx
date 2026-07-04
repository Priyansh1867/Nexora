import { useEffect, useState } from "react";
import {
  Camera,
  Mail,
  MapPin,
  Phone,
  User,
  Loader2,
} from "lucide-react";
import profileService from "../../services/profileService";
import { useAuth } from "../../context/AuthContext";
import { showToast } from "../../utils/toast";

function ProfileSettings() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    avatar_url: "",
  });

  const loadProfile = async () => {
    try {
      const data = await profileService.getProfile();
      setProfile({
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        location: "",
        avatar_url: data.avatar_url || "",
      });
    } catch (err) {
      console.error("Failed to load profile in settings:", err);
    }
  };

  useEffect(() => {
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
    setTimeout(() => {
      setLoading(false);
      showToast("Profile information updated successfully!");
    }, 700);
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    setUploading(true);
    try {
      const res = await profileService.uploadAvatar(formData);
      setProfile((prev) => ({ ...prev, avatar_url: res.avatar_url }));
      showToast("Profile picture uploaded successfully!");
    } catch (err) {
      console.error(err);
      showToast("Failed to upload profile picture. Ensure it is a valid image (PNG/JPG).", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-8 shadow-sm">
      
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#172033]">
            Profile Information
          </h2>
          <p className="mt-2 text-xs text-gray-500">
            Update your public profile information.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="rounded-2xl bg-[#16332D] hover:bg-[#214740] px-6 py-3 text-xs font-bold text-white transition flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
        >
          {loading ? <Loader2 size={12} className="animate-spin" /> : null}
          Save Changes
        </button>
      </div>

      <div className="mb-10 flex items-center gap-6">
        
        {/* Avatar image container */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#428475] text-3xl font-bold text-white shadow-sm overflow-hidden border-2 border-[#EDF1F4]">
          {profile.avatar_url ? (
            <img
              src={`http://localhost:5000${profile.avatar_url}`}
              alt={profile.name}
              className="h-full w-full object-cover"
            />
          ) : (
            profile.name ? profile.name.charAt(0).toUpperCase() : "U"
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="hidden"
          id="settings-avatar-picker"
          disabled={uploading}
        />

        <label
          htmlFor="settings-avatar-picker"
          className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] hover:bg-gray-50 px-4 py-2.5 text-xs font-semibold cursor-pointer shadow-sm transition"
        >
          {uploading ? (
            <>
              <Loader2 size={14} className="animate-spin text-[#428475]" />
              Uploading...
            </>
          ) : (
            <>
              <Camera size={14} />
              Change Photo
            </>
          )}
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Input
          icon={<User size={16} />}
          label="Full Name"
          name="name"
          value={profile.name}
          onChange={handleChange}
          disabled={true}
        />

        <Input
          icon={<Mail size={16} />}
          label="Email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          disabled={true}
        />

        <Input
          icon={<Phone size={16} />}
          label="Phone"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
        />

        <Input
          icon={<MapPin size={16} />}
          label="Location"
          name="location"
          value={profile.location}
          onChange={handleChange}
        />
      </div>

    </section>
  );
}

function Input({ icon, label, name, value, onChange, disabled = false }) {
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
          disabled={disabled}
          className="h-12 w-full rounded-xl border border-[#E5E7EB] pl-12 pr-4 outline-none focus:border-[#428475] text-xs disabled:bg-gray-50 disabled:text-gray-400"
        />
      </div>
    </div>
  );
}

export default ProfileSettings;