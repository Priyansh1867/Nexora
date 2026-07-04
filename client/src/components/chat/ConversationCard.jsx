function ConversationCard({
  name,
  message,
  time,
  online,
  unread,
}) {
  return (
    <button
      className="
      w-full
      rounded-2xl
      p-4
      text-left
      transition-all
      duration-300
      hover:bg-[#F8FAFB]
      "
    >
      <div className="flex items-center gap-4">

        <div className="relative">

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#428475] text-xl font-bold text-white">
            {name.charAt(0)}
          </div>

          {online && (
            <div className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
          )}

        </div>

        <div className="min-w-0 flex-1">

          <div className="flex items-center justify-between">

            <h3 className="truncate font-semibold text-[#172033]">
              {name}
            </h3>

            <span className="text-xs text-gray-400">
              {time}
            </span>

          </div>

          <div className="mt-2 flex items-center justify-between">

            <p className="truncate text-sm text-gray-500">
              {message}
            </p>

            {unread > 0 && (
              <span className="ml-3 flex h-6 min-w-[24px] items-center justify-center rounded-full bg-[#428475] px-2 text-xs font-semibold text-white">
                {unread}
              </span>
            )}

          </div>

        </div>

      </div>
    </button>
  );
}

export default ConversationCard;