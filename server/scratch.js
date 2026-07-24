async function scrapePlaylist(playlistId) {
  try {
    const response = await fetch(`https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`);
    const xml = await response.text();
    console.log(xml.substring(0, 500));
  } catch (e) {
    console.error(e);
  }
}
scrapePlaylist("PLC3y8-rCUvwggCBpiE4di3Y1h9UpiCS3a");
  }
}

// Test with Codevolution React Playlist
scrapePlaylist("PLC3y8-rCUvwggCBpiE4di3Y1h9UpiCS3a");
