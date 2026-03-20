import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  level: { type: Number, required: true, min: 0, max: 100 },
  category: { type: String, required: true, enum: ["Frontend", "Backend", "Database & DevOps", "Other"] },
  color: { type: String, default: "#7df9e8" },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Skill", skillSchema);
