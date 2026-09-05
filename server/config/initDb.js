const db = require("./db");

async function initDb() {
  try {
    // 1. Ensure receiver_id column exists on messages table
    await db.query(`
      ALTER TABLE messages 
      ADD COLUMN IF NOT EXISTS receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE;
    `);

    // 2. Ensure connections table exists
    await db.query(`
      CREATE TABLE IF NOT EXISTS connections (
          id SERIAL PRIMARY KEY,
          requester_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          status VARCHAR(20) DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(requester_id, receiver_id)
      );
    `);

    // 3. Ensure teams columns exist
    await db.query(`ALTER TABLE teams ADD COLUMN IF NOT EXISTS cover_image_url VARCHAR(255);`);
    await db.query(`ALTER TABLE teams ADD COLUMN IF NOT EXISTS tech_stack TEXT[] DEFAULT '{}';`);
    await db.query(`ALTER TABLE teams ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';`);
    await db.query(`ALTER TABLE teams ADD COLUMN IF NOT EXISTS stage VARCHAR(50) DEFAULT 'Planning';`);
    await db.query(`ALTER TABLE teams ADD COLUMN IF NOT EXISTS demo_link VARCHAR(255);`);
    await db.query(`ALTER TABLE teams ADD COLUMN IF NOT EXISTS github_link VARCHAR(255);`);
    await db.query(`ALTER TABLE teams ADD COLUMN IF NOT EXISTS looking_for_teammates BOOLEAN DEFAULT TRUE;`);
    await db.query(`ALTER TABLE teams ADD COLUMN IF NOT EXISTS timeline VARCHAR(100);`);
    await db.query(`ALTER TABLE teams ADD COLUMN IF NOT EXISTS communication_mode VARCHAR(100);`);

    // 4. Ensure team_members status column exists
    await db.query(`ALTER TABLE team_members ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'accepted';`);

    // 5. Ensure project_comments table exists
    await db.query(`
      CREATE TABLE IF NOT EXISTS project_comments (
          id SERIAL PRIMARY KEY,
          project_id INTEGER REFERENCES teams(id) ON DELETE CASCADE,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          content TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 6. Ensure project_likes table exists
    await db.query(`
      CREATE TABLE IF NOT EXISTS project_likes (
          project_id INTEGER REFERENCES teams(id) ON DELETE CASCADE,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (project_id, user_id)
      );
    `);

    console.log("Database schema checked and migrated successfully!");
  } catch (err) {
    console.error("Database migration notice:", err.message);
  }
}

module.exports = initDb;
