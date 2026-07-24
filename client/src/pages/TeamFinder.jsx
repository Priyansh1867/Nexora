import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import Hero from "../components/teamfinder/Hero";
import SearchBar from "../components/teamfinder/SearchBar";
import FilterBar from "../components/teamfinder/FilterBar";
import MemberCard from "../components/teamfinder/MemberCard";
import ProjectCard from "../components/teamfinder/ProjectCard";
import InvitationCard from "../components/teamfinder/InvitationCard";
import ActivityCard from "../components/teamfinder/ActivityCard";
import RightSidebar from "../components/teamfinder/RightSidebar";
import CreateTeamModal from "../components/teamfinder/CreateTeamModal";
import ProjectDetailModal from "../components/teamfinder/ProjectDetailModal";
import ConnectionCard from "../components/teamfinder/ConnectionCard";

import teamService from "../services/teamService";
import profileService from "../services/profileService";
import connectionService from "../services/connectionService";
import { showToast } from "../utils/toast";

function TeamFinder() {
  // Teammates state (Recommended teammates fetched from database)
  const [teammatesList, setTeammatesList] = useState([]);

  // Projects & Teams lists state (From PostgreSQL database)
  const [projectsList, setProjectsList] = useState([]);
  
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState("Teammates"); // "Teammates", "Open Teams", "Explore Projects"
  
  // Selected Project for Detail Modal
  const [selectedProject, setSelectedProject] = useState(null);

  // Invitations list state (Start empty for fresh user)
  const [invitationsList, setInvitationsList] = useState([]);
  
  // Connections state
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [connectionStatuses, setConnectionStatuses] = useState([]);

  // Recent Activity state (Start empty for fresh user)
  const [activitiesList, setActivitiesList] = useState([]);

  // Upcoming Meetings state (Start empty for fresh user)
  const [meetingsList, setMeetingsList] = useState([]);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [experienceFilter, setExperienceFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");

  // Create Team Modal toggle
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Fetch Open Teams from Backend
  const fetchTeams = useCallback(async () => {
    try {
      const data = await teamService.getTeams();
      const formatted = data.map((t) => ({
        id: t.id,
        title: t.name,
        description: t.description,
        teamSize: t.max_members || 5,
        duration: t.timeline || "6 Weeks",
        skills: t.skills_needed || [],
        membersCount: t.member_count || 1,
        cover_image_url: t.cover_image_url,
        tech_stack: t.tech_stack || [],
        tags: t.tags || [],
        stage: t.stage || 'Planning',
        demo_link: t.demo_link,
        github_link: t.github_link,
        looking_for_teammates: t.looking_for_teammates,
        communication_mode: t.communication_mode,
        creator_name: t.creator_name,
        creator_avatar: t.creator_avatar,
        likes_count: t.likes_count || 0,
        comments_count: t.comments_count || 0,
      }));
      setProjectsList(formatted);
    } catch (err) {
      console.error("Failed to fetch teams:", err);
    }
  }, []);

  // Fetch all registered user profiles except current user
  const fetchTeammates = useCallback(async () => {
    try {
      const data = await profileService.getAllProfiles();
      const formatted = data.map((item) => ({
        id: item.user_id,
        name: item.name || "Student Partner",
        role: item.title || "Developer",
        college: item.college || "Nexora Builder",
        location: "Available",
        match: Math.floor(Math.random() * (99 - 75 + 1)) + 75, // Mock Match Percentage
        bio: item.bio || "Passionate about building cool projects and learning new tech.",
        experience: "Intermediate",
        available: true,
        skills: item.skills || [],
        github: item.github,
        linkedin: item.linkedin,
        portfolio: item.portfolio,
        avatar_url: item.avatar_url,
        avatar_letter: item.avatar_letter,
        connectedState: null,
      }));
      setTeammatesList(formatted);
    } catch (err) {
      console.error("Failed to load teammates list:", err);
    }
  }, []);

  const fetchConnections = useCallback(async () => {
    try {
      const [pending, statuses] = await Promise.all([
        connectionService.getPendingRequests(),
        connectionService.getAllStatuses()
      ]);
      setConnectionRequests(pending);
      setConnectionStatuses(statuses);
    } catch (err) {
      console.error("Failed to load connections:", err);
    }
  }, []);

  useEffect(() => {
    fetchTeams();
    fetchTeammates();
    fetchConnections();
  }, [fetchTeams, fetchTeammates, fetchConnections]);

  // Toggle skills selections
  const handleSkillToggle = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  // Teammate Connection Handler
  const handleConnect = async (id, name) => {
    try {
      await connectionService.sendRequest(id);
      showToast(`Connection request sent to ${name}!`);
      fetchConnections(); // Refresh statuses

      const newActivity = {
        id: Date.now(),
        type: "invite",
        title: "Connection Sent",
        description: `You sent a collaboration request to ${name}.`,
        time: "Just Now",
      };
      setActivitiesList((prev) => [newActivity, ...prev]);
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to send request");
    }
  };

  const handleAcceptConnection = async (connectionId, name) => {
    try {
      await connectionService.acceptRequest(connectionId);
      showToast(`You are now connected with ${name}!`);
      fetchConnections();

      const newActivity = {
        id: Date.now(),
        type: "project",
        title: "New Connection",
        description: `You accepted ${name}'s connection request. You can now chat!`,
        time: "Just Now",
      };
      setActivitiesList((prev) => [newActivity, ...prev]);
    } catch (err) {
      showToast("Failed to accept request");
    }
  };

  const handleDeclineConnection = async (connectionId) => {
    try {
      await connectionService.declineRequest(connectionId);
      showToast("Connection request declined.");
      fetchConnections();
    } catch (err) {
      showToast("Failed to decline request");
    }
  };

  // Accept Team Invitation Handler
  const handleAcceptInvite = (inviteId, name, project, role) => {
    setInvitationsList((prev) => prev.filter((inv) => inv.id !== inviteId));

    const newActivity = {
      id: Date.now(),
      type: "project",
      title: "Joined Team",
      description: `You accepted ${name}'s invitation to join "${project}" as a ${role}.`,
      time: "Just Now",
    };
    setActivitiesList((prev) => [newActivity, ...prev]);

    const newMeeting = {
      id: Date.now(),
      title: `Intro: ${project}`,
      time: "Monday • 4:00 PM (Scheduled)",
    };
    setMeetingsList((prev) => [newMeeting, ...prev]);

    showToast(`Successfully joined the "${project}" project! Kickoff meeting scheduled.`);
  };

  // Decline Team Invitation Handler
  const handleDeclineInvite = (inviteId, name, project) => {
    setInvitationsList((prev) => prev.filter((inv) => inv.id !== inviteId));

    const newActivity = {
      id: Date.now(),
      type: "invite",
      title: "Invitation Declined",
      description: `You declined the invitation to join ${name}'s project "${project}".`,
      time: "Just Now",
    };
    setActivitiesList((prev) => [newActivity, ...prev]);

    showToast(`Invitation to join "${project}" declined.`);
  };

  // Filtering Logic for Teammates
  const filteredTeammates = teammatesList.filter((m) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      m.name.toLowerCase().includes(query) ||
      m.role.toLowerCase().includes(query) ||
      m.college.toLowerCase().includes(query);

    const matchesCategory =
      activeCategory === "All" ||
      m.role.toLowerCase().includes(activeCategory.toLowerCase()) ||
      (activeCategory === "AI / ML" && m.role.toLowerCase().includes("ai")) ||
      (activeCategory === "UI / UX" && m.role.toLowerCase().includes("ux"));

    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.every((skill) =>
        m.skills.some((s) => s.toLowerCase() === skill.toLowerCase())
      );

    const matchesExperience =
      experienceFilter === "All" || m.experience === experienceFilter;

    const matchesAvailability =
      availabilityFilter === "All" || m.available;

    return matchesSearch && matchesCategory && matchesSkills && matchesExperience && matchesAvailability;
  });

  // Filtering Logic for Projects/Teams
  const filteredProjects = projectsList.filter((p) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query);

    const matchesCategory =
      activeCategory === "All" ||
      p.title.toLowerCase().includes(activeCategory.toLowerCase()) ||
      p.description.toLowerCase().includes(activeCategory.toLowerCase()) ||
      p.skills.some((s) => s.toLowerCase().includes(activeCategory.toLowerCase())) ||
      (p.tech_stack && p.tech_stack.some((s) => s.toLowerCase().includes(activeCategory.toLowerCase())));

    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.every((skill) =>
        p.skills.some((s) => s.toLowerCase() === skill.toLowerCase()) ||
        (p.tech_stack && p.tech_stack.some((s) => s.toLowerCase() === skill.toLowerCase()))
      );

    return matchesSearch && matchesCategory && matchesSkills;
  });

  const filteredOpenTeams = filteredProjects.filter(p => p.looking_for_teammates);

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8 overflow-hidden">
          <Hero
            onFindTeammatesClick={() =>
              document.getElementById("recommended-teammates")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            onCreateTeamClick={() => setShowCreateModal(true)}
          />

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedSkills={selectedSkills}
            onSkillToggle={handleSkillToggle}
            experienceFilter={experienceFilter}
            onExperienceChange={setExperienceFilter}
            availabilityFilter={availabilityFilter}
            onAvailabilityChange={setAvailabilityFilter}
          />

          <div className="flex space-x-2 border-b border-gray-200">
            {["Teammates", "Open Teams", "Explore Projects"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-6 text-sm font-bold border-b-2 transition-colors ${
                  activeTab === tab 
                    ? "border-[#428475] text-[#428475]" 
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <FilterBar
            activeFilter={activeCategory}
            onFilterChange={setActiveCategory}
          />

          {/* Conditional Rendering based on activeTab */}
          
          {activeTab === "Teammates" && (
          <section id="recommended-teammates">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-[#172033]">
                Recommended Teammates
              </h2>

              <p className="mt-2 text-gray-500">
                Students matching your interests and skills.
              </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              {filteredTeammates.length === 0 ? (
                <div className="col-span-2 py-12 text-center text-gray-400 font-semibold bg-gray-50 rounded-[30px] border border-dashed border-gray-200 text-xs">
                  🔍 No recommended teammates registered yet.
                </div>
              ) : (
                filteredTeammates.map((member) => {
                  const statusObj = connectionStatuses.find(s => s.receiver_id === member.id || s.requester_id === member.id);
                  const connectedState = statusObj ? (statusObj.status === 'pending' ? 'sent' : 'accepted') : null;
                  
                  return (
                    <MemberCard
                      key={member.id}
                      {...member}
                      onConnect={() => handleConnect(member.id, member.name)}
                      connectedState={connectedState}
                    />
                  );
                })
              )}
            </div>
          </section>
          )}

          {activeTab === "Open Teams" && (
          <section>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-[#172033]">
                Open Teams
              </h2>

              <p className="mt-2 text-gray-500">
                Join exciting projects looking for your skills.
              </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              {filteredOpenTeams.length === 0 ? (
                <div className="col-span-2 py-12 text-center text-gray-400 font-semibold bg-gray-50 rounded-[30px] border border-dashed border-gray-200 text-xs">
                  📂 No open teams match your active search filters. Try removing a filter or explore all teams.
                </div>
              ) : (
                filteredOpenTeams.map((project) => (
                  <ProjectCard
                    key={project.id || project.title}
                    {...project}
                    type="open_team"
                    onViewProject={() => setSelectedProject(project)}
                  />
                ))
              )}
            </div>
          </section>
          )}

          {activeTab === "Explore Projects" && (
          <section>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-[#172033]">
                Explore Projects
              </h2>

              <p className="mt-2 text-gray-500">
                Discover what the Nexora community is building.
              </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              {filteredProjects.length === 0 ? (
                <div className="col-span-2 py-12 text-center text-gray-400 font-semibold bg-gray-50 rounded-[30px] border border-dashed border-gray-200 text-xs">
                  📂 No projects match your active search filters. Be the first to create one!
                </div>
              ) : (
                filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id || project.title}
                    {...project}
                    type="published_project"
                    onViewProject={() => setSelectedProject(project)}
                  />
                ))
              )}
            </div>
          </section>
          )}

          {/* Invitations Section */}
          <section>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-[#172033]">
                  Requests & Invitations
                </h2>

                <p className="mt-2 text-gray-500">
                  Requests waiting for your response.
                </p>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              {invitationsList.length === 0 && connectionRequests.length === 0 ? (
                <div className="col-span-2 py-12 text-center text-gray-400 font-semibold bg-gray-50 rounded-[30px] border border-dashed border-gray-200 text-xs">
                  🎉 All caught up! No pending requests.
                </div>
              ) : (
                <>
                  {connectionRequests.map((req) => (
                    <ConnectionCard
                      key={req.connection_id}
                      name={req.name}
                      role={req.role}
                      college={req.college}
                      avatar={req.avatar_url || (req.avatar_letter ? "" : null)}
                      onAccept={() => handleAcceptConnection(req.connection_id, req.name)}
                      onDecline={() => handleDeclineConnection(req.connection_id)}
                    />
                  ))}
                  {invitationsList.map((invite) => (
                  <InvitationCard
                    key={invite.id}
                    {...invite}
                    onAccept={() =>
                      handleAcceptInvite(
                        invite.id,
                        invite.name,
                        invite.project,
                        invite.role
                      )
                    }
                    onDecline={() =>
                      handleDeclineInvite(invite.id, invite.name, invite.project)
                    }
                  />
                ))}
                </>
              )}
            </div>
          </section>

          {/* Recent Activity Section */}
          <section>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-[#172033]">
                  Recent Activity
                </h2>

                <p className="mt-2 text-gray-500">
                  Stay updated with your collaboration feed.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {activitiesList.length === 0 ? (
                <div className="py-12 text-center text-gray-400 font-semibold bg-gray-50 rounded-[30px] border border-dashed border-gray-200 text-xs">
                  ⚡ Activity log is empty. Send collaboration requests to populate timeline!
                </div>
              ) : (
                activitiesList.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    type={activity.type}
                    title={activity.title}
                    description={activity.description}
                    time={activity.time}
                  />
                ))
              )}
            </div>
          </section>
        </div>

        <RightSidebar
          meetings={meetingsList}
          totalProjects={projectsList.length}
        />
      </div>

      {showCreateModal && (
        <CreateTeamModal
          onClose={() => setShowCreateModal(false)}
          onCreateSuccess={fetchTeams}
        />
      )}

      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
          onRefresh={fetchTeams}
        />
      )}
    </DashboardLayout>
  );
}

export default TeamFinder;