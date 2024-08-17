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
exports.RenewUserRefreshTokenRequest = void 0;
const fake_data_abstraction_1 = require("../../infrastructure/abstractions/fake-data.abstraction");
const api_property_decorator_1 = require("../../infrastructure/decorators/api-property.decorator");
const has_exact_length_decorator_1 = require("../../infrastructure/decorators/has-exact-length.decorator");
const is_required_decorator_1 = require("../../infrastructure/decorators/is-required.decorator");
const is_string_decorator_1 = require("../../infrastructure/decorators/is-string.decorator");
const trim_decorator_1 = require("../../infrastructure/decorators/trim.decorator");
class RenewUserRefreshTokenRequest {
}
exports.RenewUserRefreshTokenRequest = RenewUserRefreshTokenRequest;
__decorate([
    (0, api_property_decorator_1.ApiProperty)("refresh_token", fake_data_abstraction_1.FakeData.accessToken()),
    (0, has_exact_length_decorator_1.HasExactLength)(252, "REFRESH_TOKEN_LENGTH"),
    (0, is_required_decorator_1.IsRequired)("REFRESH_TOKEN_IS_REQUIRED"),
    (0, is_string_decorator_1.IsString)("REFRESH_TOKEN_IS_STRING"),
    (0, trim_decorator_1.Trim)(),
    __metadata("design:type", String)
], RenewUserRefreshTokenRequest.prototype, "refreshToken", void 0);
//# sourceMappingURL=renew-user-refresh-token.request.js.map