const express = require("express");
const multer = require("multer");
const path = require("path");
const { getResources, addResource, deleteResource } = require("../controllers/resourceController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/", getResources);
router.post("/", protect, upload.single("file"), addResource);
router.delete("/:id", protect, deleteResource);

module.exports = router;
