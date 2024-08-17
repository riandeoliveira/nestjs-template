"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasExactLength = void 0;
const response_messages_enum_1 = require("../../domain/enums/response-messages.enum");
const class_validator_1 = require("class-validator");
const HasExactLength = (length, messageKey) => {
    return (0, class_validator_1.Length)(length, length, { message: response_messages_enum_1.ResponseMessages[messageKey] });
};
exports.HasExactLength = HasExactLength;
//# sourceMappingURL=has-exact-length.decorator.js.map