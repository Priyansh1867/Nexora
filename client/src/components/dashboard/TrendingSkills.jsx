import { useState, useEffect } from "react";
import {
  ArrowUpRight,
  Flame,
  TrendingUp,
  Sparkles,
} from "lucide-react";

const INITIAL_SKILLS = [
  {
    name: "React 19",
    learners: 18400,
    growth: "+24%",
    level: "Intermediate",
    color: "bg-sky-100 text-sky-700",
  },
  {
    name: "Node.js",
    learners: 15800,
    growth: "+19%",
    level: "Intermediate",
    color: "bg-green-100 text-green-700",
  },
  {
    name: "PostgreSQL",
    learners: 11200,
    growth: "+31%",
    level: "Advanced",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    name: "Docker",
    learners: 9700,
    growth: "+28%",
    level: "Advanced",
    color: "bg-cyan-100 text-cyan-700",
  },
  {
    name: "System Design",
    learners: 8300,
    growth: "+36%",
    level: "Expert",
    color: "bg-orange-100 text-orange-700",
  },
];

function TrendingSkills({ onSkillLearn }) {
  const [skillsList, setSkillsList] = useState(INITIAL_SKILLS);

  // Simulate real-time learner increments for premium live feel
  useEffect(() => {
    const interval = setInterval(() => {
      setSkillsList((prev) =>
        prev.map((skill) => {
          // 30% chance to increment learners of a skill
          if (Math.random() > 0.7) {
            const add = Math.floor(Math.random() * 3) + 1;
            return {
              ...skill,
              learners: skill.learners + add,
            };
          }
          return skill;
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    return (num / 1000).toFixed(1) + "k";
  };

  return (
    <section className="rounded-[28px] border border-[#EDF1F4] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF8F4] px-4 py-2 text-sm font-semibold text-[#428475]">
            <Flame size={16} />
            Trending Skills
          </div>

          <h2 className="mt-4 text-3xl font-bold text-[#172033]">
            Learn what recruiters are hiring for
          </h2>

          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[#667085]">
            Stay ahead of the competition by focusing on technologies that are
            rapidly growing across student communities and companies.
          </p>
        </div>

        <button 
          onClick={() => window.location.href = "/skill-hub"}
          className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] px-5 py-3 text-sm font-semibold text-[#172033] transition hover:border-[#428475] hover:text-[#428475] cursor-pointer"
        >
          Explore All
          <ArrowUpRight size={16} />
        </button>
      </div>

      <div className="mt-10 space-y-5">
        {skillsList.map((skill, index) => (
          <div
            key={skill.name}
            className="flex items-center justify-between rounded-3xl border border-[#EEF2F5] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#428475] hover:shadow-xl bg-white"
          >
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF8F4] text-lg font-bold text-[#428475]">
                {index + 1}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#172033]">
                  {skill.name}
                </h3>

                <p className="mt-1 text-xs text-gray-500 font-semibold">
                  {formatNumber(skill.learners)} active learners
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider ${skill.color}`}
              >
                {skill.level}
              </div>

              <div className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-xs font-bold text-green-700">
                <TrendingUp size={16} />
                {skill.growth}
              </div>

              <button 
                onClick={() => onSkillLearn && onSkillLearn(skill.name)}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#172033] text-white transition hover:bg-[#428475] cursor-pointer shadow-sm"
                title={`Start Learning ${skill.name}`}
              >
                <Sparkles size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrendingSkills;