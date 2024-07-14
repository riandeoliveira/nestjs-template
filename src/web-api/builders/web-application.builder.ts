import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentationExtension } from "../extensions/documentation.extension";
import { ProblemDetailsExtension } from "../extensions/problem-details.extension";
import { ValidationExtension } from "../extensions/validation.extension";
import { WebApiModule } from "../web-api.module";

export class WebApplicationBuilder {
  public application: INestApplication;

  public async create(): Promise<void> {
    this.application = await NestFactory.create(WebApiModule);
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
