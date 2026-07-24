const express = require("express");
const { 
  getTeams, createTeam, joinTeam, getTeamMembers,
  handleJoinRequest, getComments, addComment
} = require("../controllers/teamController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getTeams);
router.post("/", protect, createTeam);
router.post("/:id/join", protect, joinTeam);
router.get("/:id/members", getTeamMembers);

router.post("/:id/requests/:userId", protect, handleJoinRequest);
router.get("/:id/comments", getComments);
router.post("/:id/comments", protect, addComment);

module.exports = router;
