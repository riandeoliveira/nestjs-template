import each from "jest-each";
import { Response } from "supertest";
import { PROBLEM_DETAILS_URI } from "../../domain/constants";
import { HttpResponses } from "../../domain/constants/http-responses";
import { ResponseMessages } from "../../domain/enums/response-messages.enum";
import { ProblemDetailsType } from "../../domain/types/problem-details";
import { TestsUtility } from "../../domain/utilities/tests.utility";
import { authService, prisma, request } from "../../main.e2e-spec";
import { renewUserRefreshTokenFixture } from "./renew-user-refresh-token.fixture";

const testsUtility = new TestsUtility({
  method: "POST",
  path: "/user/refresh-token/renew",
});

describe("Renew User Refresh Token | E2E Tests", () => {
  describe("Use Cases", () => {
    testsUtility.includeRateLimitTest();

    it("Should renew a user refresh token", async () => {
      const { jwtCookies } = await testsUtility.authenticate();

      const response: Response = await request
        .post("/user/refresh-token/renew")
        .set("Cookie", jwtCookies[1]);

      const cookies = response.get("Set-Cookie") as string[];

      const accessToken: string = testsUtility.getAccessTokenFromCookies(cookies);
      const refreshToken: string = testsUtility.getRefreshTokenFromCookies(cookies);

      const isAccessTokenValid: boolean = !!(await authService.validateTokenOrThrow(accessToken));
      const isRefreshTokenValid: boolean = !!(await authService.validateTokenOrThrow(refreshToken));

      expect(response.statusCode).toEqual(HttpResponses.NO_CONTENT.status);

      expect(isAccessTokenValid).toEqual(true);
      expect(isRefreshTokenValid).toEqual(true);
    });

    it("should throw an error when the refresh token has already been used", async () => {
      const { jwtCookies } = await testsUtility.authenticate();

      const refreshToken: string = testsUtility.getRefreshTokenFromCookies(jwtCookies);

      await prisma.personalRefreshToken.update({
        where: {
          value: refreshToken,
        },
        data: {
          hasBeenUsed: true,
          updatedAt: new Date(),
        },
      });

      const response: Response = await request
        .post("/user/refresh-token/renew")
        .set("Cookie", jwtCookies[1]);

      const { status, message } = HttpResponses.UNAUTHORIZED;

      const body: ProblemDetailsType = response.body;

      expect(response.statusCode).toEqual(status);

      expect(body.type).toEqual(`${PROBLEM_DETAILS_URI}/${status}`);
      expect(body.title).toContain(ResponseMessages.UNAUTHORIZED_OPERATION);
      expect(body.status).toEqual(status);
      expect(body.detail).toEqual(message);
    });
  });

  describe("Validations", () => {
    let cookie: string;

    beforeAll(async () => {
      const { jwtCookies } = await testsUtility.authenticate();

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

      const { status, message: detail } = HttpResponses.BAD_REQUEST;

      const body: ProblemDetailsType = response.body;

      expect(response.statusCode).toEqual(status);

      expect(body.type).toEqual(`${PROBLEM_DETAILS_URI}/${status}`);
      expect(body.title).toContain(message);
      expect(body.status).toEqual(status);
      expect(body.detail).toEqual(detail);
    });
  });
});
