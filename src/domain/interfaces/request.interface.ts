import { Request } from "express";
import { UserDto } from "../dtos/user.dto";

export interface IRequest extends Request {
  user: UserDto;
}
