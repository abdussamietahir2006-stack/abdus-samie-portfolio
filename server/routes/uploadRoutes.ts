import express from "express";
import { upload } from "../middleware/uploadMiddleware.ts";
import { protect } from "../middleware/authMiddleware.ts";

const router = express.Router();

router.post("/", protect, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ url: `/uploads/${req.file.filename}` });
});

export default router;
