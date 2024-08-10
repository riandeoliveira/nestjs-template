"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renewUserRefreshTokenFixture = void 0;
const response_messages_enum_1 = require("../../domain/enums/response-messages.enum");
const fake_data_abstraction_1 = require("../../infrastructure/abstractions/fake-data.abstraction");
exports.renewUserRefreshTokenFixture = [
    {
        field: "refresh_token",
        title: "Should be a string",
        value: 2000,
        message: response_messages_enum_1.ResponseMessages.REFRESH_TOKEN_IS_STRING,
    },
    {
        field: "refresh_token",
        title: "Should be required",
        value: "",
        message: response_messages_enum_1.ResponseMessages.REFRESH_TOKEN_IS_REQUIRED,
    },
    {
        field: "refresh_token",
        title: "Should have exactly 252 characters",
        value: fake_data_abstraction_1.FakeData.alphanumeric(251),
        message: response_messages_enum_1.ResponseMessages.REFRESH_TOKEN_LENGTH,
    },
];
//# sourceMappingURL=renew-user-refresh-token.fixture.js.map