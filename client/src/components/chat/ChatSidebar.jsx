import { MessageCircle, Search, Users } from "lucide-react";
import ConversationCard from "./ConversationCard";

function ChatSidebar({ friends, selectedFriend, onSelectFriend }) {
  return (
    <aside className="flex h-full w-[360px] flex-col rounded-[30px] border border-[#EDF1F4] bg-white shadow-sm">
      <div className="border-b border-[#EDF1F4] p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#172033]">Messages</h2>
          <button className="rounded-xl bg-[#EEF8F4] p-3 text-[#428475]">
            <MessageCircle size={18} />
          </button>
        </div>

        <div className="relative mt-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search friends..."
            className="h-12 w-full rounded-xl border border-[#E5E7EB] pl-11 pr-4 outline-none focus:border-[#428475]"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Global Chat Option */}
        <div onClick={() => onSelectFriend(null)}>
          <ConversationCard
            name="Nexora Global Chat"
            message="Community Hub"
            time=""
            online={true}
            unread={0}
            active={selectedFriend === null}
            avatar={null}
          />
        </div>

        <div className="py-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 px-2">Connections</h3>
        </div>

        {friends.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center text-gray-400">
            <Users size={32} className="mb-3 opacity-50" />
            <p className="text-sm">No connections yet.</p>
            <p className="text-xs mt-1">Go to Team Finder to connect!</p>
          </div>
        ) : (
          friends.map((friend) => (
            <div key={friend.user_id} onClick={() => onSelectFriend(friend)}>
              <ConversationCard
                name={friend.name}
                message={friend.role}
                time=""
                online={true}
                unread={0}
                active={selectedFriend?.user_id === friend.user_id}
                avatar={friend.avatar_url || null}
              />
            </div>
          ))
        )}
      </div>
    </aside>
  );
}

export default ChatSidebar;