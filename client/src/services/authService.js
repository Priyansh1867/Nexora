import api from "./api";

const authService = {
  async register(userData) {
    const { data } = await api.post("/auth/register", userData);

    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
    }

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  },

  async login(credentials) {
    const { data } = await api.post("/auth/login", credentials);

    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
    }

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  },

  async logout() {
    try {
      await api.post("/auth/logout");
    } catch (_) {}

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  },

  async forgotPassword(email) {
    const { data } = await api.post("/auth/forgot-password", {
      email,
    });

    return data;
  },

  async resetPassword(token, password) {
    const { data } = await api.post("/auth/reset-password", {
      token,
      password,
    });

    return data;
  },

  getUser() {
    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;
  },

  getToken() {
    return localStorage.getItem("accessToken");
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem("accessToken"));
  },
};

export default authService;