const db = require("./config/db");

async function migrate() {
  try {
    console.log("Starting migration for projects...");

    // Alter teams table
    await db.query(`ALTER TABLE teams ADD COLUMN IF NOT EXISTS cover_image_url VARCHAR(255)`);
    await db.query(`ALTER TABLE teams ADD COLUMN IF NOT EXISTS tech_stack TEXT[] DEFAULT '{}'`);
    await db.query(`ALTER TABLE teams ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}'`);
    await db.query(`ALTER TABLE teams ADD COLUMN IF NOT EXISTS stage VARCHAR(50) DEFAULT 'Planning'`);
    await db.query(`ALTER TABLE teams ADD COLUMN IF NOT EXISTS demo_link VARCHAR(255)`);
    await db.query(`ALTER TABLE teams ADD COLUMN IF NOT EXISTS github_link VARCHAR(255)`);
    await db.query(`ALTER TABLE teams ADD COLUMN IF NOT EXISTS looking_for_teammates BOOLEAN DEFAULT TRUE`);
    await db.query(`ALTER TABLE teams ADD COLUMN IF NOT EXISTS timeline VARCHAR(100)`);
    await db.query(`ALTER TABLE teams ADD COLUMN IF NOT EXISTS communication_mode VARCHAR(100)`);

    // Alter team_members table
    await db.query(`ALTER TABLE team_members ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'accepted'`);

    // Create project_comments table
    await db.query(`
      CREATE TABLE IF NOT EXISTS project_comments (
          id SERIAL PRIMARY KEY,
          project_id INTEGER REFERENCES teams(id) ON DELETE CASCADE,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          content TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create project_likes table
    await db.query(`
      CREATE TABLE IF NOT EXISTS project_likes (
          project_id INTEGER REFERENCES teams(id) ON DELETE CASCADE,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (project_id, user_id)
      )
    `);

    console.log("Migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrate();
