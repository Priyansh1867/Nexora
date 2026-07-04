const db = require("../config/db");

// @desc    Get all resources
// @route   GET /api/resources
const getResources = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT r.*, u.name as uploader_name 
       FROM resources r 
       LEFT JOIN users u ON r.uploaded_by = u.id 
       ORDER BY r.created_at DESC`
    );
    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Add a resource
// @route   POST /api/resources
// @access  Private
const addResource = async (req, res) => {
  let { title, description, type, url, category } = req.body;

  if (req.file) {
    url = `/uploads/${req.file.filename}`;
    if (!title) {
      title = req.file.originalname.replace(/\.[^/.]+$/, "");
    }
    type = "PDF";
    if (!category) {
      category = "Notes";
    }
  }

  if (!title || !url) {
    return res.status(400).json({ message: "Title and URL or File upload are required" });
  }

  try {
    const result = await db.query(
      `INSERT INTO resources (title, description, type, url, category, uploaded_by) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [title, description || "", type || "PDF", url, category || "Notes", req.user.id]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a resource
// @route   DELETE /api/resources/:id
// @access  Private
const deleteResource = async (req, res) => {
  const { id } = req.params;

  try {
    const resourceResult = await db.query("SELECT * FROM resources WHERE id = $1", [id]);
    if (resourceResult.rowCount === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }

    const resource = resourceResult.rows[0];

    // Check if owner
    if (resource.uploaded_by !== req.user.id && req.user.role !== "Admin") {
      return res.status(403).json({ message: "You are not authorized to delete this resource" });
    }

    await db.query("DELETE FROM resources WHERE id = $1", [id]);
    return res.json({ message: "Resource deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getResources,
  addResource,
  deleteResource,
};
