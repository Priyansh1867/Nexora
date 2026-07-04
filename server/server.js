const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const teamRoutes = require("./routes/teamRoutes");
const chatRoutes = require("./routes/chatRoutes");
const courseRoutes = require("./routes/courseRoutes");
const youtubeRoutes = require("./routes/youtubeRoutes");

const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// CORS configuration - support cookies & headers
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://nexora-sigma-gold.vercel.app",
      "http://nexora-sigma-gold.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadsDir));

// Routing API
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/youtube", youtubeRoutes);

// Base route
app.get("/", (req, res) => {
  res.send("Nexora API Server is running successfully!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({
    message: err.message || "An unexpected server error occurred",
  });
});

app.listen(PORT, () => {
  console.log(`Nexora backend server is listening on port ${PORT}`);
});
