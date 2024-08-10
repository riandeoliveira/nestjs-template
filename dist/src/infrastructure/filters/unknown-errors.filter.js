"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownErrorsFilter = void 0;
const constants_1 = require("../../domain/constants");
const http_responses_1 = require("../../domain/constants/http-responses");
const response_messages_enum_1 = require("../../domain/enums/response-messages.enum");
const common_1 = require("@nestjs/common");
let UnknownErrorsFilter = class UnknownErrorsFilter {
    catch(exception, host) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const { status, message } = http_responses_1.HttpResponses.INTERNAL_SERVER_ERROR;
        response.status(status).json({
            type: `${constants_1.PROBLEM_DETAILS_URI}/${status}`,
            title: exception instanceof Error ? exception.message : response_messages_enum_1.ResponseMessages.UNKNOWN_ERROR,
            status,
            detail: message,
        });
    }
};
exports.UnknownErrorsFilter = UnknownErrorsFilter;
exports.UnknownErrorsFilter = UnknownErrorsFilter = __decorate([
    (0, common_1.Catch)()
], UnknownErrorsFilter);
//# sourceMappingURL=unknown-errors.filter.js.map