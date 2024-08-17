import { INestApplication } from "@nestjs/common";
export declare abstract class ValidationExtension {
    static configureWith(application: INestApplication): void;
}
