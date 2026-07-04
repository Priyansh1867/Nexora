import {
  ArrowRight,
  Sparkles,
  Users,
  Briefcase,
} from "lucide-react";

function Hero({ onFindTeammatesClick, onCreateTeamClick }) {
  return (
    <section className="overflow-hidden rounded-[32px] bg-gradient-to-r from-[#16332D] via-[#275348] to-[#428475] p-10 text-white">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-semibold backdrop-blur">
            <Sparkles size={16} />

            AI Team Matching
          </div>

          <h1 className="mt-6 text-5xl font-bold leading-tight">
            Find Your
            <br />
            Perfect Team.
          </h1>

          <p className="mt-6 text-lg leading-8 text-white/80">
            Connect with students having similar interests,
            complementary skills and project goals.
          </p>

          <div className="mt-10 flex gap-4">
            <button
              onClick={onFindTeammatesClick}
              className="flex items-center gap-2 rounded-2xl bg-white px-7 py-4 font-semibold text-[#16332D] transition hover:scale-105 cursor-pointer"
            >
              Find Teammates

              <ArrowRight size={18} />
            </button>

            <button
              onClick={onCreateTeamClick}
              className="rounded-2xl border border-white/25 bg-white/10 px-7 py-4 font-semibold backdrop-blur transition hover:bg-white/20 cursor-pointer"
            >
              Create Team
            </button>
          </div>
        </div>

        <div className="grid gap-5 lg:w-[400px]">
          <div className="rounded-[24px] bg-white/10 p-6 backdrop-blur">
            <Users size={24} />

            <h2 className="mt-5 text-4xl font-bold">
              2,540
            </h2>

            <p className="mt-2 text-white/80">
              Active Students
            </p>
          </div>

          <div className="rounded-[24px] bg-white/10 p-6 backdrop-blur">
            <Briefcase size={24} />

            <h2 className="mt-5 text-4xl font-bold">
              310
            </h2>

            <p className="mt-2 text-white/80">
              Open Projects
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;