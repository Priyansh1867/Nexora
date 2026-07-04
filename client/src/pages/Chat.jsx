import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import ChatSidebar from "../components/chat/ChatSidebar";
import ChatHeader from "../components/chat/ChatHeader";
import MessageBubble from "../components/chat/MessageBubble";
import MessageInput from "../components/chat/MessageInput";
import TypingIndicator from "../components/chat/TypingIndicator";
import RightSidebar from "../components/chat/RightSidebar";

import chatService from "../services/chatService";
import { useAuth } from "../context/AuthContext";

function Chat() {
  const { user } = useAuth();
  const [messagesList, setMessagesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchMessages = useCallback(async () => {
    try {
      const data = await chatService.getMessages();
      const formatted = data.map((m) => ({
        sender: m.sender_id == user?.id ? "me" : "other",
        message: m.content,
        time: new Date(m.created_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        senderName: m.sender_name,
      }));
      setMessagesList(formatted);
      setErrorMsg(null);
    } catch (e) {
      console.error("Failed to load messages:", e);
      setErrorMsg(e.response?.data?.message || e.message || "Network Error");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchMessages();
    
    // Poll messages every 3 seconds for mock real-time
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  const handleSendMessage = async (content) => {
    if (!content.trim()) return;
    try {
      // Optimistic update
      const tempMsg = {
        sender: "me",
        message: content,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        senderName: user?.name || "Me",
      };
      setMessagesList((prev) => [...prev, tempMsg]);
      
      await chatService.sendMessage(content);
      fetchMessages();
    } catch (e) {
      console.error("Failed to send message:", e);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row h-[calc(100vh-100px)] lg:gap-8">
        <div className="hidden lg:block">
          <ChatSidebar />
        </div>

        <div className="flex flex-1 flex-col overflow-hidden rounded-none md:rounded-[30px] border-0 md:border md:border-[#EDF1F4] bg-[#F8FAFB] -mx-4 md:mx-0 h-full">
          <ChatHeader />

          <div className="flex-1 space-y-5 overflow-y-auto p-4 md:p-8">
            {errorMsg && (
              <div className="rounded-2xl bg-red-50 border border-red-200/60 p-4 text-xs font-bold text-red-500 shadow-sm mb-4">
                ⚠️ Connection Status: {errorMsg}.
              </div>
            )}
            {messagesList.length === 0 && !loading ? (
              <div className="flex h-full flex-col items-center justify-center text-gray-400">
                <span className="text-lg font-medium">No messages yet</span>
                <span className="text-sm mt-1">Start the conversation by typing below!</span>
              </div>
            ) : (
              messagesList.map((msg, index) => (
                <MessageBubble key={index} {...msg} />
              ))
            )}
            
            {loading && (
              <div className="flex justify-center py-4 text-[#428475] font-semibold text-sm">
                Loading messages...
              </div>
            )}
          </div>

          <MessageInput onSendMessage={handleSendMessage} />
        </div>

        <div className="hidden xl:block">
          <RightSidebar />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Chat;