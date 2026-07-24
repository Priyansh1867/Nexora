const express = require("express");
const { searchYouTube, getPlaylist } = require("../controllers/youtubeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/search", protect, searchYouTube);
router.get("/playlist/:id", protect, getPlaylist);

module.exports = router;
