import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { DocumentationExtension } from "../extensions/documentation.extension";
import { ProblemDetailsExtension } from "../extensions/problem-details.extension";
import { ValidationExtension } from "../extensions/validation.extension";

export class WebApplicationBuilder {
  public application: INestApplication;

  public configureDocumentation(): void {
    DocumentationExtension.configureWith(this.application);
  }

  public configureProblemDetails(): void {
    ProblemDetailsExtension.configureWith(this.application);
  }

  public configureValidation(): void {
    ValidationExtension.configureWith(this.application);
  }

  public async create(): Promise<void> {
    this.application = await NestFactory.create(AppModule);
  }

  public async run(): Promise<void> {
    this.application.listen(3000);
  }
}
