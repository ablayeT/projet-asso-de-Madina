import { Request, Response, NextFunction } from "express";
import { ExtendedRequest } from "../types/extendedRequest";

export const isAdmin = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res
      .status(403)
      .send({ message: "Accès interdit: administrateurs seulement" });
  }
};
