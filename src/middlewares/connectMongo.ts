// middlewares/connectMongo.ts
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const mongoURI: string = process.env.MONGO_URI as string; // Assurez-vous que la chaîne est sécurisée

const connectMongo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(mongoURI);
      console.log("MongoDB connected successfully");
      next();
    } catch (err) {
      console.error("MongoDB connection error", err);
      res.status(500).send("Failed to connect to MongoDB");
    }
  } else {
    next();
  }
};

export default connectMongo;
