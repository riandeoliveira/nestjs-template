import each from "jest-each";
import { Response } from "supertest";
import { PROBLEM_DETAILS_URI } from "../../domain/constants";
import { HttpResponses } from "../../domain/constants/http-responses";
import { ResponseMessages } from "../../domain/enums/response-messages.enum";
import { ProblemDetailsType } from "../../domain/types/problem-details";
import { TestsUtility } from "../../domain/utilities/tests.utility";
import { FakeData } from "../../infrastructure/abstractions/fake-data.abstraction";
import { authService, request } from "../../main.e2e-spec";
import { signInUserFixture } from "./sign-in-user.fixture";

const testsUtility = new TestsUtility({
  method: "POST",
  path: "/user/sign-in",
});

describe("Sign In User | E2E Tests", () => {
  describe("Use Cases", () => {
    testsUtility.includeRateLimitTest();

    it("Should sign in a user", async () => {
      const email: string = FakeData.email();
      const password: string = FakeData.strongPassword();

      await request.post("/user/sign-up").send({
        email,
        password,
      });

      const response: Response = await request.post("/user/sign-in").send({
        email,
        password,
      });

      const cookies = response.get("Set-Cookie") as string[];

      const accessToken: string = testsUtility.getAccessTokenFromCookies(cookies);
      const refreshToken: string = testsUtility.getRefreshTokenFromCookies(cookies);

      const isAccessTokenValid: boolean = !!(await authService.validateTokenOrThrow(accessToken));
      const isRefreshTokenValid: boolean = !!(await authService.validateTokenOrThrow(refreshToken));

      expect(response.statusCode).toEqual(HttpResponses.NO_CONTENT.status);

      expect(isAccessTokenValid).toEqual(true);
      expect(isRefreshTokenValid).toEqual(true);
    });

    it("Should throw an error when sending invalid credentials", async () => {
      const response: Response = await request.post("/user/sign-in").send({
        email: FakeData.email(),
        password: FakeData.strongPassword(),
      });

      const { status, message } = HttpResponses.UNAUTHORIZED;

      const body: ProblemDetailsType = response.body;

      expect(response.statusCode).toEqual(status);

      expect(body.type).toEqual(`${PROBLEM_DETAILS_URI}/${status}`);
      expect(body.title).toEqual(ResponseMessages.INVALID_CREDENTIALS);
      expect(body.status).toEqual(status);
      expect(body.detail).toEqual(message);
    });
  });

  describe("Validations", () => {
    each(signInUserFixture).it("$title", async ({ field, value, message }) => {
      const response: Response = await request
        .post("/user/sign-in")
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
