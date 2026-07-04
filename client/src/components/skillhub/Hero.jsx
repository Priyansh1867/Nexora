import {
  ArrowRight,
  BookOpen,
  Flame,
  Trophy,
} from "lucide-react";

function Hero({ onExploreClick, onPathClick }) {
  return (
    <section className="overflow-hidden rounded-[32px] bg-gradient-to-r from-[#16332D] via-[#275348] to-[#428475] p-10 text-white">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-semibold backdrop-blur">
            <Flame size={16} />

            Continue Your Journey
          </div>

          <h1 className="mt-6 text-5xl font-bold leading-tight">
            Learn Faster.
            <br />
            Build Better.
          </h1>

          <p className="mt-6 text-lg leading-8 text-white/80">
            Upskill yourself with curated learning paths,
            industry ready courses and practical projects.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={onExploreClick}
              className="flex items-center gap-2 rounded-2xl bg-white px-7 py-4 font-semibold text-[#16332D] transition hover:scale-105 cursor-pointer"
            >
              Explore Courses

              <ArrowRight size={18} />
            </button>

            <button
              onClick={onPathClick}
              className="rounded-2xl border border-white/25 bg-white/10 px-7 py-4 font-semibold backdrop-blur transition hover:bg-white/20 cursor-pointer"
            >
              Learning Path
            </button>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3 lg:w-[420px] lg:grid-cols-1">
          <div className="rounded-[24px] bg-white/10 p-6 backdrop-blur">
            <div className="flex items-center gap-3">
              <BookOpen size={22} />

              <span className="text-lg font-semibold">
                Courses
              </span>
            </div>

            <h2 className="mt-4 text-4xl font-bold">
              120+
            </h2>
          </div>

          <div className="rounded-[24px] bg-white/10 p-6 backdrop-blur">
            <div className="flex items-center gap-3">
              <Trophy size={22} />

              <span className="text-lg font-semibold">
                Certificates
              </span>
            </div>

            <h2 className="mt-4 text-4xl font-bold">
              24
            </h2>
          </div>

          <div className="rounded-[24px] bg-white/10 p-6 backdrop-blur">
            <div className="flex items-center gap-3">
              <Flame size={22} />

              <span className="text-lg font-semibold">
                Learning Streak
              </span>
            </div>

            <h2 className="mt-4 text-4xl font-bold">
              18 Days
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;