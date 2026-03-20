import express from "express";
import { loginAdmin } from "../controllers/adminAuthController";

const router = express.Router();

router.post("/login", loginAdmin);

export default router;
