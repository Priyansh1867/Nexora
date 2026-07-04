const express = require("express");
const multer = require("multer");
const path = require("path");
const { getProfile, getAllProfiles, updateProfile, uploadResume, uploadAvatar } = require("../controllers/profileController");
const { protect } = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.pdf' || ext === '.doc' || ext === '.docx') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC and DOCX files are allowed!'), false);
    }
  }
});

const uploadImage = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.webp') {
      cb(null, true);
    } else {
      cb(new Error('Only PNG, JPG, JPEG and WEBP image files are allowed!'), false);
    }
  }
});

const router = express.Router();

router.get("/", protect, getProfile);
router.get("/all", protect, getAllProfiles);
router.put("/", protect, updateProfile);
router.post("/resume", protect, upload.single("resume"), uploadResume);
router.post("/avatar", protect, uploadImage.single("avatar"), uploadAvatar);

module.exports = router;
