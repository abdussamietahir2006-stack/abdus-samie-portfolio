import express from "express";
import { postContact, getContacts, deleteContact } from "../controllers/contactController.ts";
import { protect } from "../middleware/authMiddleware.ts";

const router = express.Router();

router.post("/", postContact);
router.get("/", protect, getContacts);
router.delete("/:id", protect, deleteContact);

export default router;
