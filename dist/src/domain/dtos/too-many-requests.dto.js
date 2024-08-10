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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TooManyRequestsDto = void 0;
const fake_data_abstraction_1 = require("../../infrastructure/abstractions/fake-data.abstraction");
const api_property_decorator_1 = require("../../infrastructure/decorators/api-property.decorator");
const constants_1 = require("../constants");
const http_responses_1 = require("../constants/http-responses");
const { status, message } = http_responses_1.HttpResponses.TOO_MANY_REQUESTS;
class TooManyRequestsDto {
}
exports.TooManyRequestsDto = TooManyRequestsDto;
__decorate([
    (0, api_property_decorator_1.ApiProperty)("type", `${constants_1.PROBLEM_DETAILS_URI}/${status}`),
    __metadata("design:type", String)
], TooManyRequestsDto.prototype, "type", void 0);
__decorate([
    (0, api_property_decorator_1.ApiProperty)("title", fake_data_abstraction_1.FakeData.sentence()),
    __metadata("design:type", String)
], TooManyRequestsDto.prototype, "title", void 0);
__decorate([
    (0, api_property_decorator_1.ApiProperty)("status", status),
    __metadata("design:type", Number)
], TooManyRequestsDto.prototype, "status", void 0);
__decorate([
    (0, api_property_decorator_1.ApiProperty)("detail", message),
    __metadata("design:type", String)
], TooManyRequestsDto.prototype, "detail", void 0);
//# sourceMappingURL=too-many-requests.dto.js.map