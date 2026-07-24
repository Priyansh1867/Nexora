import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import Hero from "../components/library/Hero";
import SearchBar from "../components/library/SearchBar";
import CategoryCard from "../components/library/CategoryCard";
import ResourceCard from "../components/library/ResourceCard";
import FeaturedCard from "../components/library/FeaturedCard";
import RecentCard from "../components/library/RecentCard";
import BookmarkCard from "../components/library/BookmarkCard";
import RightSidebar from "../components/library/RightSidebar";
import LibraryCard from "../components/dashboard/LibraryCard";

import libraryService from "../services/libraryService";
import CoursePlayerModal from "../components/library/CoursePlayerModal";
import DocumentViewerModal from "../components/library/DocumentViewerModal";
import UploadResourceModal from "../components/library/UploadResourceModal";

import {
  BookOpen,
  Brain,
  FileText,
  GraduationCap,
  Landmark,
  Route,
} from "lucide-react";

function Library() {
  const categories = [
    {
      title: "Notes",
      resources: 0,
      icon: <FileText size={28} />,
      color: "#428475",
    },
    {
      title: "Research Papers",
      resources: 0,
      icon: <Brain size={28} />,
      color: "#7C3AED",
    },
    {
      title: "E-Books",
      resources: 0,
      icon: <BookOpen size={28} />,
      color: "#2563EB",
    },
    {
      title: "Roadmaps",
      resources: 0,
      icon: <Route size={28} />,
      color: "#F59E0B",
    },
    {
      title: "Interview Prep",
      resources: 0,
      icon: <GraduationCap size={28} />,
      color: "#EF4444",
    },
    {
      title: "Case Studies",
      resources: 0,
      icon: <Landmark size={28} />,
      color: "#0EA5E9",
    },
  ];

  const [resourcesList, setResourcesList] = useState([]);
  const [customSearchQuery, setCustomSearchQuery] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("All");
  const [activeBranchFilter, setActiveBranchFilter] = useState("All");
  const [bookmarkedList, setBookmarkedList] = useState(() => {
    const saved = localStorage.getItem("nexora_bookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  const handleBookmarkToggle = (item) => {
    setBookmarkedList((prev) => {
      const exists = prev.some((b) => b.id === item.id);
      let updated;
      if (exists) {
        updated = prev.filter((b) => b.id !== item.id);
      } else {
        updated = [...prev, item];
      }
      localStorage.setItem("nexora_bookmarks", JSON.stringify(updated));
      return updated;
    });
  };

  const fetchResources = useCallback(async () => {
    try {
      const data = await libraryService.getResources();
      const formatted = data.map((r) => ({
        id: r.id,
        title: r.title,
        category: r.category || "General",
        author: r.uploader_name || "Community Partner",
        pages: 10,
        rating: 4.8,
        downloads: 0,
        fileUrl: r.url,
        uploadedBy: r.uploader_name || "Nexora Builder",
        uploadDate: new Date(r.created_at).toLocaleDateString(),
      }));
      setResourcesList(formatted);
    } catch (err) {
      console.error("Failed to fetch resources:", err);
    }
  }, []);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  // Extract unique branches from Notes resources
  const uniqueBranches = Array.from(
    new Set(
      resourcesList
        .filter((r) => r.category.includes(" - Notes"))
        .map((r) => r.category.split(" - ")[0])
    )
  ).filter(Boolean);

  // Filter Logic
  const filteredResources = resourcesList.filter((r) => {
    const isNotes = r.category.includes(" - Notes") || r.category === "Notes";
    
    // Category Filter Match
    let categoryMatch = true;
    if (activeCategoryFilter !== "All") {
      if (activeCategoryFilter === "Notes" && isNotes) {
        categoryMatch = true;
      } else {
        categoryMatch = r.category.toLowerCase() === activeCategoryFilter.toLowerCase() || 
                        r.category.toLowerCase().endsWith(`- ${activeCategoryFilter.toLowerCase()}`);
      }
    }

    // Branch Filter Match
    let branchMatch = true;
    if (activeBranchFilter !== "All" && isNotes) {
      const branchName = r.category.split(" - ")[0];
      branchMatch = branchName === activeBranchFilter;
    }

    return categoryMatch && branchMatch;
  });

  // Derive featured resource dynamically from uploaded resources
  const featured = filteredResources.length > 0 ? filteredResources[0] : null;

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8 overflow-hidden">
          <Hero
            onExploreClick={() => document.getElementById("ongoing-playlists")?.scrollIntoView({ behavior: "smooth" })}
            onUploadClick={() => setShowUploadModal(true)}
          />

          <SearchBar 
            onSearch={(q) => { setCustomSearchQuery(q); setShowPlayer(true); }}
            onCategoryClick={() => document.getElementById("library-categories")?.scrollIntoView({ behavior: "smooth" })}
            onFilterClick={() => document.getElementById("popular-resources")?.scrollIntoView({ behavior: "smooth" })}
          />

          {/* Categories Section */}
          <section id="library-categories">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-[#172033]">
                  Categories
                </h2>
                <p className="mt-2 text-gray-500">
                  Browse resources by category.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {categories.map((category) => {
                const isNotes = category.title === "Notes";
                const count = resourcesList.filter(r => {
                  if (isNotes) return r.category.includes(" - Notes") || r.category === "Notes";
                  return r.category.toLowerCase() === category.title.toLowerCase() || r.category.toLowerCase().endsWith(`- ${category.title.toLowerCase()}`);
                }).length;

                return (
                  <CategoryCard
                    key={category.title}
                    title={category.title}
                    resources={count}
                    icon={category.icon}
                    color={category.color}
                    onClick={() => {
                      setActiveCategoryFilter(category.title);
                      setActiveBranchFilter("All");
                      document.getElementById("popular-resources")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  />
                );
              })}
            </div>
          </section>

          {/* Featured Resource Section */}
          <section>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-[#172033]">
                Featured Resource
              </h2>
            </div>

            {featured ? (
              <FeaturedCard
                title={featured.title}
                category={featured.category.replace(" - Notes", "")}
                author={featured.author}
                rating={4.8}
                image="/featured_resource.jpg"
                description={`A professional community resource uploaded to help you learn and grow in ${featured.category.replace(" - Notes", "")}.`}
                onReadClick={() => setSelectedResource(featured)}
                isBookmarked={bookmarkedList.some((b) => b.id === featured.id)}
                onBookmarkToggle={() => handleBookmarkToggle(featured)}
              />
            ) : (
              <div className="py-10 text-center text-gray-400 font-semibold bg-gray-50 rounded-[30px] border border-dashed border-gray-200 text-xs">
                💡 No featured resources yet. Upload notes to see them featured here!
              </div>
            )}
          </section>

          {/* Ongoing Playlists */}
          <div id="ongoing-playlists">
            <LibraryCard />
          </div>

          {/* Popular Resources Section */}
          <section id="popular-resources">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-[#172033]">
                  {activeCategoryFilter === "All" ? "Popular Resources" : `${activeCategoryFilter} Resources`}
                </h2>
                <p className="mt-2 text-gray-500">
                  {activeCategoryFilter === "All" ? "Most downloaded resources this week." : `Showing resources in ${activeCategoryFilter}`}
                </p>
              </div>

              <div className="flex gap-2">
                {activeCategoryFilter !== "All" && (
                  <button 
                    onClick={() => { setActiveCategoryFilter("All"); setActiveBranchFilter("All"); }}
                    className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition cursor-pointer"
                  >
                    Clear Filter
                  </button>
                )}

                {(activeCategoryFilter === "Notes" || activeCategoryFilter === "All") && uniqueBranches.length > 0 && (
                  <select
                    value={activeBranchFilter}
                    onChange={(e) => setActiveBranchFilter(e.target.value)}
                    className="px-4 py-2 text-sm font-semibold bg-white border border-[#EDF1F4] rounded-xl outline-none focus:border-[#428475] cursor-pointer"
                  >
                    <option value="All">All Branches</option>
                    {uniqueBranches.map(branch => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
              {filteredResources.length === 0 ? (
                <div className="col-span-3 text-center py-10 bg-gray-50 rounded-[30px] border border-dashed border-gray-200 text-gray-400 font-semibold text-xs">
                  No resources match the selected filters.
                </div>
              ) : (
                filteredResources.map((resource) => (
                  <ResourceCard
                    key={resource.id || resource.title}
                    {...resource}
                    category={resource.category.replace(" - Notes", "")}
                    onPreview={() => setSelectedResource(resource)}
                    bookmarked={bookmarkedList.some((b) => b.id === resource.id)}
                    onBookmarkToggle={() => handleBookmarkToggle(resource)}
                  />
                ))
              )}
            </div>
          </section>

          {/* Recently Added Section */}
          <section>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-[#172033]">
                  Recently Added
                </h2>
                <p className="mt-2 text-gray-500">
                  Fresh resources uploaded by the community.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {filteredResources.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-[30px] border border-dashed border-gray-200 text-gray-400 font-semibold text-xs">
                  No recent uploads.
                </div>
              ) : (
                filteredResources.slice(0, 3).map((resource) => (
                  <RecentCard
                    key={resource.id || resource.title}
                    title={resource.title}
                    category={resource.category.replace(" - Notes", "")}
                    uploadedBy={resource.uploadedBy}
                    uploadDate={resource.uploadDate}
                    readTime="5 min read"
                    onClick={() => setSelectedResource(resource)}
                  />
                ))
              )}
            </div>
          </section>

          {/* Bookmarks Section */}
          <section>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-[#172033]">
                  Your Bookmarks
                </h2>
                <p className="mt-2 text-gray-500">
                  Resources you've saved for later.
                </p>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              {bookmarkedList.length === 0 ? (
                <div className="col-span-2 text-center py-10 bg-gray-50 rounded-[30px] border border-dashed border-gray-200 text-gray-400 font-semibold text-sm">
                  💡 No bookmarks saved yet. Click the bookmark icon on any card to save it here!
                </div>
              ) : (
                bookmarkedList.map((item) => (
                  <BookmarkCard
                    key={item.id}
                    title={item.title}
                    category={item.category}
                    author={item.author}
                    savedOn="Recently"
                    onOpen={() => setSelectedResource(item)}
                    onRemove={() => handleBookmarkToggle(item)}
                  />
                ))
              )}
            </div>
          </section>
        </div>

        <RightSidebar onUploadSuccess={fetchResources} />
      </div>

      {showPlayer && (
        <CoursePlayerModal
          courseId={99}
          initialQuery={customSearchQuery}
          onClose={() => setShowPlayer(false)}
        />
      )}

      {selectedResource && (
        <DocumentViewerModal
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
        />
      )}

      {showUploadModal && (
        <UploadResourceModal
          onClose={() => setShowUploadModal(false)}
          onUploadSuccess={fetchResources}
        />
      )}
    </DashboardLayout>
  );
}

export default Library;