import {
  Check,
  CheckCheck,
} from "lucide-react";

function MessageBubble({
  message,
  time,
  sender = "other",
  delivered = true,
  seen = true,
}) {
  const isMe = sender === "me";

  return (
    <div
      className={`flex ${
        isMe
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`
        max-w-[70%]
        rounded-[24px]
        px-5
        py-4
        shadow-sm
        ${
          isMe
            ? "bg-[#428475] text-white rounded-br-md"
            : "bg-white border border-[#EDF1F4] text-[#172033] rounded-bl-md"
        }
        `}
      >
        <p className="leading-7">
          {message}
        </p>

        <div
          className={`mt-3 flex items-center gap-2 text-xs ${
            isMe
              ? "justify-end text-white/80"
              : "justify-end text-gray-400"
          }`}
        >
          <span>{time}</span>

          {isMe &&
            (seen ? (
              <CheckCheck
                size={15}
                className="text-blue-200"
              />
            ) : delivered ? (
              <Check size={15} />
            ) : null)}
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;