import {
  ArrowUpRight,
  Clock3,
  Flame,
  Target,
  Trophy,
} from "lucide-react";

function AnalyticsCard({
  hours = 124,
  streak = 18,
  completed = 28,
  goal = "Frontend Engineer",
}) {
  const analytics = [
    {
      title: "Learning Hours",
      value: `${hours}h`,
      icon: <Clock3 size={22} />,
      color: "bg-[#EEF8F4]",
      iconColor: "text-[#428475]",
    },
    {
      title: "Current Streak",
      value: `${streak} Days`,
      icon: <Flame size={22} />,
      color: "bg-[#FFF7E8]",
      iconColor: "text-[#F59E0B]",
    },
    {
      title: "Courses Finished",
      value: completed,
      icon: <Trophy size={22} />,
      color: "bg-[#EEF5FF]",
      iconColor: "text-[#2563EB]",
    },
    {
      title: "Goal",
      value: goal,
      icon: <Target size={22} />,
      color: "bg-[#F4EEFF]",
      iconColor: "text-[#7C3AED]",
    },
  ];

  return (
    <section className="rounded-[30px] border border-[#EDF1F4] bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#172033]">
            Learning Analytics
          </h2>

          <p className="mt-2 text-gray-500">
            Track your learning journey.
          </p>
        </div>

        <ArrowUpRight
          size={22}
          className="text-[#428475]"
        />
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {analytics.map((item) => (
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

export default AnalyticsCard;