import { ResponseMessages } from "../../domain/enums/response-messages.enum";
import { FakeData } from "../../infrastructure/abstractions/fake-data.abstraction";

export const resetUserPasswordFixture = [
  {
    field: "password",
    title: "Should be a string",
    value: 2000,
    message: ResponseMessages.PASSWORD_IS_STRING,
  },
  {
    field: "password",
    title: "Should be strong",
    value: "LittleJohn123",
    message: ResponseMessages.PASSWORD_IS_STRONG,
  },
  {
    field: "password",
    title: "Should be required",
    value: "",
    message: ResponseMessages.PASSWORD_IS_REQUIRED,
  },
  {
    field: "password",
    title: "Should have a maximum of 64 characters",
    value: FakeData.alphanumeric(65),
    message: ResponseMessages.PASSWORD_HAS_MAXIMUM_LENGTH,
  },
  {
    field: "password",
    title: "Should have a minimum of 8 characters",
    value: FakeData.alphanumeric(7),
    message: ResponseMessages.PASSWORD_HAS_MINIMUM_LENGTH,
  },

  {
    field: "password_confirmation",
    title: "Should be a string",
    value: 2000,
    message: ResponseMessages.PASSWORD_CONFIRMATION_IS_STRING,
  },
  {
    field: "password_confirmation",
    title: "Should be strong",
    value: "LittleJohn123",
    message: ResponseMessages.PASSWORD_IS_STRONG,
  },
  {
    field: "password_confirmation",
    title: "Should be required",
    value: "",
    message: ResponseMessages.PASSWORD_CONFIRMATION_IS_REQUIRED,
  },
  {
    field: "password_confirmation",
    title: "Should have a maximum of 64 characters",
    value: FakeData.alphanumeric(65),
    message: ResponseMessages.PASSWORD_CONFIRMATION_HAS_MAXIMUM_LENGTH,
  },
  {
    field: "password_confirmation",
    title: "Should have a minimum of 8 characters",
    value: FakeData.alphanumeric(7),
    message: ResponseMessages.PASSWORD_CONFIRMATION_HAS_MINIMUM_LENGTH,
  },
];
