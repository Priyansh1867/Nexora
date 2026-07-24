const { Client } = require("pg");
require("dotenv").config();

async function alter() {
  const client = new Client({
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    password: process.env.DB_PASSWORD === "YOUR_POSTGRESQL_PASSWORD_HERE" ? "" : process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432"),
    database: "nexora"
  });

  try {
    await client.connect();
    await client.query("ALTER TABLE messages ADD COLUMN IF NOT EXISTS receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE;");
    console.log("Altered messages table successfully!");
  } catch (err) {
    console.error("Failed:", err);
  } finally {
    await client.end();
  }
}

alter();
