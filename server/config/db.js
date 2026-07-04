const { Pool } = require("pg");
require("dotenv").config();

const dbConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes("localhost") ? false : { rejectUnauthorized: false }
    }
  : {
      user: process.env.DB_USER || "postgres",
      host: process.env.DB_HOST || "localhost",
      database: process.env.DB_NAME || "nexora",
      password: process.env.DB_PASSWORD === "YOUR_POSTGRESQL_PASSWORD_HERE" ? "" : process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT || "5432"),
    };

const pool = new Pool(dbConfig);

pool.on("connect", () => {
  console.log("PostgreSQL Database connected successfully!");
});

pool.on("error", (err) => {
  console.error("Unexpected database pool error:", err.message);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
