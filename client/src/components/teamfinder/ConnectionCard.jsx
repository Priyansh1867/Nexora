import { Check, User, X } from "lucide-react";

function ConnectionCard({ name, role, college, avatar, onAccept, onDecline }) {
  return (
    <div className="rounded-[30px] border border-[#EDF1F4] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex gap-5">
        {avatar ? (
          <img src={avatar} alt={name} className="h-18 w-18 rounded-full object-cover" />
        ) : (
          <div className="flex h-18 w-18 items-center justify-center rounded-full bg-[#428475] text-2xl font-bold text-white">
            {name.charAt(0)}
          </div>
        )}

        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#172033]">{name}</h2>
          <p className="mt-1 text-[#428475]">wants to connect</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-[#F8FAFB] p-5">
        <div className="flex items-center gap-3">
          <User size={18} className="text-[#428475]" />
          <span className="font-medium">{role}</span>
        </div>
        <div className="mt-4 font-semibold text-gray-500">{college}</div>
      </div>

      <div className="mt-8 flex gap-4">
        <button onClick={onAccept} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#16332D] py-3 font-semibold text-white transition hover:bg-[#214740] cursor-pointer">
          <Check size={18} /> Accept
        </button>
        <button onClick={onDecline} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] py-3 font-semibold transition hover:border-red-500 hover:text-red-500 cursor-pointer">
          <X size={18} /> Decline
        </button>
      </div>
    </div>
  );
}

export default ConnectionCard;
