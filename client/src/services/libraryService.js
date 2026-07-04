import api from "./api";

const libraryService = {
  async getResources() {
    const { data } = await api.get("/resources");
    return data;
  },

  async addResource(resourceData) {
    const { data } = await api.post("/resources", resourceData);
    return data;
  },

  async deleteResource(id) {
    const { data } = await api.delete(`/resources/${id}`);
    return data;
  },
};

export default libraryService;
