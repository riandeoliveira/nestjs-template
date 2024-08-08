import { ResponseMessages } from "@/domain/enums/response-messages.enum";
import { FakeData } from "@/infrastructure/abstractions/fake-data.abstraction";

export const renewUserRefreshTokenFixture = [
  {
    field: "refresh_token",
    title: "Should be a string",
    value: 2000,
    message: ResponseMessages.REFRESH_TOKEN_IS_STRING,
  },
  {
    field: "refresh_token",
    title: "Should be required",
    value: "",
    message: ResponseMessages.REFRESH_TOKEN_IS_REQUIRED,
  },
  {
    field: "refresh_token",
    title: "Should have exactly 252 characters",
    value: FakeData.alphanumeric(251),
    message: ResponseMessages.REFRESH_TOKEN_LENGTH,
  },
];
