import api from "./api";

const chatService = {
  async getMessages(receiverId) {
    const { data } = await api.get(`/chat/messages?receiverId=${receiverId}`);
    return data;
  },

  async sendMessage(content, receiverId) {
    const { data } = await api.post("/chat/messages", { content, receiverId });
    return data;
  },
};

export default chatService;
