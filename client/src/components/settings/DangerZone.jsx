import {
  AlertTriangle,
  Download,
  LogOut,
  Trash2,
} from "lucide-react";

function DangerZone() {
  return (
    <section className="rounded-[30px] border-2 border-red-200 bg-red-50 p-8 shadow-sm">

      <div className="flex items-center gap-4">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
          <AlertTriangle size={30} />
        </div>

        <div>

          <h2 className="text-2xl font-bold text-red-700">
            Danger Zone
          </h2>

          <p className="mt-2 text-red-500">
            These actions are irreversible.
          </p>

        </div>

      </div>

      <div className="mt-10 space-y-5">

        <ActionCard
          icon={<Download size={20} />}
          title="Download Your Data"
          description="Download your profile, resources and activity."
          button="Download"
          buttonClass="bg-[#16332D] hover:bg-[#214740]"
        />

        <ActionCard
          icon={<LogOut size={20} />}
          title="Sign Out Everywhere"
          description="Log out from all active devices."
          button="Sign Out"
          buttonClass="bg-[#F59E0B] hover:bg-[#D97706]"
        />

        <ActionCard
          icon={<Trash2 size={20} />}
          title="Delete Account"
          description="Permanently delete your Nexora account."
          button="Delete"
          buttonClass="bg-red-600 hover:bg-red-700"
        />

      </div>

    </section>
  );
}

function ActionCard({
  icon,
  title,
  description,
  button,
  buttonClass,
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-red-200 bg-white p-6">

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
          {icon}
        </div>

        <div>

          <h4 className="font-semibold text-[#172033]">
            {title}
          </h4>

          <p className="mt-1 text-sm text-gray-500">
            {description}
          </p>

        </div>

      </div>

      <button
        className={`rounded-xl px-5 py-3 font-semibold text-white transition ${buttonClass}`}
      >
        {button}
      </button>

    </div>
  );
}

export default DangerZone;