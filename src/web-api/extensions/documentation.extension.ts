// TODO: update swagger docs

import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";

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

    SwaggerModule.setup("swagger", application, document, {
      swaggerUiEnabled: process.env.NODE_ENV === "development", // NOTE: needs to be tested
    });
  }
}
