import mongoose from "mongoose";

const siteContentSchema = new mongoose.Schema({
  page: { type: String, required: true },
  section: { type: String, required: true },
  key: { type: String, required: true },
  value: { type: String, required: true },
  type: { type: String, required: true, enum: ["text", "image"] },
}, { timestamps: true });

siteContentSchema.index({ page: 1, section: 1, key: 1 }, { unique: true });

export default mongoose.model("SiteContent", siteContentSchema);
