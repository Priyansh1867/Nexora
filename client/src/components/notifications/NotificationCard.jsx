import {
  Award,
  Bell,
  CheckCircle,
  FolderKanban,
  MessageCircle,
  UserPlus,
} from "lucide-react";

function NotificationCard({
  type = "message",
  title,
  description,
  time,
  unread = false,
}) {
  const icons = {
    message: <MessageCircle size={20} />,
    project: <FolderKanban size={20} />,
    invite: <UserPlus size={20} />,
    achievement: <Award size={20} />,
    system: <Bell size={20} />,
    success: <CheckCircle size={20} />,
  };

  return (
    <div
      className={`
      relative
      rounded-[30px]
      border
      p-7
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      ${
        unread
          ? "border-[#428475] bg-[#F5FCF9]"
          : "border-[#EDF1F4] bg-white"
      }
      `}
    >
      {unread && (
        <div className="absolute right-6 top-6 h-3 w-3 rounded-full bg-[#428475]" />
      )}

      <div className="flex gap-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF8F4] text-[#428475]">
          {icons[type]}
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-[#172033]">
            {title}
          </h3>

          <p className="mt-3 leading-7 text-gray-600">
            {description}
          </p>

          <p className="mt-5 text-sm text-gray-500">
            {time}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotificationCard;