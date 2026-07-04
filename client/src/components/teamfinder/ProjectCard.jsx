import {
  ArrowRight,
  Clock3,
  Users,
} from "lucide-react";

import SkillTag from "./SkillTag";

function ProjectCard({
  title,
  description,
  teamSize,
  duration,
  skills = [],
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
      <h2 className="text-2xl font-bold text-[#172033]">
        {title}
      </h2>

      <p className="mt-4 leading-7 text-gray-600">
        {description}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {skills.map((skill) => (
          <SkillTag
            key={skill}
            title={skill}
          />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Users size={16} />

          {teamSize} Members
        </div>

        <div className="flex items-center gap-2">
          <Clock3 size={16} />

          {duration}
        </div>
      </div>

      <button className="mt-8 flex items-center gap-2 font-semibold text-[#428475] transition hover:gap-3">
        View Project

        <ArrowRight size={18} />
      </button>
    </div>
  );
}

export default ProjectCard;