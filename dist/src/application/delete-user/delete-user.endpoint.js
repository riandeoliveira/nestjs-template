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
exports.DeleteUserEndpoint = void 0;
const api_endpoint_decorator_1 = require("../../infrastructure/decorators/api-endpoint.decorator");
const api_error_responses_decorator_1 = require("../../infrastructure/decorators/api-error-responses.decorator");
const api_success_decorator_1 = require("../../infrastructure/decorators/api-success.decorator");
const authorize_decorator_1 = require("../../infrastructure/decorators/authorize.decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const delete_user_use_case_1 = require("./delete-user.use-case");
let DeleteUserEndpoint = class DeleteUserEndpoint {
    constructor(useCase) {
        this.useCase = useCase;
    }
    handle() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.useCase.execute();
        });
    }
};
exports.DeleteUserEndpoint = DeleteUserEndpoint;
__decorate([
    (0, swagger_1.ApiOperation)({
        description: "",
        operationId: "",
        tags: ["User"],
    }),
    (0, api_error_responses_decorator_1.ApiErrorResponses)(["INTERNAL_SERVER_ERROR", "NOT_FOUND", "TOO_MANY_REQUESTS", "UNAUTHORIZED"]),
    (0, api_success_decorator_1.ApiSuccessResponse)("NO_CONTENT"),
    (0, common_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DeleteUserEndpoint.prototype, "handle", null);
exports.DeleteUserEndpoint = DeleteUserEndpoint = __decorate([
    (0, api_endpoint_decorator_1.ApiEndpoint)("user"),
    (0, authorize_decorator_1.Authorize)(),
    __metadata("design:paramtypes", [delete_user_use_case_1.DeleteUserUseCase])
], DeleteUserEndpoint);
//# sourceMappingURL=delete-user.endpoint.js.map