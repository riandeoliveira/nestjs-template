import { PersonalRefreshToken } from "@prisma/client";
import each from "jest-each";
import { Response } from "supertest";
import { FakeData } from "../../infrastructure/abstractions/fake-data.abstraction";
import { E2EResponseHelper } from "../../infrastructure/helpers/e2e-response.helper";
import { E2ETestsHelper } from "../../infrastructure/helpers/e2e-tests.helper";
import { CookiesUtility } from "../../infrastructure/utilities/cookies.utility";
import { prisma, request } from "../../main.e2e-spec";
import { resetUserPasswordFixture } from "./reset-user-password.fixture";

const { includeAuthenticationTest, includeRateLimitTest, authenticate } = new E2ETestsHelper(
  "POST",
  "/user/reset-password",
);

describe("Reset User Password | E2E Tests", () => {
  describe("Use Cases", () => {
    includeAuthenticationTest();
    includeRateLimitTest();

    it("Should reset the user password", async () => {
      const { jwtCookies } = await authenticate();

      const refreshToken: string = CookiesUtility.getJwtTokenFromCookies(
        jwtCookies,
        "refresh_token",
      );

      const password: string = FakeData.strongPassword();

      const response: Response = await request
        .post("/user/reset-password")
        .set("Cookie", jwtCookies)
        .send({
          password,
          password_confirmation: password,
        });

      const { expectCorrectStatusCode, expectValidJwtTokens } = new E2EResponseHelper(
        response,
        "NO_CONTENT",
      );

      const personalRefreshToken: PersonalRefreshToken | null =
        await prisma.personalRefreshToken.findUnique({
          where: {
            value: refreshToken,
            deletedAt: null,
          },
        });

      expectCorrectStatusCode();

      expect(personalRefreshToken?.hasBeenUsed).toEqual(true);

      expectValidJwtTokens();
    });

    it("Should throw an error when passwords are not equivalent", async () => {
      const { jwtCookies } = await authenticate();

      const firstPassword: string = FakeData.strongPassword();
      const secondPassword: string = FakeData.strongPassword();

      const response: Response = await request
        .post("/user/reset-password")
        .set("Cookie", jwtCookies)
        .send({
          password: firstPassword,
          password_confirmation: secondPassword,
        });

      const { expectCorrectStatusCode, expectProblemDetails } = new E2EResponseHelper(
        response,
        "BAD_REQUEST",
      );

      expectCorrectStatusCode();
      expectProblemDetails("PASSWORDS_ARE_EQUIVALENT");
    });
  });

  describe("Validations", () => {
    let cookies: string[];

    beforeAll(async () => {
      const { jwtCookies } = await authenticate();

      cookies = jwtCookies;
    });

    each(resetUserPasswordFixture).it("$title", async ({ field, value, message }) => {
      const response: Response = await request
        .post("/user/reset-password")
        .set("Cookie", cookies)
        .send({
          [field]: value,
        })
        .retry();

      const { expectCorrectStatusCode, expectProblemDetails } = new E2EResponseHelper(
        response,
        "BAD_REQUEST",
      );

      expectCorrectStatusCode();
      expectProblemDetails(message);
    });
  });
});
