import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import path from "path";
import AdminUser from "../models/AdminUser";
import { connectDB } from "../config/db";

dotenv.config();

const ADMIN_EMAIL = "abdu.ssamietahir2006@gmail.com";
const ADMIN_PASSWORD = "qwerty999";

const createAdmin = async () => {
  try {
    await connectDB();

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    const existingAdmin = await AdminUser.findOne({ email: ADMIN_EMAIL });
    
    if (existingAdmin) {
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      console.log("Admin password updated");
    } else {
      await AdminUser.create({
        email: ADMIN_EMAIL,
        password: hashedPassword,
      });
      console.log("Admin created");
    }
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
