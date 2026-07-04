import { Sparkles, Circle, CheckCircle2 } from "lucide-react";

function ProfileCompletion({ profile }) {
  // Calculate dynamic profile completion based on real values
  const hasResume = !!profile?.resume_url;
  const hasGithub = !!profile?.github;
  const hasBio = !!profile?.bio && profile.bio.trim().length > 0;

  let percentage = 40; // Base details score
  if (hasResume) percentage += 20;
  if (hasGithub) percentage += 20;
  if (hasBio) percentage += 20;

  // Circle progress calculation (circumference of radius 70 is 439.8)
  const strokeDashoffset = 439.8 - (439.8 * percentage) / 100;

  const handleTaskClick = () => {
    window.location.href = "/profile";
  };

  return (
    <section className="h-full flex flex-col justify-between bg-white rounded-[28px] border border-[#EDF1F4] shadow-[0_8px_30px_rgba(0,0,0,0.05)] p-7">
      
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-[#EEF8F4] flex items-center justify-center">
          <Sparkles
            size={22}
            className="text-[#428475]"
          />
        </div>
        <div>
          <h2 className="font-bold text-[#172033]">
            Profile Strength
          </h2>
          <p className="text-xs text-[#667085] font-semibold">
            {percentage === 100 ? "All tasks complete! 🎉" : "Almost Ready 🚀"}
          </p>
        </div>
      </div>

      <div className="flex justify-center my-8">
        <div className="relative w-[160px] h-[160px] flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background Track */}
            <circle
              cx="80"
              cy="80"
              r="70"
              className="stroke-[#E8EDF1]"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Active Progress Ring */}
            <circle
              cx="80"
              cy="80"
              r="70"
              className="stroke-[#428475] transition-all duration-500"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray="439.8"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute text-center">
            <h1 className="text-4xl font-extrabold text-[#172033] tracking-tight">
              {percentage}%
            </h1>
            <p className="text-xs text-[#4B5563] font-semibold mt-1">
              Completed
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#EDF1F4] pt-6">
        <h3 className="font-semibold text-xs text-[#172033] mb-5 uppercase tracking-wider">
          Remaining Tasks
        </h3>

        <div className="space-y-4">
          <Task
            title="Upload Resume"
            done={hasResume}
            onClick={handleTaskClick}
          />
          <Task
            title="Add GitHub Profile"
            done={hasGithub}
            onClick={handleTaskClick}
          />
          <Task
            title="Complete Bio Statement"
            done={hasBio}
            onClick={handleTaskClick}
          />
        </div>
      </div>

      <button
        onClick={() => window.location.href = "/profile"}
        className="mt-8 w-full h-12 rounded-2xl bg-[#428475] hover:bg-[#1A312C] text-white font-semibold transition-all cursor-pointer text-xs shadow-sm"
      >
        Complete Profile
      </button>

    </section>
  );
}

function Task({ title, done, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 cursor-pointer group"
    >
      {done ? (
        <CheckCircle2
          size={18}
          className="text-[#428475]"
        />
      ) : (
        <Circle
          size={18}
          className="text-[#98A2B3] group-hover:text-[#428475] transition"
        />
      )}

      <span className={`text-xs ${done ? "line-through text-gray-400 font-medium" : "text-[#667085] font-semibold"}`}>
        {title}
      </span>
    </div>
  );
}

export default ProfileCompletion;