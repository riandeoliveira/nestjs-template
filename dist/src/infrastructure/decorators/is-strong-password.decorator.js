"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsStrongPassword = void 0;
const response_messages_enum_1 = require("../../domain/enums/response-messages.enum");
const class_validator_1 = require("class-validator");
const IsStrongPassword = (messageKey) => {
    return (0, class_validator_1.IsStrongPassword)({}, { message: response_messages_enum_1.ResponseMessages[messageKey] });
};
exports.IsStrongPassword = IsStrongPassword;
//# sourceMappingURL=is-strong-password.decorator.js.map