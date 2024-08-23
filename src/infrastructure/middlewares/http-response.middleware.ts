import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { HttpResponseProvider } from "../modules/providers/http-response.provider";

@Injectable()
export class HttpResponseMiddleware implements NestMiddleware {
  public constructor(private readonly httpResponseProvider: HttpResponseProvider) {}

  public use(_request: Request, response: Response, next: NextFunction): void {
    this.httpResponseProvider.set(response);

    next();
  }
}
