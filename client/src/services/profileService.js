import api from "./api";

const profileService = {
  async getProfile() {
    const { data } = await api.get("/profile");
    return data;
  },

  async updateProfile(profileData) {
    const { data } = await api.put("/profile", profileData);
    return data;
  },

  async uploadResume(formData) {
    const { data } = await api.post("/profile/resume", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },

  async uploadAvatar(formData) {
    const { data } = await api.post("/profile/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },
  async getAllProfiles() {
    const { data } = await api.get("/profile/all");
    return data;
  },
};

export default profileService;
