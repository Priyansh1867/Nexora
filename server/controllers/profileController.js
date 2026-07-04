const db = require("../config/db");

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const profileResult = await db.query(
      `SELECT p.*, u.name, u.email, u.role 
       FROM profiles p 
       JOIN users u ON p.user_id = u.id 
       WHERE p.user_id = $1`,
      [req.user.id]
    );

    if (profileResult.rowCount === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.json(profileResult.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const profilesResult = await db.query(
      `SELECT p.*, u.name, u.email, u.role 
       FROM profiles p 
       JOIN users u ON p.user_id = u.id 
       WHERE p.user_id != $1`,
      [req.user.id]
    );
    return res.json(profilesResult.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
const updateProfile = async (req, res) => {
  const { bio, title, college, skills, github, linkedin, portfolio } = req.body;

  try {
    const profileExist = await db.query("SELECT id FROM profiles WHERE user_id = $1", [req.user.id]);
    if (profileExist.rowCount === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Parse skills to array if it is passed as a string or array
    let skillsArray = [];
    if (Array.isArray(skills)) {
      skillsArray = skills;
    } else if (typeof skills === "string") {
      skillsArray = skills.split(",").map((s) => s.trim()).filter(Boolean);
    }

    const updatedProfile = await db.query(
      `UPDATE profiles 
       SET bio = $1, title = $2, college = $3, skills = $4, github = $5, linkedin = $6, portfolio = $7
       WHERE user_id = $8 
       RETURNING *`,
      [bio, title, college, skillsArray, github, linkedin, portfolio || null, req.user.id]
    );

    return res.json(updatedProfile.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const resume_url = `/uploads/${req.file.filename}`;

    const updatedProfile = await db.query(
      `UPDATE profiles 
       SET resume_url = $1 
       WHERE user_id = $2 
       RETURNING *`,
      [resume_url, req.user.id]
    );

    return res.json({
      message: "Resume uploaded successfully",
      resume_url,
      profile: updatedProfile.rows[0]
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const avatar_url = `/uploads/${req.file.filename}`;

    const updatedProfile = await db.query(
      `UPDATE profiles 
       SET avatar_url = $1 
       WHERE user_id = $2 
       RETURNING *`,
      [avatar_url, req.user.id]
    );

    return res.json({
      message: "Avatar uploaded successfully",
      avatar_url,
      profile: updatedProfile.rows[0]
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProfile,
  getAllProfiles,
  updateProfile,
  uploadResume,
  uploadAvatar,
};
