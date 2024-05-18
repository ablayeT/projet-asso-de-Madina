import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/Users";
import { ExtendedRequest } from "../types/extendedRequest";

export const authMiddleware = async (
  req: ExtendedRequest, // Assurez-vous que c'est bien le type étendu
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send("No token provided, authorization denied");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any; // Utilisez 'any' ou un type approprié
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user; // Devrait maintenant être correct avec le type Document
    next();
  } catch (error) {
    res.status(401).send("Authentication failed");
  }
};
