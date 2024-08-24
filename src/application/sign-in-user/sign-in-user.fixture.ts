import { IFixture } from "../../domain/interfaces/fixture.interface";
import { FakeData } from "../../infrastructure/abstractions/fake-data.abstraction";

export const signInUserFixture: IFixture[] = [
  {
    field: "email",
    title: "Should be a string",
    value: 2000,
    message: "EMAIL_IS_STRING",
  },
  {
    field: "email",
    title: "Should be required",
    value: "",
    message: "EMAIL_IS_REQUIRED",
  },
  {
    field: "email",
    title: "Should be valid",
    value: "johndoe@email",
    message: "EMAIL_IS_VALID",
  },
  {
    field: "email",
    title: "Should have a maximum of 64 characters",
    value: FakeData.alphanumeric(65),
    message: "EMAIL_HAS_MAXIMUM_LENGTH",
  },
  {
    field: "email",
    title: "Should have a minimum of 8 characters",
    value: FakeData.alphanumeric(7),
    message: "EMAIL_HAS_MINIMUM_LENGTH",
  },
  {
    field: "password",
    title: "Should be a string",
    value: 2000,
    message: "PASSWORD_IS_STRING",
  },
  {
    field: "password",
    title: "Should be required",
    value: "",
    message: "PASSWORD_IS_REQUIRED",
  },
  {
    field: "password",
    title: "Should be strong",
    value: "LittleJohn123",
    message: "PASSWORD_IS_STRONG",
  },
  {
    field: "password",
    title: "Should have a maximum of 64 characters",
    value: FakeData.alphanumeric(65),
    message: "PASSWORD_HAS_MAXIMUM_LENGTH",
  },
  {
    field: "password",
    title: "Should have a minimum of 8 characters",
    value: FakeData.alphanumeric(7),
    message: "PASSWORD_HAS_MINIMUM_LENGTH",
  },
];
