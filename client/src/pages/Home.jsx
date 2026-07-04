import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import WelcomeHeader from "../components/dashboard/WelcomeHeader";
import QuickActions from "../components/dashboard/QuickActions";
import StatCard from "../components/dashboard/StatCard";
import ContinueJourney from "../components/dashboard/ContinueJourney";
import TrendingSkills from "../components/dashboard/TrendingSkills";
import TeamInvitation from "../components/dashboard/TeamInvitation";
import LibraryCard from "../components/dashboard/LibraryCard";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";
import ProfileCompletion from "../components/dashboard/ProfileCompletion";
import RightSidebar from "../components/dashboard/RightSidebar";

import CoursePlayerModal from "../components/library/CoursePlayerModal";
import ProjectGalleryModal from "../components/dashboard/ProjectGalleryModal";

import courseService from "../services/courseService";
import profileService from "../services/profileService";

import {
  BookOpen,
  FolderKanban,
  Trophy,
  Users,
} from "lucide-react";

function Home() {
  const [stats, setStats] = useState([
    {
      title: "Skills Completed",
      value: "0",
      subtitle: "Complete a course playlist",
      icon: <BookOpen size={24} />,
      route: "/skill-hub",
    },
    {
      title: "Projects",
      value: "0",
      subtitle: "0 Published",
      icon: <FolderKanban size={24} />,
      action: "projects",
    },
    {
      title: "Achievements",
      value: "0",
      subtitle: "Milestones earned",
      icon: <Trophy size={24} />,
      route: "/profile",
    },
    {
      title: "Connections",
      value: "0",
      subtitle: "Study group partner links",
      icon: <Users size={24} />,
      route: "/team-finder",
    },
  ]);

  const [activeCourseId, setActiveCourseId] = useState(null);
  const [showProjectsModal, setShowProjectsModal] = useState(false);

  // Profile data state for checklist
  const [profile, setProfile] = useState(null);

  // Weekly modules completed stats (sum of all completed lessons)
  const [lessonsCompletedCount, setLessonsCompletedCount] = useState(0);
  const [streakDays, setStreakDays] = useState(0);

  const [coursesList, setCoursesList] = useState([
    {
      id: 1,
      title: "React 19 Complete Guide",
      category: "Frontend",
      progress: 0,
    },
    {
      id: 2,
      title: "Node.js & Express Masterclass",
      category: "Backend",
      progress: 0,
    },
    {
      id: 3,
      title: "PostgreSQL for Developers",
      category: "Database",
      progress: 0,
    },
  ]);

  const fetchDashboardData = useCallback(async () => {
    try {
      // 1. Fetch course progresses
      const progressList = await courseService.getCourseProgress();
      
      setCoursesList((prev) =>
        prev.map((c) => {
          const dbProg = progressList.find((p) => p.course_id === c.id);
          return {
            ...c,
            progress: dbProg ? dbProg.progress : 0,
          };
        })
      );

      // Calculate total watched lessons for weekly goal modules
      const sumCompleted = progressList.reduce((sum, item) => sum + (item.completed_lessons?.length || 0), 0);
      setLessonsCompletedCount(Math.min(5, sumCompleted));
      setStreakDays(sumCompleted > 0 ? 1 : 0);

      // 2. Fetch projects count from local storage
      const localProjects = JSON.parse(localStorage.getItem("nexora_projects") || "[]");
      const projectsCount = localProjects.length;

      // Update stat cards dynamically
      const completed = progressList.filter((c) => c.progress === 100).length;
      
      setStats([
        {
          title: "Skills Completed",
          value: String(completed),
          subtitle: "Complete a course playlist",
          icon: <BookOpen size={24} />,
          route: "/skill-hub",
        },
        {
          title: "Projects",
          value: String(projectsCount),
          subtitle: `${projectsCount} Published`,
          icon: <FolderKanban size={24} />,
          action: "projects",
        },
        {
          title: "Achievements",
          value: String(completed),
          subtitle: `${completed} Milestones earned`,
          icon: <Trophy size={24} />,
          route: "/profile",
        },
        {
          title: "Connections",
          value: "0",
          subtitle: "Study group partner links",
          icon: <Users size={24} />,
          route: "/team-finder",
        },
      ]);

      // 3. Fetch profile info for completion checklist
      const profileData = await profileService.getProfile();
      setProfile({
        resume_url: profileData.resume_url || "",
        github: profileData.github || "",
        bio: profileData.bio || "",
      });
    } catch (err) {
      console.error("Failed to load dashboard data details:", err);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleStatClick = (stat) => {
    if (stat.route) {
      window.location.href = stat.route;
    } else if (stat.action === "projects") {
      setShowProjectsModal(true);
    }
  };

  const handleActionClick = (actionTitle) => {
    if (actionTitle === "Continue Learning") {
      // Find first incomplete course
      const incomplete = coursesList.find((c) => c.progress < 100) || coursesList[0];
      setActiveCourseId(incomplete.id);
    } else if (actionTitle === "Browse Projects") {
      setShowProjectsModal(true);
    } else if (actionTitle === "Find Teammates") {
      window.location.href = "/team-finder";
    } else if (actionTitle === "Explore Skills") {
      window.location.href = "/skill-hub";
    }
  };

  const handleSkillLearn = (skillName) => {
    let targetId = 1;
    if (skillName.toLowerCase().includes("node")) targetId = 2;
    if (skillName.toLowerCase().includes("postgres")) targetId = 3;
    setActiveCourseId(targetId);
  };

  return (
    <DashboardLayout>
      <div className="flex gap-8">
        <div className="min-w-0 flex-1 space-y-8">
          
          <WelcomeHeader onContinueClick={() => {
            const incomplete = coursesList.find((c) => c.progress < 100) || coursesList[0];
            setActiveCourseId(incomplete.id);
          }} />

          {/* Stats Grid */}
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <StatCard
                key={item.title}
                title={item.title}
                value={item.value}
                subtitle={item.subtitle}
                icon={item.icon}
                onClick={() => handleStatClick(item)}
              />
            ))}
          </section>

          <QuickActions onActionClick={handleActionClick} />

          <div className="grid gap-8 xl:grid-cols-[1.6fr_1fr]">
            <ContinueJourney
              courses={coursesList}
              onCourseSelect={setActiveCourseId}
            />
            <ProfileCompletion profile={profile} />
          </div>

          <TrendingSkills onSkillLearn={handleSkillLearn} />

          <LibraryCard />

          <TeamInvitation />

          <ActivityTimeline />
        </div>

        <RightSidebar
          streak={streakDays}
          lessonsCount={lessonsCompletedCount}
          onStartPostgres={() => setActiveCourseId(3)}
        />
      </div>

      {/* Dynamic course player */}
      {activeCourseId && (
        <CoursePlayerModal
          courseId={activeCourseId}
          onClose={() => {
            setActiveCourseId(null);
            fetchDashboardData();
          }}
        />
      )}

      {/* Shared project gallery modal */}
      {showProjectsModal && (
        <ProjectGalleryModal onClose={() => setShowProjectsModal(false)} />
      )}
    </DashboardLayout>
  );
}

export default Home;