const { Client } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function setup() {
  const credentials = {
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    password: process.env.DB_PASSWORD === "YOUR_POSTGRESQL_PASSWORD_HERE" ? "" : process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432"),
  };

  console.log("Connecting to PostgreSQL to check database...");
  
  // Connect to default 'postgres' database first
  const client = new Client({
    ...credentials,
    database: "postgres",
  });

  try {
    await client.connect();
    
    // Check if database nexora exists
    const res = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = 'nexora'"
    );

    if (res.rowCount === 0) {
      console.log("Database 'nexora' does not exist. Creating it...");
      await client.query("CREATE DATABASE nexora");
      console.log("Database 'nexora' created successfully!");
    } else {
      console.log("Database 'nexora' already exists.");
    }
  } catch (err) {
    console.error("Failed to connect or create database:", err.message);
    console.log("\n[ACTION REQUIRED] Please make sure your database credentials (especially DB_PASSWORD) are set correctly in your server/.env file!");
    process.exit(1);
  } finally {
    await client.end();
  }

  console.log("\nConnecting to 'nexora' database to execute schema...");
  const dbClient = new Client({
    ...credentials,
    database: "nexora",
  });

  try {
    await dbClient.connect();
    
    const schemaPath = path.join(__dirname, "schema.sql");
    const schemaSql = fs.readFileSync(schemaPath, "utf8");
    
    console.log("Running schema.sql...");
    await dbClient.query(schemaSql);
    console.log("Database tables created successfully!");
  } catch (err) {
    console.error("Failed to execute schema:", err.message);
    process.exit(1);
  } finally {
    await dbClient.end();
  }

  console.log("\nDatabase setup complete!");
}

setup();
