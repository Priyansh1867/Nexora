const db = require("../config/db");

// @desc    Get user courses progress
// @route   GET /api/courses/progress
// @access  Private
const getCourseProgress = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await db.query(
      "SELECT * FROM user_courses WHERE user_id = $1",
      [userId]
    );

    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Update course progress
// @route   POST /api/courses/progress
// @access  Private
const updateCourseProgress = async (req, res) => {
  const userId = req.user.id;
  const { course_id, progress, completed_lessons } = req.body;

  if (course_id === undefined || progress === undefined) {
    return res.status(400).json({ message: "Course ID and progress are required" });
  }

  try {
    // Upsert (insert or update on conflict of user_id, course_id)
    const result = await db.query(
      `INSERT INTO user_courses (user_id, course_id, progress, completed_lessons)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id, course_id)
       DO UPDATE SET progress = EXCLUDED.progress, completed_lessons = EXCLUDED.completed_lessons
       RETURNING *`,
      [userId, course_id, progress, completed_lessons || []]
    );

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCourseProgress,
  updateCourseProgress,
};
