import { IFixture } from "../../domain/interfaces/fixture.interface";
import { FakeData } from "../../infrastructure/abstractions/fake-data.abstraction";

export const renewUserRefreshTokenFixture: IFixture[] = [
  {
    field: "refresh_token",
    title: "Should be required",
    value: "",
    message: "REFRESH_TOKEN_IS_REQUIRED",
  },
  {
    field: "refresh_token",
    title: "Should have exactly 252 characters",
    value: FakeData.alphanumeric(251),
    message: "REFRESH_TOKEN_LENGTH",
  },
];
