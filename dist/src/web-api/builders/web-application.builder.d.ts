import { NestExpressApplication } from "@nestjs/platform-express";
import { IncomingMessage, Server, ServerResponse } from "http";
export declare class WebApplicationBuilder {
    application: NestExpressApplication<Server<typeof IncomingMessage, typeof ServerResponse>>;
    create(): Promise<void>;
    run(): Promise<void>;
    configureDocumentation(): void;
    configureProblemDetails(): void;
    configureValidation(): void;
}
