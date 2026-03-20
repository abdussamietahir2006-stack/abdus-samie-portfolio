import express from "express";
import { getProjects, createProject, updateProject, deleteProject } from "../controllers/projectController.ts";
import { protect } from "../middleware/authMiddleware.ts";

const router = express.Router();

router.get("/", getProjects);
router.post("/", protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

export default router;
