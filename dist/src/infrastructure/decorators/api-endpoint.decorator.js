"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiEndpoint = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ApiEndpoint = (prefix) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiProduces)("application/json", "application/problem+json"), (0, common_1.Controller)(prefix));
};
exports.ApiEndpoint = ApiEndpoint;
//# sourceMappingURL=api-endpoint.decorator.js.map