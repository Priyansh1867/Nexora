import {
  BookOpen,
  FolderKanban,
  Users,
  Search,
  ArrowRight,
  Brain,
} from "lucide-react";

const actions = [
  {
    title: "Continue Learning",
    description: "Resume your current roadmap and keep your streak alive.",
    icon: <BookOpen size={22} />,
    color: "bg-[#EEF8F4] text-[#428475]",
  },
  {
    title: "Browse Projects",
    description: "Discover real-world projects and contribute with teams.",
    icon: <FolderKanban size={22} />,
    color: "bg-[#EEF5FF] text-[#2563EB]",
  },
  {
    title: "Find Teammates",
    description: "Connect with students who match your interests.",
    icon: <Users size={22} />,
    color: "bg-[#FFF7E8] text-[#F59E0B]",
  },
  {
    title: "Explore Skills",
    description: "Search trending technologies and learning paths.",
    icon: <Search size={22} />,
    color: "bg-[#F4EEFF] text-[#7C3AED]",
  },
];

function QuickActions({ onActionClick }) {
  return (
    <section className="rounded-[28px] border border-[#EDF1F4] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[15px] font-semibold text-[#428475]">
            Quick Actions
          </p>

          <h2 className="mt-2 text-[30px] font-bold text-[#172033]">
            Jump back into productivity
          </h2>

          <p className="mt-3 max-w-2xl text-[#667085]">
            Access your most-used features with a single click and keep your
            learning journey moving forward.
          </p>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#EEF8F4] text-[#428475]">
          <Brain size={30} />
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-6">
        {actions.map((action) => (
          <button
            key={action.title}
            onClick={() => onActionClick && onActionClick(action.title)}
            className="group flex items-start gap-5 rounded-[24px] border border-[#EDF1F4] p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#428475] hover:shadow-[0_16px_35px_rgba(0,0,0,0.08)] cursor-pointer"
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl ${action.color}`}
            >
              {action.icon}
            </div>

            <div className="flex-1">
              <h3 className="text-[19px] font-semibold text-[#172033]">
                {action.title}
              </h3>

              <p className="mt-2 text-[15px] leading-7 text-[#667085]">
                {action.description}
              </p>

              <div className="mt-5 inline-flex items-center gap-2 font-semibold text-[#428475] transition-all group-hover:gap-3">
                Open
                <ArrowRight size={17} />
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;