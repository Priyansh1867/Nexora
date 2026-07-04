import {
  MessageCircle,
  Search,
} from "lucide-react";

import ConversationCard from "./ConversationCard";

const conversations = [
  {
    name: "Nexora Global Chat",
    message: "Community Hub discussion room.",
    time: "Live",
    online: true,
    unread: 0,
    active: true,
  },
];

function ChatSidebar() {
  return (
    <aside className="flex h-full w-[360px] flex-col rounded-[30px] border border-[#EDF1F4] bg-white shadow-sm">

      <div className="border-b border-[#EDF1F4] p-6">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold text-[#172033]">
            Messages
          </h2>

          <button className="rounded-xl bg-[#EEF8F4] p-3 text-[#428475]">
            <MessageCircle size={18} />
          </button>

        </div>

        <div className="relative mt-6">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search chats..."
            className="h-12 w-full rounded-xl border border-[#E5E7EB] pl-11 pr-4 outline-none focus:border-[#428475]"
          />

        </div>

      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {conversations.map((conversation) => (
          <ConversationCard
            key={conversation.name}
            {...conversation}
          />
        ))}

      </div>

    </aside>
  );
}

export default ChatSidebar;