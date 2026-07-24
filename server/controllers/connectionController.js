const db = require("../config/db");

// @desc    Send a connection request
// @route   POST /api/connections/request
// @access  Private
const sendRequest = async (req, res) => {
  const { receiver_id } = req.body;
  const requester_id = req.user.id;

  if (!receiver_id) {
    return res.status(400).json({ message: "Receiver ID is required" });
  }
  
  if (receiver_id === requester_id) {
    return res.status(400).json({ message: "Cannot send request to yourself" });
  }

  try {
    // Check if already requested or connected
    const existing = await db.query(
      `SELECT * FROM connections 
       WHERE (requester_id = $1 AND receiver_id = $2) 
          OR (requester_id = $2 AND receiver_id = $1)`,
      [requester_id, receiver_id]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Connection already exists or is pending" });
    }

    const result = await db.query(
      `INSERT INTO connections (requester_id, receiver_id, status) 
       VALUES ($1, $2, 'pending') RETURNING *`,
      [requester_id, receiver_id]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Get incoming pending requests
// @route   GET /api/connections/pending
// @access  Private
const getPendingRequests = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT c.id as connection_id, u.id as user_id, u.name, p.title as role, p.college, p.avatar_url, p.avatar_letter
       FROM connections c
       JOIN users u ON c.requester_id = u.id
       LEFT JOIN profiles p ON u.id = p.user_id
       WHERE c.receiver_id = $1 AND c.status = 'pending'`,
      [req.user.id]
    );
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Accept a connection request
// @route   POST /api/connections/accept
// @access  Private
const acceptRequest = async (req, res) => {
  const { connection_id } = req.body;

  try {
    const result = await db.query(
      `UPDATE connections 
       SET status = 'accepted' 
       WHERE id = $1 AND receiver_id = $2 
       RETURNING *`,
      [connection_id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Request not found or unauthorized" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Decline a connection request
// @route   POST /api/connections/decline
// @access  Private
const declineRequest = async (req, res) => {
  const { connection_id } = req.body;

  try {
    const result = await db.query(
      `DELETE FROM connections 
       WHERE id = $1 AND receiver_id = $2 
       RETURNING *`,
      [connection_id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Request not found or unauthorized" });
    }

    return res.json({ message: "Request declined" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Get accepted friends
// @route   GET /api/connections/friends
// @access  Private
const getFriends = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT 
         c.id as connection_id, 
         u.id as user_id, 
         u.name, 
         p.title as role, 
         p.avatar_letter,
         p.avatar_url
       FROM connections c
       JOIN users u ON (u.id = c.requester_id OR u.id = c.receiver_id) AND u.id != $1
       LEFT JOIN profiles p ON u.id = p.user_id
       WHERE (c.requester_id = $1 OR c.receiver_id = $1) AND c.status = 'accepted'`,
      [req.user.id]
    );
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Get connection status with all users (to update UI)
// @route   GET /api/connections/status
// @access  Private
const getAllStatuses = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT requester_id, receiver_id, status 
       FROM connections 
       WHERE requester_id = $1 OR receiver_id = $1`,
      [req.user.id]
    );
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendRequest,
  getPendingRequests,
  acceptRequest,
  declineRequest,
  getFriends,
  getAllStatuses
};
