import {
  Bell,
  CheckCircle2,
  Sparkles,
  Users,
} from "lucide-react";

function Hero() {
  return (
    <section className="overflow-hidden rounded-[32px] bg-gradient-to-r from-[#16332D] via-[#275348] to-[#428475] p-10 text-white">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

        <div className="max-w-2xl">

          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-semibold backdrop-blur">

            <Sparkles size={16} />

            Notification Center

          </div>

          <h1 className="mt-6 text-5xl font-bold leading-tight">
            Stay Updated.
            <br />
            Never Miss Anything.
          </h1>

          <p className="mt-6 text-lg leading-8 text-white/80">
            Track collaboration requests, project updates,
            messages and achievements from one place.
          </p>

        </div>

        <div className="grid gap-5 lg:w-[420px]">

          <div className="rounded-[24px] bg-white/10 p-6 backdrop-blur">

            <Bell size={24} />

            <h2 className="mt-5 text-4xl font-bold">
              18
            </h2>

            <p className="mt-2 text-white/80">
              Unread Notifications
            </p>

          </div>

          <div className="rounded-[24px] bg-white/10 p-6 backdrop-blur">

            <Users size={24} />

            <h2 className="mt-5 text-4xl font-bold">
              12
            </h2>

            <p className="mt-2 text-white/80">
              Team Updates
            </p>

          </div>

          <div className="rounded-[24px] bg-white/10 p-6 backdrop-blur">

            <CheckCircle2 size={24} />

            <h2 className="mt-5 text-4xl font-bold">
              126
            </h2>

            <p className="mt-2 text-white/80">
              Completed Activities
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;