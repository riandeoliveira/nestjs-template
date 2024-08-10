"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentationExtension = void 0;
const swagger_1 = require("@nestjs/swagger");
class DocumentationExtension {
    static configureWith(application) {
        const configuration = new swagger_1.DocumentBuilder()
            .addBearerAuth({
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
        }, "jwt")
            .setDescription("Lorem Ipsum...")
            .setTitle("My Project API")
            .setVersion("v0.1.0")
            .build();
        const document = swagger_1.SwaggerModule.createDocument(application, configuration);
        swagger_1.SwaggerModule.setup("swagger", application, document, {
            customCssUrl: "https://unpkg.com/swagger-ui-dist@3/swagger-ui.css",
            customJs: "https://unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js",
        });
    }
}
exports.DocumentationExtension = DocumentationExtension;
//# sourceMappingURL=documentation.extension.js.map