import { INestApplication, ValidationPipe } from "@nestjs/common";

export abstract class ValidationExtension {
  public static configureWith(application: INestApplication): void {
    application.useGlobalPipes(new ValidationPipe({
      transform: true
    }));
  }
}
