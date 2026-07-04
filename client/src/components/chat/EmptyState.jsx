import {
  MessageCircleMore,
} from "lucide-react";

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-10 text-center">

      <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#EEF8F4]">

        <MessageCircleMore
          size={60}
          className="text-[#428475]"
        />

      </div>

      <h2 className="mt-8 text-3xl font-bold text-[#172033]">
        Select a Conversation
      </h2>

      <p className="mt-4 max-w-md leading-8 text-gray-500">
        Choose a teammate from the sidebar to
        start chatting and collaborating on
        your projects.
      </p>

    </div>
  );
}

export default EmptyState;