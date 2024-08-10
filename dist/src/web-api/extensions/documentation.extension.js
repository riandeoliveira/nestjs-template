"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentationExtension = void 0;
const swagger_1 = require("@nestjs/swagger");
const swaggerUi = __importStar(require("swagger-ui-express"));
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
        application.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(document));
    }
}
exports.DocumentationExtension = DocumentationExtension;
//# sourceMappingURL=documentation.extension.js.map