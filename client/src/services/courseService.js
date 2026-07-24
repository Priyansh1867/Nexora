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

  async getPlaylist(id) {
    const { data } = await api.get(`/youtube/playlist/${id}`);
    return data;
  },

  async generateRoadmap(goal) {
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate a contextual roadmap based on the user's goal
    const steps = [
      {
        title: `Introduction to ${goal}`,
        description: `Learn the core concepts, history, and fundamental principles required for ${goal}.`,
        completed: false,
        locked: false,
      },
      {
        title: "Essential Tools & Setup",
        description: `Configure your development environment and master the essential tools used by professionals in this field.`,
        completed: false,
        locked: true,
      },
      {
        title: "Core Architecture & Patterns",
        description: `Deep dive into the underlying architecture, design patterns, and best practices for building scalable solutions.`,
        completed: false,
        locked: true,
      },
      {
        title: "Advanced Implementations",
        description: `Tackle complex problems, optimize performance, and integrate advanced features specific to ${goal}.`,
        completed: false,
        locked: true,
      },
      {
        title: "Real-World Capstone Project",
        description: `Apply everything you've learned to build a production-ready portfolio project from scratch.`,
        completed: false,
        locked: true,
      }
    ];
    
    return steps;
  },
};

export default courseService;
