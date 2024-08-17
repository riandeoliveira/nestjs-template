"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiSuccessResponse = void 0;
const http_responses_1 = require("../../domain/constants/http-responses");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ApiSuccessResponse = (key, type) => {
    const { status, message } = http_responses_1.HttpResponses[key];
    const decorator = (0, swagger_1.ApiResponse)({
        status,
        description: message,
        type,
    });
    return (0, common_1.applyDecorators)(decorator, (0, common_1.HttpCode)(status));
};
exports.ApiSuccessResponse = ApiSuccessResponse;
//# sourceMappingURL=api-success.decorator.js.map