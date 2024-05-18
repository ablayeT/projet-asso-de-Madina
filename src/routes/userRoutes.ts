// routes/userRoutes.ts
import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile);
router.patch("/profile", authMiddleware, updateUserProfile);
// routes/userRoutes.js
router.post("/forgot-password", forgotPassword);
// routes/userRoutes.js
router.patch("/reset-password/:token", resetPassword);

export default router;
