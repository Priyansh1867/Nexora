function TypingIndicator() {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#428475] font-bold text-white">
        P
      </div>

      <div className="rounded-2xl rounded-bl-md bg-white px-5 py-4 shadow-sm border border-[#EDF1F4]">

        <div className="flex gap-2">

          <span
            className="
            h-2.5
            w-2.5
            animate-bounce
            rounded-full
            bg-[#428475]
            "
          />

          <span
            className="
            h-2.5
            w-2.5
            animate-bounce
            rounded-full
            bg-[#428475]
            [animation-delay:150ms]
            "
          />

          <span
            className="
            h-2.5
            w-2.5
            animate-bounce
            rounded-full
            bg-[#428475]
            [animation-delay:300ms]
            "
          />

        </div>

      </div>

    </div>
  );
}

export default TypingIndicator;