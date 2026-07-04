import api from "./api";

const chatService = {
  async getMessages() {
    const { data } = await api.get("/chat/messages");
    return data;
  },

  async sendMessage(content) {
    const { data } = await api.post("/chat/messages", { content });
    return data;
  },
};

export default chatService;
