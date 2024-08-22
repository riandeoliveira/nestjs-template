import each from "jest-each";
import { Response } from "supertest";
import { PROBLEM_DETAILS_URI } from "../../domain/constants";
import { HttpResponses } from "../../domain/constants/http-responses";
import { ResponseMessages } from "../../domain/enums/response-messages.enum";
import { ProblemDetailsType } from "../../domain/types/problem-details";
import { CommonTestsUtility } from "../../domain/utilities/common-tests.utility";
import { FakeData } from "../../infrastructure/abstractions/fake-data.abstraction";
import { authService, request } from "../../main.e2e-spec";
import { resetUserPasswordFixture } from "./reset-user-password.fixture";

const commonTestsUtility = new CommonTestsUtility("POST", "/user/reset-password");

describe("Reset User Password | E2E Tests", () => {
  describe("Use Cases", () => {
    commonTestsUtility.includeAuthenticationTest();
    commonTestsUtility.includeRateLimitTest();

    it("Should reset the user password", async () => {
      const { jwtCookies } = await commonTestsUtility.authenticate();

      const password: string = FakeData.strongPassword();

      const response: Response = await request
        .post("/user/reset-password")
        .set("Cookie", jwtCookies)
        .send({
          password,
          password_confirmation: password,
        });

      const cookies: string[] = commonTestsUtility.getJwtCookies(response);

      const accessToken: string = commonTestsUtility.getJwtTokenFromCookie(
        cookies ? cookies[0] : "",
      );

      const refreshToken: string = commonTestsUtility.getJwtTokenFromCookie(
        cookies ? cookies[1] : "",
      );

      const isAccessTokenValid: boolean = !!(await authService.validateTokenOrThrow(accessToken));
      const isRefreshTokenValid: boolean = !!(await authService.validateTokenOrThrow(refreshToken));

      expect(response.statusCode).toEqual(HttpResponses.NO_CONTENT.status);

      expect(isAccessTokenValid).toEqual(true);
      expect(isRefreshTokenValid).toEqual(true);
    });

    it("Should throw an error when passwords are not equivalent", async () => {
      const { jwtCookies } = await commonTestsUtility.authenticate();

      const firstPassword: string = FakeData.strongPassword();
      const secondPassword: string = FakeData.strongPassword();

      const response: Response = await request
        .post("/user/reset-password")
        .set("Cookie", jwtCookies)
        .send({
          password: firstPassword,
          password_confirmation: secondPassword,
        });

      const { status, message } = HttpResponses.BAD_REQUEST;

      const body: ProblemDetailsType = response.body;

      expect(response.statusCode).toEqual(status);

      expect(body.type).toEqual(`${PROBLEM_DETAILS_URI}/${status}`);
      expect(body.title).toEqual(ResponseMessages.PASSWORDS_ARE_EQUIVALENT);
      expect(body.status).toEqual(status);
      expect(body.detail).toEqual(message);
    });
  });

  describe("Validations", () => {
    let cookies: string[];

    beforeAll(async () => {
      const { jwtCookies } = await commonTestsUtility.authenticate();

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
