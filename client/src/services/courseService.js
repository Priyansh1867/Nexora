import api from "./api";

const courseService = {
  async getCourseProgress() {
    const { data } = await api.get("/courses/progress");
    return data;
  },

  async updateCourseProgress(course_id, progress, completed_lessons) {
    const { data } = await api.post("/courses/progress", {
      course_id,
      progress,
      completed_lessons,
    });
    return data;
  },

  async searchYouTube(q) {
    const { data } = await api.get("/youtube/search", { params: { q } });
    return data;
  },
};

export default courseService;
