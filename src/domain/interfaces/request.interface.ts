import { Request } from "express";

export interface IRequest extends Request {
  currentUserId: string;
}
