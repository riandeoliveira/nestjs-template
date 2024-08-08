import { HttpStatus } from "@nestjs/common";
import { PersonalRefreshToken, User } from "@prisma/client";
import { isUUID } from "class-validator";
import each from "jest-each";
import { Response } from "supertest";
import {
  ACCESS_TOKEN_EXPIRATION_IN_SECONDS,
  PROBLEM_DETAILS_URI,
  REFRESH_TOKEN_EXPIRATION_IN_SECONDS,
} from "../../domain/constants";
import { ProblemDetailsDto } from "../../domain/dtos/problem-details.dto";
import { TokenDto } from "../../domain/dtos/token.dto";
import { HttpMessages } from "../../domain/enums/http-messages.enum";
import { ResponseMessages } from "../../domain/enums/response-messages.enum";
import { CommonTestsUtility } from "../../domain/utilities/common-tests.utility";
import { PasswordUtility } from "../../domain/utilities/password.utility";
import { FakeData } from "../../infrastructure/abstractions/fake-data.abstraction";
import { authService, prisma, request } from "../../main.e2e-spec";
import { resetUserPasswordFixture } from "./reset-user-password.fixture";

const commonTestsUtility = new CommonTestsUtility("POST", "/user/reset-password");

describe("Reset User Password | E2E Tests", () => {
  describe("Use Cases", () => {
    commonTestsUtility.includeAuthenticationTest();
    commonTestsUtility.includeRateLimitTest();

    it("Should reset the user password", async () => {
      const { accessToken } = await commonTestsUtility.authenticate();

      const password: string = FakeData.strongPassword();

      const response: Response = await request
        .post("/user/reset-password")
        .set("Authorization", accessToken)
        .send({
          password,
          password_confirmation: password,
        });

      const body: TokenDto = response.body;

      const user: User | null = await prisma.user.findUnique({
        where: {
          id: body.userId,
          deletedAt: null,
        },
      });

      const isPasswordValid: boolean = await PasswordUtility.verify(
        password,
        user ? user.password : "",
      );

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

      expect(response.statusCode).toEqual(HttpStatus.OK);

      expect(isUUID(body.userId)).toEqual(true);
      expect(body.accessToken.expiresIn).toEqual(ACCESS_TOKEN_EXPIRATION_IN_SECONDS);
      expect(body.refreshToken.expiresIn).toEqual(REFRESH_TOKEN_EXPIRATION_IN_SECONDS);

      expect(user).not.toBeNull();
      expect(isPasswordValid).toEqual(true);
      expect(personalRefreshToken).not.toBeNull();
      expect(isAccessTokenValid).toEqual(true);
      expect(isRefreshTokenValid).toEqual(true);
    });

    it("Should throw an error when passwords are not equivalent", async () => {
      const { accessToken } = await commonTestsUtility.authenticate();

      const firstPassword: string = FakeData.strongPassword();
      const secondPassword: string = FakeData.strongPassword();

      const response: Response = await request
        .post("/user/reset-password")
        .set("Authorization", accessToken)
        .send({
          password: firstPassword,
          password_confirmation: secondPassword,
        });

      const status: number = HttpStatus.BAD_REQUEST;
      const body: ProblemDetailsDto = response.body;

      expect(response.statusCode).toEqual(status);

      expect(body.type).toEqual(`${PROBLEM_DETAILS_URI}/${status}`);
      expect(body.title).toEqual(ResponseMessages.PASSWORDS_ARE_EQUIVALENT);
      expect(body.status).toEqual(status);
      expect(body.detail).toEqual(HttpMessages.BAD_REQUEST);
    });
  });

  describe("Validations", () => {
    let accessToken: string;

    beforeAll(async () => {
      const { accessToken: token } = await commonTestsUtility.authenticate();

      accessToken = token;
    });

    each(resetUserPasswordFixture).it("$title", async ({ field, value, message }) => {
      const response: Response = await request
        .post("/user/reset-password")
        .set("Authorization", accessToken)
        .send({
          [field]: value,
        })
        .retry();

      const status: number = HttpStatus.BAD_REQUEST;
      const body: ProblemDetailsDto = response.body;

      expect(response.statusCode).toEqual(status);

      expect(body.type).toEqual(`${PROBLEM_DETAILS_URI}/${status}`);
      expect(body.title).toContain(message);
      expect(body.status).toEqual(status);
      expect(body.detail).toEqual(HttpMessages.BAD_REQUEST);
    });
  });
});
