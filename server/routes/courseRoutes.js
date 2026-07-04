const express = require("express");
const { getCourseProgress, updateCourseProgress } = require("../controllers/courseController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/progress", protect, getCourseProgress);
router.post("/progress", protect, updateCourseProgress);

module.exports = router;
