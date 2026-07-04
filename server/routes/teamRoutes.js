const express = require("express");
const { getTeams, createTeam, joinTeam, getTeamMembers } = require("../controllers/teamController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getTeams);
router.post("/", protect, createTeam);
router.post("/:id/join", protect, joinTeam);
router.get("/:id/members", getTeamMembers);

module.exports = router;
