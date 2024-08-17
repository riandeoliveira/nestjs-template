"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasMinLength = void 0;
const response_messages_enum_1 = require("../../domain/enums/response-messages.enum");
const class_validator_1 = require("class-validator");
const HasMinLength = (min, messageKey) => {
    return (0, class_validator_1.MinLength)(min, { message: response_messages_enum_1.ResponseMessages[messageKey] });
};
exports.HasMinLength = HasMinLength;
//# sourceMappingURL=has-min-length.decorator.js.map