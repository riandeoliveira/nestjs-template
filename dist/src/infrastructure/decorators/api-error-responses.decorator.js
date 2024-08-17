"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiErrorResponses = void 0;
const http_responses_1 = require("../../domain/constants/http-responses");
const bad_request_dto_1 = require("../../domain/dtos/bad-request.dto");
const conflict_dto_1 = require("../../domain/dtos/conflict.dto");
const internal_server_error_dto_1 = require("../../domain/dtos/internal-server-error.dto");
const not_found_dto_1 = require("../../domain/dtos/not-found.dto");
const too_many_requests_dto_1 = require("../../domain/dtos/too-many-requests.dto");
const unauthorized_dto_1 = require("../../domain/dtos/unauthorized.dto");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ApiErrorResponses = (keys) => {
    const decorators = keys.map((key) => {
        const type = {
            BAD_REQUEST: bad_request_dto_1.BadRequestDto,
            CONFLICT: conflict_dto_1.ConflictDto,
            INTERNAL_SERVER_ERROR: internal_server_error_dto_1.InternalServerErrorDto,
            NOT_FOUND: not_found_dto_1.NotFoundDto,
            TOO_MANY_REQUESTS: too_many_requests_dto_1.TooManyRequestsDto,
            UNAUTHORIZED: unauthorized_dto_1.UnauthorizedDto,
        };
        const { status, message } = http_responses_1.HttpResponses[key];
        return (0, swagger_1.ApiResponse)({
            status,
            description: message,
            type: type[key],
        });
    });
    return (0, common_1.applyDecorators)(...decorators);
};
exports.ApiErrorResponses = ApiErrorResponses;
//# sourceMappingURL=api-error-responses.decorator.js.map