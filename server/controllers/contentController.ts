import { Request, Response } from "express";
import SiteContent from "../models/SiteContent.ts";
import mongoose from "mongoose";

// Fallback data in case database is not connected or empty
const FALLBACK_CONTENT: Record<string, any[]> = {
  home: [
    { page: "home", section: "hero", key: "heading", value: "I'm Abdus Samie Tahir", type: "text" },
    { page: "home", section: "hero", key: "subheading", value: "(RMAST)", type: "text" },
    { page: "home", section: "hero", key: "bio", value: "I build high-performance, interactive web applications that combine cutting-edge 3D technology with seamless user experiences.", type: "text" },
    { page: "home", section: "hero", key: "cta_primary", value: "View My Work", type: "text" },
    { page: "home", section: "hero", key: "cta_secondary", value: "Hire Me", type: "text" },
    { page: "home", section: "stats", key: "stat1_value", value: "5+", type: "text" },
    { page: "home", section: "stats", key: "stat1_label", value: "Years Experience", type: "text" },
    { page: "home", section: "stats", key: "stat2_value", value: "50+", type: "text" },
    { page: "home", section: "stats", key: "stat2_label", value: "Projects Completed", type: "text" },
    { page: "home", section: "stats", key: "stat3_value", value: "20+", type: "text" },
    { page: "home", section: "stats", key: "stat3_label", value: "Happy Clients", type: "text" },
  ],
  about: [
    { page: "about", section: "bio", key: "name", value: "Abdus Samie Tahir", type: "text" },
    { page: "about", section: "bio", key: "role", value: "Full-Stack Developer & 3D Enthusiast", type: "text" },
    { page: "about", section: "bio", key: "paragraph1", value: "I am a passionate developer with a deep interest in creating immersive digital experiences.", type: "text" },
    { page: "about", section: "bio", key: "paragraph2", value: "With expertise in React, Three.js, and Node.js, I bridge the gap between design and technology.", type: "text" },
    { page: "about", section: "bio", key: "paragraph3", value: "My goal is to build applications that are not only functional but also visually stunning.", type: "text" },
    { page: "about", section: "bio", key: "avatar", value: "https://picsum.photos/seed/abdul/400/400", type: "image" },
  ],
  contact: [
    { page: "contact", section: "info", key: "heading", value: "Let's Start a Conversation", type: "text" },
    { page: "contact", section: "info", key: "subheading", value: "I'm always open to new opportunities and collaborations.", type: "text" },
    { page: "contact", section: "info", key: "email", value: "abdu.ssamietahir2006@gmail.com", type: "text" },
    { page: "contact", section: "info", key: "linkedin", value: "https://linkedin.com", type: "text" },
    { page: "contact", section: "info", key: "github", value: "https://github.com", type: "text" },
    { page: "contact", section: "info", key: "twitter", value: "https://twitter.com", type: "text" },
    { page: "contact", section: "availability", key: "status", value: "Available for Hire", type: "text" },
    { page: "contact", section: "availability", key: "message", value: "I'm currently looking for new projects and opportunities.", type: "text" },
  ],
  global: [
    { page: "global", section: "navbar", key: "name", value: "Abdus Samie Tahir", type: "text" },
    { page: "global", section: "navbar", key: "subheading", value: "(RMAST)", type: "text" },
    { page: "global", section: "navbar", key: "logo", value: "https://picsum.photos/seed/abdul/100/100", type: "image" },
    { page: "global", section: "footer", key: "bio", value: "Building digital experiences that combine technical precision with creative design. Let's build something extraordinary together.", type: "text" },
    { page: "global", section: "footer", key: "email", value: "hello@portfolio.com", type: "text" },
    { page: "global", section: "footer", key: "location", value: "San Francisco, CA", type: "text" },
    { page: "global", section: "footer", key: "availability", value: "Open for new projects", type: "text" },
  ]
};

export const getPageContent = async (req: Request, res: Response) => {
  const { page } = req.params;
  
  // Check if database is connected
  if (mongoose.connection.readyState !== 1) {
    console.warn(`⚠️ Database not connected. Returning fallback data for page: ${page}`);
    return res.json(FALLBACK_CONTENT[page] || []);
  }

  try {
    const content = await SiteContent.find({ page });
    
    // If no content found in DB, return fallback
    if (!content || content.length === 0) {
      console.log(`ℹ️ No content found in database for page: ${page}. Returning fallback data.`);
      return res.json(FALLBACK_CONTENT[page] || []);
    }

    res.json(content);
  } catch (error) {
    console.error(`❌ Error fetching content for page ${page}:`, error);
    // Return fallback data on error instead of 500
    res.json(FALLBACK_CONTENT[page] || []);
  }
};

export const updateContent = async (req: Request, res: Response) => {
  const { page, section, key, value, type } = req.body;

  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: "Database not connected. Updates are disabled in offline mode." });
  }

  try {
    const content = await SiteContent.findOneAndUpdate(
      { page, section, key },
      { value, type },
      { upsert: true, new: true }
    );
    res.json(content);
  } catch (error) {
    console.error("❌ Error updating content:", error);
    res.status(500).json({ error: "Server error" });
  }
};
