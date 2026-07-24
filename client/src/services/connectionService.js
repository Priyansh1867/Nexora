import api from "./api";

const connectionService = {
  async sendRequest(receiver_id) {
    const { data } = await api.post("/connections/request", { receiver_id });
    return data;
  },

  async acceptRequest(connection_id) {
    const { data } = await api.post("/connections/accept", { connection_id });
    return data;
  },

  async declineRequest(connection_id) {
    const { data } = await api.post("/connections/decline", { connection_id });
    return data;
  },

  async getPendingRequests() {
    const { data } = await api.get("/connections/pending");
    return data;
  },

  async getFriends() {
    const { data } = await api.get("/connections/friends");
    return data;
  },

  async getAllStatuses() {
    const { data } = await api.get("/connections/status");
    return data;
  }
};

export default connectionService;
