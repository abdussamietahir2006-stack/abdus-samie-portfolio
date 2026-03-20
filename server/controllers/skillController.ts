import { Request, Response } from "express";
import Skill from "../models/Skill";
import mongoose from "mongoose";

const FALLBACK_SKILLS = [
  { name: "React", level: 90, category: "Frontend", color: "#61DAFB", order: 1 },
  { name: "Three.js", level: 85, category: "Frontend", color: "#000000", order: 2 },
  { name: "Tailwind CSS", level: 95, category: "Frontend", color: "#06B6D4", order: 3 },
  { name: "Framer Motion", level: 80, category: "Frontend", color: "#FF0055", order: 4 },
  { name: "TypeScript", level: 85, category: "Frontend", color: "#3178C6", order: 5 },
  { name: "Node.js", level: 85, category: "Backend", color: "#339933", order: 6 },
  { name: "Express", level: 80, category: "Backend", color: "#000000", order: 7 },
  { name: "MongoDB", level: 75, category: "Backend", color: "#47A248", order: 8 },
  { name: "REST API", level: 90, category: "Backend", color: "#FF6C37", order: 9 },
  { name: "Firebase", level: 70, category: "Backend", color: "#FFCA28", order: 10 },
  { name: "Git", level: 85, category: "Other", color: "#F05032", order: 11 },
  { name: "Docker", level: 60, category: "Other", color: "#2496ED", order: 12 },
  { name: "Vite", level: 90, category: "Other", color: "#646CFF", order: 13 },
  { name: "ESLint", level: 80, category: "Other", color: "#4B32C3", order: 14 },
  { name: "Postman", level: 85, category: "Other", color: "#FF6C37", order: 15 },
];

export const getSkills = async (req: Request, res: Response) => {
  if (mongoose.connection.readyState !== 1) {
    console.warn("⚠️ Database not connected. Returning fallback skills.");
    return res.json(FALLBACK_SKILLS);
  }

  try {
    const skills = await Skill.find().sort({ order: 1 });
    if (!skills || skills.length === 0) {
      return res.json(FALLBACK_SKILLS);
    }
    res.json(skills);
  } catch (error) {
    console.error("❌ Error fetching skills:", error);
    res.json(FALLBACK_SKILLS);
  }
};

export const createSkill = async (req: Request, res: Response) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: "Database not connected. Updates are disabled in offline mode." });
  }
  const { name, level, category, color, order } = req.body;
  try {
    const skill = await Skill.create({ name, level, category, color, order });
    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ error: "Invalid skill data" });
  }
};

export const updateSkill = async (req: Request, res: Response) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: "Database not connected. Updates are disabled in offline mode." });
  }
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!skill) return res.status(404).json({ error: "Skill not found" });
    res.json(skill);
  } catch (error) {
    res.status(400).json({ error: "Invalid skill data" });
  }
};

export const deleteSkill = async (req: Request, res: Response) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: "Database not connected. Updates are disabled in offline mode." });
  }
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ error: "Skill not found" });
    res.json({ message: "Skill removed", id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
