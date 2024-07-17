import { faker } from "@faker-js/faker";
import { ResponseMessages } from "../../../src/domain/enums/response-messages.enum";

export const signUpUserFixture = {
  email: [
    {
      title: "be a string",
      value: 2000,
      message: ResponseMessages.EMAIL_IS_STRING,
    },
    {
      title: "be required",
      value: "",
      message: ResponseMessages.EMAIL_IS_REQUIRED,
    },
    {
      title: "be valid",
      value: "johndoe@email",
      message: ResponseMessages.EMAIL_IS_VALID,
    },
    {
      title: "have a maximum of 64 characters",
      value: faker.string.alphanumeric(65),
      message: ResponseMessages.EMAIL_HAS_MAXIMUM_LENGTH,
    },
    {
      title: "have a minimum of 8 characters",
      value: faker.string.alphanumeric(7),
      message: ResponseMessages.EMAIL_HAS_MINIMUM_LENGTH,
    },
  ],

  password: [
    {
      title: "be a string",
      value: 2000,
      message: ResponseMessages.PASSWORD_IS_STRING,
    },
    {
      title: "be required",
      value: "",
      message: ResponseMessages.PASSWORD_IS_REQUIRED,
    },
    {
      title: "be strong",
      value: "LittleJohn123",
      message: ResponseMessages.PASSWORD_IS_STRONG,
    },
    {
      title: "have a maximum of 64 characters",
      value: faker.string.alphanumeric(65),
      message: ResponseMessages.PASSWORD_HAS_MAXIMUM_LENGTH,
    },
    {
      title: "have a minimum of 8 characters",
      value: faker.string.alphanumeric(7),
      message: ResponseMessages.PASSWORD_HAS_MINIMUM_LENGTH,
    },
  ],
};
