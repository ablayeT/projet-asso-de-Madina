import express from "express";
import {
  createMeeting,
  getMeetings,
  joinMeeting,
} from "../controllers/meetingController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/meetings", authMiddleware, createMeeting);
router.get("/meetings", authMiddleware, getMeetings);
router.post("/meetings/:id/join", authMiddleware, joinMeeting);

export default router;
