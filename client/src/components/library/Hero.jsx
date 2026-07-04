import {
  ArrowRight,
  BookOpen,
  Bookmark,
  FileText,
  Sparkles,
} from "lucide-react";

function Hero({ onExploreClick, onUploadClick }) {
  return (
    <section className="overflow-hidden rounded-[32px] bg-gradient-to-r from-[#16332D] via-[#275348] to-[#428475] p-10 text-white">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

        <div className="max-w-2xl">

          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-semibold backdrop-blur">

            <Sparkles size={16} />

            Knowledge Library

          </div>

          <h1 className="mt-6 text-5xl font-bold leading-tight">
            Learn.
            <br />
            Read.
            <br />
            Grow.
          </h1>

          <p className="mt-6 text-lg leading-8 text-white/80">
            Access curated notes, books, PDFs, research papers,
            roadmaps and premium learning resources.
          </p>

          <div className="mt-10 flex gap-4">

            <button
              onClick={onExploreClick}
              className="flex items-center gap-2 rounded-2xl bg-white px-7 py-4 font-semibold text-[#16332D] transition hover:scale-105 cursor-pointer"
            >
              Explore Library

              <ArrowRight size={18} />

            </button>

            <button
              onClick={onUploadClick}
              className="rounded-2xl border border-white/25 bg-white/10 px-7 py-4 font-semibold backdrop-blur transition hover:bg-white/20 cursor-pointer"
            >
              Upload Resource

            </button>

          </div>

        </div>

        <div className="grid gap-5 lg:w-[420px]">

          <div className="rounded-[24px] bg-white/10 p-6 backdrop-blur">

            <BookOpen size={24} />

            <h2 className="mt-5 text-4xl font-bold">
              8,420
            </h2>

            <p className="mt-2 text-white/80">
              Resources
            </p>

          </div>

          <div className="rounded-[24px] bg-white/10 p-6 backdrop-blur">

            <FileText size={24} />

            <h2 className="mt-5 text-4xl font-bold">
              530
            </h2>

            <p className="mt-2 text-white/80">
              Research Papers
            </p>

          </div>

          <div className="rounded-[24px] bg-white/10 p-6 backdrop-blur">

            <Bookmark size={24} />

            <h2 className="mt-5 text-4xl font-bold">
              124
            </h2>

            <p className="mt-2 text-white/80">
              Saved Resources
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;