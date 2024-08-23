import { Injectable } from "@nestjs/common";
import { Response } from "express";

@Injectable()
export class HttpResponseProvider {
  private response: Response | null;

  public get(): Response | null {
    return this.response;
  }

  public set(response: Response): void {
    this.response = response;
  }

  public clear(): void {
    this.response = null;
  }
}
