const db = require("../config/db");

// @desc    Get chat messages
// @route   GET /api/chat/messages?receiverId=123 or 'global'
// @access  Private
const getMessages = async (req, res) => {
  const { receiverId } = req.query;
  
  if (!receiverId) {
    return res.status(400).json({ message: "Receiver ID is required" });
  }

  try {
    let result;
    const isGlobal = receiverId === 'global' || receiverId === '0' || receiverId === 0;

    if (isGlobal) {
      try {
        result = await db.query(
          `SELECT m.*, p.avatar_letter, p.avatar_url
           FROM messages m 
           LEFT JOIN profiles p ON m.sender_id = p.user_id 
           WHERE m.receiver_id IS NULL OR m.receiver_id = 0
           ORDER BY m.created_at ASC 
           LIMIT 100`
        );
      } catch (queryErr) {
        if (queryErr.message && queryErr.message.includes("receiver_id")) {
          // Auto-migrate if receiver_id column is missing in legacy database
          try {
            await db.query(`ALTER TABLE messages ADD COLUMN IF NOT EXISTS receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE;`);
          } catch (mErr) {
            console.warn("Auto-migration notice:", mErr.message);
          }
          result = await db.query(
            `SELECT m.*, p.avatar_letter, p.avatar_url
             FROM messages m 
             LEFT JOIN profiles p ON m.sender_id = p.user_id 
             ORDER BY m.created_at ASC 
             LIMIT 100`
          );
        } else {
          throw queryErr;
        }
      }
    } else {
      result = await db.query(
        `SELECT m.*, p.avatar_letter, p.avatar_url
         FROM messages m 
         LEFT JOIN profiles p ON m.sender_id = p.user_id 
         WHERE (m.sender_id = $1 AND m.receiver_id = $2) 
            OR (m.sender_id = $2 AND m.receiver_id = $1)
         ORDER BY m.created_at ASC 
         LIMIT 100`,
         [req.user.id, receiverId]
      );
    }
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Send a message
// @route   POST /api/chat/messages
// @access  Private
const sendMessage = async (req, res) => {
  const { content, receiverId } = req.body;

  if (!content || (receiverId === undefined && receiverId === null)) {
    return res.status(400).json({ message: "Content and Receiver ID are required" });
  }

  try {
    const isGlobal = receiverId === 'global' || receiverId === 0 || receiverId === '0';
    const actualReceiverId = isGlobal ? null : receiverId;

    let result;
    try {
      result = await db.query(
        `INSERT INTO messages (sender_id, receiver_id, sender_name, content) 
         VALUES ($1, $2, $3, $4) 
         RETURNING *`,
        [req.user.id, actualReceiverId, req.user.name, content]
      );
    } catch (insertErr) {
      if (insertErr.message && insertErr.message.includes("receiver_id")) {
        // Auto-migrate if receiver_id column is missing
        try {
          await db.query(`ALTER TABLE messages ADD COLUMN IF NOT EXISTS receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE;`);
        } catch (mErr) {
          console.warn("Auto-migration notice:", mErr.message);
        }
        result = await db.query(
          `INSERT INTO messages (sender_id, receiver_id, sender_name, content) 
           VALUES ($1, $2, $3, $4) 
           RETURNING *`,
          [req.user.id, actualReceiverId, req.user.name, content]
        );
      } else {
        throw insertErr;
      }
    }

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMessages,
  sendMessage,
};
