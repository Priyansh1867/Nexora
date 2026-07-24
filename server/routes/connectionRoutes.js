const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  sendRequest,
  getPendingRequests,
  acceptRequest,
  declineRequest,
  getFriends,
  getAllStatuses
} = require("../controllers/connectionController");

router.post("/request", protect, sendRequest);
router.post("/accept", protect, acceptRequest);
router.post("/decline", protect, declineRequest);
router.get("/pending", protect, getPendingRequests);
router.get("/friends", protect, getFriends);
router.get("/status", protect, getAllStatuses);

module.exports = router;
