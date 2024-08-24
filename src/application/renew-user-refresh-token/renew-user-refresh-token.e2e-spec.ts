import each from "jest-each";
import { Response } from "supertest";
import { E2EResponseHelper } from "../../infrastructure/helpers/e2e-response.helper";
import { E2ETestsHelper } from "../../infrastructure/helpers/e2e-tests.helper";
import { CookiesUtility } from "../../infrastructure/utilities/cookies.utility";
import { prisma, request } from "../../main.e2e-spec";
import { renewUserRefreshTokenFixture } from "./renew-user-refresh-token.fixture";

const { includeRateLimitTest, authenticate } = new E2ETestsHelper(
  "POST",
  "/user/refresh-token/renew",
);

describe("Renew User Refresh Token | E2E Tests", () => {
  describe("Use Cases", () => {
    includeRateLimitTest();

    it("Should renew a user refresh token", async () => {
      const { jwtCookies } = await authenticate();

      const oldRefreshToken: string = CookiesUtility.getJwtTokenFromCookies(
        jwtCookies,
        "refresh_token",
      );

      const response: Response = await request
        .post("/user/refresh-token/renew")
        .set("Cookie", jwtCookies[1]);

      const { expectCorrectStatusCode, expectValidJwtTokens } = new E2EResponseHelper(
        response,
        "NO_CONTENT",
      );

      const oldPersonalRefreshToken = await prisma.personalRefreshToken.findUnique({
        where: {
          value: oldRefreshToken,
          deletedAt: null,
        },
      });

      expectCorrectStatusCode();

      expect(oldPersonalRefreshToken?.hasBeenUsed).toEqual(true);

      expectValidJwtTokens();
    });

    it("should throw an error when the refresh token has already been used", async () => {
      const { jwtCookies } = await authenticate();

      const refreshToken: string = CookiesUtility.getJwtTokenFromCookies(
        jwtCookies,
        "refresh_token",
      );

      await prisma.personalRefreshToken.update({
        where: {
          value: refreshToken,
          deletedAt: null,
        },
        data: {
          hasBeenUsed: true,
          updatedAt: new Date(),
        },
      });

      const response: Response = await request
        .post("/user/refresh-token/renew")
        .set("Cookie", jwtCookies[1]);

      const { expectCorrectStatusCode, expectProblemDetails } = new E2EResponseHelper(
        response,
        "UNAUTHORIZED",
      );

      expectCorrectStatusCode();
      expectProblemDetails("UNAUTHORIZED_OPERATION");
    });
  });

  describe("Validations", () => {
    let cookie: string;

    beforeAll(async () => {
      const { jwtCookies } = await authenticate();

      cookie = jwtCookies[1];
    });

    each(renewUserRefreshTokenFixture).it("$title", async ({ field, value, message }) => {
      const cookieFixture: string = cookie.replace(
        new RegExp(`${field}=[^;]+`),
        `${field}=${value}`,
      );

      const response: Response = await request
        .post("/user/refresh-token/renew")
        .set("Cookie", value === "" ? "" : cookieFixture)
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
