import { INestApplication } from "@nestjs/common";
export declare abstract class DocumentationExtension {
    static configureWith(application: INestApplication): void;
}
