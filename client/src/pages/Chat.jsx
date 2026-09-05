import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import ChatSidebar from "../components/chat/ChatSidebar";
import MessageBubble from "../components/chat/MessageBubble";
import MessageInput from "../components/chat/MessageInput";
import TypingIndicator from "../components/chat/TypingIndicator";
import RightSidebar from "../components/chat/RightSidebar";

import chatService from "../services/chatService";
import connectionService from "../services/connectionService";
import profileService from "../services/profileService";
import { useAuth } from "../context/AuthContext";

function Chat() {
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messagesList, setMessagesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchMessages = useCallback(async () => {
    try {
      const receiverId = selectedFriend ? selectedFriend.user_id : 'global';
      const data = await chatService.getMessages(receiverId);
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
  }, [user, selectedFriend]);

  useEffect(() => {
    const initFriends = async () => {
      try {
        let friendsList = await connectionService.getFriends();
        
        // If no friends exist, mock them by fetching all profiles for demonstration
        if (friendsList.length === 0 && user) {
          const allProfiles = await profileService.getAllProfiles();
          friendsList = allProfiles
            .filter((p) => p.user_id !== user.id)
            .map((p) => ({
              user_id: p.user_id,
              name: p.name,
              role: p.role || "Community Member",
              avatar_url: p.avatar_url,
            }));
        }

        setFriends(friendsList);
      } catch (err) {
        console.error("Failed to load friends", err);
      }
    };
    initFriends();
  }, [user]);

  useEffect(() => {
    setLoading(true);
    setErrorMsg(null);
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
      
      const receiverId = selectedFriend ? selectedFriend.user_id : 'global';
      await chatService.sendMessage(content, receiverId);
      fetchMessages();
    } catch (e) {
      console.error("Failed to send message:", e);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row h-[calc(100vh-100px)] lg:gap-8">
        <div className="hidden lg:block">
          <ChatSidebar 
            friends={friends} 
            selectedFriend={selectedFriend} 
            onSelectFriend={setSelectedFriend} 
          />
        </div>

        <div className="flex flex-1 flex-col overflow-hidden rounded-none md:rounded-[30px] border-0 md:border md:border-[#EDF1F4] bg-[#F8FAFB] -mx-4 md:mx-0 h-full">
          {/* Mocking ChatHeader since we don't have its source in context, but normally we'd pass selectedFriend here */}
          <div className="flex h-[88px] items-center justify-between border-b border-[#EDF1F4] bg-white px-4 md:px-8">
            <div className="flex items-center gap-4">
              {selectedFriend?.avatar_url ? (
                <img src={selectedFriend.avatar_url} className="h-12 w-12 rounded-full object-cover" />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#428475] text-xl font-bold text-white">
                  {selectedFriend ? selectedFriend.name.charAt(0) : "N"}
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-[#172033]">{selectedFriend ? selectedFriend.name : "Nexora Global Chat"}</h2>
                <p className="text-sm font-medium text-green-500">
                  {selectedFriend ? selectedFriend.role : "Community Hub"}
                </p>
              </div>
            </div>
          </div>

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