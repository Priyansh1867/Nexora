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

  // Derive featured resource dynamically from uploaded resources
  const featured = resourcesList.length > 0 ? resourcesList[0] : null;

  return (
    <DashboardLayout>
      <div className="flex gap-8">
        <div className="flex-1 space-y-8">
          <Hero
            onExploreClick={() => document.getElementById("ongoing-playlists")?.scrollIntoView({ behavior: "smooth" })}
            onUploadClick={() => setShowUploadModal(true)}
          />

          <SearchBar onSearch={(q) => { setCustomSearchQuery(q); setShowPlayer(true); }} />

          {/* Categories Section */}
          <section>
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
                const count = resourcesList.filter(r => r.category.toLowerCase() === category.title.toLowerCase()).length;
                return (
                  <CategoryCard
                    key={category.title}
                    title={category.title}
                    resources={count}
                    icon={category.icon}
                    color={category.color}
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
                category={featured.category}
                author={featured.author}
                rating={4.8}
                description={`A professional community resource uploaded to help you learn and grow in ${featured.category}.`}
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
          <section>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-[#172033]">
                Popular Resources
              </h2>
              <p className="mt-2 text-gray-500">
                Most downloaded resources this week.
              </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
              {resourcesList.length === 0 ? (
                <div className="col-span-3 text-center py-10 bg-gray-50 rounded-[30px] border border-dashed border-gray-200 text-gray-400 font-semibold text-xs">
                  No resources uploaded yet. Upload note PDFs to share study material!
                </div>
              ) : (
                resourcesList.slice(0, 3).map((resource) => (
                  <ResourceCard
                    key={resource.id || resource.title}
                    {...resource}
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
              {resourcesList.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-[30px] border border-dashed border-gray-200 text-gray-400 font-semibold text-xs">
                  No recent uploads.
                </div>
              ) : (
                resourcesList.slice(0, 3).map((resource) => (
                  <RecentCard
                    key={resource.id || resource.title}
                    title={resource.title}
                    category={resource.category}
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