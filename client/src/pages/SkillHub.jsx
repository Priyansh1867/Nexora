import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import Hero from "../components/skillhub/Hero";
import Searchbar from "../components/skillhub/Searchbar";
import CategoryCard from "../components/skillhub/CategoryCard";
import ContinueCard from "../components/skillhub/ContinueCard";
import CourseCard from "../components/skillhub/CourseCard";
import TrendingSkillCard from "../components/skillhub/TrendingSkillCard";
import LearningPath from "../components/skillhub/LearningPath";
import CertificateCard from "../components/skillhub/CertificateCard";
import AnalyticsCard from "../components/skillhub/AnalyticsCard";
import RightSidebar from "../components/skillhub/RightSidebar";
import CoursePlayerModal from "../components/library/CoursePlayerModal";
import AddCertificateModal from "../components/skillhub/AddCertificateModal";

import courseService from "../services/courseService";

import {
  Brain,
  Code2,
  Database,
  Globe,
  Layers3,
  Server,
  Play,
  ArrowRight,
  MessageSquare,
  Users,
  Trophy,
  Plus,
  Loader2,
} from "lucide-react";



function SkillHub() {
  const predefinedPlaylists = {
    "Frontend": [
      { id: "html", title: "HTML & CSS Crash Course", image: "/images/categories/category_frontend_1784799053689.jpg" },
      { id: "js", title: "Modern JavaScript (ES6+)", image: "/images/categories/category_frontend_1784799053689.jpg" },
      { id: "react", title: "React 19 Complete Guide", image: "/images/categories/category_frontend_1784799053689.jpg" },
    ],
    "Backend": [
      { id: "node", title: "Node.js & Express Masterclass", image: "/images/categories/category_backend_1784799066478.jpg" },
      { id: "python", title: "Python Django Fundamentals", image: "/images/categories/category_backend_1784799066478.jpg" },
      { id: "go", title: "Go API Development", image: "/images/categories/category_backend_1784799066478.jpg" },
    ],
    "Database": [
      { id: "postgres", title: "PostgreSQL for Developers", image: "/images/categories/category_database_1784799077589.jpg" },
      { id: "mongo", title: "MongoDB Essentials", image: "/images/categories/category_database_1784799077589.jpg" },
      { id: "redis", title: "Redis Caching in Node", image: "/images/categories/category_database_1784799077589.jpg" },
    ],
    "AI / ML": [
      { id: "ml", title: "Machine Learning with Python", image: "/images/categories/category_aiml_1784799097581.jpg" },
      { id: "dl", title: "Deep Learning (PyTorch)", image: "/images/categories/category_aiml_1784799097581.jpg" },
      { id: "nlp", title: "Natural Language Processing", image: "/images/categories/category_aiml_1784799097581.jpg" },
    ],
    "DSA": [
      { id: "cpp", title: "Data Structures in C++", image: "/images/categories/category_dsa_1784799107990.jpg" },
      { id: "java", title: "Algorithms in Java", image: "/images/categories/category_dsa_1784799107990.jpg" },
      { id: "dp", title: "Dynamic Programming Guide", image: "/images/categories/category_dsa_1784799107990.jpg" },
    ],
    "DevOps": [
      { id: "docker", title: "Docker & Kubernetes Basics", image: "/images/categories/category_devops_1784799119435.jpg" },
      { id: "cicd", title: "CI/CD with GitHub Actions", image: "/images/categories/category_devops_1784799119435.jpg" },
      { id: "aws", title: "AWS Cloud Practitioner", image: "/images/categories/category_devops_1784799119435.jpg" },
    ],
  };
  const categories = [
    {
      title: "Frontend",
      courses: 24,
      icon: <Globe size={28} />,
      color: "#428475",
    },
    {
      title: "Backend",
      courses: 18,
      icon: <Server size={28} />,
      color: "#2563EB",
    },
    {
      title: "Database",
      courses: 12,
      icon: <Database size={28} />,
      color: "#7C3AED",
    },
    {
      title: "AI / ML",
      courses: 16,
      icon: <Brain size={28} />,
      color: "#F59E0B",
    },
    {
      title: "DSA",
      courses: 30,
      icon: <Code2 size={28} />,
      color: "#EF4444",
    },
    {
      title: "DevOps",
      courses: 10,
      icon: <Layers3 size={28} />,
      color: "#0EA5E9",
    },
  ];

  const baseCourses = [
    {
      id: 1,
      title: "React 19 Complete Guide",
      instructor: "John Anderson",
      progress: 0,
      duration: "4 Lectures",
      image: "/images/categories/category_frontend_1784799053689.jpg"
    },
    {
      id: 2,
      title: "Node.js & Express Masterclass",
      instructor: "Sarah Wilson",
      progress: 0,
      duration: "4 Lectures",
      image: "/images/categories/category_backend_1784799066478.jpg"
    },
  ];

  const [continueCourses, setContinueCourses] = useState(baseCourses);
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [customSearchQuery, setCustomSearchQuery] = useState(null);

  // Dynamic Search & Categories exploration states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryPlaylists, setCategoryPlaylists] = useState([]);
  const [loadingPlaylists, setLoadingPlaylists] = useState(false);

  // Dynamic Certificates states
  const [showCertModal, setShowCertModal] = useState(false);
  const [certificatesList, setCertificatesList] = useState(() => {
    const saved = localStorage.getItem("nexora_certificates");
    if (saved) return JSON.parse(saved);
    return [];
  });

  // Dynamic Analytics states
  const [streakDays, setStreakDays] = useState(0);
  const [studyHours, setStudyHours] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  // Load Real-Time statistics from DB
  const loadStats = useCallback(async () => {
    try {
      const progressList = await courseService.getCourseProgress();
      
      // Calculate total watched lectures
      const sumCompleted = progressList.reduce((sum, item) => sum + (item.completed_lessons?.length || 0), 0);
      setCompletedCount(sumCompleted);
      setStreakDays(sumCompleted > 0 ? Math.min(30, sumCompleted) : 0); // Realistic streak
      setStudyHours(parseFloat((sumCompleted * 0.5).toFixed(1))); // 0.5 hours per lecture

      // Update base course progress
      setContinueCourses((prev) =>
        prev.map((course) => {
          const progObj = progressList.find((p) => p.course_id === course.id);
          return {
            ...course,
            progress: progObj ? progObj.progress : 0,
          };
        })
      );
    } catch (err) {
      console.error("Failed to load analytics statistics:", err);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  // Recommended courses definition
  const recommendedCourses = [
    {
      title: "Advanced React Patterns",
      instructor: "David Miller",
      category: "React",
      duration: "18 Hours",
      lessons: 54,
      rating: 4.9,
      students: "15.2k",
      image: "/images/categories/category_frontend_1784799053689.jpg"
    },
    {
      title: "Express & PostgreSQL Masterclass",
      instructor: "Alex Johnson",
      category: "Backend",
      duration: "14 Hours",
      lessons: 42,
      rating: 4.8,
      students: "11.8k",
      image: "/images/categories/category_database_1784799077589.jpg"
    },
    {
      title: "System Design Essentials Guide",
      instructor: "Michael Brown",
      category: "Architecture",
      duration: "20 Hours",
      lessons: 61,
      rating: 4.9,
      students: "20.5k",
      image: "/images/categories/category_devops_1784799119435.jpg"
    },
  ];

  const trendingSkills = [
    {
      title: "React 19",
      learners: 24500,
      growth: 28,
      color: "#428475",
    },
    {
      title: "PostgreSQL",
      learners: 18300,
      growth: 21,
      color: "#2563EB",
    },
    {
      title: "Docker",
      learners: 14200,
      growth: 18,
      color: "#F59E0B",
    },
    {
      title: "AI Agents",
      learners: 31100,
      growth: 42,
      color: "#7C3AED",
    },
  ];

  const [eventsList] = useState([]);

  // Explore categories handler (loads 6-7 playlists from YouTube scraper routes)
  const handleCategoryExplore = (categoryTitle) => {
    setSelectedCategory(categoryTitle);
    setLoadingPlaylists(true);
    setCategoryPlaylists([]);

    // Scroll smoothly to exploration grid
    setTimeout(() => {
      document.getElementById("category-playlists-explore")?.scrollIntoView({
        behavior: "smooth",
      });
      // Mock delay for UI smoothness
      setTimeout(() => {
        setCategoryPlaylists(predefinedPlaylists[categoryTitle] || []);
        setLoadingPlaylists(false);
      }, 600);
    }, 200);
  };

  // Launch Player modal from search box
  const handleSearchSubmit = (query) => {
    if (!query.trim()) return;
    setCustomSearchQuery(query);
  };

  // Chat Redirect for study partners - navigate directly without confirm dialog
  const handleStartStudyChat = () => {
    window.location.href = "/chat";
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8 overflow-hidden">
          <Hero
            onExploreClick={() =>
              document.getElementById("skillhub-explore-categories")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            onPathClick={() =>
              document.getElementById("career-learning-path")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          />

          <Searchbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchSubmit={handleSearchSubmit}
          />

          {/* Explore Categories Section */}
          <section id="skillhub-explore-categories">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-[#172033]">
                Explore Categories
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {categories.map((category) => (
                <CategoryCard
                  key={category.title}
                  {...category}
                  onClick={() => handleCategoryExplore(category.title)}
                />
              ))}
            </div>
          </section>

          {/* Dynamic Playlists & Study Partners Section */}
          {selectedCategory && (
            <section
              id="category-playlists-explore"
              className="rounded-[30px] border border-[#EDF1F4] bg-[#EEF8F4]/10 p-8 shadow-sm space-y-8 animate-in fade-in duration-300"
            >
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#428475]">
                    Explore Playlists
                  </span>
                  <h2 className="text-3xl font-extrabold text-[#172033] mt-1">
                    {selectedCategory} Courses
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-500 hover:bg-red-50 hover:text-red-500 transition cursor-pointer"
                >
                  Close Exploration
                </button>
              </div>

              <div className="grid gap-8 lg:grid-cols-3">
                {/* 6-7 Playlists Grid */}
                <div className="lg:col-span-2 space-y-5">
                  <h3 className="text-lg font-bold text-[#172033]">Available YouTube Playlists</h3>
                  {loadingPlaylists ? (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                      <Loader2 className="animate-spin text-[#428475] mb-3" size={32} />
                      <span className="text-sm font-semibold">Fetching top course playlists...</span>
                    </div>
                  ) : categoryPlaylists.length === 0 ? (
                    <div className="text-center py-10 text-gray-400 text-sm font-semibold">
                      No playlists found. Try closing and opening again.
                    </div>
                  ) : (
                    <div className="grid gap-5 sm:grid-cols-2">
                      {categoryPlaylists.map((playlist, idx) => (
                        <div
                          key={playlist.id}
                          className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
                        >
                          <div className="w-full h-32 overflow-hidden rounded-xl mb-4 border border-[#EDF1F4]/50">
                             <img src={playlist.image} alt={playlist.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          </div>
                          <div>
                            <span className="text-[10px] bg-[#EEF8F4] text-[#428475] font-bold px-2 py-0.5 rounded-full uppercase">
                              Playlist {idx + 1}
                            </span>
                            <h4 className="text-sm font-bold text-[#172033] mt-3 leading-snug line-clamp-2">
                              {playlist.title}
                            </h4>
                          </div>

                          <div className="flex-grow" />

                          <button
                            onClick={() => setActiveCourseId(playlist.id)}
                            className="mt-5 w-full h-10 rounded-xl bg-[#428475] text-white hover:bg-[#214740] font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Play size={12} className="fill-white" />
                            Start Learning
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Study Partners Sidebar */}
                <div className="space-y-5">
                  <h3 className="text-lg font-bold text-[#172033]">Study Partners</h3>
                  <div className="bg-gradient-to-br from-[#16332D] to-[#214740] rounded-3xl p-6 text-center shadow-lg relative overflow-hidden flex flex-col justify-center min-h-[300px]">
                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#428475]/30 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#EEF8F4]/20 rounded-full blur-2xl"></div>

                    <div className="relative z-10 space-y-5">
                      <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto border border-white/10 shadow-inner">
                        <Users size={28} className="text-white drop-shadow-md" />
                      </div>
                      
                      <div className="space-y-1.5">
                        <h4 className="text-xl font-extrabold text-white tracking-tight">Study Together</h4>
                        <p className="text-[13px] text-emerald-50/80 leading-relaxed max-w-[220px] mx-auto">
                          Connect with other students learning <span className="font-semibold text-white">{selectedCategory}</span>.
                        </p>
                      </div>

                      <div className="pt-3 flex flex-col gap-3">
                        <button
                          onClick={() => { window.location.href = "/team-finder"; }}
                          className="w-full py-3 px-4 rounded-xl bg-white text-[#16332D] font-bold text-sm transition hover:bg-emerald-50 hover:scale-[1.02] flex items-center justify-center gap-2.5 cursor-pointer shadow-md"
                        >
                          <Users size={18} className="shrink-0" />
                          <span>Team Finder</span>
                        </button>
                        <button
                          onClick={handleStartStudyChat}
                          className="w-full py-3 px-4 rounded-xl border-2 border-white/20 hover:border-white/40 hover:bg-white/10 text-white font-bold text-sm transition hover:scale-[1.02] flex items-center justify-center gap-2.5 cursor-pointer"
                        >
                          <MessageSquare size={18} className="shrink-0" />
                          <span>Group Chat</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Continue Learning Section */}
          <section>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-[#172033]">
                Continue Learning
              </h2>
              <p className="mt-2 text-gray-500">
                Resume where you left off.
              </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              {continueCourses.map((course) => (
                <ContinueCard
                  key={course.id}
                  {...course}
                  onContinue={() => setActiveCourseId(course.id)}
                />
              ))}
            </div>
          </section>

          {/* Recommended For You Section */}
          <section>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-[#172033]">
                Recommended For You
              </h2>
              <p className="mt-2 text-gray-500">
                Personalized recommendations based on your learning.
              </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
              {recommendedCourses.map((course) => (
                <CourseCard
                  key={course.title}
                  {...course}
                  onStart={() => setCustomSearchQuery(course.title)}
                />
              ))}
            </div>
          </section>

          {/* Trending Skills Section */}
          <section>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-[#172033]">
                  Trending Skills
                </h2>
                <p className="mt-2 text-gray-500">
                  Most popular technologies this week.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {trendingSkills.map((skill) => (
                <TrendingSkillCard
                  key={skill.title}
                  {...skill}
                />
              ))}
            </div>
          </section>

          <LearningPath />

          {/* Certificates Section */}
          <section>
            <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-3xl font-bold text-[#172033]">
                  Certificates
                </h2>
                <p className="mt-2 text-gray-500">
                  Showcase your verified achievements.
                </p>
              </div>

              <button
                onClick={() => setShowCertModal(true)}
                className="flex items-center gap-1.5 rounded-xl bg-[#428475] hover:bg-[#1A312C] text-xs font-bold text-white px-4 py-2.5 transition cursor-pointer shadow-sm"
              >
                <Plus size={16} />
                Add Certificate
              </button>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              {certificatesList.map((certificate) => (
                <CertificateCard
                  key={certificate.credentialId}
                  {...certificate}
                />
              ))}
            </div>
          </section>

          <AnalyticsCard
            hours={studyHours}
            streak={streakDays}
            completed={completedCount}
            goal={localStorage.getItem("nexora_career_goal") || "Frontend Developer"}
          />
        </div>

        <RightSidebar
          streak={streakDays}
          events={eventsList}
        />
      </div>

      {/* Static course player modals */}
      {activeCourseId && (
        <CoursePlayerModal
          courseId={activeCourseId}
          onClose={() => {
            setActiveCourseId(null);
            loadStats();
          }}
          onProgressUpdate={(courseId, newProgress) => {
            setContinueCourses((prev) =>
              prev.map((c) =>
                c.id === Number(courseId) ? { ...c, progress: newProgress } : c
              )
            );
          }}
        />
      )}

      {/* Custom search query player modal */}
      {customSearchQuery && (
        <CoursePlayerModal
          courseId={99}
          initialQuery={customSearchQuery}
          onClose={() => {
            setCustomSearchQuery(null);
            loadStats();
          }}
        />
      )}

      {/* Manual Certificate adder modal */}
      {showCertModal && (
        <AddCertificateModal
          onClose={() => setShowCertModal(false)}
          onAddSuccess={(updatedList) => setCertificatesList(updatedList)}
        />
      )}
    </DashboardLayout>
  );
}

export default SkillHub;