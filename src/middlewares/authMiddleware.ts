import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/Users";
import { ExtendedRequest } from "../types/extendedRequest";

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      console.log("No token provided");
      return res.status(401).send("No token provided, authorization denied");
    }

    const decoded = jwt.verify(token, JWT_SECRET as string) as any;
    console.log("JWT Secret in authMiddleware:", JWT_SECRET);
    console.log("Token decoded:", decoded); // Ajoutez ce log
    const user = await User.findById(decoded.id);
    console.log("User found:", user); // Ajoutez ce log

    if (!user) {
      console.log("User not found");
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication failed:", error);
    res.status(401).send("Authentication failed");
  }
};
