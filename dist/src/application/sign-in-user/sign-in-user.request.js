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
exports.SignInUserRequest = void 0;
const fake_data_abstraction_1 = require("../../infrastructure/abstractions/fake-data.abstraction");
const api_property_decorator_1 = require("../../infrastructure/decorators/api-property.decorator");
const has_max_length_decorator_1 = require("../../infrastructure/decorators/has-max-length.decorator");
const has_min_length_decorator_1 = require("../../infrastructure/decorators/has-min-length.decorator");
const is_email_decorator_1 = require("../../infrastructure/decorators/is-email.decorator");
const is_required_decorator_1 = require("../../infrastructure/decorators/is-required.decorator");
const is_string_decorator_1 = require("../../infrastructure/decorators/is-string.decorator");
const is_strong_password_decorator_1 = require("../../infrastructure/decorators/is-strong-password.decorator");
const trim_decorator_1 = require("../../infrastructure/decorators/trim.decorator");
class SignInUserRequest {
}
exports.SignInUserRequest = SignInUserRequest;
__decorate([
    (0, api_property_decorator_1.ApiProperty)("email", fake_data_abstraction_1.FakeData.email()),
    (0, has_max_length_decorator_1.HasMaxLength)(64, "EMAIL_HAS_MAXIMUM_LENGTH"),
    (0, has_min_length_decorator_1.HasMinLength)(8, "EMAIL_HAS_MINIMUM_LENGTH"),
    (0, is_email_decorator_1.IsEmail)("EMAIL_IS_VALID"),
    (0, is_required_decorator_1.IsRequired)("EMAIL_IS_REQUIRED"),
    (0, is_string_decorator_1.IsString)("EMAIL_IS_STRING"),
    (0, trim_decorator_1.Trim)(),
    __metadata("design:type", String)
], SignInUserRequest.prototype, "email", void 0);
__decorate([
    (0, api_property_decorator_1.ApiProperty)("password", fake_data_abstraction_1.FakeData.strongPassword()),
    (0, has_max_length_decorator_1.HasMaxLength)(64, "PASSWORD_HAS_MAXIMUM_LENGTH"),
    (0, has_min_length_decorator_1.HasMinLength)(8, "PASSWORD_HAS_MINIMUM_LENGTH"),
    (0, is_required_decorator_1.IsRequired)("PASSWORD_IS_REQUIRED"),
    (0, is_string_decorator_1.IsString)("PASSWORD_IS_STRING"),
    (0, is_strong_password_decorator_1.IsStrongPassword)("PASSWORD_IS_STRONG"),
    (0, trim_decorator_1.Trim)(),
    __metadata("design:type", String)
], SignInUserRequest.prototype, "password", void 0);
//# sourceMappingURL=sign-in-user.request.js.map