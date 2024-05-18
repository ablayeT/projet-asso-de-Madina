import express from "express";
import {
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/adminController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/isAdmin";

const router = express.Router();

// Routes pour les administrateurs
router.get("/users", authMiddleware, isAdmin, getAllUsers);
router.put("/users/:id", authMiddleware, isAdmin, updateUser);
router.delete("/users/:id", authMiddleware, isAdmin, deleteUser);

export default router;
