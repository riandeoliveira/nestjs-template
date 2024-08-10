"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsEmail = void 0;
const response_messages_enum_1 = require("../../domain/enums/response-messages.enum");
const class_validator_1 = require("class-validator");
const IsEmail = (messageKey) => {
    return (0, class_validator_1.IsEmail)({}, { message: response_messages_enum_1.ResponseMessages[messageKey] });
};
exports.IsEmail = IsEmail;
//# sourceMappingURL=is-email.decorator.js.map