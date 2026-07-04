const db = require("../config/db");

// @desc    Get chat messages
// @route   GET /api/chat/messages
// @access  Private
const getMessages = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT m.*, p.avatar_letter 
       FROM messages m 
       LEFT JOIN profiles p ON m.sender_id = p.user_id 
       ORDER BY m.created_at ASC 
       LIMIT 100`
    );
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Send a message
// @route   POST /api/chat/messages
// @access  Private
const sendMessage = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Content is required" });
  }

  try {
    const result = await db.query(
      `INSERT INTO messages (sender_id, sender_name, content) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [req.user.id, req.user.name, content]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMessages,
  sendMessage,
};
