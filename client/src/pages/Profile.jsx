import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import ProfileCard from "../components/ProfileCard";
import SkillCard from "../components/SkillCard";

import { useAuth } from "../context/AuthContext";
import profileService from "../services/profileService";
import { showToast } from "../utils/toast";

import {
  Award,
  Briefcase,
  FileText,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Pencil,
  Save,
  Upload,
  X,
  Loader2,
  FileCheck,
} from "lucide-react";

function Profile() {
  const [editing, setEditing] = useState(false);
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    name: "",
    role: "",
    college: "",
    location: "",
    email: "",
    phone: "",
    github: "",
    linkedin: "",
    portfolio: "",
    bio: "",
    resume_url: "",
  });

  const [skills, setSkills] = useState([]);

  const [bookmarkedSkills, setBookmarkedSkills] = useState(() => {
    const saved = localStorage.getItem("nexora_starred_skills");
    return saved ? JSON.parse(saved) : [];
  });

  const [uploadingResume, setUploadingResume] = useState(false);

  const fetchProfile = async () => {
    try {
      const data = await profileService.getProfile();
      setProfile({
        name: user?.name || data.name || "",
        email: user?.email || data.email || "",
        role: data.title || "",
        college: data.college || "",
        location: "",
        phone: "",
        github: data.github || "",
        linkedin: data.linkedin || "",
        portfolio: data.portfolio || "",
        bio: data.bio || "",
        resume_url: data.resume_url || "",
      });

      // Build skills list dynamically from profile skills array
      if (data.skills && data.skills.length > 0) {
        const levelMap = { 0: "Beginner", 50: "Intermediate", 80: "Advanced" };
        const builtSkills = data.skills.map((skillName, idx) => ({
          skill: skillName,
          level: idx < 2 ? "Advanced" : "Intermediate",
          progress: 70 + (idx % 3) * 10,
        }));
        setSkills(builtSkills);
      }
    } catch (err) {
      console.error("Failed to fetch profile", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleSave = async () => {
    try {
      await profileService.updateProfile({
        title: profile.role,
        bio: profile.bio,
        college: profile.college,
        github: profile.github,
        linkedin: profile.linkedin,
        portfolio: profile.portfolio,
      });
      setEditing(false);
      showToast("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to save profile", err);
      showToast("Failed to save profile modifications.", "error");
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check size limit (5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast("File is too large. Max size is 5MB!", "error");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setUploadingResume(true);
    try {
      const res = await profileService.uploadResume(formData);
      setProfile((prev) => ({
        ...prev,
        resume_url: res.resume_url,
      }));
      showToast("Resume uploaded successfully!");
    } catch (err) {
      console.error("Failed to upload resume:", err);
      showToast(err.response?.data?.message || "Error uploading resume. Check file type (PDF/Word).", "error");
    } finally {
      setUploadingResume(false);
    }
  };

  const handleChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleBookmarkSkill = (skillName) => {
    setBookmarkedSkills((prev) => {
      let updated = [...prev];
      if (updated.includes(skillName)) {
        updated = updated.filter((s) => s !== skillName);
      } else {
        updated.push(skillName);
      }
      localStorage.setItem("nexora_starred_skills", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* Banner */}
        <section className="rounded-[32px] bg-gradient-to-r from-[#16332D] to-[#428475] p-10 text-white">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold">My Profile</h1>
              <p className="mt-3 text-white/80 text-sm">
                Manage your professional card, customize bio statements, and present verified skills to collaborators.
              </p>
            </div>

            <div className="flex gap-3 shrink-0">
              {editing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-[#16332D] transition hover:scale-105 cursor-pointer shadow-md text-xs"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      fetchProfile();
                    }}
                    className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-bold text-white transition hover:bg-white/20 cursor-pointer text-xs"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-bold text-white transition hover:bg-white hover:text-[#16332D] cursor-pointer text-xs"
                >
                  <Pencil size={16} />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Profile Card & Details Grid */}
        <div className="grid gap-8 xl:grid-cols-[340px_1fr]">
          <ProfileCard 
            profile={profile} 
            onAvatarUpload={(url) => setProfile((prev) => ({ ...prev, avatar_url: url }))}
          />

          <div className="space-y-8">
            
            {/* Personal Information */}
            <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold text-[#172033]">
                Personal Information
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                <Field
                  editing={editing}
                  label="Full Name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  disabled={true}
                />
                <Field
                  editing={editing}
                  label="Professional Role"
                  name="role"
                  value={profile.role}
                  onChange={handleChange}
                />
                <Field
                  editing={editing}
                  label="College / Institute"
                  name="college"
                  value={profile.college}
                  onChange={handleChange}
                />
                <Field
                  editing={editing}
                  label="Location"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                />
                <Field
                  editing={editing}
                  label="Email ID"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={true}
                />
                <Field
                  editing={editing}
                  label="Contact Phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-xs font-bold text-[#172033] uppercase tracking-wider">
                  About Me / Biography
                </label>
                {editing ? (
                  <textarea
                    rows={4}
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 p-4 outline-none transition focus:border-[#428475] bg-gray-50 focus:bg-white text-xs leading-relaxed"
                  />
                ) : (
                  <p className="leading-7 text-xs text-gray-500 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                    {profile.bio || "No biography added yet. Click edit to introduce yourself!"}
                  </p>
                )}
              </div>
            </section>

            {/* Social Links */}
            <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <Globe size={22} className="text-[#428475]" />
                <h2 className="text-2xl font-bold text-[#172033]">Social Links</h2>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {editing ? (
                  <>
                    <div>
                      <label className="mb-2 block text-xs font-bold text-gray-500 uppercase">GitHub Profile URL</label>
                      <input
                        type="text"
                        name="github"
                        value={profile.github}
                        onChange={handleChange}
                        className="w-full h-11 rounded-xl border border-gray-200 px-3.5 text-xs outline-none focus:border-[#428475]"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold text-gray-500 uppercase">LinkedIn Profile URL</label>
                      <input
                        type="text"
                        name="linkedin"
                        value={profile.linkedin}
                        onChange={handleChange}
                        className="w-full h-11 rounded-xl border border-gray-200 px-3.5 text-xs outline-none focus:border-[#428475]"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold text-gray-500 uppercase">Portfolio Website URL</label>
                      <input
                        type="text"
                        name="portfolio"
                        value={profile.portfolio}
                        onChange={handleChange}
                        className="w-full h-11 rounded-xl border border-gray-200 px-3.5 text-xs outline-none focus:border-[#428475]"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <SocialCard
                      icon={<Github size={20} />}
                      title="GitHub"
                      value={profile.github || "Not connected"}
                    />
                    <SocialCard
                      icon={<Linkedin size={20} />}
                      title="LinkedIn"
                      value={profile.linkedin || "Not connected"}
                    />
                    <SocialCard
                      icon={<Globe size={20} />}
                      title="Portfolio"
                      value={profile.portfolio || "Not connected"}
                    />
                  </>
                )}
              </div>
            </section>

            {/* Technical Skills */}
            <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <Award size={22} className="text-[#428475]" />
                <h2 className="text-2xl font-bold text-[#172033]">Technical Skills</h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {skills.length > 0 ? skills.map((item) => (
                  <SkillCard
                    key={item.skill}
                    skill={item.skill}
                    level={item.level}
                    progress={item.progress}
                    isBookmarked={bookmarkedSkills.includes(item.skill)}
                    onBookmarkToggle={() => toggleBookmarkSkill(item.skill)}
                  />
                )) : (
                  <div className="col-span-3 py-10 text-center text-gray-400 text-sm font-semibold">
                    No skills added yet. Update your profile to add skills.
                  </div>
                )}
              </div>
            </section>

            {/* Education Timeline */}
            <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <GraduationCap size={22} className="text-[#428475]" />
                <h2 className="text-2xl font-bold text-[#172033]">Education</h2>
              </div>

              <div className="space-y-5">
                {profile.college ? (
                  <TimelineCard
                    title="Student"
                    subtitle={profile.college}
                    duration="Present"
                    description={profile.bio || "Currently enrolled and building skills."}
                  />
                ) : (
                  <div className="py-6 text-center text-gray-400 text-xs font-semibold">
                    Update your profile to add your education details.
                  </div>
                )}
              </div>
            </section>

            {/* Experience Timeline */}
            <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <Briefcase size={22} className="text-[#428475]" />
                <h2 className="text-2xl font-bold text-[#172033]">Experience</h2>
              </div>

              <div className="space-y-5">
                <div className="py-6 text-center text-gray-400 text-xs font-semibold">
                  No experience entries yet. Add your work history by editing your profile.
                </div>
              </div>
            </section>

            {/* Resume Upload */}
            <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <FileText size={22} className="text-[#428475]" />
                <h2 className="text-2xl font-bold text-[#172033]">Resume</h2>
              </div>

              <div className="rounded-[24px] border-2 border-dashed border-[#D8E4E0] p-10 text-center hover:border-[#428475] transition bg-gray-50/30">
                {uploadingResume ? (
                  <div className="py-6 flex flex-col items-center justify-center text-gray-500">
                    <Loader2 size={38} className="animate-spin text-[#428475] mb-3" />
                    <p className="text-xs font-bold">Uploading resume to Nexora secure store...</p>
                  </div>
                ) : profile.resume_url ? (
                  <div className="space-y-4">
                    <FileCheck size={42} className="mx-auto text-[#428475]" />
                    <h3 className="text-lg font-bold text-[#172033]">Resume Uploaded!</h3>
                    <p className="text-xs text-gray-500">
                      File:{" "}
                      <a
                        href={`http://localhost:5000${profile.resume_url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#428475] font-bold hover:underline"
                      >
                        {profile.resume_url.split("/").pop()}
                      </a>
                    </p>
                    <div className="flex justify-center gap-3 pt-2">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        className="hidden"
                        id="resume-replace-picker"
                      />
                      <label
                        htmlFor="resume-replace-picker"
                        className="rounded-xl border border-gray-200 bg-white px-5 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 transition cursor-pointer shadow-sm"
                      >
                        Replace Resume
                      </label>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload size={38} className="mx-auto text-[#428475]" />
                    <h3 className="mt-4 text-lg font-bold text-[#172033]">Upload Resume</h3>
                    <p className="mt-1.5 text-xs text-gray-500">PDF, DOC, or DOCX files accepted (Max 5MB)</p>
                    
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      className="hidden"
                      id="resume-primary-picker"
                    />
                    <label
                      htmlFor="resume-primary-picker"
                      className="mt-5 inline-block rounded-xl bg-[#16332D] hover:bg-[#214740] px-6 py-2.5 font-bold text-white text-xs transition cursor-pointer shadow-sm"
                    >
                      Choose File
                    </label>
                  </>
                )}
              </div>
            </section>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

function Field({ editing, label, name, value, onChange, disabled = false }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-gray-500 uppercase tracking-wider">
        {label}
      </label>

      {editing && !disabled ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full h-11 rounded-xl border border-gray-200 px-3.5 text-xs outline-none focus:border-[#428475] bg-gray-50 focus:bg-white transition"
        />
      ) : (
        <div className="flex h-11 items-center rounded-xl bg-[#F8FAFB] px-3.5 text-xs text-[#344054] border border-[#EDF1F4]">
          {value || `No ${label} added`}
        </div>
      )}
    </div>
  );
}

function TimelineCard({ title, subtitle, duration, description }) {
  return (
    <div className="rounded-[24px] border border-[#EDF1F4] p-6 bg-white hover:shadow-md transition">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#172033]">{title}</h3>
          <p className="mt-1 text-xs font-semibold text-[#428475]">{subtitle}</p>
        </div>
        <span className="rounded-full bg-[#EEF8F4] px-3.5 py-1 text-xs font-bold text-[#428475] shrink-0 w-fit">
          {duration}
        </span>
      </div>
      <p className="mt-4 text-xs text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}

function SocialCard({ icon, title, value }) {
  const isUrl = value?.startsWith("http");
  return (
    <div className="rounded-[24px] border border-[#EDF1F4] p-5 bg-white hover:shadow-md transition flex flex-col justify-between h-36">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF8F4] text-[#428475]">
          {icon}
        </div>
        <span className="text-xs font-bold text-[#172033]">{title}</span>
      </div>
      {isUrl ? (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="mt-3 block break-all text-xs font-semibold text-[#428475] hover:underline"
        >
          {value}
        </a>
      ) : (
        <span className="mt-3 block text-xs text-gray-400 font-semibold italic">{value}</span>
      )}
    </div>
  );
}

export default Profile;
