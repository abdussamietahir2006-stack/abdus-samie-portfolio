import express from "express";
import { getPageContent, updateContent } from "../controllers/contentController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/:page", getPageContent);
router.put("/", protect, updateContent);

export default router;
