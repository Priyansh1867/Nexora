import {
  Bell,
  CheckCircle2,
  Clock3,
  Users,
} from "lucide-react";

function SummaryCard({ notificationsCount = 0, unreadCount = 0 }) {
  const readCount = Math.max(0, notificationsCount - unreadCount);

  const stats = [
    {
      title: "Unread",
      value: String(unreadCount),
      icon: <Bell size={20} />,
      color: "bg-[#EEF8F4]",
      iconColor: "text-[#428475]",
    },
    {
      title: "Read",
      value: String(readCount),
      icon: <CheckCircle2 size={20} />,
      color: "bg-[#EEF5FF]",
      iconColor: "text-[#2563EB]",
    },
    {
      title: "Total",
      value: String(notificationsCount),
      icon: <Users size={20} />,
      color: "bg-[#FFF7E8]",
      iconColor: "text-[#F59E0B]",
    },
    {
      title: "Pending",
      value: String(unreadCount),
      icon: <Clock3 size={20} />,
      color: "bg-[#F4EEFF]",
      iconColor: "text-[#7C3AED]",
    },
  ];

  return (
    <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#172033]">
          Notification Summary
        </h2>

        <p className="mt-2 text-gray-500">
          Overview of your recent activity.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-[24px] border border-[#EDF1F4] p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
            >
              <div className={item.iconColor}>
                {item.icon}
              </div>
            </div>

            <h3 className="mt-5 text-lg font-semibold text-[#172033]">
              {item.title}
            </h3>

            <h2 className="mt-2 text-3xl font-bold text-[#172033]">
              {item.value}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SummaryCard;