import { ResponseMessages } from "@/domain/enums/response-messages.enum";
import { faker } from "@faker-js/faker";

export const updateUserFixture = [
  {
    field: "",
    title: "Should have at least one field",
    value: "",
    message: ResponseMessages.REQUEST_IS_EMPTY,
  },
  {
    field: "email",
    title: "Should be a string",
    value: 2000,
    message: ResponseMessages.EMAIL_IS_STRING,
  },
  {
    field: "email",
    title: "Should be required",
    value: "",
    message: ResponseMessages.EMAIL_IS_REQUIRED,
  },
  {
    field: "email",
    title: "Should be valid",
    value: "johndoe@email",
    message: ResponseMessages.EMAIL_IS_VALID,
  },
  {
    field: "email",
    title: "Should have a maximum of 64 characters",
    value: faker.string.alphanumeric(65),
    message: ResponseMessages.EMAIL_HAS_MAXIMUM_LENGTH,
  },
  {
    field: "email",
    title: "Should have a minimum of 8 characters",
    value: faker.string.alphanumeric(7),
    message: ResponseMessages.EMAIL_HAS_MINIMUM_LENGTH,
  },
  {
    field: "password",
    title: "Should be a string",
    value: 2000,
    message: ResponseMessages.PASSWORD_IS_STRING,
  },
  {
    field: "password",
    title: "Should be required",
    value: "",
    message: ResponseMessages.PASSWORD_IS_REQUIRED,
  },
  {
    field: "password",
    title: "Should be strong",
    value: "LittleJohn123",
    message: ResponseMessages.PASSWORD_IS_STRONG,
  },
  {
    field: "password",
    title: "Should have a maximum of 64 characters",
    value: faker.string.alphanumeric(65),
    message: ResponseMessages.PASSWORD_HAS_MAXIMUM_LENGTH,
  },
  {
    field: "password",
    title: "Should have a minimum of 8 characters",
    value: faker.string.alphanumeric(7),
    message: ResponseMessages.PASSWORD_HAS_MINIMUM_LENGTH,
  },
];