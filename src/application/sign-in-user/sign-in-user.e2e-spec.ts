import { faker } from "@faker-js/faker";
import { HttpStatus } from "@nestjs/common";
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
import { PasswordUtility } from "../../domain/utilities/password.utility";
import { TestUtility } from "../../domain/utilities/test.utility";
import { authService, prisma, request } from "../../main.e2e-spec";
import { signInUserFixture } from "./sign-in-user.fixture";

const utility = new TestUtility("POST", "/user/sign-in");

describe("Sign In User | E2E Tests", () => {
  describe("Use Cases", () => {
    utility.includeRateLimitTest();

    it("Should sign in a user", async () => {
      const email: string = faker.internet.email();
      const password: string = faker.internet.password({ prefix: "$0" });

      await request.post("/user/sign-up").send({
        email,
        password,
      });

      const response: Response = await request.post("/user/sign-in").send({
        email,
        password,
      });

      const body: TokenDto = response.body;

      const user = await prisma.user.findUnique({
        where: {
          id: body.userId,
          deletedAt: null,
        },
      });

      const isPasswordValid: boolean = await PasswordUtility.verify(
        password,
        user ? user.password : "",
      );

      const personalRefreshToken = await prisma.personalRefreshToken.findUnique({
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
      expect(user).not.toBeNull();

      expect(isPasswordValid).toEqual(true);

      expect(body.accessToken.expiresIn).toEqual(ACCESS_TOKEN_EXPIRATION_IN_SECONDS);
      expect(isAccessTokenValid).toEqual(true);

      expect(body.refreshToken.expiresIn).toEqual(REFRESH_TOKEN_EXPIRATION_IN_SECONDS);
      expect(isRefreshTokenValid).toEqual(true);
      expect(personalRefreshToken).not.toBeNull();
    });

    it("Should throw an error when sending invalid credentials", async () => {
      const response: Response = await request.post("/user/sign-in").send({
        email: faker.internet.email(),
        password: faker.internet.password({ prefix: "$0" }),
      });

      const status: number = HttpStatus.UNAUTHORIZED;
      const body: ProblemDetailsDto = response.body;

      expect(response.statusCode).toEqual(status);

      expect(body.type).toEqual(`${PROBLEM_DETAILS_URI}/${status}`);
      expect(body.title).toEqual(ResponseMessages.INVALID_CREDENTIALS);
      expect(body.status).toEqual(status);
      expect(body.detail).toEqual(HttpMessages.UNAUTHORIZED);
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
