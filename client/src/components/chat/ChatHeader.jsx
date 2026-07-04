import {
  MoreVertical,
  Phone,
  Search,
  Video,
} from "lucide-react";

function ChatHeader() {
  return (
    <header className="flex items-center justify-between border-b border-[#EDF1F4] bg-white px-8 py-5">

      <div className="flex items-center gap-4">

        <div className="relative">

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#428475] text-xl font-bold text-white shadow-inner">
            N
          </div>

          <div className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500 animate-pulse" />

        </div>

        <div>

          <h2 className="text-xl font-bold text-[#172033]">
            Nexora Global Chat
          </h2>

          <p className="mt-1 text-sm text-[#428475] font-semibold">
            ● Active Community Hub
          </p>

        </div>

      </div>

      <div className="flex items-center gap-3">

        <button className="rounded-xl bg-[#F8FAFB] p-3 transition hover:bg-[#EEF8F4]">
          <Search size={19} />
        </button>

        <button className="rounded-xl bg-[#F8FAFB] p-3 transition hover:bg-[#EEF8F4]">
          <Phone size={19} />
        </button>

        <button className="rounded-xl bg-[#F8FAFB] p-3 transition hover:bg-[#EEF8F4]">
          <Video size={19} />
        </button>

        <button className="rounded-xl bg-[#F8FAFB] p-3 transition hover:bg-[#EEF8F4]">
          <MoreVertical size={19} />
        </button>

      </div>

    </header>
  );
}

export default ChatHeader;