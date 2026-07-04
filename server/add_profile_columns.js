const db = require("./config/db");

async function addColumns() {
  try {
    console.log("Running migrations...");
    
    // Add columns to profiles
    await db.query(`
      ALTER TABLE profiles 
      ADD COLUMN IF NOT EXISTS resume_url VARCHAR(255),
      ADD COLUMN IF NOT EXISTS portfolio VARCHAR(155),
      ADD COLUMN IF NOT EXISTS avatar_url VARCHAR(255)
    `);
    
    console.log("Database migrations completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Migration error:", err.message);
    process.exit(1);
  }
}

addColumns();
