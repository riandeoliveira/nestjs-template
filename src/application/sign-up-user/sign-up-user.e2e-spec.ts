import { PersonalRefreshToken, User } from "@prisma/client";
import { isUUID } from "class-validator";
import each from "jest-each";
import { Response } from "supertest";
import {
  ACCESS_TOKEN_EXPIRATION_IN_SECONDS,
  PROBLEM_DETAILS_URI,
  REFRESH_TOKEN_EXPIRATION_IN_SECONDS,
} from "../../domain/constants";
import { HttpResponses } from "../../domain/constants/http-responses";
import { TokenDto } from "../../domain/dtos/token.dto";
import { ResponseMessages } from "../../domain/enums/response-messages.enum";
import { ProblemDetailsType } from "../../domain/types/problem-details";
import { CommonTestsUtility } from "../../domain/utilities/common-tests.utility";
import { FakeData } from "../../infrastructure/abstractions/fake-data.abstraction";
import { authService, prisma, request } from "../../main.e2e-spec";
import { signUpUserFixture } from "./sign-up-user.fixture";

const commonTestsUtility = new CommonTestsUtility("POST", "/user/sign-up");

describe("Sign Up User | E2E Tests", () => {
  describe("Use Cases", () => {
    commonTestsUtility.includeRateLimitTest();

    it("Should sign up a user", async () => {
      const response: Response = await request.post("/user/sign-up").send({
        email: FakeData.email(),
        password: FakeData.strongPassword(),
      });

      const body: TokenDto = response.body;

      const user: User | null = await prisma.user.findUnique({
        where: {
          id: body.userId,
          deletedAt: null,
        },
      });

      const personalRefreshToken: PersonalRefreshToken | null =
        await prisma.personalRefreshToken.findUnique({
          where: {
            value: body.refreshToken.value,
            deletedAt: null,
          },
        });

      const isAccessTokenValid: boolean = await authService.validateTokenOrThrow(
        body.accessToken.value,
      );

      const isRefreshTokenValid: boolean = await authService.validateTokenOrThrow(
        body.refreshToken.value,
      );

      expect(response.statusCode).toEqual(HttpResponses.CREATED.status);

      expect(isUUID(body.userId)).toEqual(true);
      expect(user).not.toBeNull();

      expect(body.accessToken.expiresIn).toEqual(ACCESS_TOKEN_EXPIRATION_IN_SECONDS);
      expect(isAccessTokenValid).toEqual(true);

      expect(body.refreshToken.expiresIn).toEqual(REFRESH_TOKEN_EXPIRATION_IN_SECONDS);
      expect(isRefreshTokenValid).toEqual(true);
      expect(personalRefreshToken).not.toBeNull();
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
