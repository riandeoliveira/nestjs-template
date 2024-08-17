"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserFixture = void 0;
const response_messages_enum_1 = require("../../domain/enums/response-messages.enum");
const fake_data_abstraction_1 = require("../../infrastructure/abstractions/fake-data.abstraction");
exports.updateUserFixture = [
    {
        field: "",
        title: "Should have at least one field",
        value: "",
        message: response_messages_enum_1.ResponseMessages.REQUEST_IS_EMPTY,
    },
    {
        field: "email",
        title: "Should be a string",
        value: 2000,
        message: response_messages_enum_1.ResponseMessages.EMAIL_IS_STRING,
    },
    {
        field: "email",
        title: "Should be required",
        value: "",
        message: response_messages_enum_1.ResponseMessages.EMAIL_IS_REQUIRED,
    },
    {
        field: "email",
        title: "Should be valid",
        value: "johndoe@email",
        message: response_messages_enum_1.ResponseMessages.EMAIL_IS_VALID,
    },
    {
        field: "email",
        title: "Should have a maximum of 64 characters",
        value: fake_data_abstraction_1.FakeData.alphanumeric(65),
        message: response_messages_enum_1.ResponseMessages.EMAIL_HAS_MAXIMUM_LENGTH,
    },
    {
        field: "email",
        title: "Should have a minimum of 8 characters",
        value: fake_data_abstraction_1.FakeData.alphanumeric(7),
        message: response_messages_enum_1.ResponseMessages.EMAIL_HAS_MINIMUM_LENGTH,
    },
    {
        field: "password",
        title: "Should be a string",
        value: 2000,
        message: response_messages_enum_1.ResponseMessages.PASSWORD_IS_STRING,
    },
    {
        field: "password",
        title: "Should be required",
        value: "",
        message: response_messages_enum_1.ResponseMessages.PASSWORD_IS_REQUIRED,
    },
    {
        field: "password",
        title: "Should be strong",
        value: "LittleJohn123",
        message: response_messages_enum_1.ResponseMessages.PASSWORD_IS_STRONG,
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
];
//# sourceMappingURL=update-user.fixture.js.map