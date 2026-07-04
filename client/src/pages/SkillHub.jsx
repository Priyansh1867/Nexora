import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import Hero from "../components/skillhub/Hero";
import SearchBar from "../components/skillhub/SearchBar";
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
    },
    {
      id: 2,
      title: "Node.js & Express Masterclass",
      instructor: "Sarah Wilson",
      progress: 0,
      duration: "4 Lectures",
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
    },
    {
      title: "Express & PostgreSQL Masterclass",
      instructor: "Alex Johnson",
      category: "Backend",
      duration: "14 Hours",
      lessons: 42,
      rating: 4.8,
      students: "11.8k",
    },
    {
      title: "System Design Essentials Guide",
      instructor: "Michael Brown",
      category: "Architecture",
      duration: "20 Hours",
      lessons: 61,
      rating: 4.9,
      students: "20.5k",
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
  const handleCategoryExplore = async (categoryTitle) => {
    setSelectedCategory(categoryTitle);
    setLoadingPlaylists(true);
    setCategoryPlaylists([]);

    // Scroll smoothly to exploration grid
    setTimeout(() => {
      document.getElementById("category-playlists-explore")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 200);

    try {
      const results = await courseService.searchYouTube(`${categoryTitle} complete course tutorial`);
      setCategoryPlaylists(results.slice(0, 7)); // Fetch exactly 6-7 playlists!
    } catch (err) {
      console.error("Failed to load category playlists:", err);
    } finally {
      setLoadingPlaylists(false);
    }
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
      <div className="flex gap-8">
        <div className="flex-1 space-y-8">
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

          <SearchBar
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
                          key={playlist.videoId + idx}
                          className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between"
                        >
                          <div>
                            <span className="text-[10px] bg-[#EEF8F4] text-[#428475] font-bold px-2 py-0.5 rounded-full uppercase">
                              Playlist {idx + 1}
                            </span>
                            <h4 className="text-sm font-bold text-[#172033] mt-3 leading-snug line-clamp-2">
                              {playlist.title}
                            </h4>
                          </div>

                          <button
                            onClick={() => setCustomSearchQuery(playlist.title)}
                            className="mt-5 w-full h-10 rounded-xl bg-[#16332D] text-white hover:bg-[#214740] font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
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
                  <div className="space-y-4">
                    <div className="bg-white rounded-2xl border border-dashed border-[#428475]/30 p-6 text-center space-y-3">
                      <div className="h-12 w-12 rounded-full bg-[#EEF8F4] flex items-center justify-center mx-auto">
                        <Users size={20} className="text-[#428475]" />
                      </div>
                      <h4 className="text-sm font-bold text-[#172033]">Find Study Partners</h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed">
                        Connect with real students learning {selectedCategory} in our Team Finder.
                      </p>
                      <button
                        onClick={() => { window.location.href = "/team-finder"; }}
                        className="w-full h-9 rounded-xl bg-[#16332D] text-white font-bold text-xs transition hover:bg-[#214740] flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Users size={12} />
                        Browse Team Finder
                      </button>
                      <button
                        onClick={handleStartStudyChat}
                        className="w-full h-9 rounded-xl border border-[#428475]/35 hover:bg-[#EEF8F4] text-[#428475] font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <MessageSquare size={12} />
                        Open Group Chat
                      </button>
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