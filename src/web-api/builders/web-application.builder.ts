import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { IncomingMessage, Server, ServerResponse } from "http";
import { DocumentationExtension } from "../extensions/documentation.extension";
import { ProblemDetailsExtension } from "../extensions/problem-details.extension";
import { ValidationExtension } from "../extensions/validation.extension";
import { WebApiModule } from "../web-api.module";

export class WebApplicationBuilder {
  public application: NestExpressApplication<Server<typeof IncomingMessage, typeof ServerResponse>>;

  public async create(): Promise<void> {
    this.application = await NestFactory.create<NestExpressApplication>(WebApiModule);
  }

  public async run(): Promise<void> {
    this.application.listen(process.env.API_PORT);
  }

  public configureDocumentation(): void {
    DocumentationExtension.configureWith(this.application);
  }

  public configureProblemDetails(): void {
    ProblemDetailsExtension.configureWith(this.application);
  }

  public configureValidation(): void {
    ValidationExtension.configureWith(this.application);
  }
}
