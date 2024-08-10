"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsRequired = void 0;
const response_messages_enum_1 = require("../../domain/enums/response-messages.enum");
const class_validator_1 = require("class-validator");
const IsRequired = (messageKey) => {
    return (0, class_validator_1.IsNotEmpty)({ message: response_messages_enum_1.ResponseMessages[messageKey] });
};
exports.IsRequired = IsRequired;
//# sourceMappingURL=is-required.decorator.js.map