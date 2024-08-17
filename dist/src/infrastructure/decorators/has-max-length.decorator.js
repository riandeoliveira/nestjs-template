"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasMaxLength = void 0;
const response_messages_enum_1 = require("../../domain/enums/response-messages.enum");
const class_validator_1 = require("class-validator");
const HasMaxLength = (max, messageKey) => {
    return (0, class_validator_1.MaxLength)(max, { message: response_messages_enum_1.ResponseMessages[messageKey] });
};
exports.HasMaxLength = HasMaxLength;
//# sourceMappingURL=has-max-length.decorator.js.map