import {
  Briefcase,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Star,
} from "lucide-react";

import SkillTag from "./SkillTag";

function MemberCard({
  name,
  role,
  college,
  location,
  avatar,
  match = 95,
  experience = "Intermediate",
  skills = [],
  available = true,
  bio,
  github,
  linkedin,
  portfolio,
  onConnect,
  connectedState,
}) {
  return (
    <div
      className="
      rounded-[30px]
      border
      border-[#EDF1F4]
      bg-white
      p-7
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      "
    >
      <div className="flex justify-between">
        <div className="flex gap-5">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#428475] text-3xl font-bold text-white">
              {name.charAt(0)}
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold text-[#172033]">
              {name}
            </h2>

            <p className="mt-1 font-medium text-[#428475]">
              {role}
            </p>

            <div className="mt-3 space-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Briefcase size={15} />
                {experience}
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={15} />
                {location}
              </div>

              <div className="flex items-center gap-2">
                <Star
                  size={15}
                  className="fill-yellow-400 text-yellow-400"
                />
                {match}% Match
              </div>
            </div>
          </div>
        </div>

        <div
          className={`h-4 w-4 rounded-full ${
            available
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        />
      </div>

      <div className="mt-6 rounded-2xl bg-[#F8FAFB] p-5">
        <h4 className="font-semibold text-[#172033] mb-2">
          {college}
        </h4>
        {bio && (
          <p className="text-sm text-gray-500 line-clamp-2">
            {bio}
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {skills.map((skill) => (
          <SkillTag
            key={skill}
            title={skill}
          />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-3">
          {github ? (
            <a href={github} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF8F4] text-[#428475] transition hover:scale-105">
              <Github size={18} />
            </a>
          ) : (
            <button disabled className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed">
              <Github size={18} />
            </button>
          )}

          {linkedin ? (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF8F4] text-[#428475] transition hover:scale-105">
              <Linkedin size={18} />
            </a>
          ) : (
            <button disabled className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed">
              <Linkedin size={18} />
            </button>
          )}

          {portfolio ? (
            <a href={portfolio} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF8F4] text-[#428475] transition hover:scale-105">
              <Briefcase size={18} />
            </a>
          ) : (
            <button disabled className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed">
              <Briefcase size={18} />
            </button>
          )}
        </div>

        <button
          onClick={onConnect}
          disabled={connectedState === "sent"}
          className={`flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition cursor-pointer ${
            connectedState === "sent"
              ? "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#16332D] text-white hover:bg-[#214740]"
          }`}
        >
          <MessageCircle size={18} />
          {connectedState === "sent" ? "Invitation Sent" : "Connect"}
        </button>
      </div>
    </div>
  );
}

export default MemberCard;