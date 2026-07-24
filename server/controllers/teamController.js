const db = require("../config/db");

// @desc    Get all teams
// @route   GET /api/teams
const getTeams = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT t.*, u.name as creator_name, u.avatar_url as creator_avatar,
       (SELECT COUNT(*)::int FROM team_members WHERE team_id = t.id AND status = 'accepted') as member_count,
       (SELECT COUNT(*)::int FROM project_likes WHERE project_id = t.id) as likes_count,
       (SELECT COUNT(*)::int FROM project_comments WHERE project_id = t.id) as comments_count
       FROM teams t 
       LEFT JOIN users u ON t.created_by = u.id 
       ORDER BY t.created_at DESC`
    );
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Create a team
// @route   POST /api/teams
// @access  Private
const createTeam = async (req, res) => {
  const { 
    name, description, skills_needed, cover_image_url, 
    tech_stack, tags, stage, demo_link, github_link, 
    looking_for_teammates, timeline, communication_mode 
  } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Team name is required" });
  }

  try {
    let skillsArray = [];
    if (Array.isArray(skills_needed)) {
      skillsArray = skills_needed;
    } else if (typeof skills_needed === "string") {
      skillsArray = skills_needed.split(",").map((s) => s.trim()).filter(Boolean);
    }

    let techStackArray = [];
    if (Array.isArray(tech_stack)) techStackArray = tech_stack;
    else if (typeof tech_stack === "string") techStackArray = tech_stack.split(",").map(s => s.trim()).filter(Boolean);

    let tagsArray = [];
    if (Array.isArray(tags)) tagsArray = tags;
    else if (typeof tags === "string") tagsArray = tags.split(",").map(s => s.trim()).filter(Boolean);

    const newTeamResult = await db.query(
      `INSERT INTO teams (name, description, skills_needed, created_by, cover_image_url, tech_stack, tags, stage, demo_link, github_link, looking_for_teammates, timeline, communication_mode) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
       RETURNING *`,
      [
        name, description || "", skillsArray, req.user.id, 
        cover_image_url || null, techStackArray, tagsArray, 
        stage || 'Planning', demo_link || null, github_link || null, 
        looking_for_teammates !== undefined ? looking_for_teammates : true, 
        timeline || null, communication_mode || null
      ]
    );
    const newTeam = newTeamResult.rows[0];

    // Automatically join creator as Leader
    // Automatically join creator as Leader and accepted
    await db.query(
      `INSERT INTO team_members (team_id, user_id, role, status) 
       VALUES ($1, $2, 'Leader', 'accepted')`,
      [newTeam.id, req.user.id]
    );

    return res.status(201).json(newTeam);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Join a team
// @route   POST /api/teams/:id/join
// @access  Private
const joinTeam = async (req, res) => {
  const teamId = req.params.id;

  try {
    const teamExist = await db.query("SELECT id FROM teams WHERE id = $1", [teamId]);
    if (teamExist.rowCount === 0) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Check if already a member
    const memberExist = await db.query(
      "SELECT id FROM team_members WHERE team_id = $1 AND user_id = $2",
      [teamId, req.user.id]
    );

    if (memberExist.rowCount > 0) {
      return res.status(400).json({ message: "You are already a member of this team" });
    }

    await db.query(
      `INSERT INTO team_members (team_id, user_id, role, status) 
       VALUES ($1, $2, 'Member', 'pending')`,
      [teamId, req.user.id]
    );

    return res.json({ message: "Successfully requested to join the team" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Get team members
// @route   GET /api/teams/:id/members
const getTeamMembers = async (req, res) => {
  const teamId = req.params.id;

  try {
    const result = await db.query(
      `SELECT tm.*, u.name, u.email, p.title 
       FROM team_members tm 
       JOIN users u ON tm.user_id = u.id 
       LEFT JOIN profiles p ON p.user_id = u.id 
       WHERE tm.team_id = $1`,
      [teamId]
    );
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Accept/Decline Join Request
// @route   POST /api/teams/:id/requests/:userId
// @access  Private
const handleJoinRequest = async (req, res) => {
  const { id: teamId, userId } = req.params;
  const { action } = req.body; // 'accept' or 'decline'

  try {
    const teamCheck = await db.query("SELECT created_by FROM teams WHERE id = $1", [teamId]);
    if (teamCheck.rowCount === 0) return res.status(404).json({ message: "Team not found" });
    if (teamCheck.rows[0].created_by !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({ message: "Only the creator can manage requests" });
    }

    if (action === "accept") {
      await db.query("UPDATE team_members SET status = 'accepted' WHERE team_id = $1 AND user_id = $2", [teamId, userId]);
      return res.json({ message: "Request accepted" });
    } else if (action === "decline") {
      await db.query("UPDATE team_members SET status = 'declined' WHERE team_id = $1 AND user_id = $2", [teamId, userId]);
      return res.json({ message: "Request declined" });
    }
    return res.status(400).json({ message: "Invalid action" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Get project comments
// @route   GET /api/teams/:id/comments
const getComments = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT pc.*, u.name, p.avatar_url, p.title as role 
       FROM project_comments pc 
       JOIN users u ON pc.user_id = u.id 
       LEFT JOIN profiles p ON p.user_id = u.id 
       WHERE pc.project_id = $1 
       ORDER BY pc.created_at DESC`,
      [req.params.id]
    );
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Add a comment
// @route   POST /api/teams/:id/comments
// @access  Private
const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Comment content is required" });

    const newComment = await db.query(
      "INSERT INTO project_comments (project_id, user_id, content) VALUES ($1, $2, $3) RETURNING *",
      [req.params.id, req.user.id, content]
    );
    return res.status(201).json(newComment.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTeams,
  createTeam,
  joinTeam,
  getTeamMembers,
  handleJoinRequest,
  getComments,
  addComment
};
