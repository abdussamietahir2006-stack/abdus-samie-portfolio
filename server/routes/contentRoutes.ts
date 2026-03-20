import express from "express";
import { getPageContent, updateContent } from "../controllers/contentController.ts";
import { protect } from "../middleware/authMiddleware.ts";

const router = express.Router();

router.get("/:page", getPageContent);
router.put("/", protect, updateContent);

export default router;
