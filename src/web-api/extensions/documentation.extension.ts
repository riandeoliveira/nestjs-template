// TODO: update swagger docs

import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import * as express from "express";
import path from "node:path";

export abstract class DocumentationExtension {
  public static configureWith(application: INestApplication): void {
    const configuration: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
      .addBearerAuth(
        {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        "jwt",
      )
      .setDescription("Lorem Ipsum...")
      .setTitle("My Project API")
      .setVersion("v0.1.0")
      .build();

    const document: OpenAPIObject = SwaggerModule.createDocument(application, configuration);

    application.use("/swagger-ui", express.static(path.join(__dirname, "swagger-ui")));

    SwaggerModule.setup("swagger", application, document);

    // application.use("/swagger", swaggerUi.serve, swaggerUi.setup(document));
  }
}
