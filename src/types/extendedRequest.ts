// utils/extendedRequest.ts
import { Request } from "express";
import { IUser } from "../models/Users";

export interface ExtendedRequest extends Request {
  user?: IUser;
}
