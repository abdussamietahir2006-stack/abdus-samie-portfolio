import express from "express";
import { getProjects, createProject, updateProject, deleteProject } from "../controllers/projectController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", getProjects);
router.post("/", protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

export default router;
