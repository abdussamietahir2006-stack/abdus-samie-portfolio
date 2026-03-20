import { Request, Response } from "express";
import mongoose from "mongoose";
import Project from "../models/Project";

const FALLBACK_PROJECTS = [
  {
    _id: "fallback-1",
    title: "3D Portfolio",
    description: "An immersive 3D portfolio built with React and Three.js.",
    image: "https://picsum.photos/seed/portfolio/800/600",
    liveLink: "https://example.com",
    githubLink: "https://github.com",
    tags: ["React", "Three.js", "Tailwind CSS"],
    createdAt: new Date()
  },
  {
    _id: "fallback-2",
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with real-time updates.",
    image: "https://picsum.photos/seed/shop/800/600",
    liveLink: "https://example.com",
    githubLink: "https://github.com",
    tags: ["Node.js", "Express", "MongoDB"],
    createdAt: new Date()
  }
];

export const getProjects = async (req: Request, res: Response) => {
  if (mongoose.connection.readyState !== 1) {
    console.warn("⚠️ Database not connected. Returning fallback projects.");
    return res.json(FALLBACK_PROJECTS);
  }
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    if (!projects || projects.length === 0) {
      return res.json(FALLBACK_PROJECTS);
    }
    res.json(projects);
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    res.json(FALLBACK_PROJECTS);
  }
};

export const createProject = async (req: Request, res: Response) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: "Database not connected. Cannot create project." });
  }
  try {
    const { title, description, image, liveLink, githubLink, tags } = req.body;
    const project = await Project.create({ title, description, image, liveLink, githubLink, tags });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: "Invalid project data" });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: "Database not connected. Cannot update project." });
  }
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: "Invalid project data" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: "Database not connected. Cannot delete project." });
  }
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
