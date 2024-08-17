"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpUserEndpoint = void 0;
const api_endpoint_decorator_1 = require("../../infrastructure/decorators/api-endpoint.decorator");
const api_error_responses_decorator_1 = require("../../infrastructure/decorators/api-error-responses.decorator");
const api_success_decorator_1 = require("../../infrastructure/decorators/api-success.decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sign_up_user_request_1 = require("./sign-up-user.request");
const sign_up_user_response_1 = require("./sign-up-user.response");
const sign_up_user_use_case_1 = require("./sign-up-user.use-case");
let SignUpUserEndpoint = class SignUpUserEndpoint {
    constructor(useCase) {
        this.useCase = useCase;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.useCase.execute(request);
        });
    }
};
exports.SignUpUserEndpoint = SignUpUserEndpoint;
__decorate([
    (0, swagger_1.ApiOperation)({
        operationId: "sign-up-user",
        description: "Authenticates a new user and returns a token and user ID.",
        tags: ["User"],
    }),
    (0, api_error_responses_decorator_1.ApiErrorResponses)(["BAD_REQUEST", "CONFLICT", "INTERNAL_SERVER_ERROR", "TOO_MANY_REQUESTS"]),
    (0, api_success_decorator_1.ApiSuccessResponse)("CREATED", sign_up_user_response_1.SignUpUserResponse),
    (0, common_1.Post)("sign-up"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_user_request_1.SignUpUserRequest]),
    __metadata("design:returntype", Promise)
], SignUpUserEndpoint.prototype, "handle", null);
exports.SignUpUserEndpoint = SignUpUserEndpoint = __decorate([
    (0, api_endpoint_decorator_1.ApiEndpoint)("user"),
    __metadata("design:paramtypes", [sign_up_user_use_case_1.SignUpUserUseCase])
], SignUpUserEndpoint);
//# sourceMappingURL=sign-up-user.endpoint.js.map