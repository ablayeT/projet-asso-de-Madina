import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const mongoURI: string =
  process.env.NODE_ENV === "test"
    ? (process.env.DB_URI_TEST as string)
    : (process.env.DB_URI as string);

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
