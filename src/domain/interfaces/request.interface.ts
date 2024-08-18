import { Request, Response } from "express";

export interface IRequest extends Request {
  currentUserId: string;
  response: Response;
}
