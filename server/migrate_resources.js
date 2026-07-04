const db = require("./config/db");

async function migrate() {
  try {
    console.log("Running resources migration...");
    await db.query(`ALTER TABLE resources ADD COLUMN IF NOT EXISTS category VARCHAR(100) DEFAULT 'Notes'`);
    console.log("resources.category column added successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Migration error:", err.message);
    process.exit(1);
  }
}

migrate();
