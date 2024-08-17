"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsString = void 0;
const response_messages_enum_1 = require("../../domain/enums/response-messages.enum");
const class_validator_1 = require("class-validator");
const IsString = (messageKey) => {
    return (0, class_validator_1.IsString)({ message: response_messages_enum_1.ResponseMessages[messageKey] });
};
exports.IsString = IsString;
//# sourceMappingURL=is-string.decorator.js.map