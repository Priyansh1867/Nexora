import {
  ArrowRight,
  Clock3,
  Users,
  Heart,
  MessageSquare,
  Activity
} from "lucide-react";

import SkillTag from "./SkillTag";

function ProjectCard({
  id,
  title,
  description,
  teamSize,
  membersCount,
  duration,
  skills = [],
  cover_image_url,
  tech_stack = [],
  tags = [],
  stage,
  creator_name,
  creator_avatar,
  likes_count,
  comments_count,
  type = "published_project", // "open_team" or "published_project"
  onViewProject
}) {
  return (
    <div className="rounded-[30px] border border-[#EDF1F4] bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col h-full">
      {/* Cover Image */}
      {cover_image_url && (
        <div className="h-48 w-full bg-gray-100 overflow-hidden relative">
          <img src={cover_image_url} alt={title} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#428475] shadow-sm">
            {stage}
          </div>
        </div>
      )}
      
      <div className="p-7 flex flex-col flex-grow">
        {/* Header without cover image */}
        {!cover_image_url && (
          <div className="flex justify-between items-start mb-4">
            <div className="bg-[#EEF8F4] text-[#428475] px-3 py-1 rounded-full text-xs font-bold w-max">
              {stage}
            </div>
            {type === "published_project" && (
              <div className="flex gap-3 text-gray-400">
                <div className="flex items-center gap-1"><Heart size={16} /> <span className="text-sm">{likes_count}</span></div>
                <div className="flex items-center gap-1"><MessageSquare size={16} /> <span className="text-sm">{comments_count}</span></div>
              </div>
            )}
          </div>
        )}

        <h2 className="text-2xl font-bold text-[#172033] line-clamp-1">
          {title}
        </h2>

        <p className="mt-3 text-gray-600 line-clamp-2 text-sm leading-6 flex-grow">
          {description}
        </p>

        {/* Creator Info */}
        {creator_name && type === "published_project" && (
          <div className="mt-4 flex items-center gap-2">
            {creator_avatar ? (
              <img src={creator_avatar} alt={creator_name} className="w-6 h-6 rounded-full" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-[#428475] text-white flex items-center justify-center text-xs font-bold">
                {creator_name.charAt(0)}
              </div>
            )}
            <span className="text-xs text-gray-500 font-medium">By {creator_name}</span>
          </div>
        )}

        {/* Tech Stack / Skills */}
        <div className="mt-5 flex flex-wrap gap-2">
          {type === "open_team" 
            ? skills.slice(0, 3).map((skill) => <SkillTag key={skill} title={skill} />)
            : tech_stack.slice(0, 3).map((tech) => <SkillTag key={tech} title={tech} />)
          }
          {(type === "open_team" ? skills.length : tech_stack.length) > 3 && (
            <span className="text-xs text-gray-400 font-medium py-1 px-2">
              +{(type === "open_team" ? skills.length : tech_stack.length) - 3} more
            </span>
          )}
        </div>

        {/* Footer Stats */}
        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5 text-sm text-gray-500">
          {type === "open_team" ? (
            <>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-[#428475]" />
                <span className="font-semibold text-gray-700">{membersCount}</span>/{teamSize}
              </div>
              <div className="flex items-center gap-2">
                <Clock3 size={16} className="text-[#428475]" />
                {duration}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
               <Activity size={16} className="text-[#428475]" />
               Active Project
            </div>
          )}
        </div>

        {/* Action Button */}
        <button 
          onClick={onViewProject}
          className={`mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition cursor-pointer ${
          type === "open_team" 
            ? "bg-[#16332D] text-white hover:bg-[#214740]" 
            : "bg-[#EEF8F4] text-[#428475] hover:bg-[#e0f3eb]"
        }`}>
          {type === "open_team" ? "Request to Join" : "View Project"}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;