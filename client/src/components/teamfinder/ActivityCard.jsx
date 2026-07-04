import {
  Clock3,
  GitPullRequest,
  MessageCircle,
  Star,
  UserPlus,
} from "lucide-react";

function ActivityCard({
  type,
  title,
  description,
  time,
}) {
  const icons = {
    invite: <UserPlus size={18} />,
    message: <MessageCircle size={18} />,
    project: <GitPullRequest size={18} />,
    achievement: <Star size={18} />,
  };

  return (
    <div
      className="
      rounded-[28px]
      border
      border-[#EDF1F4]
      bg-white
      p-6
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-lg
      "
    >
      <div className="flex items-start gap-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF8F4] text-[#428475]">
          {icons[type]}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#172033]">
            {title}
          </h3>

          <p className="mt-2 leading-7 text-gray-600">
            {description}
          </p>

          <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
            <Clock3 size={16} />

            {time}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityCard;