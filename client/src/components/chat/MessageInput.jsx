import { useState } from "react";
import {
  Image,
  Mic,
  Paperclip,
  SendHorizonal,
  Smile,
} from "lucide-react";

function MessageInput({ onSendMessage }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() && onSendMessage) {
      onSendMessage(text);
      setText("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="border-t border-[#EDF1F4] bg-white p-6">

      <div className="flex items-center gap-3">

        <button className="rounded-xl bg-[#F8FAFB] p-3 transition hover:bg-[#EEF8F4] cursor-pointer">
          <Smile size={20} />
        </button>

        <button className="rounded-xl bg-[#F8FAFB] p-3 transition hover:bg-[#EEF8F4] cursor-pointer">
          <Paperclip size={20} />
        </button>

        <button className="rounded-xl bg-[#F8FAFB] p-3 transition hover:bg-[#EEF8F4] cursor-pointer">
          <Image size={20} />
        </button>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="
          h-14
          flex-1
          rounded-2xl
          border
          border-[#E5E7EB]
          px-5
          outline-none
          transition
          focus:border-[#428475]
          "
        />

        <button className="rounded-xl bg-[#F8FAFB] p-3 transition hover:bg-[#EEF8F4] cursor-pointer">
          <Mic size={20} />
        </button>

        <button
          onClick={handleSend}
          className="rounded-xl bg-[#428475] p-4 text-white transition hover:bg-[#16332D] cursor-pointer shadow-md"
        >
          <SendHorizonal size={20} />
        </button>

      </div>

    </div>
  );
}

export default MessageInput;