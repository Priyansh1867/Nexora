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
};

export default teamService;
