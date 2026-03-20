import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: "" },
  githubLink: { type: String, default: "" },
  liveLink: { type: String, default: "" },
  tags: { type: [String], default: [] },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
