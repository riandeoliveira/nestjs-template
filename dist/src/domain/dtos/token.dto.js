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
exports.TokenDto = void 0;
const fake_data_abstraction_1 = require("../../infrastructure/abstractions/fake-data.abstraction");
const api_property_decorator_1 = require("../../infrastructure/decorators/api-property.decorator");
const expirable_token_dto_1 = require("./expirable-token.dto");
class TokenDto {
}
exports.TokenDto = TokenDto;
__decorate([
    (0, api_property_decorator_1.ApiProperty)("user_id", fake_data_abstraction_1.FakeData.uuid()),
    __metadata("design:type", String)
], TokenDto.prototype, "userId", void 0);
__decorate([
    (0, api_property_decorator_1.ApiProperty)("access_token"),
    __metadata("design:type", expirable_token_dto_1.ExpirableTokenDto)
], TokenDto.prototype, "accessToken", void 0);
__decorate([
    (0, api_property_decorator_1.ApiProperty)("refresh_token"),
    __metadata("design:type", expirable_token_dto_1.ExpirableTokenDto)
], TokenDto.prototype, "refreshToken", void 0);
//# sourceMappingURL=token.dto.js.map