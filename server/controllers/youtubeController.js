const ytpl = require('ytpl');

// Helper to parse YouTube keyless search results
const searchYouTube = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const response = await fetch(`https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`);
    const html = await response.text();

    const startStr = "var ytInitialData = ";
    const endStr = ";</script>";
    let data = [];

    if (html.includes(startStr)) {
      const startIdx = html.indexOf(startStr) + startStr.length;
      const endIdx = html.indexOf(endStr, startIdx);
      if (endIdx > startIdx) {
        const jsonStr = html.substring(startIdx, endIdx);
        try {
          const parsed = JSON.parse(jsonStr);
          const contents = parsed.contents?.twoColumnSearchResultRenderer?.primaryContents?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents || [];

          contents.forEach(item => {
            if (item.videoRenderer) {
              const video = item.videoRenderer;
              const videoId = video.videoId;
              const title = video.title?.runs?.[0]?.text || "YouTube Video";
              if (videoId && title) {
                // Ensure no duplicates
                if (!data.some(v => v.videoId === videoId)) {
                  data.push({
                    id: videoId,
                    title: title,
                    videoId: videoId
                  });
                }
              }
            }
          });
        } catch (e) {
          console.error("Failed to parse ytInitialData JSON:", e);
        }
      }
    }

    // Fallback if parsing initial data yields nothing
    if (data.length === 0) {
      const videoIdMatches = [...html.matchAll(/"videoId":"([^"]+)"/g)].map(m => m[1]);
      const uniqueIds = [...new Set(videoIdMatches)].slice(0, 6);
      data = uniqueIds.map((id, idx) => ({
        id,
        title: `Dynamic Tutorial Lesson ${idx + 1}`,
        videoId: id
      }));
    }

    return res.json(data.slice(0, 6));
  } catch (error) {
    console.error("YouTube search error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getPlaylist = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Playlist ID is required" });
  }

  try {
    const playlist = await ytpl(id, { limit: 100 });
    
    // Map items to match our frontend video object structure
    const data = playlist.items.map(item => ({
      id: item.id,
      videoId: item.id,
      title: item.title,
    }));

    return res.json({
      title: playlist.title,
      videos: data
    });
  } catch (error) {
    console.error("YouTube playlist error:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  searchYouTube,
  getPlaylist,
};
