const express = require("express");
const router = express.Router();
const { generateRoadmap } = require("../controllers/aiController");

// POST /api/ai/generate-roadmap
router.post("/generate-roadmap", generateRoadmap);

module.exports = router;
