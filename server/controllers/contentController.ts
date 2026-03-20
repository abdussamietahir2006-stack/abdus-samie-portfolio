import { Request, Response } from "express";
import SiteContent from "../models/SiteContent";
import mongoose from "mongoose";

// Correcting FALLBACK_CONTENT index type
const FALLBACK_CONTENT: Record<string, any[]> = {
  page1: [],
  page2: []
};

export const getPageContent = async (req: Request, res: Response) => {
  const page: string = req.params.page as string; // Casting 'page' to string

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
