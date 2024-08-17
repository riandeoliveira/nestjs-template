"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetUserPasswordFixture = void 0;
const response_messages_enum_1 = require("../../domain/enums/response-messages.enum");
const fake_data_abstraction_1 = require("../../infrastructure/abstractions/fake-data.abstraction");
exports.resetUserPasswordFixture = [
    {
        field: "password",
        title: "Should be a string",
        value: 2000,
        message: response_messages_enum_1.ResponseMessages.PASSWORD_IS_STRING,
    },
    {
        field: "password",
        title: "Should be strong",
        value: "LittleJohn123",
        message: response_messages_enum_1.ResponseMessages.PASSWORD_IS_STRONG,
    },
    {
        field: "password",
        title: "Should be required",
        value: "",
        message: response_messages_enum_1.ResponseMessages.PASSWORD_IS_REQUIRED,
    },
    {
        field: "password",
        title: "Should have a maximum of 64 characters",
        value: fake_data_abstraction_1.FakeData.alphanumeric(65),
        message: response_messages_enum_1.ResponseMessages.PASSWORD_HAS_MAXIMUM_LENGTH,
    },
    {
        field: "password",
        title: "Should have a minimum of 8 characters",
        value: fake_data_abstraction_1.FakeData.alphanumeric(7),
        message: response_messages_enum_1.ResponseMessages.PASSWORD_HAS_MINIMUM_LENGTH,
    },
    {
        field: "password_confirmation",
        title: "Should be a string",
        value: 2000,
        message: response_messages_enum_1.ResponseMessages.PASSWORD_CONFIRMATION_IS_STRING,
    },
    {
        field: "password_confirmation",
        title: "Should be strong",
        value: "LittleJohn123",
        message: response_messages_enum_1.ResponseMessages.PASSWORD_IS_STRONG,
    },
    {
        field: "password_confirmation",
        title: "Should be required",
        value: "",
        message: response_messages_enum_1.ResponseMessages.PASSWORD_CONFIRMATION_IS_REQUIRED,
    },
    {
        field: "password_confirmation",
        title: "Should have a maximum of 64 characters",
        value: fake_data_abstraction_1.FakeData.alphanumeric(65),
        message: response_messages_enum_1.ResponseMessages.PASSWORD_CONFIRMATION_HAS_MAXIMUM_LENGTH,
    },
    {
        field: "password_confirmation",
        title: "Should have a minimum of 8 characters",
        value: fake_data_abstraction_1.FakeData.alphanumeric(7),
        message: response_messages_enum_1.ResponseMessages.PASSWORD_CONFIRMATION_HAS_MINIMUM_LENGTH,
    },
];
//# sourceMappingURL=reset-user-password.fixture.js.map