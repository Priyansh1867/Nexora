import api from "./api";

const teamService = {
  async getTeams() {
    const { data } = await api.get("/teams");
    return data;
  },

  async createTeam(teamData) {
    const { data } = await api.post("/teams", teamData);
    return data;
  },

  async joinTeam(teamId) {
    const { data } = await api.post(`/teams/${teamId}/join`);
    return data;
  },

  async getTeamMembers(teamId) {
    const { data } = await api.get(`/teams/${teamId}/members`);
    return data;
  },

  async handleJoinRequest(teamId, userId, action) {
    const { data } = await api.post(`/teams/${teamId}/requests/${userId}`, { action });
    return data;
  },

  async getComments(teamId) {
    const { data } = await api.get(`/teams/${teamId}/comments`);
    return data;
  },

  async addComment(teamId, content) {
    const { data } = await api.post(`/teams/${teamId}/comments`, { content });
    return data;
  },
};

export default teamService;
