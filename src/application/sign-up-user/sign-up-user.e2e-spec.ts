import each from "jest-each";
import { Response } from "supertest";
import { PROBLEM_DETAILS_URI } from "../../domain/constants";
import { HttpResponses } from "../../domain/constants/http-responses";
import { ResponseMessages } from "../../domain/enums/response-messages.enum";
import { ProblemDetailsType } from "../../domain/types/problem-details";
import { TestsUtility } from "../../domain/utilities/tests.utility";
import { FakeData } from "../../infrastructure/abstractions/fake-data.abstraction";
import { authService, request } from "../../main.e2e-spec";
import { signUpUserFixture } from "./sign-up-user.fixture";

const testsUtility = new TestsUtility({
  method: "POST",
  path: "/user/sign-up",
});

describe("Sign Up User | E2E Tests", () => {
  describe("Use Cases", () => {
    testsUtility.includeRateLimitTest();

    it("Should sign up a user", async () => {
      const response: Response = await request.post("/user/sign-up").send({
        email: FakeData.email(),
        password: FakeData.strongPassword(),
      });

      const cookies = response.get("Set-Cookie") as string[];

      const accessToken: string = testsUtility.getAccessTokenFromCookies(cookies);
      const refreshToken: string = testsUtility.getRefreshTokenFromCookies(cookies);

      const isAccessTokenValid: boolean = !!(await authService.validateTokenOrThrow(accessToken));
      const isRefreshTokenValid: boolean = !!(await authService.validateTokenOrThrow(refreshToken));

      expect(response.statusCode).toEqual(HttpResponses.CREATED.status);

      expect(isAccessTokenValid).toEqual(true);
      expect(isRefreshTokenValid).toEqual(true);
    });

    it("Should throw an error when trying to sign up a user with an already registered email", async () => {
      const email: string = FakeData.email();
      const password: string = FakeData.strongPassword();

      await request.post("/user/sign-up").send({
        email,
        password,
      });

      const response: Response = await request.post("/user/sign-up").send({
        email,
        password,
      });

      const { status, message } = HttpResponses.CONFLICT;

      const body: ProblemDetailsType = response.body;

      expect(response.statusCode).toEqual(status);

      expect(body.type).toEqual(`${PROBLEM_DETAILS_URI}/${status}`);
      expect(body.title).toEqual(ResponseMessages.EMAIL_ALREADY_EXISTS);
      expect(body.status).toEqual(status);
      expect(body.detail).toEqual(message);
    });
  });

  describe("Validations", () => {
    each(signUpUserFixture).it("$title", async ({ field, value, message }) => {
      const response: Response = await request
        .post("/user/sign-up")
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
