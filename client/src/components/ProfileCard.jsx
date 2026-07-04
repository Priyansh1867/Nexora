import { useState } from "react";
import {
  Calendar,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Camera,
  Loader2,
} from "lucide-react";
import profileService from "../services/profileService";

import { showToast } from "../utils/toast";

function ProfileCard({ profile, onAvatarUpload }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    setUploading(true);
    try {
      const res = await profileService.uploadAvatar(formData);
      if (onAvatarUpload) {
        onAvatarUpload(res.avatar_url);
      }
      showToast("Profile picture updated successfully!");
    } catch (err) {
      console.error(err);
      showToast("Failed to upload image. Please check format (PNG/JPG).", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-8 shadow-sm">
      <div className="flex flex-col items-center text-center">
        
        {/* Avatar Circle with Upload Overlay */}
        <div className="relative group">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#428475] text-5xl font-bold text-white overflow-hidden border-4 border-[#EEF8F4] shadow-md">
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

          <label
            htmlFor="avatar-card-picker"
            className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer"
          >
            {uploading ? (
              <Loader2 className="animate-spin text-white" size={24} />
            ) : (
              <div className="flex flex-col items-center text-[10px] font-bold">
                <Camera size={20} className="mb-1" />
                Upload Photo
              </div>
            )}
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            id="avatar-card-picker"
            className="hidden"
            disabled={uploading}
          />
        </div>

        <h2 className="mt-6 text-3xl font-bold text-[#172033]">
          {profile.name}
        </h2>

        <p className="mt-2 text-[#428475] font-semibold text-sm">
          {profile.role}
        </p>

        <div className="mt-8 w-full space-y-5">
          <Info
            icon={<Mail size={18} />}
            value={profile.email}
          />

          <Info
            icon={<Phone size={18} />}
            value={profile.phone}
          />

          <Info
            icon={<MapPin size={18} />}
            value={profile.location}
          />

          <Info
            icon={<GraduationCap size={18} />}
            value={profile.college}
          />

          <Info
            icon={<Calendar size={18} />}
            value="Final Year"
          />
        </div>
      </div>
    </section>
  );
}

function Info({ icon, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-[#F8FAFB] p-4 border border-[#EDF1F4]/40">
      <div className="text-[#428475]">
        {icon}
      </div>
      <span className="text-xs font-semibold text-gray-700">
        {value}
      </span>
    </div>
  );
}

export default ProfileCard;