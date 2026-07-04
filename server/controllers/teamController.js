const db = require("../config/db");

// @desc    Get all teams
// @route   GET /api/teams
const getTeams = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT t.*, u.name as creator_name, 
       (SELECT COUNT(*)::int FROM team_members WHERE team_id = t.id) as member_count 
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
  const { name, description, skills_needed } = req.body;

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

    const newTeamResult = await db.query(
      `INSERT INTO teams (name, description, skills_needed, created_by) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [name, description || "", skillsArray, req.user.id]
    );
    const newTeam = newTeamResult.rows[0];

    // Automatically join creator as Leader
    await db.query(
      `INSERT INTO team_members (team_id, user_id, role) 
       VALUES ($1, $2, 'Leader')`,
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
      `INSERT INTO team_members (team_id, user_id, role) 
       VALUES ($1, $2, 'Member')`,
      [teamId, req.user.id]
    );

    return res.json({ message: "Successfully joined the team" });
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

module.exports = {
  getTeams,
  createTeam,
  joinTeam,
  getTeamMembers,
};
