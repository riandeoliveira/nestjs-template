import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { IRequest } from "../../domain/interfaces/request.interface";

@Injectable()
export class AddResponseMiddleware implements NestMiddleware {
  public use(request: IRequest, response: Response, next: NextFunction): void {
    request.response = response;

    next();
  }
}
