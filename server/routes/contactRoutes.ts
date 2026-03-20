import express from "express";
import { postContact, getContacts, deleteContact } from "../controllers/contactController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", postContact);
router.get("/", protect, getContacts);
router.delete("/:id", protect, deleteContact);

export default router;
