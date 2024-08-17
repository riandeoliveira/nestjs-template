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
      .setDescription("My NestJS Template.")
      .setTitle("NestJS Template API")
      .setVersion("v1.0.0")
      .build();

    const document: OpenAPIObject = SwaggerModule.createDocument(application, configuration);

    SwaggerModule.setup("swagger", application, document);
  }
}
